# TSPL Simulator

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## English

A web-based TSPL (TSC Printer Language) label simulator and preview tool.

**✨ Runs entirely in your browser - No backend required!**

### Features

- 📝 Online TSPL editor with syntax highlighting
- 🔍 Real-time syntax validation
- 👁️ Live label preview
- 🎨 Support for text, barcodes, QR codes, and graphics
- 💻 Pure frontend implementation
- 📱 Responsive web interface
- 🚀 Ready to use - No installation needed
- 📦 10+ built-in examples

### Tech Stack

- **Frontend**: React + TypeScript
- **Rendering**: HTML5 Canvas
- **Architecture**: Pure frontend (no backend needed)

### Quick Start

#### Requirements

- Node.js 18+
- npm or yarn

#### Installation & Running

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start development server
npm start
```

The application will open at http://localhost:3000

#### Build for Production

```bash
cd frontend
npm run build
```

Build files will be in `frontend/build/` directory, ready for deployment to any static hosting service.

### Supported TSPL Commands

- **SIZE** - Set label dimensions
- **GAP** - Set label gap
- **DIRECTION** - Set print direction
- **CLS** - Clear buffer
- **TEXT** - Print text
- **BARCODE** - Print barcodes (Code 128, Code 39, EAN13, etc.)
- **QRCODE** - Print QR codes
- **BOX** - Draw rectangles
- **BAR** - Draw solid bars/lines
- **PRINT** - Execute print

For detailed command reference, see [docs/TSPL_COMMANDS.md](./docs/TSPL_COMMANDS.md)

### Built-in Examples

The application includes 10 practical examples:

1. **Basic Text** - Simple text label
2. **Barcode** - Code 128 barcode
3. **QR Code** - QR code label
4. **Product Label** - Retail product tag
5. **Shipping Label** - Logistics shipping label
6. **Inventory Label** - Warehouse management
7. **Name Badge** - Event visitor badge
8. **Asset Tag** - Company property tag
9. **Price Tag** - Store shelf label
10. **Food Label** - Fresh product label

All examples are available in the `examples/` directory.

### Usage Example

```tspl
SIZE 100 mm, 50 mm
GAP 3 mm, 0 mm
CLS
TEXT 100,100,"3",0,1,1,"Hello TSPL!"
BARCODE 100,200,"128",100,1,0,2,2,"123456789"
QRCODE 400,200,H,5,A,0,"https://example.com"
PRINT 1,1
```

### Deployment

#### Vercel (Recommended)

```bash
npm i -g vercel
cd frontend
vercel --prod
```

#### Netlify

Drag and drop the `frontend/build` folder to Netlify.

#### GitHub Pages

Add deployment script to `frontend/package.json` and run `npm run deploy`.

### Browser Support

- Chrome (Recommended)
- Firefox
- Safari
- Edge

Requires a modern browser with HTML5 Canvas support.

### License

MIT License

### Contributing

Issues and Pull Requests are welcome!

---

<a name="chinese"></a>
## 中文

一個基於網頁的 TSPL (TSC Printer Language) 標籤模擬器和預覽工具。

**✨ 完全在瀏覽器中運行 - 無需後端!**

### 功能特色

- 📝 線上 TSPL 編輯器,支援語法高亮
- 🔍 即時語法驗證
- 👁️ 即時標籤預覽
- 🎨 支援文字、條碼、QR Code 和圖形
- 💻 純前端實作
- 📱 響應式網頁介面
- 🚀 開啟即用 - 無需安裝
- 📦 10+ 內建範例

### 技術棧

- **前端**: React + TypeScript
- **渲染**: HTML5 Canvas
- **架構**: 純前端 (不需要後端)

### 快速開始

#### 環境需求

- Node.js 18+
- npm 或 yarn

#### 安裝與執行

```bash
# 進入前端目錄
cd frontend

# 安裝依賴 (如果還沒安裝)
npm install

# 啟動開發服務器
npm start
```

應用將在 http://localhost:3000 啟動

#### 建置生產版本

```bash
cd frontend
npm run build
```

建置檔案將在 `frontend/build/` 目錄中,可部署到任何靜態網站託管服務。

### 支援的 TSPL 指令

- **SIZE** - 設定標籤尺寸
- **GAP** - 設定標籤間距
- **DIRECTION** - 設定列印方向
- **CLS** - 清除緩衝區
- **TEXT** - 列印文字
- **BARCODE** - 列印條碼 (Code 128, Code 39, EAN13 等)
- **QRCODE** - 列印 QR Code
- **BOX** - 繪製矩形
- **BAR** - 繪製實心線條
- **PRINT** - 執行列印

詳細指令說明請參考 [docs/TSPL_COMMANDS.md](./docs/TSPL_COMMANDS.md)

### 內建範例

應用包含 10 個實用範例:

1. **基本文字** - 簡單文字標籤
2. **條碼** - Code 128 條碼
3. **QR Code** - QR Code 標籤
4. **產品標籤** - 零售商品標籤
5. **運輸標籤** - 物流配送標籤
6. **庫存標籤** - 倉庫管理標籤
7. **名牌** - 活動訪客證
8. **資產標籤** - 公司財產標籤
9. **價格標籤** - 商店貨架標籤
10. **食品標籤** - 生鮮產品標籤

所有範例都在 `examples/` 目錄中。

### 使用範例

```tspl
SIZE 100 mm, 50 mm
GAP 3 mm, 0 mm
CLS
TEXT 100,100,"3",0,1,1,"Hello TSPL!"
BARCODE 100,200,"128",100,1,0,2,2,"123456789"
QRCODE 400,200,H,5,A,0,"https://example.com"
PRINT 1,1
```

### 部署

#### Vercel (推薦)

```bash
npm i -g vercel
cd frontend
vercel --prod
```

#### Netlify

直接拖放 `frontend/build` 資料夾到 Netlify。

#### GitHub Pages

在 `frontend/package.json` 添加部署腳本後執行 `npm run deploy`。

### 瀏覽器支援

- Chrome (推薦)
- Firefox
- Safari
- Edge

需要支援 HTML5 Canvas 的現代瀏覽器。

### 授權

MIT License

### 貢獻

歡迎提交 Issues 和 Pull Requests!

---

**Start now! Visit http://localhost:3000 after running `npm start` 🚀**

**現在就開始! 執行 `npm start` 後訪問 http://localhost:3000 🚀**
