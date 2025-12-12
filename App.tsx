import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCT_DATABASE, DEFAULT_JD_CONFIG, DEFAULT_KYE_CONFIG, DEFAULT_KYE_GROUND_CONFIG, DEFAULT_KYE_PROVINCE_CONFIG, REGIONS } from './constants';
import { Product, CartItem, ShippingConfig, CalculationResult, Region, PricingRule, VolumePricingRule, HistoryRecord } from './types';
import { ComparisonCard } from './components/ComparisonCard';
import { HistoryModal } from './components/HistoryModal';
import { parseOrderInput } from './services/geminiService';

export default function App() {
  const [selectedSku, setSelectedSku] = useState<string>('');
  const [quantity, setQuantity] = useState<number | string>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Region / Address State
  const [regionInput, setRegionInput] = useState<string>(REGIONS[0].name);

  // Determine the active region based on input
  const resolvedRegion = useMemo(() => {
    const trimmed = regionInput.trim();
    if (!trimmed) return null;
    
    // 1. Exact Name Match
    const exact = REGIONS.find(r => r.name === trimmed);
    if (exact) return exact;

    // 2. Name contains input
    const nameMatch = REGIONS.find(r => r.name.includes(trimmed));
    if (nameMatch) return nameMatch;

    // 3. Description contains input
    const descMatch = REGIONS.find(r => r.description?.includes(trimmed));
    if (descMatch) return descMatch;

    return null;
  }, [regionInput]);

  const selectedRegionDesc = resolvedRegion?.description;

  // Settings / Config
  const [jdConfig] = useState<ShippingConfig>(DEFAULT_JD_CONFIG);
  const [kyeConfig] = useState<ShippingConfig>(DEFAULT_KYE_CONFIG);
  const [kyeGroundConfig] = useState<ShippingConfig>(DEFAULT_KYE_GROUND_CONFIG);
  const [kyeProvinceConfig] = useState<ShippingConfig>(DEFAULT_KYE_PROVINCE_CONFIG);
  
  // AI State
  const [aiInput, setAiInput] = useState('');
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // History State
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shipping_calc_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shipping_calc_history', JSON.stringify(history));
  }, [history]);

  // Auto-save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (cart.length === 0) return;

      const currentRegionName = resolvedRegion ? resolvedRegion.name : regionInput;
      const currentRegionId = resolvedRegion ? resolvedRegion.id : 'unknown';
      
      let savedHistory: HistoryRecord[] = [];
      try {
         const raw = localStorage.getItem('shipping_calc_history');
         if (raw) savedHistory = JSON.parse(raw);
      } catch (e) {}

      // Avoid duplicates
      if (savedHistory.length > 0) {
        const last = savedHistory[0];
        const isSameItems = JSON.stringify(last.items) === JSON.stringify(cart);
        const isSameRegion = last.regionName === currentRegionName;
        
        if (isSameItems && isSameRegion) {
           return;
        }
      }

      const newRecord: HistoryRecord = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        regionId: currentRegionId,
        regionName: currentRegionName,
        items: cart,
        note: '自动保存'
      };

      const newHistory = [newRecord, ...savedHistory];
      localStorage.setItem('shipping_calc_history', JSON.stringify(newHistory));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [cart, regionInput, resolvedRegion]);

  const handleSaveHistory = () => {
    if (cart.length === 0) return;
    
    const regionName = resolvedRegion ? resolvedRegion.name : regionInput;
    const regionId = resolvedRegion ? resolvedRegion.id : 'unknown';

    const newRecord: HistoryRecord = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      regionId: regionId,
      regionName: regionName,
      items: cart,
    };

    setHistory(prev => [newRecord, ...prev]);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const handleLoadHistory = (record: HistoryRecord) => {
    const regionById = REGIONS.find(r => r.id === record.regionId);
    setRegionInput(regionById ? regionById.name : record.regionName);
    setCart(record.items);
    setIsHistoryOpen(false);
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setSelectedSku(val);
  };

  const handleAddItem = () => {
    const product = PRODUCT_DATABASE.find(p => p.sku === selectedSku);
    const qty = typeof quantity === 'string' ? parseInt(quantity) : quantity;

    if (product && qty > 0) {
      const newItem: CartItem = {
        ...product,
        id: Math.random().toString(36).substr(2, 9),
        quantity: qty
      };
      setCart(prev => [...prev, newItem]);
      setQuantity(1);
      setSelectedSku('');
    }
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const handleSmartAdd = async () => {
    if (!aiInput.trim() && !pastedImage) return;
    
    setIsAiLoading(true);
    setAiError(null);
    try {
      const { items, destination } = await parseOrderInput(aiInput, pastedImage);
      
      let successMsg = "";

      // Handle Destination
      if (destination) {
        setRegionInput(destination);
        successMsg += `📍 已识别目的地：${destination}。 `;
      }

      // Handle Items
      if (!items || items.length === 0) {
        if (!destination) {
           setAiError("无法识别有效的产品货号或地址，请检查输入或图片。");
           setIsAiLoading(false);
           return;
        } else {
           // Only destination found, no items
           successMsg += "未找到有效货号。";
        }
      } else {
        const newItems: CartItem[] = [];
        let notFoundCount = 0;

        items.forEach(res => {
          const product = PRODUCT_DATABASE.find(p => p.sku === res.sku);
          if (product) {
            newItems.push({
              ...product,
              id: Math.random().toString(36).substr(2, 9),
              quantity: res.quantity
            });
          } else {
            notFoundCount++;
          }
        });

        if (newItems.length > 0) {
          setCart(prev => [...prev, ...newItems]);
          successMsg += `📦 成功添加 ${newItems.length} 个货品。`;
        }
        
        if (notFoundCount > 0) {
           successMsg += ` (另有 ${notFoundCount} 个货号未在库中)`;
        }
      }

      if (successMsg) {
         setAiError(successMsg); // Re-using error state for success/status message visually
      }
      
      // Clear inputs if we had some success
      if (items.length > 0 || destination) {
         setAiInput(''); 
         setPastedImage(null); 
      }

    } catch (err) {
      console.error(err);
      setAiError("智能识别服务暂时不可用，请稍后重试。");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const blob = item.getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
             const base64 = event.target?.result as string;
             setPastedImage(base64);
             setAiError(null);
          };
          reader.readAsDataURL(blob);
        }
        return;
      }
    }
  };

  const handleClearImage = () => {
    setPastedImage(null);
  };

  // Calculations logic
  const calculations = useMemo(() => {
    if (cart.length === 0) return null;

    let totalActualWeight = 0;
    let totalVolumeCbm = 0;

    cart.forEach(item => {
      totalActualWeight += item.weight * item.quantity;
      totalVolumeCbm += ((item.length * item.width * item.height) * item.quantity) / 1000000;
    });

    const calculateWeightBased = (config: ShippingConfig, pricing: PricingRule | null): CalculationResult => {
      const volumetricWeight = (totalVolumeCbm * 1000000) / config.volumeFactor;
      let chargeableWeight = Math.max(totalActualWeight, volumetricWeight);
      
      // JD Specific Rounding Logic
      // 1. Min 1kg.
      // 2. Extra weight rounded up to nearest 0.5kg.
      if (config.code === 'JD') {
        if (chargeableWeight <= 1) {
          chargeableWeight = 1;
        } else {
          const base = 1;
          const extra = chargeableWeight - base;
          const roundedExtra = Math.ceil(extra * 2) / 2; // Round up to nearest 0.5
          chargeableWeight = base + roundedExtra;
        }
      }

      const baseResult = {
         carrier: config.code,
         totalWeight: totalActualWeight,
         volumetricWeight,
         chargeableWeight,
         pricingUnit: 'KG' as const,
         totalPrice: 0,
         regionName: resolvedRegion ? resolvedRegion.name : '未知地区',
      };

      if (!resolvedRegion || !pricing) {
        return { ...baseResult, error: !resolvedRegion ? '未找到对应地区' : '暂无报价' };
      }

      if (pricing.minWeight && chargeableWeight < pricing.minWeight) {
        chargeableWeight = pricing.minWeight;
      }

      let price = 0;
      // Handle generic tiers (if used by carrier)
      if (pricing.tiers && pricing.tiers.length > 0) {
         price = pricing.basePrice;
         let remainingWeight = chargeableWeight - pricing.baseWeight;
         let currentFloor = pricing.baseWeight;
         
         // Generic tier logic (cumulative)
         // Check if this is legacy 'JD-style' logic where tiers are purely ranges?
         // No, standard logic usually implies progressive or bucketed.
         // However, if tiers is provided, we use it.
         
         // Note: For JD now, we only use unitPrice/unitPrice2 for simplicity as per new logic below,
         // UNLESS the region data specifically provides a 'tiers' array (which none of our JD_NEW_RATES do).
         // If a region DOES have tiers, we use them.
         
         if (remainingWeight > 0) {
            for (const tier of pricing.tiers) {
               if (remainingWeight <= 0) break;
               const tierMax = tier.max;
               const bucketSize = tierMax - currentFloor;
               if (bucketSize <= 0) continue; 
               const weightInThisBucket = Math.min(remainingWeight, bucketSize);
               price += weightInThisBucket * tier.price;
               remainingWeight -= weightInThisBucket;
               currentFloor = tierMax;
            }
         }
      } else {
         // Standard Base + Unit Price Logic
         if (chargeableWeight <= pricing.baseWeight) {
           price = pricing.basePrice;
         } else {
           const extraWeight = chargeableWeight - pricing.baseWeight;
           
           // JD Specific Multi-tier logic based on provided columns: (1, 30] and 30+
           if (config.code === 'JD' && pricing.unitPrice2 !== undefined) {
              // The logic implies incremental steps. 
              // Tier 1: 1kg -> 30kg (First 29kg of extra weight)
              // Tier 2: > 30kg
              
              const tier1Limit = 29; // 30 - 1 base
              
              if (extraWeight <= tier1Limit) {
                 price = pricing.basePrice + (extraWeight * (pricing.unitPrice || 0));
              } else {
                 const weightInTier1 = tier1Limit;
                 const weightInTier2 = extraWeight - tier1Limit;
                 price = pricing.basePrice + (weightInTier1 * (pricing.unitPrice || 0)) + (weightInTier2 * pricing.unitPrice2);
              }
           } else {
              // Legacy or Single Tier
              price = pricing.basePrice + (extraWeight * (pricing.unitPrice || 0));
           }
         }
      }
      
      if (pricing.minPrice && price < pricing.minPrice) price = pricing.minPrice;
      if (config.discount) price *= config.discount;

      // JD Specific Price Rounding (Integer)
      if (config.code === 'JD') {
        price = Math.round(price);
      }

      return { ...baseResult, totalPrice: price };
    };

    const calculateVolumeBased = (config: ShippingConfig, pricing: VolumePricingRule | null | undefined): CalculationResult => {
      const baseResult = {
         carrier: config.code,
         totalWeight: totalActualWeight,
         // Display purpose only. Actual volumetric weight used for density check below.
         volumetricWeight: (totalVolumeCbm * 1000000) / (config.volumeFactor || 6000),
         totalVolumeM3: totalVolumeCbm,
         chargeableWeight: 0,
         pricingUnit: 'M3' as const,
         totalPrice: 0,
         regionName: resolvedRegion ? resolvedRegion.name : '未知地区',
      };

      if (!resolvedRegion || !pricing) {
        return { ...baseResult, error: !resolvedRegion ? '未找到对应地区' : '暂无报价' };
      }

      // Density Check Logic:
      // "Chargeable weight is the greater of volumetric weight and actual weight."
      // For volume-based pricing (M3), if goods are very dense (Heavy), we convert the weight back into an 'equivalent volume'.
      // 1 CBM = 1,000,000 / volumeFactor (kg). For 6000, 1 CBM ≈ 167 kg.
      let billingVolume = totalVolumeCbm;
      
      // Note: We use 100 as a threshold to ensure we don't divide by small number if volumeFactor was set to 1 by mistake.
      // Standard factors are 6000, 7000 etc.
      if (config.volumeFactor && config.volumeFactor > 100) { 
         const densityRatio = 1000000 / config.volumeFactor; // e.g., 166.67 kg/m3 for 6000
         const weightBasedVolume = totalActualWeight / densityRatio;
         billingVolume = Math.max(billingVolume, weightBasedVolume);
      }

      billingVolume = Math.max(billingVolume, pricing.minVolume);
      
      // Use <= for maxVolume check to support inclusive upper bounds (e.g., (0, 3] includes 3).
      const tier = pricing.tiers.find(t => billingVolume <= t.maxVolume);
      
      let price = 0;
      if (tier) {
         price = billingVolume * tier.pricePerCbm;
      } else {
         // Fallback to last tier if exceeds all maxVolumes (should be caught by Infinity in last tier)
         const lastTier = pricing.tiers[pricing.tiers.length - 1];
         price = billingVolume * lastTier.pricePerCbm;
      }
      if (price < pricing.minPrice) price = pricing.minPrice;

      return { ...baseResult, chargeableWeight: billingVolume, totalPrice: price };
    };

    const jdRules = resolvedRegion ? resolvedRegion.jd : null;
    const kyeRules = resolvedRegion ? resolvedRegion.kye : null;
    const kyeGroundRules = resolvedRegion ? resolvedRegion.kyeGround : null;
    const kyeProvinceRules = resolvedRegion ? resolvedRegion.kyeProvince : null;

    return { 
      jdResult: calculateWeightBased(jdConfig, jdRules),
      kyeResult: calculateWeightBased(kyeConfig, kyeRules),
      kyeGroundResult: calculateVolumeBased(kyeGroundConfig, kyeGroundRules),
      kyeProvinceResult: calculateVolumeBased(kyeProvinceConfig, kyeProvinceRules)
    };
  }, [cart, jdConfig, kyeConfig, kyeGroundConfig, kyeProvinceConfig, resolvedRegion]);

  const isValidSku = PRODUCT_DATABASE.some(p => p.sku === selectedSku);

  const getCheapestCarrier = (results: { jdResult: CalculationResult, kyeResult: CalculationResult, kyeGroundResult: CalculationResult, kyeProvinceResult: CalculationResult } | null) => {
    if (!results) return null;
    const candidates = [results.jdResult, results.kyeResult, results.kyeGroundResult, results.kyeProvinceResult].filter(r => !r.error);
    if (candidates.length === 0) return null;
    return candidates.reduce((prev, curr) => prev.totalPrice < curr.totalPrice ? prev : curr).carrier;
  };
  
  const cheapestCarrier = calculations ? getCheapestCarrier(calculations) : null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-gray-900">
      <HistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        records={history}
        onLoad={handleLoadHistory}
        onDelete={handleDeleteHistory}
      />

      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
             </div>
             <div>
               <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-none">WHB运费比价助手</h1>
               <div className="flex items-center gap-2 mt-1.5">
                 <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">上海发货</span>
                 <span className="text-xs text-gray-400">|</span>
                 <p className="text-xs text-gray-500">京东标快 / 跨越隔日达 / 陆运 / 省内次日</p>
               </div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button
               onClick={() => setIsHistoryOpen(true)}
               className="group relative inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border border-gray-200 hover:border-indigo-100 shadow-sm transition-all"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               历史记录
             </button>
             {cart.length > 0 && (
               <button 
                 onClick={() => setCart([])}
                 className="inline-flex items-center justify-center rounded-lg border border-transparent bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
               >
                 清空
               </button>
             )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs & Cart (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unified Input Card */}
            <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
               <div className="p-6 space-y-8">
                  
                  {/* Region */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                       <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                       </span>
                       收货目的地
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        list="region-options"
                        value={regionInput}
                        onChange={(e) => setRegionInput(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        placeholder="输入城市名或选择 (如 苏州)"
                        className="block w-full rounded-xl border-0 py-3.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-sm transition-all"
                      />
                      <datalist id="region-options">
                        {REGIONS.map(region => (
                          <option key={region.id} value={region.name} />
                        ))}
                      </datalist>
                    </div>
                    {/* Region Status */}
                    <div className="mt-2 min-h-[1.5rem]">
                       {selectedRegionDesc ? (
                        <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                          <span><span className="font-semibold text-gray-700">覆盖范围：</span>{selectedRegionDesc}</span>
                        </div>
                       ) : (!resolvedRegion && regionInput ? (
                        <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                           未找到匹配区域，请检查输入
                        </p>
                       ) : null)}
                    </div>
                  </div>

                  {/* Product */}
                  <div className="pt-6 border-t border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                       <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                       </span>
                       添加货物
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                      <div className="w-full sm:flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">产品型号 / 货号</label>
                        <div className="relative">
                          <input
                            id="sku-input"
                            list="sku-options"
                            value={selectedSku}
                            onChange={handleSkuChange}
                            placeholder="如 WHB-96"
                            className="block w-full rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-sm"
                          />
                          <datalist id="sku-options">
                            {PRODUCT_DATABASE.map(p => (
                              <option key={p.sku} value={p.sku}>
                                {p.name} ({p.length}x{p.width}x{p.height}cm, {p.weight}kg)
                              </option>
                            ))}
                          </datalist>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                             {isValidSku ? (
                               <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                             ) : selectedSku.length > 0 && (
                               <svg className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                             )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full sm:w-28">
                        <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">箱数</label>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="block w-full rounded-xl border-0 py-3 px-3 text-center text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-sm"
                        />
                      </div>

                      <button
                        onClick={handleAddItem}
                        disabled={!isValidSku || Number(quantity) <= 0}
                        className="w-full sm:w-auto flex-shrink-0 inline-flex justify-center items-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        添加
                      </button>
                    </div>
                  </div>
               </div>
            </section>

             {/* AI Smart Add Card */}
             <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-white shadow-sm ring-1 ring-indigo-100 group transition-all hover:shadow-md">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>
               
               <div className="p-6 relative z-10">
                 <div className="flex items-center justify-between mb-4">
                   <h2 className="text-sm font-semibold text-indigo-900 flex items-center gap-2">
                     <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 shadow-sm">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                     </span>
                     智能识别 (AI)
                   </h2>
                   <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-200">
                        图片/文本/地址
                      </span>
                   </div>
                 </div>
                 
                 <div className="relative rounded-xl border border-indigo-200 bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 overflow-hidden transition-all" onPaste={handlePaste}>
                   <textarea
                     rows={pastedImage ? 2 : 3}
                     className="block w-full py-3 px-4 text-sm text-gray-900 placeholder:text-gray-400 border-none focus:ring-0 resize-none bg-transparent"
                     placeholder="自动提取：货号、箱数及收货城市 (Ctrl+V)..."
                     value={aiInput}
                     onChange={(e) => setAiInput(e.target.value)}
                   />
                   
                   {/* Image Preview Area */}
                   {pastedImage && (
                     <div className="px-4 pb-3 flex items-start gap-3 bg-gray-50/50 pt-2 border-t border-gray-100">
                        <div className="relative group/img">
                           <img src={pastedImage} alt="Pasted" className="h-16 w-auto rounded-lg border border-gray-200 shadow-sm object-cover" />
                           <button 
                             onClick={handleClearImage}
                             className="absolute -top-2 -right-2 bg-white text-gray-500 hover:text-red-500 rounded-full p-0.5 shadow-md border border-gray-100 opacity-0 group-hover/img:opacity-100 transition-opacity"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                             </svg>
                           </button>
                        </div>
                        <div className="flex-1 min-w-0 flex items-center">
                           <p className="text-xs text-gray-500 truncate">已粘贴图片，点击"识别"开始分析...</p>
                        </div>
                     </div>
                   )}
                   
                   <div className="absolute bottom-2 right-2">
                      <button
                        onClick={handleSmartAdd}
                        disabled={isAiLoading || (!aiInput.trim() && !pastedImage)}
                        className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {isAiLoading ? (
                          <>
                              <svg className="animate-spin -ml-0.5 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                              识别中...
                          </>
                        ) : (
                          <>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 5a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1V8a1 1 0 011-1zm5-5a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H9a1 1 0 110-2h1V3a1 1 0 011-1z" clipRule="evenodd" /></svg>
                             识别并添加
                          </>
                        )}
                      </button>
                   </div>
                 </div>
                 {aiError && (
                   <div className={`mt-3 flex items-center gap-2 text-xs p-2 rounded-lg border ${aiError.includes('成功') || aiError.includes('已识别') ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                     {aiError.includes('成功') || aiError.includes('已识别') ? (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                     ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                     )}
                     {aiError}
                   </div>
                 )}
               </div>
            </section>

            {/* Cart List */}
            <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 flex flex-col h-[400px]">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                   货物清单
                </h2>
                <div className="flex items-center gap-2">
                   <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                     共 {cart.length} 项
                   </span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 space-y-4">
                    <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                       </svg>
                    </div>
                    <p className="text-sm">暂无货物，请在上方添加</p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-white sticky top-0 z-10 shadow-sm">
                      <tr>
                        <th scope="col" className="pl-4 pr-2 py-3 text-left text-xs font-semibold text-gray-500 tracking-wider">货号/品名</th>
                        <th scope="col" className="px-2 py-3 text-left text-xs font-semibold text-gray-500 tracking-wider">规格 (cm/kg)</th>
                        <th scope="col" className="px-2 py-3 text-center text-xs font-semibold text-gray-500 tracking-wider">数量</th>
                        <th scope="col" className="relative pl-2 pr-4 py-3"><span className="sr-only">操作</span></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                      {cart.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                          <td className="pl-4 pr-2 py-3">
                            <div className="flex flex-col max-w-[200px] sm:max-w-none">
                              <span className="text-sm font-semibold text-gray-900 break-words">{item.sku}</span>
                              <span className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-2 py-3 text-xs text-gray-500 font-mono whitespace-nowrap">
                            <div>{item.length}×{item.width}×{item.height}</div>
                            <div className="text-gray-400 mt-0.5">{item.weight} kg</div>
                          </td>
                          <td className="px-2 py-3 text-center">
                              <input 
                                type="number" 
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                   const val = parseInt(e.target.value);
                                   if (!isNaN(val) && val > 0) handleUpdateQuantity(item.id, val);
                                }}
                                className="block w-14 mx-auto rounded-md border-0 py-1 px-1 text-center text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm"
                              />
                          </td>
                          <td className="pl-2 pr-4 py-3 text-right">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Results (5 columns) */}
          <div className="lg:col-span-5">
             <div className="sticky top-28 space-y-6">
                
                <div className="flex items-end justify-between px-1">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">运费预估</h2>
                    <p className="text-xs text-gray-500 mt-1">基于当前市场价格实时计算</p>
                  </div>
                  {cart.length > 0 && calculations && (
                    <button
                      onClick={handleSaveHistory}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm ${showSaveSuccess ? 'bg-green-100 text-green-700 ring-1 ring-green-600/20' : 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50'}`}
                    >
                      {showSaveSuccess ? (
                         <>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                           已保存
                         </>
                      ) : (
                         <>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" /></svg>
                           保存结果
                         </>
                      )}
                    </button>
                  )}
                </div>
                
                {!calculations ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 border-dashed p-10 text-center">
                    <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">暂无数据</h3>
                    <p className="text-sm text-gray-500 mt-1">请先在左侧添加货物<br/>系统将自动计算运费对比</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ComparisonCard 
                      result={calculations.jdResult} 
                      config={jdConfig} 
                      isCheapest={cheapestCarrier === 'JD'} 
                    />
                    
                    <ComparisonCard 
                      result={calculations.kyeResult} 
                      config={kyeConfig} 
                      isCheapest={cheapestCarrier === 'KYE'} 
                    />

                    <ComparisonCard 
                      result={calculations.kyeGroundResult} 
                      config={kyeGroundConfig} 
                      isCheapest={cheapestCarrier === 'KYE_GROUND'} 
                    />
                    
                    <ComparisonCard 
                      result={calculations.kyeProvinceResult} 
                      config={kyeProvinceConfig} 
                      isCheapest={cheapestCarrier === 'KYE_PROVINCE'} 
                    />

                    {/* Disclaimer */}
                    <div className="bg-yellow-50/50 rounded-xl p-4 border border-yellow-100 mt-6">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg className="h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-yellow-800 uppercase tracking-wide">规则说明</h4>
                          <div className="mt-1 text-xs text-yellow-700 leading-relaxed space-y-1">
                            <p>
                              1. <strong>京东标快：</strong> 首重1KG，不足1KG按1KG计算。续重以<strong>0.5KG</strong>为单位，不足0.5KG按0.5KG计算。运费结果<strong>四舍五入取整</strong>。
                            </p>
                            <p>
                              2. <strong>京东体积：</strong> 体积重量 = 长×宽×高 ÷ <strong>8000</strong>，取实际重量与体积重量较大值。
                            </p>
                            <p>
                              3. <strong>跨越速运：</strong> 陆运及省内次日按方收费，计费重量取体积重量(÷6000)与实际重量较大值。
                            </p>
                            <p>
                              4. 此价格为预估参考价，不含保价、包装及偏远附加费等，实际以物流账单为准。
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
