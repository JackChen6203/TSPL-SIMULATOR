# Git 推送指南

## ⚠️ 當前狀態

你的代碼已經 commit 完成,但推送失敗因為權限問題:
```
remote: Permission to Davis1233798/TSPL-SIMULATOR.git denied to JackChen6203.
```

這表示你需要使用 **Davis1233798** 賬號的認證信息來推送。

---

## 🔐 解決方案 1: 使用 Personal Access Token (推薦)

### 步驟 1: 創建 GitHub Personal Access Token

1. **登入 GitHub** 使用 **Davis1233798** 賬號

2. **進入 Settings**:
   ```
   頭像 → Settings → Developer settings → Personal access tokens → Tokens (classic)
   ```

3. **生成新 Token**:
   - 點擊 "Generate new token" → "Generate new token (classic)"
   - Note: `TSPL-SIMULATOR-Deploy`
   - Expiration: 選擇過期時間 (建議 90 days 或 No expiration)
   - Select scopes: 勾選 `repo` (完整權限)

4. **複製 Token**:
   - 生成後 **立即複製** token (只會顯示一次!)
   - 格式類似: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 步驟 2: 配置 Git 使用 Token

**方法 A: 使用 Git Credential Manager (推薦)**

```powershell
# 設置 credential helper
git config --global credential.helper wincred

# 推送時會彈出認證窗口
# Username: Davis1233798
# Password: 貼上你的 Personal Access Token
git push -u origin master
```

**方法 B: 直接在 URL 中使用 Token**

```powershell
# 設置遠端 URL (包含 token)
git remote set-url origin https://Davis1233798:YOUR_TOKEN_HERE@github.com/Davis1233798/TSPL-SIMULATOR.git

# 推送
git push -u origin master
```

替換 `YOUR_TOKEN_HERE` 為你的實際 token。

**方法 C: 使用環境變數**

```powershell
# 設置環境變數
$env:GIT_TOKEN = "your_token_here"

# 推送
git push https://Davis1233798:$env:GIT_TOKEN@github.com/Davis1233798/TSPL-SIMULATOR.git master
```

---

## 🔑 解決方案 2: 使用 SSH 金鑰

### 步驟 1: 生成 SSH 金鑰

```powershell
# 生成新的 SSH 金鑰
ssh-keygen -t ed25519 -C "your_email@example.com"

# 保存位置: C:\Users\solidityDeveloper\.ssh\id_ed25519
# 可以設置 passphrase 或直接按 Enter

# 啟動 ssh-agent
Start-Service ssh-agent

# 添加私鑰
ssh-add C:\Users\solidityDeveloper\.ssh\id_ed25519
```

### 步驟 2: 添加公鑰到 GitHub

```powershell
# 顯示公鑰
Get-Content C:\Users\solidityDeveloper\.ssh\id_ed25519.pub
```

1. 複製公鑰內容
2. 登入 GitHub (Davis1233798 賬號)
3. 進入 `Settings → SSH and GPG keys → New SSH key`
4. Title: `TSPL-Dev-Machine`
5. 貼上公鑰,保存

### 步驟 3: 更改遠端 URL 為 SSH

```powershell
# 更改為 SSH URL
git remote set-url origin git@github.com:Davis1233798/TSPL-SIMULATOR.git

# 測試 SSH 連接
ssh -T git@github.com

# 推送
git push -u origin master
```

---

## 🚀 快速推送 (選擇其中一種方法)

### 使用 Token (最快)

```powershell
# 1. 創建 Personal Access Token (見上面步驟)

# 2. 設置遠端 URL
git remote set-url origin https://Davis1233798:YOUR_TOKEN@github.com/Davis1233798/TSPL-SIMULATOR.git

# 3. 推送
git push -u origin master
```

### 使用 SSH

```powershell
# 1. 生成並添加 SSH 金鑰 (見上面步驟)

# 2. 更改遠端 URL
git remote set-url origin git@github.com:Davis1233798/TSPL-SIMULATOR.git

# 3. 推送
git push -u origin master
```

---

## ✅ 推送成功後

### 1. 驗證推送

訪問: https://github.com/Davis1233798/TSPL-SIMULATOR

你應該看到:
- ✅ 所有文件已上傳
- ✅ README.md 顯示專案介紹
- ✅ GitHub Actions 開始運行 (Actions 標籤)

### 2. 配置 GitHub Secrets (用於自動部署)

進入倉庫設置:
```
Settings → Secrets and variables → Actions → New repository secret
```

添加以下 secrets:

| 名稱 | 值 | 說明 |
|------|------|------|
| `DEPLOY_HOST` | `your-ubuntu-ip` | Ubuntu 主機 IP |
| `DEPLOY_USER` | `ubuntu` | SSH 用戶名 |
| `DEPLOY_SSH_KEY` | `私鑰內容` | SSH 私鑰完整內容 |
| `DEPLOY_PORT` | `22` | SSH 端口 (可選) |

### 3. 觸發 CI/CD

每次推送到 `master` 分支,GitHub Actions 會自動:
1. ✅ 運行後端測試
2. ✅ 運行前端測試
3. ✅ 構建前後端
4. ✅ 部署到 Ubuntu 主機

查看進度:
```
倉庫 → Actions 標籤
```

---

## 🐛 常見問題

### Q1: Token 權限不足

**錯誤**: `403 permission denied`

**解決**: 確保 Token 有 `repo` 完整權限

### Q2: SSH 連接失敗

**錯誤**: `Permission denied (publickey)`

**解決**:
```powershell
# 測試 SSH
ssh -T git@github.com

# 如果失敗,檢查 ssh-agent
Get-Service ssh-agent
Start-Service ssh-agent
ssh-add C:\Users\solidityDeveloper\.ssh\id_ed25519
```

### Q3: 推送被拒絕

**錯誤**: `! [rejected] master -> master (fetch first)`

**解決**:
```powershell
# 先拉取遠端更改
git pull origin master --rebase

# 再推送
git push -u origin master
```

### Q4: 大文件推送失敗

**錯誤**: `fatal: the remote end hung up unexpectedly`

**解決**:
```powershell
# 增加緩衝區大小
git config http.postBuffer 524288000

# 再次推送
git push -u origin master
```

---

## 📋 推送後檢查清單

- [ ] GitHub 倉庫顯示所有文件
- [ ] README.md 正確顯示
- [ ] GitHub Actions 開始運行
- [ ] CI/CD workflow 測試通過
- [ ] 後端測試成功
- [ ] 前端構建成功
- [ ] (如已配置) 自動部署到 Ubuntu

---

## 🔄 後續更新流程

```powershell
# 1. 修改代碼
# 2. 提交更改
git add .
git commit -m "更新說明"

# 3. 推送 (自動觸發 CI/CD)
git push origin master
```

---

## 📞 需要幫助?

如果遇到其他問題:

1. 檢查錯誤訊息
2. 參考 [CICD_DEPLOYMENT.md](CICD_DEPLOYMENT.md)
3. 查看 GitHub 倉庫 Issues
4. 檢查 GitHub Actions 日誌

---

**立即行動**: 選擇上面的方法 1 (Token) 或方法 2 (SSH),完成認證配置後推送! 🚀
