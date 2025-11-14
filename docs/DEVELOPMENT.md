# TSPL Simulator 開發指南

## 開發環境設定

### 必要工具

- Go 1.21 或更高版本
- Node.js 18 或更高版本
- npm 或 yarn
- Git

### 安裝與設定

#### 1. Clone 專案

```bash
git clone <repository-url>
cd TSPL-simulator
```

#### 2. 後端設定

```bash
cd backend
go mod download
go run cmd/server/main.go
```

後端將在 `http://localhost:8080` 啟動。

#### 3. 前端設定

```bash
cd frontend
npm install
npm start
```

前端將在 `http://localhost:3000` 啟動。

---

## 專案結構說明

### 後端架構

```
backend/
├── cmd/server/main.go          # 主程式入口
├── internal/
│   ├── api/                    # API 層
│   │   ├── handlers.go         # HTTP 處理器
│   │   └── routes.go           # 路由定義
│   ├── models/                 # 資料模型
│   │   ├── request.go          # 請求模型
│   │   └── response.go         # 回應模型
│   └── tspl/                   # TSPL 核心邏輯
│       ├── parser.go           # TSPL 解析器
│       ├── renderer.go         # 渲染引擎
│       ├── label.go            # 標籤模型
│       └── elements.go         # 元素定義
└── go.mod                      # Go 模組定義
```

### 前端架構

```
frontend/
├── src/
│   ├── components/             # React 組件
│   │   ├── TSPLEditor/         # TSPL 編輯器
│   │   ├── LabelPreview/       # 標籤預覽
│   │   ├── ControlPanel/       # 控制面板
│   │   └── ExampleSelector/    # 範例選擇器
│   ├── services/               # API 服務
│   │   └── tsplApi.ts          # TSPL API 客戶端
│   ├── types/                  # TypeScript 類型定義
│   │   ├── tspl.ts             # TSPL 類型
│   │   └── api.ts              # API 類型
│   ├── App.tsx                 # 主應用組件
│   └── index.tsx               # 應用入口
└── package.json                # npm 配置
```

---

## 開發流程

### 新增 TSPL 指令支援

#### 1. 後端實作

在 `backend/internal/tspl/parser.go` 新增解析邏輯:

```go
func (p *Parser) parseNewCommand(parts []string) error {
    // 解析邏輯
    return nil
}
```

在 `parseLine` 方法中註冊新指令:

```go
case "NEWCOMMAND":
    return p.parseNewCommand(parts)
```

#### 2. 前端實作

在 `frontend/src/components/LabelPreview/Canvas.tsx` 新增渲染邏輯:

```typescript
const drawNewElement = (ctx: CanvasRenderingContext2D, element: RenderElement) => {
  // 渲染邏輯
};
```

在 `drawElement` 方法中註冊:

```typescript
case 'NEWCOMMAND':
  drawNewElement(ctx, element);
  break;
```

### 新增 API 端點

#### 1. 定義資料模型

在 `backend/internal/models/` 中定義請求和回應模型。

#### 2. 實作處理器

在 `backend/internal/api/handlers.go` 中新增處理器:

```go
func NewHandler(c *gin.Context) {
    // 處理邏輯
}
```

#### 3. 註冊路由

在 `backend/internal/api/routes.go` 中註冊路由:

```go
v1.POST("/new-endpoint", NewHandler)
```

#### 4. 前端整合

在 `frontend/src/services/tsplApi.ts` 中新增 API 調用:

```typescript
export const callNewEndpoint = async (data: any): Promise<any> => {
  const response = await apiClient.post('/new-endpoint', data);
  return response.data;
};
```

---

## 測試

### 後端測試

```bash
cd backend
go test ./...
```

### 前端測試

```bash
cd frontend
npm test
```

---

## 建置

### 後端建置

```bash
cd backend
go build -o tspl-simulator cmd/server/main.go
```

### 前端建置

```bash
cd frontend
npm run build
```

建置結果將在 `frontend/build/` 目錄中。

---

## Docker 部署

### 建置映像

```bash
# 後端
docker build -f docker/Dockerfile.backend -t tspl-simulator-backend .

# 前端
docker build -f docker/Dockerfile.frontend -t tspl-simulator-frontend .
```

### 使用 Docker Compose

```bash
docker-compose -f docker/docker-compose.yml up
```

---

## 常見問題

### CORS 錯誤

確保後端的 CORS 設定正確:

```go
config.AllowOrigins = []string{"http://localhost:3000"}
```

### 連接後端失敗

1. 確認後端服務正在運行
2. 檢查 API_BASE_URL 設定 (`frontend/src/types/api.ts`)
3. 確認防火牆設定

### Canvas 渲染問題

1. 檢查瀏覽器控制台錯誤
2. 確認 DPI 和單位轉換計算
3. 驗證渲染數據格式

---

## 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 程式碼風格

- **Go**: 遵循 `gofmt` 格式
- **TypeScript**: 使用 ESLint 和 Prettier
- **提交訊息**: 使用清晰的描述性訊息

---

## 授權

MIT License
