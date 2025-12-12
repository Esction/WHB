import React from 'react';
import { CalculationResult, ShippingConfig } from '../types';

interface ComparisonCardProps {
  result: CalculationResult;
  config: ShippingConfig;
  isCheapest: boolean;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ result, config, isCheapest }) => {
  const isJD = result.carrier === 'JD';
  const isKyeGround = result.carrier === 'KYE_GROUND';
  const isKyeProvince = result.carrier === 'KYE_PROVINCE';
  const isKyeAir = result.carrier === 'KYE';

  // Branding Colors
  const brandColor = isJD ? 'text-red-600' : 'text-purple-700';
  const brandBg = isJD ? 'bg-red-50' : 'bg-purple-50';
  const brandBorder = isJD ? 'border-red-100' : 'border-purple-100';

  if (result.error) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 opacity-75">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">{config.name}</span>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">不可用</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">该线路暂无报价或不在服务范围</p>
      </div>
    );
  }

  return (
    <div className={`relative group transition-all duration-300 ${isCheapest ? 'transform scale-[1.02]' : ''}`}>
      <div 
        className={`
          relative overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-all hover:shadow-md
          ${isCheapest ? (isJD ? 'border-red-500 ring-4 ring-red-500/10' : 'border-purple-600 ring-4 ring-purple-600/10') : 'border-gray-100 hover:border-gray-300'}
        `}
      >
        {/* Recommended Badge */}
        {isCheapest && (
          <div className={`absolute top-0 right-0 rounded-bl-xl px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${isJD ? 'bg-red-500' : 'bg-purple-600'}`}>
             最低价格
          </div>
        )}

        <div className="flex items-stretch">
          {/* Left: Carrier Info & Tags */}
          <div className="flex-1 p-5 pr-0 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-bold text-gray-900 ${isCheapest ? 'text-lg' : 'text-base'}`}>
                  {isJD ? '京东标快' : (isKyeGround ? '跨越陆运' : (isKyeProvince ? '省内次日' : '跨越隔日'))}
                </h3>
             </div>
             <div className="flex flex-wrap gap-1.5 mt-1">
               {isKyeGround && <span className="inline-flex items-center rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-medium text-teal-700 ring-1 ring-inset ring-teal-600/20">按方计费</span>}
               {isKyeProvince && <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">省内特惠</span>}
               {!isKyeGround && !isKyeProvince && <span className="inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">按重计费</span>}
             </div>
          </div>

          {/* Right: Price */}
          <div className={`flex flex-col justify-center items-end px-5 py-4 min-w-[120px] ${brandBg} border-l ${brandBorder}`}>
             <span className={`text-xs font-semibold ${brandColor} opacity-80 uppercase tracking-wide`}>预估运费</span>
             <div className="flex items-baseline gap-0.5 mt-0.5">
               <span className={`text-sm font-bold ${brandColor}`}>¥</span>
               <span className={`text-3xl font-black tracking-tight ${brandColor}`}>{result.totalPrice.toFixed(0)}</span>
               <span className={`text-lg font-bold ${brandColor}`}>{result.totalPrice.toFixed(2).substring(result.totalPrice.toFixed(2).indexOf('.'))}</span>
             </div>
          </div>
        </div>

        {/* Details Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
           {result.pricingUnit === 'M3' ? (
              <div className="flex gap-4">
                 <div>
                   <span className="text-gray-400 mr-1">体积:</span>
                   <span className="font-medium text-gray-700">{result.totalVolumeM3?.toFixed(3)} m³</span>
                 </div>
                 <div>
                   <span className="text-gray-400 mr-1">计费:</span>
                   <span className="font-semibold text-gray-900">{Math.max(result.totalVolumeM3 || 0, 0.5).toFixed(2)} m³</span>
                 </div>
              </div>
           ) : (
              <div className="flex gap-4">
                 <div>
                   <span className="text-gray-400 mr-1">实重:</span>
                   <span className="font-medium text-gray-700">{result.totalWeight.toFixed(1)}kg</span>
                 </div>
                 <div>
                   <span className="text-gray-400 mr-1">抛重:</span>
                   <span className="font-medium text-gray-700">{result.volumetricWeight.toFixed(1)}kg</span>
                 </div>
                 <div>
                   <span className="text-gray-400 mr-1">计费:</span>
                   <span className="font-semibold text-gray-900">{result.chargeableWeight.toFixed(1)}kg</span>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};