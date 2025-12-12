export interface Product {
  sku: string;
  name: string;
  length: number; // cm
  width: number;  // cm
  height: number; // cm
  weight: number; // kg per box
}

export interface CartItem extends Product {
  id: string; // unique id for list rendering
  quantity: number;
}

export interface PricingTier {
  max: number; // Upper bound of this tier (e.g., 30 for 1-30kg)
  price: number; // Price per kg in this tier
}

export interface PricingRule {
  basePrice: number;     // Starting price (首重)
  baseWeight: number;    // Weight included in base price (kg)
  
  // Legacy support for simple 2-tier logic (JD)
  unitPrice?: number;    
  unitPrice2?: number;   

  // New support for multi-tier incremental logic (KYE)
  tiers?: PricingTier[]; 
  
  minPrice?: number;     // Minimum total charge per shipment (最低一票收费)
  minWeight?: number;    // Minimum chargeable weight
}

export interface VolumePricingRule {
  minVolume: number; // Minimum volume in m3 (e.g., 0.5)
  minPrice: number;  // Minimum total charge
  tiers: {
    maxVolume: number; // Upper bound of tier (e.g., 3, 10, Infinity)
    pricePerCbm: number; // Price per m3
  }[];
}

export interface Region {
  id: string;
  name: string;
  description?: string; 
  jd: PricingRule;
  kye: PricingRule | null; // Null if service not available
  kyeGround?: VolumePricingRule | null; // Volume based ground shipping
  kyeProvince?: VolumePricingRule | null; // New: Intra-province Next Day (Volume based)
}

export interface ShippingConfig {
  name: string;
  code: 'JD' | 'KYE' | 'KYE_GROUND' | 'KYE_PROVINCE';
  volumeFactor: number;  
  discount?: number;     
}

export interface CalculationResult {
  carrier: 'JD' | 'KYE' | 'KYE_GROUND' | 'KYE_PROVINCE';
  totalWeight: number;    
  volumetricWeight: number;
  totalVolumeM3?: number; // Real volume in m3
  chargeableWeight: number; // Or chargeable volume if pricingUnit is M3
  pricingUnit: 'KG' | 'M3';
  totalPrice: number;
  regionName: string;
  error?: string; // For cases where pricing is unavailable
}

export interface SmartParseResult {
  sku: string;
  quantity: number;
}

export interface HistoryRecord {
  id: string;
  timestamp: number;
  regionId: string;
  regionName: string;
  items: CartItem[];
  note?: string; // Optional user note or auto-generated summary
}