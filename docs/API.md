# TSPL Simulator API 文件

## 基礎資訊

- **Base URL**: `http://localhost:8080/api/v1`
- **Content-Type**: `application/json`

## 端點

### 1. 健康檢查

檢查服務是否正常運行。

```
GET /health
```

**回應範例:**
```json
{
  "status": "healthy",
  "service": "TSPL Simulator Backend"
}
```

---

### 2. 解析 TSPL

解析 TSPL 命令並返回標籤結構。

```
POST /api/v1/parse
```

**請求 Body:**
```json
{
  "tspl_code": "SIZE 100 mm, 50 mm\nGAP 3 mm, 0 mm\nCLS\nTEXT 100,100,\"3\",0,1,1,\"Hello TSPL\"\nPRINT 1,1"
}
```

**成功回應 (200 OK):**
```json
{
  "success": true,
  "label": {
    "width": 100,
    "height": 50,
    "gap": 3,
    "direction": 1,
    "elements": [
      {
        "type": "TEXT",
        "x": 100,
        "y": 100,
        "properties": {
          "font": "3",
          "rotation": 0,
          "x_scale": 1,
          "y_scale": 1,
          "content": "Hello TSPL"
        }
      }
    ]
  }
}
```

**錯誤回應 (400 Bad Request):**
```json
{
  "error": "TSPL 解析錯誤",
  "details": "解析錯誤於: INVALID_COMMAND - 未知命令"
}
```

---

### 3. 渲染 TSPL

渲染 TSPL 為可視化數據。

```
POST /api/v1/render
```

**請求 Body:**
```json
{
  "tspl_code": "SIZE 100 mm, 50 mm\nGAP 3 mm, 0 mm\nCLS\nTEXT 100,100,\"3\",0,1,1,\"Hello TSPL\"\nPRINT 1,1"
}
```

**成功回應 (200 OK):**
```json
{
  "success": true,
  "data": {
    "width": 100,
    "height": 50,
    "elements": [
      {
        "type": "TEXT",
        "x": 100,
        "y": 100,
        "properties": {
          "font": "3",
          "rotation": 0,
          "x_scale": 1,
          "y_scale": 1,
          "content": "Hello TSPL"
        }
      }
    ]
  }
}
```

---

### 4. 取得範例

取得預定義的 TSPL 範例。

```
GET /api/v1/examples
```

**成功回應 (200 OK):**
```json
{
  "examples": [
    {
      "name": "基本文字",
      "description": "簡單的文字標籤範例",
      "code": "SIZE 100 mm, 50 mm\nGAP 3 mm, 0 mm\nDIRECTION 1,0\nCLS\nTEXT 100,100,\"3\",0,1,1,\"Hello TSPL\"\nPRINT 1,1"
    }
  ]
}
```

---

## 錯誤代碼

| 狀態碼 | 說明 |
|--------|------|
| 200 | 請求成功 |
| 400 | 請求格式錯誤或 TSPL 解析失敗 |
| 500 | 伺服器內部錯誤 |

## 資料模型

### Element 類型

- `TEXT` - 文字元素
- `BARCODE` - 條碼元素
- `QRCODE` - QR Code 元素
- `BOX` - 方框元素
- `BAR` - 線條元素

### Element Properties

#### TEXT
```json
{
  "font": "字型編號",
  "rotation": "旋轉角度 (0, 90, 180, 270)",
  "x_scale": "X 軸縮放",
  "y_scale": "Y 軸縮放",
  "content": "文字內容"
}
```

#### BARCODE
```json
{
  "type": "條碼類型 (如: 128, 39, EAN13)",
  "height": "高度",
  "readable": "是否顯示文字",
  "rotation": "旋轉角度",
  "narrow": "窄條寬度",
  "wide": "寬條寬度",
  "content": "條碼內容"
}
```

#### QRCODE
```json
{
  "ecc_level": "錯誤更正等級 (L, M, Q, H)",
  "cell_width": "模塊寬度",
  "mode": "模式 (A 或 M)",
  "rotation": "旋轉角度",
  "content": "QR Code 內容"
}
```
