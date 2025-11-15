#!/bin/bash

echo "=============================================="
echo "  TSPL Simulator 部署狀態診斷"
echo "=============================================="
echo ""

# 顏色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. 檢查部署目錄
echo -e "${YELLOW}[1/6] 檢查部署目錄${NC}"
echo "=============================================="
echo "後端目錄:"
ls -lh /opt/tspl-simulator/backend/ 2>/dev/null || echo -e "${RED}✗ 後端目錄不存在${NC}"
echo ""
echo "前端目錄:"
ls -lh /opt/tspl-simulator/frontend/build/ 2>/dev/null || echo -e "${RED}✗ 前端目錄不存在${NC}"
echo ""

# 2. 檢查服務狀態
echo -e "${YELLOW}[2/6] 檢查服務狀態${NC}"
echo "=============================================="
echo "後端服務:"
sudo systemctl status tspl-simulator --no-pager -l 2>/dev/null || echo -e "${RED}✗ 服務不存在或未運行${NC}"
echo ""
echo "Nginx 服務:"
sudo systemctl status nginx --no-pager | grep Active
echo ""

# 3. 檢查 Nginx 配置
echo -e "${YELLOW}[3/6] 檢查 Nginx 配置${NC}"
echo "=============================================="
echo "sites-enabled:"
ls -la /etc/nginx/sites-enabled/
echo ""
echo "當前配置內容:"
sudo nginx -T 2>/dev/null | grep -A 5 "server_name\|root\|listen 80"
echo ""

# 4. 檢查前端文件
echo -e "${YELLOW}[4/6] 檢查前端構建文件${NC}"
echo "=============================================="
if [ -d /opt/tspl-simulator/frontend/build ]; then
    echo -e "${GREEN}✓ 前端 build 目錄存在${NC}"
    echo "文件列表:"
    ls -lh /opt/tspl-simulator/frontend/build/ | head -n 10
    echo ""
    if [ -f /opt/tspl-simulator/frontend/build/index.html ]; then
        echo -e "${GREEN}✓ index.html 存在${NC}"
    else
        echo -e "${RED}✗ index.html 不存在${NC}"
    fi
else
    echo -e "${RED}✗ 前端 build 目錄不存在${NC}"
    echo "需要構建前端或重新部署"
fi
echo ""

# 5. 檢查後端二進制文件
echo -e "${YELLOW}[5/6] 檢查後端程序${NC}"
echo "=============================================="
if [ -f /opt/tspl-simulator/backend/tspl-simulator ]; then
    echo -e "${GREEN}✓ 後端程序存在${NC}"
    ls -lh /opt/tspl-simulator/backend/tspl-simulator
    echo ""
    # 測試後端
    if curl -s http://localhost:8080/api/health >/dev/null 2>&1; then
        echo -e "${GREEN}✓ 後端 API 運行中${NC}"
    else
        echo -e "${YELLOW}⚠ 後端 API 無回應${NC}"
        echo "查看後端日誌:"
        sudo journalctl -u tspl-simulator -n 20 --no-pager
    fi
else
    echo -e "${RED}✗ 後端程序不存在${NC}"
fi
echo ""

# 6. 測試訪問
echo -e "${YELLOW}[6/6] 測試訪問${NC}"
echo "=============================================="
echo "測試根路徑:"
curl -I http://localhost/ 2>&1 | head -n 10
echo ""

# 總結
echo "=============================================="
echo -e "${BLUE}  診斷總結${NC}"
echo "=============================================="

# 檢查各項狀態
BACKEND_EXISTS=false
FRONTEND_EXISTS=false
NGINX_CONFIGURED=false

[ -f /opt/tspl-simulator/backend/tspl-simulator ] && BACKEND_EXISTS=true
[ -f /opt/tspl-simulator/frontend/build/index.html ] && FRONTEND_EXISTS=true
[ -f /etc/nginx/sites-available/tspl-simulator ] && NGINX_CONFIGURED=true

echo ""
echo "部署狀態:"
if $BACKEND_EXISTS; then
    echo -e "  後端程序: ${GREEN}✓ 存在${NC}"
else
    echo -e "  後端程序: ${RED}✗ 不存在 - 需要部署${NC}"
fi

if $FRONTEND_EXISTS; then
    echo -e "  前端文件: ${GREEN}✓ 存在${NC}"
else
    echo -e "  前端文件: ${RED}✗ 不存在 - 需要構建/部署${NC}"
fi

if $NGINX_CONFIGURED; then
    echo -e "  Nginx 配置: ${GREEN}✓ 已配置${NC}"
else
    echo -e "  Nginx 配置: ${RED}✗ 未配置 - 仍使用預設頁面${NC}"
fi

echo ""
echo "建議操作:"
if ! $FRONTEND_EXISTS; then
    echo "  1. 構建前端: cd frontend && npm run build"
    echo "  2. 或觸發 GitHub Actions 自動部署"
fi
if ! $NGINX_CONFIGURED; then
    echo "  3. 配置 Nginx 指向前端目錄"
fi
echo ""
