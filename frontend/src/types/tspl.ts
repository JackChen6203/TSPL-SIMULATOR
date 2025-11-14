// TSPL 元素類型
export type ElementType = 'TEXT' | 'BARCODE' | 'QRCODE' | 'BOX' | 'BAR';

// 渲染元素
export interface RenderElement {
  type: ElementType;
  x: number;
  y: number;
  properties: {
    [key: string]: any;
  };
}

// 渲染數據
export interface RenderData {
  width: number;   // 寬度 (mm)
  height: number;  // 高度 (mm)
  elements: RenderElement[];
}

// 標籤
export interface Label {
  width: number;
  height: number;
  gap: number;
  direction: number;
  elements: RenderElement[];
}
