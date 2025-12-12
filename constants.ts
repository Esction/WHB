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
  volumeFactor: 6000,
};

export const DEFAULT_KYE_CONFIG: ShippingConfig = {
  name: '跨越速运 (KYE) 隔日达',
  code: 'KYE',
  volumeFactor: 6000,
};

export const DEFAULT_KYE_GROUND_CONFIG: ShippingConfig = {
  name: '跨越速运 (KYE) 陆运件',
  code: 'KYE_GROUND',
  volumeFactor: 1, 
};

export const DEFAULT_KYE_PROVINCE_CONFIG: ShippingConfig = {
  name: '跨越速运 (KYE) 省内次日',
  code: 'KYE_PROVINCE',
  volumeFactor: 1, 
};

// JD Standard Rates (Helper)
const JD_RATES = {
  zone1: { basePrice: 7.2, baseWeight: 1, unitPrice: 1.2, unitPrice2: 1.8 },
  zone2: { basePrice: 7.8, baseWeight: 1, unitPrice: 1.2, unitPrice2: 1.8 },
  zone3: { basePrice: 9, baseWeight: 1, unitPrice: 3, unitPrice2: 3.6 },
  zone4: { basePrice: 9.6, baseWeight: 1, unitPrice: 3.6, unitPrice2: 4.2 },
  zone5: { basePrice: 10.2, baseWeight: 1, unitPrice: 3.6, unitPrice2: 4.2 },
  zone6: { basePrice: 11.4, baseWeight: 1, unitPrice: 6.3, unitPrice2: 6.9 },
  zone7: { basePrice: 12, baseWeight: 1, unitPrice: 4.8, unitPrice2: 7.2 },
  zone8: { basePrice: 13.8, baseWeight: 1, unitPrice: 11.1, unitPrice2: 11.7 },
  zone9: { basePrice: 14.4, baseWeight: 1, unitPrice: 7.2, unitPrice2: 7.8 },
  zone10: { basePrice: 16.8, baseWeight: 1, unitPrice: 10.5, unitPrice2: 11.1 },
  zone11: { basePrice: 17.4, baseWeight: 1, unitPrice: 13.8, unitPrice2: 14.4 },
};

/**
 * Updated REGIONS with expanded list for East China to support KYE Intra-province Next Day specific pricing.
 * kyeProvince is added where applicable.
 */
export const REGIONS: Region[] = [
  // --- SHANGHAI ---
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
    id: 'anhui_wuhu', name: '安徽 (芜湖)', 
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
    id: 'anhui_hefei', name: '安徽 (合肥)', 
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
  { 
    id: 'anhui_maanshan', name: '安徽 (马鞍山/宣城)', 
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
  { 
    id: 'anhui_chuzhou', name: '安徽 (滁州/六安/蚌埠/铜陵/池州)', 
    jd: JD_RATES.zone2, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.65, minPrice: 85,
      tiers: [
        { maxVolume: 3, pricePerCbm: 130 },
        { maxVolume: 10, pricePerCbm: 120 },
        { maxVolume: Infinity, pricePerCbm: 115 }
      ]
    }
  },
  { 
    id: 'anhui_north', name: '安徽 (阜阳/亳州/宿州/淮北/淮南/安庆/黄山)', 
    jd: JD_RATES.zone2, kye: null, kyeGround: null,
    kyeProvince: {
      minVolume: 0.6, minPrice: 84,
      tiers: [
        { maxVolume: 3, pricePerCbm: 140 },
        { maxVolume: 10, pricePerCbm: 130 },
        { maxVolume: Infinity, pricePerCbm: 115 }
      ]
    }
  },


  // JD Zone 3
  { 
    id: 'fujian', name: '福建省', jd: JD_RATES.zone3, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 2.42 }, { max: 50, price: 1.85 }, { max: 100, price: 1.68 }, 
        { max: 200, price: 1.54 }, { max: 300, price: 1.49 }, { max: 500, price: 1.44 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    // Xiamen/Fuzhou: 200, 180, 160. Min 100
    kyeGround: {
      minVolume: 0.5, minPrice: 100,
      tiers: [
        { maxVolume: 3, pricePerCbm: 200 },
        { maxVolume: 10, pricePerCbm: 180 },
        { maxVolume: Infinity, pricePerCbm: 160 }
      ]
    }
  },
  { 
    id: 'hubei', name: '湖北省', jd: JD_RATES.zone3, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 2.42 }, { max: 50, price: 2.11 }, { max: 100, price: 1.82 }, 
        { max: 200, price: 1.68 }, { max: 300, price: 1.68 }, { max: 500, price: 1.54 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    // Wuhan: 200, 180, 170. Min 100
    kyeGround: {
      minVolume: 0.5, minPrice: 100,
      tiers: [
        { maxVolume: 3, pricePerCbm: 200 },
        { maxVolume: 10, pricePerCbm: 180 },
        { maxVolume: Infinity, pricePerCbm: 170 }
      ]
    }
  },
  { 
    id: 'jiangxi', name: '江西省', jd: JD_RATES.zone3, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.82 }, 
        { max: 200, price: 1.68 }, { max: 300, price: 1.68 }, { max: 500, price: 1.54 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    // Nanchang: 220, 200, 170. Min 110
    kyeGround: {
      minVolume: 0.5, minPrice: 110,
      tiers: [
        { maxVolume: 3, pricePerCbm: 220 },
        { maxVolume: 10, pricePerCbm: 200 },
        { maxVolume: Infinity, pricePerCbm: 170 }
      ]
    }
  },
  { 
    id: 'henan', name: '河南省', jd: JD_RATES.zone3, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.82 }, 
        { max: 200, price: 1.68 }, { max: 300, price: 1.68 }, { max: 500, price: 1.54 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    // Kaifeng/Zhengzhou: 210, 190, 170. Min 105
    kyeGround: {
      minVolume: 0.5, minPrice: 105,
      tiers: [
        { maxVolume: 3, pricePerCbm: 210 },
        { maxVolume: 10, pricePerCbm: 190 },
        { maxVolume: Infinity, pricePerCbm: 170 }
      ]
    }
  },
  { 
    id: 'shandong', name: '山东省', jd: JD_RATES.zone3, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.78 }, { max: 50, price: 2.11 }, { max: 100, price: 1.92 }, 
        { max: 200, price: 1.82 }, { max: 300, price: 1.82 }, { max: 500, price: 1.68 }, 
        { max: 1000, price: 1.54 }, { max: 2000, price: 1.44 }, { max: 99999, price: 1.44 }
      ]
    },
    // Qingdao/Jinan: 190, 170, 150. Min 95
    kyeGround: {
      minVolume: 0.5, minPrice: 95,
      tiers: [
        { maxVolume: 3, pricePerCbm: 190 },
        { maxVolume: 10, pricePerCbm: 170 },
        { maxVolume: Infinity, pricePerCbm: 150 }
      ]
    }
  },

  // JD Zone 4
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
    // Beijing: 200, 180, 170. Min 100
    kyeGround: {
      minVolume: 0.5, minPrice: 100,
      tiers: [
        { maxVolume: 3, pricePerCbm: 200 },
        { maxVolume: 10, pricePerCbm: 180 },
        { maxVolume: Infinity, pricePerCbm: 170 }
      ]
    }
  },
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
    // Tianjin: 200, 180, 170. Min 100
    kyeGround: {
      minVolume: 0.5, minPrice: 100,
      tiers: [
        { maxVolume: 3, pricePerCbm: 200 },
        { maxVolume: 10, pricePerCbm: 180 },
        { maxVolume: Infinity, pricePerCbm: 170 }
      ]
    }
  },
  { 
    id: 'hebei', name: '河北省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.92 }, 
        { max: 200, price: 1.82 }, { max: 300, price: 1.82 }, { max: 500, price: 1.68 }, 
        { max: 1000, price: 1.54 }, { max: 2000, price: 1.44 }, { max: 99999, price: 1.44 }
      ]
    },
    // Shijiazhuang: 220, 200, 170. Min 110
    kyeGround: {
      minVolume: 0.5, minPrice: 110,
      tiers: [
        { maxVolume: 3, pricePerCbm: 220 },
        { maxVolume: 10, pricePerCbm: 200 },
        { maxVolume: Infinity, pricePerCbm: 170 }
      ]
    }
  },
  { 
    id: 'guangdong', name: '广东省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.66 }, { max: 50, price: 2.11 }, { max: 100, price: 1.60 }, 
        { max: 200, price: 1.40 }, { max: 300, price: 1.40 }, { max: 500, price: 1.30 }, 
        { max: 1000, price: 1.30 }, { max: 2000, price: 1.20 }, { max: 99999, price: 1.20 }
      ]
    },
    // Dongguan/Foshan/Guangzhou: 200, 180, 170. Min 100
    kyeGround: {
      minVolume: 0.5, minPrice: 100,
      tiers: [
        { maxVolume: 3, pricePerCbm: 200 },
        { maxVolume: 10, pricePerCbm: 180 },
        { maxVolume: Infinity, pricePerCbm: 170 }
      ]
    }
  },
  { 
    id: 'hunan', name: '湖南省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 34,
      tiers: [
        { max: 30, price: 2.78 }, { max: 50, price: 2.11 }, { max: 100, price: 1.82 }, 
        { max: 200, price: 1.68 }, { max: 300, price: 1.68 }, { max: 500, price: 1.54 }, 
        { max: 1000, price: 1.44 }, { max: 2000, price: 1.34 }, { max: 99999, price: 1.34 }
      ]
    },
    // Changsha: 200, 185, 170. Min 100
    kyeGround: {
      minVolume: 0.5, minPrice: 100,
      tiers: [
        { maxVolume: 3, pricePerCbm: 200 },
        { maxVolume: 10, pricePerCbm: 185 },
        { maxVolume: Infinity, pricePerCbm: 170 }
      ]
    }
  },
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
    // Chongqing: 300, 280, 255. Min 150
    kyeGround: {
      minVolume: 0.5, minPrice: 150,
      tiers: [
        { maxVolume: 3, pricePerCbm: 300 },
        { maxVolume: 10, pricePerCbm: 280 },
        { maxVolume: Infinity, pricePerCbm: 255 }
      ]
    }
  },
  { 
    id: 'shanxi', name: '山西省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 4.24 }, { max: 50, price: 3.49 }, { max: 100, price: 3.17 }, 
        { max: 200, price: 2.98 }, { max: 300, price: 2.98 }, { max: 500, price: 2.88 }, 
        { max: 1000, price: 2.88 }, { max: 2000, price: 2.78 }, { max: 99999, price: 2.78 }
      ]
    },
    // Taiyuan: 260, 240, 220. Min 130
    kyeGround: {
      minVolume: 0.5, minPrice: 130,
      tiers: [
        { maxVolume: 3, pricePerCbm: 260 },
        { maxVolume: 10, pricePerCbm: 240 },
        { maxVolume: Infinity, pricePerCbm: 220 }
      ]
    }
  },
  { 
    id: 'shaanxi', name: '陕西省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 36,
      tiers: [
        { max: 30, price: 3.03 }, { max: 50, price: 2.53 }, { max: 100, price: 2.21 }, 
        { max: 200, price: 2.02 }, { max: 300, price: 2.02 }, { max: 500, price: 1.92 }, 
        { max: 1000, price: 1.92 }, { max: 2000, price: 1.82 }, { max: 99999, price: 1.82 }
      ]
    },
    // Xi'an: 260, 240, 220. Min 130
    kyeGround: {
      minVolume: 0.5, minPrice: 130,
      tiers: [
        { maxVolume: 3, pricePerCbm: 260 },
        { maxVolume: 10, pricePerCbm: 240 },
        { maxVolume: Infinity, pricePerCbm: 220 }
      ]
    }
  },
  { 
    id: 'liaoning', name: '辽宁省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 36,
      tiers: [
        { max: 30, price: 3.03 }, { max: 50, price: 2.53 }, { max: 100, price: 2.21 }, 
        { max: 200, price: 2.02 }, { max: 300, price: 2.02 }, { max: 500, price: 1.92 }, 
        { max: 1000, price: 1.92 }, { max: 2000, price: 1.82 }, { max: 99999, price: 1.82 }
      ]
    },
    // Dalian/Shenyang: 260, 240, 220. Min 130
    kyeGround: {
      minVolume: 0.5, minPrice: 130,
      tiers: [
        { maxVolume: 3, pricePerCbm: 260 },
        { maxVolume: 10, pricePerCbm: 240 },
        { maxVolume: Infinity, pricePerCbm: 220 }
      ]
    }
  },
  { 
    id: 'jilin', name: '吉林省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 39,
      tiers: [
        { max: 30, price: 6.05 }, { max: 50, price: 5.28 }, { max: 100, price: 4.32 }, 
        { max: 200, price: 4.32 }, { max: 300, price: 4.32 }, { max: 500, price: 4.32 }, 
        { max: 1000, price: 3.84 }, { max: 2000, price: 3.36 }, { max: 99999, price: 3.36 }
      ]
    },
    // Changchun: 320, 300, 280. Min 160
    kyeGround: {
      minVolume: 0.5, minPrice: 160,
      tiers: [
        { maxVolume: 3, pricePerCbm: 320 },
        { maxVolume: 10, pricePerCbm: 300 },
        { maxVolume: Infinity, pricePerCbm: 280 }
      ]
    }
  },
  { 
    id: 'guizhou', name: '贵州省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 30,
      tiers: [
        { max: 30, price: 3.63 }, { max: 50, price: 3.17 }, { max: 100, price: 2.59 }, 
        { max: 200, price: 2.50 }, { max: 300, price: 2.50 }, { max: 500, price: 2.40 }, 
        { max: 1000, price: 2.30 }, { max: 2000, price: 2.21 }, { max: 99999, price: 2.21 }
      ]
    },
    // Guizhou (Guiyang): 320, 300, 270. Min 160
    kyeGround: {
      minVolume: 0.5, minPrice: 160,
      tiers: [
        { maxVolume: 3, pricePerCbm: 320 },
        { maxVolume: 10, pricePerCbm: 300 },
        { maxVolume: Infinity, pricePerCbm: 270 }
      ]
    }
  },
  { 
    id: 'guangxi', name: '广西壮族自治区', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 30,
      tiers: [
        { max: 30, price: 3.63 }, { max: 50, price: 3.06 }, { max: 100, price: 2.78 }, 
        { max: 200, price: 2.69 }, { max: 300, price: 2.64 }, { max: 500, price: 2.64 }, 
        { max: 1000, price: 2.50 }, { max: 2000, price: 2.40 }, { max: 99999, price: 2.40 }
      ]
    },
    // Nanning: 280, 260, 240. Min 140
    kyeGround: {
      minVolume: 0.5, minPrice: 140,
      tiers: [
        { maxVolume: 3, pricePerCbm: 280 },
        { maxVolume: 10, pricePerCbm: 260 },
        { maxVolume: Infinity, pricePerCbm: 240 }
      ]
    }
  },
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
    // Not explicitly in table, leave null
    kyeGround: null
  },
  { 
    id: 'sichuan', name: '四川省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 32,
      tiers: [
        { max: 30, price: 4.36 }, { max: 50, price: 3.75 }, { max: 100, price: 3.41 }, 
        { max: 200, price: 3.22 }, { max: 300, price: 3.22 }, { max: 500, price: 3.12 }, 
        { max: 1000, price: 3.12 }, { max: 2000, price: 3.02 }, { max: 99999, price: 3.02 }
      ]
    },
    // Chengdu/Mianyang: 320, 290, 270. Min 160
    kyeGround: {
      minVolume: 0.5, minPrice: 160,
      tiers: [
        { maxVolume: 3, pricePerCbm: 320 },
        { maxVolume: 10, pricePerCbm: 290 },
        { maxVolume: Infinity, pricePerCbm: 270 }
      ]
    }
  },
  { 
    id: 'neimenggu', name: '内蒙古自治区', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 39,
      tiers: [
        { max: 30, price: 6.05 }, { max: 50, price: 5.28 }, { max: 100, price: 4.32 }, 
        { max: 200, price: 4.32 }, { max: 300, price: 4.32 }, { max: 500, price: 3.84 }, 
        { max: 1000, price: 3.84 }, { max: 2000, price: 3.36 }, { max: 99999, price: 3.36 }
      ]
    },
    // Hohhot: 370, 340, 320. Min 185
    kyeGround: {
      minVolume: 0.5, minPrice: 185,
      tiers: [
        { maxVolume: 3, pricePerCbm: 370 },
        { maxVolume: 10, pricePerCbm: 340 },
        { maxVolume: Infinity, pricePerCbm: 320 }
      ]
    }
  },

  // JD Zone 5
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
    // Hainan: 350, 320, 290. Min 175
    kyeGround: {
      minVolume: 0.5, minPrice: 175,
      tiers: [
        { maxVolume: 3, pricePerCbm: 350 },
        { maxVolume: 10, pricePerCbm: 320 },
        { maxVolume: Infinity, pricePerCbm: 290 }
      ]
    }
  },
  { 
    id: 'yunnan', name: '云南省', jd: JD_RATES.zone5, kyeProvince: null,
    kye: { 
      basePrice: 10, baseWeight: 1, minPrice: 40,
      tiers: [
        { max: 30, price: 4.24 }, { max: 50, price: 2.53 }, { max: 100, price: 2.21 }, 
        { max: 200, price: 2.02 }, { max: 300, price: 2.02 }, { max: 500, price: 1.92 }, 
        { max: 1000, price: 1.92 }, { max: 2000, price: 1.82 }, { max: 99999, price: 1.82 }
      ]
    },
    // Kunming: 350, 320, 290. Min 175
    kyeGround: {
      minVolume: 0.5, minPrice: 175,
      tiers: [
        { maxVolume: 3, pricePerCbm: 350 },
        { maxVolume: 10, pricePerCbm: 320 },
        { maxVolume: Infinity, pricePerCbm: 290 }
      ]
    }
  },
  { 
    id: 'heilongjiang', name: '黑龙江省', jd: JD_RATES.zone5, kyeProvince: null,
    kye: { 
      basePrice: 15, baseWeight: 1, minPrice: 37,
      tiers: [
        { max: 30, price: 5.45 }, { max: 50, price: 4.75 }, { max: 100, price: 4.32 }, 
        { max: 200, price: 3.84 }, { max: 300, price: 3.84 }, { max: 500, price: 3.84 }, 
        { max: 1000, price: 3.36 }, { max: 2000, price: 2.88 }, { max: 99999, price: 2.88 }
      ]
    },
    // Harbin: 350, 330, 300. Min 175
    kyeGround: {
      minVolume: 0.5, minPrice: 175,
      tiers: [
        { maxVolume: 3, pricePerCbm: 350 },
        { maxVolume: 10, pricePerCbm: 330 },
        { maxVolume: Infinity, pricePerCbm: 300 }
      ]
    }
  },
  { 
    id: 'gansu', name: '甘肃省', jd: JD_RATES.zone4, kyeProvince: null,
    kye: { 
      basePrice: 18, baseWeight: 1, minPrice: 49,
      tiers: [
        { max: 30, price: 7.87 }, { max: 50, price: 6.86 }, { max: 100, price: 6.24 }, 
        { max: 200, price: 6.24 }, { max: 300, price: 6.24 }, { max: 500, price: 5.76 }, 
        { max: 1000, price: 5.76 }, { max: 2000, price: 5.76 }, { max: 99999, price: 5.76 }
      ]
    },
    // Lanzhou: 480, 450, 420. Min 240
    kyeGround: {
      minVolume: 0.5, minPrice: 240,
      tiers: [
        { maxVolume: 3, pricePerCbm: 480 },
        { maxVolume: 10, pricePerCbm: 450 },
        { maxVolume: Infinity, pricePerCbm: 420 }
      ]
    }
  },
  { 
    id: 'qinghai', name: '青海省', jd: JD_RATES.zone5, kyeProvince: null,
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
    id: 'xinjiang', name: '新疆维吾尔自治区', jd: JD_RATES.zone7, kyeProvince: null,
    kye: { 
      basePrice: 22, baseWeight: 1, minPrice: 107,
      tiers: [
        { max: 30, price: 12.10 }, { max: 50, price: 10.56 }, { max: 100, price: 8.64 }, 
        { max: 200, price: 8.64 }, { max: 300, price: 8.64 }, { max: 500, price: 8.16 }, 
        { max: 1000, price: 8.16 }, { max: 2000, price: 7.68 }, { max: 99999, price: 7.68 }
      ]
    },
    // Urumqi: 480, 450, 420. Min 240
    kyeGround: {
      minVolume: 0.5, minPrice: 240,
      tiers: [
        { maxVolume: 3, pricePerCbm: 480 },
        { maxVolume: 10, pricePerCbm: 450 },
        { maxVolume: Infinity, pricePerCbm: 420 }
      ]
    }
  },
  { 
    id: 'xizang', name: '西藏自治区', jd: JD_RATES.zone9, kyeProvince: null,
    kye: { 
      basePrice: 25, baseWeight: 1, minPrice: 78,
      tiers: [
        { max: 30, price: 13.31 }, { max: 50, price: 11.09 }, { max: 100, price: 10.08 }, 
        { max: 200, price: 10.08 }, { max: 300, price: 10.08 }, { max: 500, price: 9.60 }, 
        { max: 1000, price: 9.60 }, { max: 2000, price: 9.12 }, { max: 99999, price: 9.12 }
      ]
    },
    kyeGround: null
  }
];