import { RenderResponse, ExamplesResponse, Example } from '../types/api';
import { RenderData } from '../types/tspl';

// 模擬 API - 當後端未啟動時使用

// 模擬範例數據
const mockExamples: Example[] = [
  {
    name: "基本文字",
    description: "簡單的文字標籤範例",
    code: `SIZE 100 mm, 50 mm
GAP 3 mm, 0 mm
DIRECTION 1,0
CLS
TEXT 100,100,"3",0,1,1,"Hello TSPL"
TEXT 100,150,"3",0,1,1,"Welcome to Simulator"
PRINT 1,1`,
  },
  {
    name: "條碼",
    description: "包含條碼的標籤",
    code: `SIZE 100 mm, 50 mm
GAP 3 mm, 0 mm
CLS
BARCODE 100,100,"128",100,1,0,2,2,"123456789"
TEXT 100,250,"3",0,1,1,"Product: 123456789"
PRINT 1,1`,
  },
  {
    name: "QR Code",
    description: "QR Code 標籤範例",
    code: `SIZE 100 mm, 50 mm
GAP 3 mm, 0 mm
CLS
QRCODE 150,100,H,5,A,0,"https://example.com"
TEXT 100,300,"3",0,1,1,"Scan Me!"
PRINT 1,1`,
  },
  {
    name: "產品標籤",
    description: "產品資訊標籤",
    code: `SIZE 100 mm, 60 mm
GAP 3 mm, 0 mm
DIRECTION 1,0
CLS
BOX 10,10,790,470,3
TEXT 100,50,"4",0,1,1,"Product Information"
BAR 50,100,700,2
TEXT 100,130,"3",0,1,1,"Product Name: Widget XYZ-2000"
BARCODE 100,260,"128",80,1,0,2,2,"2000123456789"
PRINT 1,1`,
  },
  {
    name: "資產標籤",
    description: "公司資產標記",
    code: `SIZE 50 mm, 30 mm
GAP 2 mm, 0 mm
CLS
TEXT 100,30,"3",0,1,1,"ASSET TAG"
BAR 50,60,340,1
TEXT 100,80,"2",0,1,1,"Company Property"
TEXT 100,110,"2",0,1,1,"Asset ID:"
BARCODE 100,140,"128",50,0,0,1,2,"ASSET-2024-1234"
TEXT 100,220,"1",0,1,1,"Do Not Remove"
PRINT 1,1`,
  },
];

// 簡單的 TSPL 解析器
function parseTSPL(tsplCode: string): RenderData {
  const lines = tsplCode.split('\n');
  let width = 100;
  let height = 50;
  const elements: any[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toUpperCase();

    try {
      switch (command) {
        case 'SIZE':
          width = parseFloat(parts[1]);
          height = parseFloat(parts[3]);
          break;

        case 'TEXT': {
          const match = trimmed.match(/TEXT\s+(\d+),(\d+),"([^"]+)",(\d+),(\d+),(\d+),"([^"]+)"/);
          if (match) {
            elements.push({
              type: 'TEXT',
              x: parseInt(match[1]),
              y: parseInt(match[2]),
              properties: {
                font: match[3],
                rotation: parseInt(match[4]),
                x_scale: parseInt(match[5]),
                y_scale: parseInt(match[6]),
                content: match[7],
              },
            });
          }
          break;
        }

        case 'BARCODE': {
          const match = trimmed.match(/BARCODE\s+(\d+),(\d+),"([^"]+)",(\d+),(\d+),(\d+),(\d+),(\d+),"([^"]+)"/);
          if (match) {
            elements.push({
              type: 'BARCODE',
              x: parseInt(match[1]),
              y: parseInt(match[2]),
              properties: {
                type: match[3],
                height: parseInt(match[4]),
                readable: parseInt(match[5]),
                rotation: parseInt(match[6]),
                narrow: parseInt(match[7]),
                wide: parseInt(match[8]),
                content: match[9],
              },
            });
          }
          break;
        }

        case 'QRCODE': {
          const match = trimmed.match(/QRCODE\s+(\d+),(\d+),([^,]+),(\d+),([^,]+),(\d+),"([^"]+)"/);
          if (match) {
            elements.push({
              type: 'QRCODE',
              x: parseInt(match[1]),
              y: parseInt(match[2]),
              properties: {
                ecc_level: match[3],
                cell_width: parseInt(match[4]),
                mode: match[5],
                rotation: parseInt(match[6]),
                content: match[7],
              },
            });
          }
          break;
        }

        case 'BOX': {
          const nums = trimmed.match(/\d+/g);
          if (nums && nums.length >= 5) {
            elements.push({
              type: 'BOX',
              x: parseInt(nums[0]),
              y: parseInt(nums[1]),
              properties: {
                width: parseInt(nums[2]) - parseInt(nums[0]),
                height: parseInt(nums[3]) - parseInt(nums[1]),
                thickness: parseInt(nums[4]),
              },
            });
          }
          break;
        }

        case 'BAR': {
          const nums = trimmed.match(/\d+/g);
          if (nums && nums.length >= 4) {
            elements.push({
              type: 'BAR',
              x: parseInt(nums[0]),
              y: parseInt(nums[1]),
              properties: {
                width: parseInt(nums[2]),
                height: parseInt(nums[3]),
              },
            });
          }
          break;
        }
      }
    } catch (e) {
      console.warn('Failed to parse line:', trimmed, e);
    }
  }

  return {
    width,
    height,
    elements,
  };
}

// 模擬 API 函數
export const mockRenderTSPL = async (tsplCode: string): Promise<RenderResponse> => {
  // 模擬網路延遲
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const data = parseTSPL(tsplCode);
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    throw new Error('TSPL 解析錯誤: ' + error.message);
  }
};

export const mockGetExamples = async (): Promise<ExamplesResponse> => {
  // 模擬網路延遲
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    examples: mockExamples,
  };
};
