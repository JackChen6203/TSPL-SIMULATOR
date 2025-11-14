// TSPL 語法檢查器

export interface ValidationError {
  line: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

// 支援的 TSPL 指令
const VALID_COMMANDS = [
  'SIZE', 'GAP', 'DIRECTION', 'REFERENCE', 'OFFSET',
  'CLS', 'FEED', 'BACKFEED', 'FORMFEED', 'HOME',
  'PRINT', 'SOUND', 'CUT', 'LIMITFEED',
  'TEXT', 'BARCODE', 'QRCODE', 'PDF417', 'AZTEC', 'DATAMATRIX',
  'BOX', 'BAR', 'CIRCLE', 'ELLIPSE', 'REVERSE',
  'BITMAP', 'PUTBMP', 'ERASE', 'REVERSE',
  'DENSITY', 'SPEED', 'CODEPAGE', 'COUNTRY',
  'SET', 'INITIALPRINTER', 'RTC', 'SELFTEST'
];

// 驗證 TSPL 代碼
export function validateTSPL(tsplCode: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const lines = tsplCode.split('\n');

  let hasSizeCommand = false;
  let hasClsCommand = false;
  let hasPrintCommand = false;

  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmed = line.trim();

    // 跳過空行和註解
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('!') || trimmed.startsWith(';')) {
      return;
    }

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toUpperCase();

    // 檢查指令是否支援
    if (!VALID_COMMANDS.includes(command)) {
      warnings.push({
        line: lineNumber,
        message: `未知或不支援的指令: ${command}`,
        severity: 'warning'
      });
    }

    // 記錄關鍵指令
    if (command === 'SIZE') hasSizeCommand = true;
    if (command === 'CLS') hasClsCommand = true;
    if (command === 'PRINT') hasPrintCommand = true;

    // 驗證特定指令的參數
    try {
      switch (command) {
        case 'SIZE':
          validateSizeCommand(trimmed, lineNumber, errors);
          break;
        case 'GAP':
          validateGapCommand(trimmed, lineNumber, errors);
          break;
        case 'TEXT':
          validateTextCommand(trimmed, lineNumber, errors);
          break;
        case 'BARCODE':
          validateBarcodeCommand(trimmed, lineNumber, errors);
          break;
        case 'QRCODE':
          validateQRCodeCommand(trimmed, lineNumber, errors);
          break;
        case 'BOX':
          validateBoxCommand(trimmed, lineNumber, errors);
          break;
        case 'BAR':
          validateBarCommand(trimmed, lineNumber, errors);
          break;
      }
    } catch (e: any) {
      errors.push({
        line: lineNumber,
        message: e.message || '語法錯誤',
        severity: 'error'
      });
    }
  });

  // 檢查必要指令
  if (!hasSizeCommand) {
    warnings.push({
      line: 0,
      message: '建議使用 SIZE 指令設定標籤尺寸',
      severity: 'warning'
    });
  }

  if (!hasClsCommand) {
    warnings.push({
      line: 0,
      message: '建議使用 CLS 指令清除緩衝區',
      severity: 'warning'
    });
  }

  if (!hasPrintCommand) {
    warnings.push({
      line: 0,
      message: '缺少 PRINT 指令,標籤可能不會列印',
      severity: 'warning'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// 驗證 SIZE 指令
function validateSizeCommand(line: string, lineNumber: number, errors: ValidationError[]) {
  const match = line.match(/SIZE\s+(\d+(?:\.\d+)?)\s*(mm|inch|dot)?,?\s*(\d+(?:\.\d+)?)\s*(mm|inch|dot)?/i);
  if (!match) {
    errors.push({
      line: lineNumber,
      message: 'SIZE 指令格式錯誤。正確格式: SIZE width mm, height mm',
      severity: 'error'
    });
  }
}

// 驗證 GAP 指令
function validateGapCommand(line: string, lineNumber: number, errors: ValidationError[]) {
  const match = line.match(/GAP\s+(\d+(?:\.\d+)?)\s*(mm|inch|dot)?,?\s*(\d+(?:\.\d+)?)\s*(mm|inch|dot)?/i);
  if (!match) {
    errors.push({
      line: lineNumber,
      message: 'GAP 指令格式錯誤。正確格式: GAP distance mm, offset mm',
      severity: 'error'
    });
  }
}

// 驗證 TEXT 指令
function validateTextCommand(line: string, lineNumber: number, errors: ValidationError[]) {
  const match = line.match(/TEXT\s+\d+,\d+,"[^"]+",\d+,\d+,\d+,"[^"]+"/i);
  if (!match) {
    errors.push({
      line: lineNumber,
      message: 'TEXT 指令格式錯誤。正確格式: TEXT x,y,"font",rotation,x_scale,y_scale,"content"',
      severity: 'error'
    });
  }
}

// 驗證 BARCODE 指令
function validateBarcodeCommand(line: string, lineNumber: number, errors: ValidationError[]) {
  const match = line.match(/BARCODE\s+\d+,\d+,"[^"]+",\d+,\d+,\d+,\d+,\d+,"[^"]+"/i);
  if (!match) {
    errors.push({
      line: lineNumber,
      message: 'BARCODE 指令格式錯誤。正確格式: BARCODE x,y,"type",height,readable,rotation,narrow,wide,"content"',
      severity: 'error'
    });
  }
}

// 驗證 QRCODE 指令
function validateQRCodeCommand(line: string, lineNumber: number, errors: ValidationError[]) {
  const match = line.match(/QRCODE\s+\d+,\d+,[LMQH],\d+,[AM],\d+,"[^"]+"/i);
  if (!match) {
    errors.push({
      line: lineNumber,
      message: 'QRCODE 指令格式錯誤。正確格式: QRCODE x,y,ecc_level,cell_width,mode,rotation,"content"',
      severity: 'error'
    });
  }
}

// 驗證 BOX 指令
function validateBoxCommand(line: string, lineNumber: number, errors: ValidationError[]) {
  const match = line.match(/BOX\s+\d+,\d+,\d+,\d+,\d+/i);
  if (!match) {
    errors.push({
      line: lineNumber,
      message: 'BOX 指令格式錯誤。正確格式: BOX x,y,x_end,y_end,thickness',
      severity: 'error'
    });
  }
}

// 驗證 BAR 指令
function validateBarCommand(line: string, lineNumber: number, errors: ValidationError[]) {
  const match = line.match(/BAR\s+\d+,\d+,\d+,\d+/i);
  if (!match) {
    errors.push({
      line: lineNumber,
      message: 'BAR 指令格式錯誤。正確格式: BAR x,y,width,height',
      severity: 'error'
    });
  }
}
