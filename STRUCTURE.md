# TSPL Simulator - 專案結構與開發計畫

## 專案概述
TSPL Simulator 是一個用於模擬和預覽 TSPL (TSC Printer Language) 標籤列印效果的 Web 應用程式。

## 技術棧
- **後端**: Go (Golang)
- **前端**: React + TypeScript
- **渲染**: HTML5 Canvas

## 完整專案結構

```
TSPL-simulator/
│
├── README.md                    # 專案主說明文件
├── .gitignore                   # Git 忽略檔案
│
├── backend/                     # Go 後端服務
│   ├── cmd/
│   │   └── server/
│   │       └── main.go          # 主程式進入點
│   │
│   ├── internal/
│   │   ├── api/                 # API 路由與處理器
│   │   │   ├── handlers.go      # HTTP 處理器
│   │   │   ├── middleware.go    # 中間件
│   │   │   └── routes.go        # 路由定義
│   │   │
│   │   ├── tspl/                # TSPL 核心
│   │   │   ├── parser.go        # 解析器
│   │   │   ├── renderer.go      # 渲染引擎
│   │   │   ├── commands.go      # 指令定義
│   │   │   ├── label.go         # 標籤模型
│   │   │   └── elements.go      # 繪圖元素
│   │   │
│   │   └── models/              # 資料模型
│   │       ├── request.go       # 請求模型
│   │       └── response.go      # 回應模型
│   │
│   ├── pkg/                     # 公開套件
│   │   └── utils/
│   │       └── helpers.go       # 輔助函數
│   │
│   ├── tests/                   # 測試檔案
│   │   ├── parser_test.go
│   │   └── renderer_test.go
│   │
│   ├── go.mod                   # Go 模組定義
│   └── README.md                # 後端說明
│
├── frontend/                    # React 前端
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── TSPLEditor/      # 編輯器組件
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.css
│   │   │   │
│   │   │   ├── LabelPreview/    # 預覽組件
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Canvas.tsx
│   │   │   │   └── styles.css
│   │   │   │
│   │   │   ├── ControlPanel/    # 控制面板
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.css
│   │   │   │
│   │   │   └── ExampleSelector/ # 範例選擇器
│   │   │       ├── index.tsx
│   │   │       └── styles.css
│   │   │
│   │   ├── services/            # API 服務
│   │   │   └── tsplApi.ts
│   │   │
│   │   ├── types/               # TypeScript 類型
│   │   │   ├── tspl.ts
│   │   │   └── api.ts
│   │   │
│   │   ├── utils/               # 工具函數
│   │   │   └── helpers.ts
│   │   │
│   │   ├── hooks/               # React Hooks
│   │   │   └── useTSPL.ts
│   │   │
│   │   ├── examples/            # TSPL 範例
│   │   │   └── samples.ts
│   │   │
│   │   ├── App.tsx              # 主組件
│   │   ├── App.css
│   │   ├── index.tsx            # 進入點
│   │   └── index.css
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                        # 文件
│   ├── API.md                   # API 文件
│   ├── TSPL_COMMANDS.md         # TSPL 指令說明
│   └── DEVELOPMENT.md           # 開發指南
│
├── examples/                    # TSPL 範例
│   ├── basic_text.tspl
│   ├── barcode.tspl
│   └── qrcode.tspl
│
└── docker/                      # Docker 配置
    ├── Dockerfile.backend
    ├── Dockerfile.frontend
    └── docker-compose.yml
```

## 開發計畫 (7週)

### Week 1: 基礎架構
- [ ] 建立專案結構
- [ ] 設定 Go 後端基本框架
- [ ] 設定 React 前端
- [ ] 基本 API 通訊

### Week 2: TSPL 核心功能
- [ ] TSPL 解析器 (基本指令)
- [ ] 渲染引擎
- [ ] 單元測試

### Week 3: 進階 TSPL 功能
- [ ] 條碼支援
- [ ] QR Code 支援
- [ ] 點陣圖支援

### Week 4: 前端開發
- [ ] 編輯器組件
- [ ] Canvas 渲染組件
- [ ] 條碼/QR Code 渲染

### Week 5: 使用者體驗優化
- [ ] 控制面板
- [ ] 範例選擇器
- [ ] 錯誤處理

### Week 6: 進階功能
- [ ] 匯出功能 (PNG/PDF)
- [ ] 儲存/載入
- [ ] 即時預覽

### Week 7: 部署與文件
- [ ] Docker 容器化
- [ ] API 文件
- [ ] 使用者文件

## 快速開始

### 後端
```bash
cd backend
go mod init github.com/tspl-simulator/backend
go mod tidy
go run cmd/server/main.go
```

### 前端
```bash
cd frontend
npm install
npm start
```

## 支援的 TSPL 指令

- SIZE - 設定標籤尺寸
- GAP - 設定間距
- DIRECTION - 設定方向
- CLS - 清除緩衝區
- TEXT - 列印文字
- BARCODE - 列印條碼
- QRCODE - 列印 QR Code
- BOX - 繪製方框
- BAR - 繪製線條
- PRINT - 執行列印

## 授權
MIT License
