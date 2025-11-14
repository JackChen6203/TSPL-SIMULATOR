# TSPL 指令說明

本文件說明 TSPL Simulator 支援的 TSPL (TSC Printer Language) 指令。

## 基本設定指令

### SIZE

設定標籤尺寸。

**語法:**
```
SIZE width unit, height unit
```

**參數:**
- `width`: 標籤寬度
- `height`: 標籤高度
- `unit`: 單位 (mm, inch, dot)

**範例:**
```tspl
SIZE 100 mm, 50 mm
SIZE 4 inch, 2 inch
```

---

### GAP

設定標籤間距。

**語法:**
```
GAP distance unit, offset unit
```

**參數:**
- `distance`: 間距距離
- `offset`: 偏移量
- `unit`: 單位 (mm, inch, dot)

**範例:**
```tspl
GAP 3 mm, 0 mm
GAP 0.12 inch, 0 inch
```

---

### DIRECTION

設定列印方向。

**語法:**
```
DIRECTION direction[, mirror]
```

**參數:**
- `direction`: 方向 (0 或 1)
  - 0: 正常方向
  - 1: 反向
- `mirror`: 鏡像 (可選, 0 或 1)

**範例:**
```tspl
DIRECTION 1
DIRECTION 1,0
```

---

### CLS

清除標籤緩衝區。

**語法:**
```
CLS
```

**說明:** 此指令會清除標籤記憶體中的所有內容。

---

## 文字指令

### TEXT

列印文字。

**語法:**
```
TEXT x, y, "font", rotation, x_scale, y_scale, "content"
```

**參數:**
- `x`: X 座標 (dots)
- `y`: Y 座標 (dots)
- `font`: 字型編號 (1-8 或 ROMAN.TTF 等)
- `rotation`: 旋轉角度 (0, 90, 180, 270)
- `x_scale`: X 軸放大倍數 (1-10)
- `y_scale`: Y 軸放大倍數 (1-10)
- `content`: 文字內容

**範例:**
```tspl
TEXT 100,100,"3",0,1,1,"Hello World"
TEXT 50,200,"4",90,2,2,"Rotated Text"
```

---

## 條碼指令

### BARCODE

列印條碼。

**語法:**
```
BARCODE x, y, "type", height, readable, rotation, narrow, wide, "content"
```

**參數:**
- `x`: X 座標
- `y`: Y 座標
- `type`: 條碼類型
  - `128`: Code 128
  - `39`: Code 39
  - `EAN13`: EAN-13
  - `UPCA`: UPC-A
- `height`: 條碼高度 (dots)
- `readable`: 是否顯示文字 (0: 否, 1: 是)
- `rotation`: 旋轉角度
- `narrow`: 窄條寬度 (dots)
- `wide`: 寬條寬度 (dots)
- `content`: 條碼資料

**範例:**
```tspl
BARCODE 100,100,"128",100,1,0,2,2,"123456789"
BARCODE 50,250,"39",80,1,0,2,4,"ABC123"
```

---

### QRCODE

列印 QR Code。

**語法:**
```
QRCODE x, y, ecc_level, cell_width, mode, rotation, "content"
```

**參數:**
- `x`: X 座標
- `y`: Y 座標
- `ecc_level`: 錯誤更正等級
  - `L`: 7% 錯誤更正
  - `M`: 15% 錯誤更正
  - `Q`: 25% 錯誤更正
  - `H`: 30% 錯誤更正
- `cell_width`: 模塊寬度 (dots)
- `mode`: 模式
  - `A`: 自動
  - `M`: 手動
- `rotation`: 旋轉角度 (0, 90, 180, 270)
- `content`: QR Code 資料

**範例:**
```tspl
QRCODE 150,100,H,5,A,0,"https://example.com"
QRCODE 200,200,M,4,A,0,"QR Code Content"
```

---

## 繪圖指令

### BOX

繪製矩形框。

**語法:**
```
BOX x, y, x_end, y_end, thickness
```

**參數:**
- `x`: 起始 X 座標
- `y`: 起始 Y 座標
- `x_end`: 結束 X 座標
- `y_end`: 結束 Y 座標
- `thickness`: 線條粗細 (dots)

**範例:**
```tspl
BOX 50,50,550,450,3
BOX 100,100,300,200,1
```

---

### BAR

繪製實心矩形。

**語法:**
```
BAR x, y, width, height
```

**參數:**
- `x`: X 座標
- `y`: Y 座標
- `width`: 寬度 (dots)
- `height`: 高度 (dots)

**範例:**
```tspl
BAR 100,100,400,5
BAR 50,200,2,100
```

---

## 列印控制指令

### PRINT

執行列印。

**語法:**
```
PRINT quantity[, copy]
```

**參數:**
- `quantity`: 列印份數
- `copy`: 每份副本數 (可選)

**範例:**
```tspl
PRINT 1
PRINT 5,2
```

---

## 完整範例

### 基本文字標籤

```tspl
SIZE 100 mm, 50 mm
GAP 3 mm, 0 mm
DIRECTION 1,0
CLS
TEXT 100,100,"3",0,1,1,"Product Name"
TEXT 100,150,"3",0,1,1,"Description Line"
PRINT 1,1
```

### 條碼標籤

```tspl
SIZE 100 mm, 50 mm
GAP 3 mm, 0 mm
CLS
TEXT 100,50,"3",0,1,1,"Product Code:"
BARCODE 100,100,"128",100,1,0,2,2,"123456789"
PRINT 1,1
```

### QR Code 標籤

```tspl
SIZE 100 mm, 50 mm
GAP 3 mm, 0 mm
CLS
QRCODE 150,100,H,5,A,0,"https://example.com"
TEXT 100,300,"3",0,1,1,"Scan for more info"
PRINT 1,1
```

### 綜合範例

```tspl
SIZE 100 mm, 60 mm
GAP 3 mm, 0 mm
DIRECTION 1,0
CLS
BOX 10,10,790,470,2
TEXT 100,50,"4",0,1,1,"Company Name"
BAR 50,100,700,2
TEXT 100,120,"3",0,1,1,"Product: Widget XYZ"
BARCODE 100,180,"128",80,1,0,2,2,"987654321"
QRCODE 550,180,M,4,A,0,"https://product.info"
TEXT 100,350,"2",0,1,1,"Manufactured: 2024-01-01"
PRINT 1,1
```
