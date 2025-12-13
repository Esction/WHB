import { Product, ShippingConfig, Region, PricingRule } from './types';

// Mock Database of Products
export const PRODUCT_DATABASE: Product[] = [
  { sku: 'WHB-35', name: 'TC处理透明35mm细胞培养皿, 易握边, 灭菌', length: 43, width: 22, height: 13, weight: 2.1 },
  { sku: 'WHB-60', name: 'TC处理透明60mm细胞培养皿, 易握边, 灭菌', length: 68.8, width: 34.5, height: 18, weight: 5.2 },
  { sku: 'WHB-100', name: 'TC处理透明100mm细胞培养皿, 易握边, 灭菌', length: 49.4, width: 40.5, height: 23.5, weight: 5.1 },
  { sku: 'WHB-150', name: 'TC处理透明150mm细胞培养皿, 易握边, 灭菌', length: 48.5, width: 32.5, height: 30, weight: 5.6 },
  { sku: 'WHB-35-PD1', name: '透明35mm微生物培养皿, 易握边, 灭菌', length: 43, width: 22, height: 13, weight: 2.1 },
  { sku: 'WHB-60-PD1', name: '透明60mm微生物培养皿, 易握边, 灭菌', length: 68.8, width: 34.5, height: 18, weight: 5.2 },
  { sku: 'WHB-100-PD1', name: '透明100mm微生物培养皿, 易握边, 灭菌', length: 49.4, width: 40.5, height: 23.5, weight: 5.1 },
  { sku: 'WHB-150-PD1', name: '透明150mm微生物培养皿, 易握边, 灭菌', length: 48.5, width: 32.5, height: 30, weight: 5.6 },
  { sku: 'WHB-PD3', name: '90mm培养皿, 高15mm（微生物培养皿）, 灭菌', length: 50, width: 50.5, height: 32.5, weight: 8.9 },
  { sku: 'WHB-96CB-W', name: 'TC处理白色底透96孔板, 吸塑盒, 灭菌', length: 39.5, width: 17.5, height: 12, weight: 1.4 },
  { sku: 'WHB-96CB-B', name: 'TC处理黑色底透96孔板, 吸塑盒, 灭菌', length: 39.5, width: 17.5, height: 12, weight: 1.4 },
  { sku: 'WHB-96CB-W1', name: '未TC处理白色底透96孔板, 吸塑盒, 灭菌', length: 39.5, width: 17.5, height: 12, weight: 1.4 },
  { sku: 'WHB-96CB-B1', name: '未TC处理黑色底透96孔板, 吸塑盒, 灭菌', length: 39.5, width: 17.5, height: 12, weight: 1.4 },
  { sku: 'WHB-96-01', name: 'TC处理白底全白盖96孔平底板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4.4 },
  { sku: 'WHB-96-02', name: 'TC处理黑底全黑盖96孔平底板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4.4 },
  { sku: 'WHB-96-03', name: 'TC处理白底透明盖96孔平底板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4.4 },
  { sku: 'WHB-96-04', name: 'TC处理黑底透明盖96孔平底板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4.4 },
  { sku: 'WHB-6', name: 'TC处理透明6孔细胞培养板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 3.6 },
  { sku: 'WHB-12', name: 'TC处理透明12孔细胞培养板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 3.9 },
  { sku: 'WHB-24', name: 'TC处理透明24孔细胞培养板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4.2 },
  { sku: 'WHB-48', name: 'TC处理透明48孔细胞培养板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4.3 },
  { sku: 'WHB-96', name: 'TC处理透明96孔细胞培养板, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4.1 },
  { sku: 'WHB-96-U1', name: 'TC处理透明96孔培养板, U底, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4 },
  { sku: 'WHB-96-V1', name: 'TC处理透明96孔培养板, V底, 吸塑盒, 灭菌', length: 53, width: 29.6, height: 18.6, weight: 4 },
  { sku: 'WHB-96-PD1', name: '透明96孔培养板, 平底袋装, 灭菌', length: 54, width: 26.5, height: 18.5, weight: 3.6 },
  { sku: 'WHB-96U-PD1', name: '透明96孔培养板, 圆底袋装, 灭菌', length: 54, width: 26.5, height: 18.5, weight: 3.6 },
  { sku: 'WHB-96-EP', name: '透明平底96孔板, 酶标板, 袋装, 未处理, 灭菌', length: 54, width: 26.5, height: 18.5, weight: 3.6 },
  { sku: 'WHB-CCF10', name: 'TC处理四合一10cm²细胞培养管, 密封盖, 灭菌', length: 39.5, width: 17.5, height: 12, weight: 0.85 },
  { sku: 'WHB-CCF10-1', name: 'TC处理四合一10cm²细胞培养管, 透气盖, 灭菌', length: 39.5, width: 17.5, height: 12, weight: 0.85 },
  { sku: 'WHB-CCF25-G', name: 'TC处理25cm²细胞培养瓶, 50ml, 密封盖, 盖子带硅胶圈', length: 54, width: 33.5, height: 26, weight: 5.8 },
  { sku: 'WHB-CCF25-1-G', name: 'TC处理25cm²细胞培养瓶, 50ml, 透气盖, 盖子带硅胶圈', length: 54, width: 33.5, height: 26, weight: 5.8 },
  { sku: 'WHB-CCF25', name: 'TC处理25cm²贴壁细胞培养瓶, 50ml, 密封盖, 灭菌', length: 54, width: 33.5, height: 26, weight: 5.8 },
  { sku: 'WHB-CCF25-1', name: 'TC处理25cm²贴壁细胞培养瓶, 50ml, 透气盖, 灭菌', length: 54, width: 33.5, height: 26, weight: 5.8 },
  { sku: 'WHB-CCF75', name: 'TC处理75cm²贴壁细胞培养瓶, 250ml, 密封盖, 灭菌', length: 45.5, width: 42.5, height: 39.3, weight: 7.7 },
  { sku: 'WHB-CCF75-1', name: 'TC处理75cm²贴壁细胞培养瓶, 250ml, 透气盖, 灭菌', length: 45.5, width: 42.5, height: 39.3, weight: 7.7 },
  { sku: 'WHB-CCF150', name: 'TC处理150cm²贴壁细胞培养瓶, 600ml, 密封盖, 灭菌', length: 66, width: 51, height: 26.5, weight: 8.15 },
  { sku: 'WHB-CCF150-1', name: 'TC处理150cm²贴壁细胞培养瓶, 600ml, 透气盖, 灭菌', length: 66, width: 51, height: 26.5, weight: 8.15 },
  { sku: 'WHB-CCF300', name: 'TC处理300cm²贴壁细胞培养瓶, 800ml, 密封盖, 灭菌', length: 59.5, width: 37, height: 30, weight: 4.95 },
  { sku: 'WHB-CCF300-1', name: 'TC处理300cm²贴壁细胞培养瓶, 800ml, 透气盖, 灭菌', length: 59.5, width: 37, height: 30, weight: 4.95 },
  { sku: 'WHB-CCF25-SC', name: '25cm²悬浮细胞培养瓶, 50ml, 密封盖, 未TC, 灭菌', length: 54, width: 33.5, height: 26, weight: 5.8 },
  { sku: 'WHB-CCF25-SC-1', name: '25cm²悬浮细胞培养瓶, 50ml, 透气盖, 未TC, 灭菌', length: 54, width: 33.5, height: 26, weight: 5.8 },
  { sku: 'WHB-CCF75-SC', name: '75cm²悬浮细胞培养瓶, 250ml, 密封盖, 未TC, 灭菌', length: 45.5, width: 42.5, height: 39.3, weight: 7.7 },
  { sku: 'WHB-CCF75-SC-1', name: '75cm²悬浮细胞培养瓶, 250ml, 透气盖, 未TC, 灭菌', length: 45.5, width: 42.5, height: 39.3, weight: 7.7 },
  { sku: 'WHB-CCF150-SC', name: '150cm²悬浮细胞培养瓶, 600ml, 密封盖, 未TC, 灭菌', length: 66, width: 51, height: 26.5, weight: 8.15 },
  { sku: 'WHB-CCF150-SC-1', name: '150cm²悬浮细胞培养瓶, 600ml, 透气盖, 未TC, 灭菌', length: 66, width: 51, height: 26.5, weight: 8.15 },
  { sku: 'WHB-CCF300-SC', name: '300cm²悬浮细胞培养瓶, 800ml, 密封盖, 未TC, 灭菌', length: 59.5, width: 37, height: 30, weight: 4.95 },
  { sku: 'WHB-CCF300-SC-1', name: '300cm²悬浮细胞培养瓶, 800ml, 透气盖, 未TC, 灭菌', length: 59.5, width: 37, height: 30, weight: 4.95 },
  { sku: 'WHB-5UM-S', name: '可叠加式5um细胞过滤器, 600目, 紫色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-10UM-S', name: '可叠加式10um细胞过滤器, 500目, 绿色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-20UM-S', name: '可叠加式20um细胞过滤器, 400目, 红色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-40UM-S', name: '可叠加式40um细胞过滤器, 300目, 蓝色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-70UM-S', name: '可叠加式70um细胞滤网, 200目, 白色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-100UM-S', name: '可叠加式100um细胞筛网, 160目, 黄色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-200UM-S', name: '可叠加式200um细胞过滤器, 80目, 天蓝色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-300UM-S', name: '可叠加式300um细胞过滤器, 55目, 橙色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-420UM-S', name: '可叠加式420um细胞过滤器, 40目, 粉色, 吸塑盒', length: 39.5, width: 17.5, height: 12, weight: 0.75 },
  { sku: 'WHB-40UM', name: '40um细胞过滤器, 300目, 紫色, 纸塑袋装, 灭菌', length: 29.5, width: 23.5, height: 14.5, weight: 0.6 },
  { sku: 'WHB-70UM', name: '70um细胞过滤器, 200目, 白色, 纸塑袋装, 灭菌', length: 29.5, width: 23.5, height: 14.5, weight: 0.6 },
  { sku: 'WHB-100UM', name: '100um细胞过滤器, 160目, 黄色, 纸塑袋装, 灭菌', length: 29.5, width: 23.5, height: 14.5, weight: 0.6 },
  { sku: 'WHB-G23', name: '旋转式细胞刮刀, 柄长23cm, 纸塑袋装, 灭菌', length: 35.5, width: 34.1, height: 36.8, weight: 5.4 },
  { sku: 'WHB-G29', name: '旋转式细胞刮刀, 柄长29cm, 纸塑袋装, 灭菌', length: 0, width: 0, height: 0, weight: 7.4 },
  { sku: 'WHB-C21', name: '双头细胞铲刀, 柄长21cm, 纸塑袋装, 灭菌', length: 35.4, width: 31.2, height: 27.5, weight: 5.8 },
  { sku: 'WHB-15-FB', name: '15mL离心管冻存盒, 可放置25个15mL试管, 耐低温-86℃', length: 45.5, width: 30.5, height: 27, weight: 4.8 },
  { sku: 'WHB-50-FB', name: '50mL离心管冻存盒, 可放置9个50mL和4个15mL试管', length: 45.5, width: 30.5, height: 27, weight: 4.85 },
  { sku: 'WHB-15-PF', name: '15ml锥底离心管（袋装）, 牡丹花款, 灭菌', length: 40, width: 26.8, height: 34, weight: 4.45 },
  { sku: 'WHB-50-PF', name: '50m锥底离心管（袋装）, 牡丹花款, 灭菌', length: 55, width: 33, height: 47, weight: 8.1 },
  { sku: 'WHB-15-1', name: '15ml锥底离心管（袋装）, 经典款, 灭菌', length: 40, width: 26.8, height: 34, weight: 4.3 },
  { sku: 'WHB-25-1', name: '25ml锥底离心管（袋装）, 经典款, 灭菌', length: 60, width: 43, height: 30, weight: 6.6 },
  { sku: 'WHB-50-1', name: '50ml锥底离心管（袋装）, 经典款, 灭菌', length: 55, width: 33, height: 47, weight: 8.4 },
  { sku: 'WHB-15-3', name: '15ml自立式离心管（袋装）, 经典款, 灭菌', length: 40, width: 26.8, height: 34, weight: 4.45 },
  { sku: 'WHB-25-3', name: '25ml自立式离心管（袋装）, 经典款, 灭菌', length: 60, width: 43, height: 30, weight: 6.6 },
  { sku: 'WHB-50-3', name: '50ml自立式离心管（袋装）, 经典款, 灭菌', length: 55, width: 33, height: 47, weight: 9.1 },
  { sku: 'WHB-15-1M', name: '15ml锥底离心管（袋装）, 马卡龙款, 灭菌', length: 40, width: 26.8, height: 34, weight: 4.2 },
  { sku: 'WHB-25-1M', name: '25ml锥底离心管（袋装）, 马卡龙款, 灭菌', length: 60, width: 43, height: 30, weight: 6.6 },
  { sku: 'WHB-50-1M', name: '50ml锥底离心管（袋装）, 马卡龙款, 灭菌', length: 55, width: 33, height: 47, weight: 8.4 },
  { sku: 'WHB-CT12', name: '1.5ml微量离心管, 防爆连盖, 锥底', length: 72, width: 25, height: 30.3, weight: 7.1 },
  { sku: 'WHB-CT13', name: '2.0ml微量离心管, 防爆连盖, 圆底', length: 72, width: 25, height: 30.3, weight: 7.4 },
  { sku: 'WHB-PCR-0208', name: '0.2ml PCR八排管（带荧光定量专用平盖）', length: 72, width: 25, height: 30.3, weight: 3.9 },
  { sku: 'WHB-PCR-0208-1', name: '0.2ml PCR八排管（经典款）', length: 72, width: 25, height: 30.3, weight: 3.9 },
  { sku: 'WHB-5', name: '5ml血清移液管, 纸塑袋装, 灭菌', length: 60.5, width: 42, height: 39.8, weight: 15.35 },
  { sku: 'WHB-10', name: '10ml血清移液管, 纸塑袋装, 灭菌', length: 60.5, width: 42, height: 39.8, weight: 18.25 },
  { sku: 'WHB-25', name: '25ml血清移液管, 纸塑袋装, 灭菌', length: 60.5, width: 42, height: 39.8, weight: 13.15 },
  { sku: 'WHB-50SP', name: '50ml血清移液管, 纸塑袋装, 灭菌', length: 60.5, width: 42, height: 39.8, weight: 14.4 },
  { sku: 'WHB-S4', name: '3ml巴氏吸管, 纸塑袋装, 加长款, 灭菌', length: 50, width: 42.5, height: 51.5, weight: 8.45 },
  { sku: 'WHB-S5', name: '5ml巴氏吸管, 纸塑袋装, 加长款, 灭菌', length: 40.5, width: 58.5, height: 46, weight: 7 },
  { sku: 'WHB-RES-200', name: '200ul电泳加样吸头, 袋装', length: 72, width: 25, height: 30.3, weight: 5.2 },
  { sku: 'WHB-MB30', name: '30ml 方形培养基瓶, 灭菌', length: 22, width: 33, height: 47, weight: 4.8 },
  { sku: 'WHB-MB50', name: '50ml 三角形培养基瓶, 灭菌', length: 32, width: 26, height: 24.5, weight: 4.05 },
  { sku: 'WHB-MB60', name: '60ml 方形培养基瓶, 灭菌', length: 31.6, width: 26.5, height: 23.5, weight: 3 },
  { sku: 'WHB-MB125', name: '125ml 方形培养基瓶, 灭菌', length: 56.5, width: 29, height: 24, weight: 5.45 },
  { sku: 'WHB-MB250', name: '250ml 方形培养基瓶, 灭菌', length: 38, width: 33, height: 34, weight: 4.15 },
  { sku: 'WHB-MB500', name: '500ml 方形培养基瓶, 灭菌', length: 49, width: 39, height: 34, weight: 5.2 },
  { sku: 'WHB-MB1000', name: '1000ml 方形培养基瓶, 灭菌', length: 40.5, width: 58.5, height: 46, weight: 6.5 },
  { sku: 'WHB-MB500-X', name: '500ml 斜口方形培养基瓶, 灭菌', length: 52, width: 40, height: 38, weight: 6.05 },
  { sku: 'WHB-MB100-X', name: '100ml 大口方形培养基瓶, 灭菌', length: 56.5, width: 29, height: 24, weight: 5.6 },
  { sku: 'WHB-C1-187', name: '1ml圆底细胞冻存管, 外旋盖, 透明, 耐低温', length: 33.23, width: 5, height: 26, weight: 2.55 },
  { sku: 'WHB-C1-187-1', name: '1ml自立式细胞冻存管, 外旋盖, 透明, 耐低温', length: 33.23, width: 5, height: 26, weight: 2.55 },
  { sku: 'WHB-C2-187', name: '2ml圆底细胞冻存管, 外旋盖, 透明, 耐低温', length: 33.23, width: 5, height: 26, weight: 2.7 },
  { sku: 'WHB-C2-187-1', name: '2ml自立式细胞冻存管, 外旋盖, 透明, 耐低温', length: 33.23, width: 5, height: 26, weight: 2.7 },
  { sku: 'WHB-C5-187', name: '5ml圆底细胞冻存管, 外旋盖, 透明, 耐低温', length: 33.23, width: 5, height: 26, weight: 4.5 },
  { sku: 'WHB-C5-187-1', name: '5ml自立式细胞冻存管, 外旋盖, 透明, 耐低温', length: 33.23, width: 5, height: 26, weight: 4.5 }
];

export const DEFAULT_JD_CONFIG: ShippingConfig = {
  name: '京东物流 (JD)',
  code: 'JD',
  // Volume factor updated to 8000
  volumeFactor: 8000,
};

export const DEFAULT_KYE_CONFIG: ShippingConfig = {
  name: '跨越速运 (KYE) 隔日达',
  code: 'KYE',
  volumeFactor: 6000,
};

export const DEFAULT_KYE_GROUND_CONFIG: ShippingConfig = {
  name: '跨越速运 (KYE) 陆运件',
  code: 'KYE_GROUND',
  // Updated to 6000 to enable density check: Billing Weight = Max(Real Weight, Volumetric Weight)
  volumeFactor: 6000, 
};

export const DEFAULT_KYE_PROVINCE_CONFIG: ShippingConfig = {
  name: '跨越速运 (KYE) 省内次日',
  code: 'KYE_PROVINCE',
  volumeFactor: 7000, 
};

export const DEFAULT_HUOLALA_CONFIG: ShippingConfig = {
  name: '货拉拉 (Huolala)',
  code: 'HUOLALA',
  volumeFactor: 1, // Not used for weight calc, volume only
};

// Huolala Vehicle Definitions
// Shanghai Pricing Rules (Origin: Fengxian)
export const HUOLALA_VEHICLES = [
  { 
    name: '小面包车', 
    maxVolume: 2.4, 
    basePrice: 30, 
    baseKm: 5, 
    tiers: [
      { start: 5, end: 10, price: 4.14 },
      { start: 10, end: 15, price: 3.53 },
      { start: 15, end: 30, price: 2.91 },
      { start: 30, end: 50, price: 2.62 },
      { start: 50, end: 100, price: 2.30 },
      { start: 100, end: 200, price: 2.15 },
      { start: 200, end: Infinity, price: 2.01 },
    ]
  },
  { 
    name: '中面包车', 
    maxVolume: 6.1, 
    basePrice: 45, 
    baseKm: 5, 
    tiers: [
      { start: 5, end: 10, price: 5.69 },
      { start: 10, end: 15, price: 4.59 },
      { start: 15, end: 30, price: 3.50 },
      { start: 30, end: 50, price: 3.02 },
      { start: 50, end: 100, price: 2.55 },
      { start: 100, end: 200, price: 2.37 },
      { start: 200, end: Infinity, price: 2.21 },
    ]
  },
  { 
    name: '小货车', 
    maxVolume: 7.2, 
    basePrice: 65, 
    baseKm: 5, 
    tiers: [
      { start: 5, end: 10, price: 7.70 },
      { start: 10, end: 15, price: 5.93 },
      { start: 15, end: 30, price: 4.16 },
      { start: 30, end: 50, price: 3.42 },
      { start: 50, end: 100, price: 2.76 },
      { start: 100, end: 200, price: 2.47 },
      { start: 200, end: Infinity, price: 2.22 },
    ]
  },
  { 
    name: '中货车', 
    maxVolume: 12.3, 
    basePrice: 100, 
    baseKm: 5, 
    tiers: [
      { start: 5, end: 10, price: 11.10 },
      { start: 10, end: 15, price: 8.13 },
      { start: 15, end: 30, price: 5.16 },
      { start: 30, end: 50, price: 3.97 },
      { start: 50, end: 100, price: 3.08 },
      { start: 100, end: 200, price: 2.64 },
      { start: 200, end: Infinity, price: 2.24 },
    ]
  }
];

// JD Standard Rates (New Structure from Image)
// Tiers Logic: [0, 30] -> unitPrice, [30, Infinity] -> unitPrice2
const JD_RATES = {
  // Row 1: 7.2 | 1.2 | 1.8
  // Shanghai, Zhejiang, Jiangsu, Anhui (Maanshan, Wuhu, Xuancheng)
  zone1: { 
    basePrice: 7.2, baseWeight: 1, 
    unitPrice: 1.2, unitPrice2: 1.8 
  },
  
  // Row 2: 7.8 | 1.2 | 1.8
  // Anhui (Rest)
  zone2: { 
    basePrice: 7.8, baseWeight: 1, 
    unitPrice: 1.2, unitPrice2: 1.8 
  },
  
  // Row 3: 9.0 | 3.0 | 3.6
  // Shandong (WeiFang, Linyi...), Hubei (Huangshi...), Fujian (Fuzhou...), Jiangxi (Jiujiang...), Henan (Zhengzhou...)
  zone3: { 
    basePrice: 9.0, baseWeight: 1, 
    unitPrice: 3.0, unitPrice2: 3.6 
  },
  
  // Row 4: 9.6 | 3.6 | 4.2
  // Tianjin, Chongqing, Shaanxi, Guizhou, Liaoning, Jilin, Hebei, Beijing, Hunan, Shanxi, Guangdong, Ningxia
  // Sichuan (Chengdu...), Inner Mongolia (Hohhot...), Henan (Hebi...), Hubei (Wuhan...), Jiangxi (Nanchang...), Guangxi (Nanning...), Shandong (Qingdao/Jinan), Fujian (Xiamen...), Gansu (Lanzhou)
  zone4: { 
    basePrice: 9.6, baseWeight: 1, 
    unitPrice: 3.6, unitPrice2: 4.2 
  },
  
  // Row 5: 10.2 | 3.6 | 4.2
  // Yunnan, Heilongjiang, Sichuan (Remote), Hainan (Remote), Gansu (Remote), Guangxi (Remote), Qinghai (Main), Inner Mongolia (Remote)
  zone5: { 
    basePrice: 10.2, baseWeight: 1, 
    unitPrice: 3.6, unitPrice2: 4.2 
  },

  // Row 6: 11.4 | 6.3 | 6.9 - Qinghai (Yushu)
  zone6: { basePrice: 11.4, baseWeight: 1, unitPrice: 6.3, unitPrice2: 6.9 },

  // Row 7: 12.0 | 4.8 | 5.4 - Xinjiang
  zone7: { basePrice: 12.0, baseWeight: 1, unitPrice: 4.8, unitPrice2: 5.4 },

  // Row 8: 13.8 | 11.1 | 11.7 - Tibet (Changdu)
  zone8: { basePrice: 13.8, baseWeight: 1, unitPrice: 11.1, unitPrice2: 11.7 },

  // Row 9: 14.4 | 7.2 | 7.8 - Tibet (Lhasa, Linzhi, etc)
  zone9: { basePrice: 14.4, baseWeight: 1, unitPrice: 7.2, unitPrice2: 7.8 },

  // Row 10: 16.8 | 10.5 | 11.1 - Hainan (Sansha)
  zone10: { basePrice: 16.8, baseWeight: 1, unitPrice: 10.5, unitPrice2: 11.1 },

  // Row 11: 17.4 | 13.8 | 14.4 - Tibet (Ali)
  zone11: { basePrice: 17.4, baseWeight: 1, unitPrice: 13.8, unitPrice2: 14.4 },
};

// Helper for Ground Pricing Construction
// p1: (0, 3], p2: (3, 10], p3: (10, +inf)
const groundRate = (minPrice: number, p1: number, p2: number, p3: number) => ({
  minVolume: 0.5,
  minPrice: minPrice,
  tiers: [
    { maxVolume: 3, pricePerCbm: p1 },
    { maxVolume: 10, pricePerCbm: p2 },
    { maxVolume: Infinity, pricePerCbm: p3 }
  ]
});

// Helper for generic KYE Air (approximate backup if needed)
const kyeAirDefault = (base: number) => ({ 
  basePrice: base, baseWeight: 1, minPrice: 30,
  tiers: [
    { max: 30, price: 3.0 }, { max: 50, price: 2.5 }, { max: 99999, price: 2.5 }
  ]
});


/**
 * REGIONS
 */
export const REGIONS: Region[] = [
  // --- SHANGHAI (Origin) ---
  { 
    id: 'shanghai', name: '上海市', jd: JD_RATES.zone1, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.5, minPrice: 63,
      tiers: [
        { maxVolume: 3, pricePerCbm: 125 },
        { maxVolume: 10, pricePerCbm: 115 },
        { maxVolume: Infinity, pricePerCbm: 105 }
      ]
    }
  }, 

  // --- JIANGSU ---
  { 
    id: 'jiangsu_sunan', name: '江苏 (苏州/无锡/常州/南京/镇江/扬州)', 
    description: "苏南及周边: 常州, 无锡, 苏州, 扬州, 南京, 镇江",
    jd: JD_RATES.zone1, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.65, minPrice: 78,
      tiers: [
        { maxVolume: 3, pricePerCbm: 120 },
        { maxVolume: 10, pricePerCbm: 110 },
        { maxVolume: Infinity, pricePerCbm: 105 }
      ]
    }
  },
  { 
    id: 'jiangsu_nantong', name: '江苏 (南通)', 
    jd: JD_RATES.zone1, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.6, minPrice: 72,
      tiers: [
        { maxVolume: 3, pricePerCbm: 120 },
        { maxVolume: 10, pricePerCbm: 110 },
        { maxVolume: Infinity, pricePerCbm: 105 }
      ]
    }
  },
  { 
    id: 'jiangsu_north', name: '江苏 (苏北 - 徐州/连云港/盐城/泰州/宿迁/淮安)', 
    description: "连云港, 徐州, 泰州, 宿迁, 淮安, 盐城",
    jd: JD_RATES.zone1, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.65, minPrice: 85,
      tiers: [
        { maxVolume: 3, pricePerCbm: 130 },
        { maxVolume: 10, pricePerCbm: 120 },
        { maxVolume: Infinity, pricePerCbm: 115 }
      ]
    }
  },

  // --- ZHEJIANG ---
  { 
    id: 'zhejiang_north', name: '浙江 (杭州/宁波/嘉兴/湖州/绍兴)', 
    description: "浙北: 嘉兴, 杭州, 湖州, 宁波, 绍兴",
    jd: JD_RATES.zone1, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.65, minPrice: 78,
      tiers: [
        { maxVolume: 3, pricePerCbm: 120 },
        { maxVolume: 10, pricePerCbm: 110 },
        { maxVolume: Infinity, pricePerCbm: 105 }
      ]
    }
  },
  { 
    id: 'zhejiang_south', name: '浙江 (温州/台州/金华/丽水/衢州/舟山)', 
    description: "浙南/浙西: 衢州, 舟山, 台州, 温州, 丽水, 金华",
    jd: JD_RATES.zone1, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.6, minPrice: 84,
      tiers: [
        { maxVolume: 3, pricePerCbm: 140 },
        { maxVolume: 10, pricePerCbm: 130 },
        { maxVolume: Infinity, pricePerCbm: 118 }
      ]
    }
  },

  // --- ANHUI ---
  { 
    id: 'anhui_wan_special', name: '安徽 (马鞍山/芜湖/宣城)', 
    jd: JD_RATES.zone1, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.6, minPrice: 84,
      tiers: [
        { maxVolume: 3, pricePerCbm: 140 },
        { maxVolume: 10, pricePerCbm: 135 },
        { maxVolume: Infinity, pricePerCbm: 115 }
      ]
    }
  },
  { 
    id: 'anhui_rest', name: '安徽 (合肥/滁州/安庆/蚌埠/阜阳等)', 
    description: "合肥, 滁州, 蚌埠, 铜陵, 池州, 阜阳, 亳州, 宿州, 淮北, 淮南, 安庆, 黄山, 六安",
    jd: JD_RATES.zone2, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.6, minPrice: 84,
      tiers: [
        { maxVolume: 3, pricePerCbm: 140 },
        { maxVolume: 10, pricePerCbm: 135 },
        { maxVolume: Infinity, pricePerCbm: 115 }
      ]
    }
  },

  // --- GUANGXI ---
  { 
    id: 'guangxi', name: '广西 (南宁/崇左)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(140, 280, 260, 240)
  },
  { 
    id: 'guangxi_liuzhou', name: '广西 (柳州/来宾/桂林)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(140, 280, 260, 240)
  },

  // --- FUJIAN ---
  { 
    id: 'fujian_major', name: '福建 (厦门/漳州/龙岩)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 2.42 }, { max: 50, price: 1.85 }, { max: 100, price: 1.68 }, 
        { max: 200, price: 1.54 }, { max: 300, price: 1.49 }, { max: 500, price: 1.44 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    kyeGround: groundRate(100, 200, 180, 160)
  },
  { 
    id: 'fujian_rest', name: '福建 (福州/泉州/三明/宁德/莆田/南平)', jd: JD_RATES.zone3, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(100, 200, 180, 160)
  },

  // --- HAINAN ---
  { 
    id: 'hainan', name: '海南省', jd: JD_RATES.zone5, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 37,
      tiers: [
        { max: 30, price: 3.15 }, { max: 50, price: 2.64 }, { max: 100, price: 2.16 }, 
        { max: 200, price: 2.06 }, { max: 300, price: 2.06 }, { max: 500, price: 1.92 }, 
        { max: 1000, price: 1.82 }, { max: 2000, price: 1.73 }, { max: 99999, price: 1.73 }
      ]
    },
    kyeGround: groundRate(175, 350, 320, 290)
  },

  // --- GUIZHOU ---
  { 
    id: 'guizhou', name: '贵州省 (贵阳/遵义/安顺)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 30,
      tiers: [
        { max: 30, price: 3.63 }, { max: 50, price: 3.17 }, { max: 100, price: 2.59 }, 
        { max: 200, price: 2.50 }, { max: 300, price: 2.50 }, { max: 500, price: 2.40 }, 
        { max: 1000, price: 2.30 }, { max: 2000, price: 2.21 }, { max: 99999, price: 2.21 }
      ]
    },
    kyeGround: groundRate(160, 320, 300, 270)
  },

  // --- JIANGXI ---
  { 
    id: 'jiangxi_nanchang', name: '江西 (南昌/赣州)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.82 }, 
        { max: 200, price: 1.68 }, { max: 300, price: 1.68 }, { max: 500, price: 1.54 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    kyeGround: groundRate(110, 220, 200, 170)
  },
  { 
    id: 'jiangxi_jiujiang', name: '江西 (九江/吉安/景德镇等)', description: "九江, 吉安, 景德镇, 抚州, 宜春, 上饶, 新余, 鹰潭, 萍乡", jd: JD_RATES.zone3, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(140, 280, 260, 240)
  },

  // --- GUANGDONG ---
  { 
    id: 'guangdong_pearl', name: '广东 (东莞/广州/深圳/珠海/中山)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.60 }, 
        { max: 200, price: 1.40 }, { max: 300, price: 1.40 }, { max: 500, price: 1.30 }, 
        { max: 1000, price: 1.30 }, { max: 2000, price: 1.20 }, { max: 99999, price: 1.20 }
      ]
    },
    kyeGround: groundRate(100, 200, 180, 170)
  },
  { 
    id: 'guangdong_huizhou', name: '广东 (惠州/佛山/肇庆/江门)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(100, 200, 180, 170)
  },
  { 
    id: 'guangdong_remote', name: '广东 (其他地区)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(120, 240, 220, 210)
  },

  // --- HUBEI ---
  { 
    id: 'hubei_wuhan', name: '湖北 (武汉/襄阳/宜昌等)', description: "武汉, 襄阳, 十堰, 恩施, 荆州, 宜昌, 荆门, 神农架", jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 2.42 }, { max: 50, price: 2.11 }, { max: 100, price: 1.82 }, 
        { max: 200, price: 1.68 }, { max: 300, price: 1.68 }, { max: 500, price: 1.54 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    kyeGround: groundRate(100, 200, 180, 170)
  },
  { 
    id: 'hubei_huangshi', name: '湖北 (黄石/孝感/黄冈等)', description: "黄石, 鄂州, 潜江, 天门, 孝感, 仙桃, 黄冈, 咸宁, 随州", jd: JD_RATES.zone3, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(100, 200, 175, 150)
  },

  // --- HUNAN ---
  { 
    id: 'hunan_changde', name: '湖南 (常德)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(180, 360, 350, 340)
  },
  { 
    id: 'hunan_changsha', name: '湖南 (湘潭/长沙/株洲)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.78 }, { max: 50, price: 2.11 }, { max: 100, price: 1.82 }, 
        { max: 200, price: 1.68 }, { max: 300, price: 1.68 }, { max: 500, price: 1.54 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    kyeGround: groundRate(100, 200, 185, 170)
  },
  { 
    id: 'hunan_yiyang', name: '湖南 (益阳)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(100, 200, 185, 170)
  },

  // --- YUNNAN ---
  { 
    id: 'yunnan', name: '云南 (昆明)', jd: JD_RATES.zone5, kyeProvince: null,
    kye: { 
      basePrice: 10, baseWeight: 1, minPrice: 40,
      tiers: [
        { max: 30, price: 4.24 }, { max: 50, price: 2.53 }, { max: 100, price: 2.21 }, 
        { max: 200, price: 2.02 }, { max: 300, price: 2.02 }, { max: 500, price: 1.92 }, 
        { max: 1000, price: 1.92 }, { max: 2000, price: 1.82 }, { max: 99999, price: 1.82 }
      ]
    },
    kyeGround: groundRate(175, 350, 320, 290)
  },

  // --- CHONGQING ---
  { 
    id: 'chongqing', name: '重庆市', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 36,
      tiers: [
        { max: 30, price: 3.03 }, { max: 50, price: 2.53 }, { max: 100, price: 2.21 }, 
        { max: 200, price: 2.02 }, { max: 300, price: 2.02 }, { max: 500, price: 1.92 }, 
        { max: 1000, price: 1.92 }, { max: 2000, price: 1.82 }, { max: 99999, price: 1.82 }
      ]
    },
    kyeGround: groundRate(150, 300, 280, 255)
  },

  // --- SICHUAN ---
  { 
    id: 'sichuan_mianyang', name: '四川 (绵阳)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(160, 320, 290, 270)
  },
  { 
    id: 'sichuan_zigong', name: '四川 (自贡/南充/达州/遂宁/广安/巴中/泸州/宜宾/内江/乐山/雅安/德阳/广元)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(170, 340, 310, 290)
  },
  { 
    id: 'sichuan_aba', name: '四川 (阿坝/甘孜/凉山/攀枝花)', jd: JD_RATES.zone5, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(180, 360, 340, 330)
  },
  { 
    id: 'sichuan_chengdu', name: '四川 (眉山/成都/资阳)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 4.36 }, { max: 50, price: 3.75 }, { max: 100, price: 3.41 }, 
        { max: 200, price: 3.22 }, { max: 300, price: 3.22 }, { max: 500, price: 3.12 }, 
        { max: 1000, price: 3.12 }, { max: 2000, price: 3.02 }, { max: 99999, price: 3.02 }
      ]
    },
    kyeGround: groundRate(160, 320, 290, 270)
  },

  // --- GANSU ---
  { 
    id: 'gansu', name: '甘肃 (兰州)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 18, baseWeight: 1, minPrice: 49,
      tiers: [
        { max: 30, price: 7.87 }, { max: 50, price: 6.86 }, { max: 100, price: 6.24 }, 
        { max: 200, price: 6.24 }, { max: 300, price: 6.24 }, { max: 500, price: 5.76 }, 
        { max: 1000, price: 5.76 }, { max: 2000, price: 5.76 }, { max: 99999, price: 5.76 }
      ]
    },
    kyeGround: groundRate(240, 480, 450, 420)
  },

  // --- XINJIANG ---
  { 
    id: 'xinjiang', name: '新疆 (乌鲁木齐)', jd: JD_RATES.zone7, kyeProvince: null,
    kye: { 
      basePrice: 22, baseWeight: 1, minPrice: 107,
      tiers: [
        { max: 30, price: 12.10 }, { max: 50, price: 10.56 }, { max: 100, price: 8.64 }, 
        { max: 200, price: 8.64 }, { max: 300, price: 8.64 }, { max: 500, price: 8.16 }, 
        { max: 1000, price: 8.16 }, { max: 2000, price: 7.68 }, { max: 99999, price: 7.68 }
      ]
    },
    kyeGround: groundRate(240, 480, 450, 420)
  },

  // --- SHANDONG ---
  { 
    id: 'shandong_major', name: '山东 (青岛/济南)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.78 }, { max: 50, price: 2.11 }, { max: 100, price: 1.92 }, 
        { max: 200, price: 1.82 }, { max: 300, price: 1.82 }, { max: 500, price: 1.68 }, 
        { max: 1000, price: 1.54 }, { max: 2000, price: 1.44 }, { max: 99999, price: 1.44 }
      ]
    },
    kyeGround: groundRate(95, 190, 170, 150)
  },
  { 
    id: 'shandong_coastal', name: '山东 (烟台/威海/潍坊/日照)', jd: JD_RATES.zone3, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(95, 190, 170, 150)
  },
  { 
    id: 'shandong_inland', name: '山东 (临沂/泰安/济宁/菏泽/德州/聊城/滨州/东营/淄博/枣庄)', jd: JD_RATES.zone3, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(110, 220, 200, 170)
  },

  // --- SHAANXI ---
  { 
    id: 'shaanxi_xian', name: '陕西 (西安/咸阳)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 36,
      tiers: [
        { max: 30, price: 3.03 }, { max: 50, price: 2.53 }, { max: 100, price: 2.21 }, 
        { max: 200, price: 2.02 }, { max: 300, price: 2.02 }, { max: 500, price: 1.92 }, 
        { max: 1000, price: 1.92 }, { max: 2000, price: 1.82 }, { max: 99999, price: 1.82 }
      ]
    },
    kyeGround: groundRate(130, 260, 240, 220)
  },
  { 
    id: 'shaanxi_baoji', name: '陕西 (宝鸡/铜川)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(145, 290, 270, 245)
  },
  { 
    id: 'shaanxi_ankang', name: '陕西 (安康/汉中/商洛/渭南/延安/榆林)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(150, 300, 280, 260)
  },

  // --- TIANJIN ---
  { 
    id: 'tianjin', name: '天津市', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 2.42 }, { max: 50, price: 2.11 }, { max: 100, price: 1.92 }, 
        { max: 200, price: 1.82 }, { max: 300, price: 1.82 }, { max: 500, price: 1.68 }, 
        { max: 1000, price: 1.54 }, { max: 2000, price: 1.44 }, { max: 99999, price: 1.44 }
      ]
    },
    kyeGround: groundRate(100, 200, 180, 170)
  },

  // --- INNER MONGOLIA ---
  { 
    id: 'neimenggu_hohhot', name: '内蒙古 (呼和浩特/包头/鄂尔多斯等)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 39,
      tiers: [
        { max: 30, price: 6.05 }, { max: 50, price: 5.28 }, { max: 100, price: 4.32 }, 
        { max: 200, price: 4.32 }, { max: 300, price: 4.32 }, { max: 500, price: 3.84 }, 
        { max: 1000, price: 3.84 }, { max: 2000, price: 3.36 }, { max: 99999, price: 3.36 }
      ]
    },
    kyeGround: groundRate(185, 370, 340, 320)
  },
  { 
    id: 'neimenggu_remote', name: '内蒙古 (呼伦贝尔)', jd: JD_RATES.zone5, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(195, 390, 365, 340)
  },

  // --- LIAONING ---
  { 
    id: 'liaoning_dalian', name: '辽宁 (大连/本溪/抚顺/沈阳/铁岭)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 36,
      tiers: [
        { max: 30, price: 3.03 }, { max: 50, price: 2.53 }, { max: 100, price: 2.21 }, 
        { max: 200, price: 2.02 }, { max: 300, price: 2.02 }, { max: 500, price: 1.92 }, 
        { max: 1000, price: 1.92 }, { max: 2000, price: 1.82 }, { max: 99999, price: 1.82 }
      ]
    },
    kyeGround: groundRate(130, 260, 240, 220)
  },
  { 
    id: 'liaoning_anshan', name: '辽宁 (鞍山)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(150, 300, 280, 260)
  },

  // --- JILIN ---
  { 
    id: 'jilin_changchun', name: '吉林 (长春/吉林)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 39,
      tiers: [
        { max: 30, price: 6.05 }, { max: 50, price: 5.28 }, { max: 100, price: 4.32 }, 
        { max: 200, price: 4.32 }, { max: 300, price: 4.32 }, { max: 500, price: 4.32 }, 
        { max: 1000, price: 3.84 }, { max: 2000, price: 3.36 }, { max: 99999, price: 3.36 }
      ]
    },
    kyeGround: groundRate(160, 320, 300, 280)
  },
  { 
    id: 'jilin_other', name: '吉林 (白城/白山/辽源/四平/松原/松原/通化/延边)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(170, 340, 320, 300)
  },

  // --- HEILONGJIANG ---
  { 
    id: 'heilongjiang', name: '黑龙江 (哈尔滨)', jd: JD_RATES.zone5, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 37,
      tiers: [
        { max: 30, price: 5.45 }, { max: 50, price: 4.75 }, { max: 100, price: 4.32 }, 
        { max: 200, price: 3.84 }, { max: 300, price: 3.84 }, { max: 500, price: 3.84 }, 
        { max: 1000, price: 3.36 }, { max: 2000, price: 2.88 }, { max: 99999, price: 2.88 }
      ]
    },
    kyeGround: groundRate(175, 350, 330, 300)
  },

  // --- BEIJING ---
  { 
    id: 'beijing', name: '北京市', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.92 }, 
        { max: 200, price: 1.82 }, { max: 300, price: 1.60 }, { max: 500, price: 1.50 }, 
        { max: 1000, price: 1.50 }, { max: 2000, price: 1.40 }, { max: 99999, price: 1.40 }
      ]
    },
    kyeGround: groundRate(100, 200, 180, 170)
  },

  // --- HEBEI ---
  { 
    id: 'hebei_shijiazhuang', name: '河北 (石家庄/廊坊)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.92 }, 
        { max: 200, price: 1.82 }, { max: 300, price: 1.82 }, { max: 500, price: 1.68 }, 
        { max: 1000, price: 1.54 }, { max: 2000, price: 1.44 }, { max: 99999, price: 1.44 }
      ]
    },
    kyeGround: groundRate(110, 220, 200, 170)
  },
  { 
    id: 'hebei_handan', name: '河北 (邯郸/保定/沧州/秦皇岛/唐山)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(120, 240, 220, 200)
  },
  { 
    id: 'hebei_chengde', name: '河北 (承德/衡水/邢台/张家口)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(120, 240, 220, 200)
  },

  // --- HENAN ---
  { 
    id: 'henan_kaifeng', name: '河南 (郑州/开封/南阳/新乡等)', description: "郑州, 开封, 南阳, 信阳, 商丘, 新乡, 濮阳, 周口, 漯河, 许昌, 驻马店, 平顶山", jd: JD_RATES.zone3, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.82 }, 
        { max: 200, price: 1.68 }, { max: 300, price: 1.68 }, { max: 500, price: 1.54 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    kyeGround: groundRate(105, 210, 190, 170)
  },
  { 
    id: 'henan_anyang', name: '河南 (安阳/焦作/洛阳/三门峡等)', description: "安阳, 焦作, 济源, 洛阳, 三门峡, 鹤壁", jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(110, 220, 200, 180)
  },

  // --- SHANXI ---
  { 
    id: 'shanxi_taiyuan', name: '山西 (太原/晋中)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 4.24 }, { max: 50, price: 3.49 }, { max: 100, price: 3.17 }, 
        { max: 200, price: 2.98 }, { max: 300, price: 2.98 }, { max: 500, price: 2.88 }, 
        { max: 1000, price: 2.88 }, { max: 2000, price: 2.78 }, { max: 99999, price: 2.78 }
      ]
    },
    kyeGround: groundRate(130, 260, 240, 220)
  },
  { 
    id: 'shanxi_datong', name: '山西 (大同/晋城/临汾/吕梁/朔州/忻州/阳泉/运城/长治)', jd: JD_RATES.zone4, kyeProvince: null,
    kye: kyeAirDefault(15),
    kyeGround: groundRate(140, 280, 260, 240)
  },

  // --- QINGHAI ---
  { 
    id: 'qinghai', name: '青海省 (西宁等)', jd: JD_RATES.zone5, kyeProvince: null,
    kye: { 
      basePrice: 20, baseWeight: 1, minPrice: 60,
      tiers: [
        { max: 30, price: 9.92 }, { max: 50, price: 8.98 }, { max: 100, price: 8.16 }, 
        { max: 200, price: 8.16 }, { max: 300, price: 8.16 }, { max: 500, price: 7.68 }, 
        { max: 1000, price: 7.20 }, { max: 2000, price: 6.72 }, { max: 99999, price: 6.72 }
      ]
    },
    kyeGround: null
  },
  { 
    id: 'qinghai_yushu', name: '青海 (玉树州)', jd: JD_RATES.zone6, kyeProvince: null,
    kye: { 
      basePrice: 20, baseWeight: 1, minPrice: 60,
      tiers: [{ max: 99999, price: 7.20 }] // estimate
    },
    kyeGround: null
  },
  
  // --- NINGXIA ---
  { 
    id: 'ningxia', name: '宁夏回族自治区', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 49,
      tiers: [
        { max: 30, price: 8.47 }, { max: 50, price: 7.39 }, { max: 100, price: 6.24 }, 
        { max: 200, price: 6.24 }, { max: 300, price: 6.24 }, { max: 500, price: 5.76 }, 
        { max: 1000, price: 5.28 }, { max: 2000, price: 4.80 }, { max: 99999, price: 4.80 }
      ]
    },
    kyeGround: null
  },

  // --- TIBET ---
  { 
    id: 'xizang_changdu', name: '西藏 (昌都)', jd: JD_RATES.zone8, kyeProvince: null,
    kye: { 
      basePrice: 25, baseWeight: 1, minPrice: 78,
      tiers: [{ max: 99999, price: 9.60 }]
    },
    kyeGround: null
  },
  { 
    id: 'xizang_lhasa', name: '西藏 (拉萨/林芝/日喀则/山南/那曲)', jd: JD_RATES.zone9, kyeProvince: null,
    kye: { 
      basePrice: 25, baseWeight: 1, minPrice: 78,
      tiers: [{ max: 99999, price: 9.60 }]
    },
    kyeGround: null
  },
  { 
    id: 'xizang_ali', name: '西藏 (阿里)', jd: JD_RATES.zone11, kyeProvince: null,
    kye: { 
      basePrice: 25, baseWeight: 1, minPrice: 78,
      tiers: [{ max: 99999, price: 9.60 }]
    },
    kyeGround: null
  }
];
