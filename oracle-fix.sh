#!/bin/bash

echo "=============================================="
echo "  Oracle Cloud 防火牆快速修復腳本"
echo "=============================================="
echo ""

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 檢查當前 iptables 規則
echo -e "${YELLOW}[1/5] 檢查當前 iptables 規則...${NC}"
echo "----------------------------------------"
sudo iptables -L INPUT -n --line-numbers | grep -E "dpt:(22|80|443)" || echo "未找到 80/443 端口規則"
echo ""

# 2. 添加 HTTP/HTTPS 規則
echo -e "${YELLOW}[2/5] 添加防火牆規則...${NC}"
echo "----------------------------------------"

# 檢查是否已存在規則
if sudo iptables -L INPUT -n | grep -q "dpt:80"; then
    echo "✓ 端口 80 規則已存在"
else
    echo "添加端口 80 規則..."
    sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
    echo -e "${GREEN}✓ 已添加端口 80${NC}"
fi

if sudo iptables -L INPUT -n | grep -q "dpt:443"; then
    echo "✓ 端口 443 規則已存在"
else
    echo "添加端口 443 規則..."
    sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
    echo -e "${GREEN}✓ 已添加端口 443${NC}"
fi
echo ""

# 3. 保存 iptables 規則
echo -e "${YELLOW}[3/5] 保存防火牆規則 (重啟後保留)...${NC}"
echo "----------------------------------------"
sudo netfilter-persistent save 2>/dev/null || sudo iptables-save | sudo tee /etc/iptables/rules.v4 > /dev/null
echo -e "${GREEN}✓ 規則已保存${NC}"
echo ""

# 4. 顯示當前規則
echo -e "${YELLOW}[4/5] 當前防火牆規則:${NC}"
echo "----------------------------------------"
sudo iptables -L INPUT -n --line-numbers | head -n 15
echo ""

# 5. 配置 Nginx
echo -e "${YELLOW}[5/5] 配置 Nginx...${NC}"
echo "----------------------------------------"

# 檢查是否已有 tspl-simulator 配置
if [ -f /etc/nginx/sites-available/tspl-simulator ]; then
    echo "✓ Nginx 配置已存在"
else
    echo "創建 Nginx 配置..."
    sudo tee /etc/nginx/sites-available/tspl-simulator > /dev/null <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    # 前端靜態文件
    root /opt/tspl-simulator/frontend/build;
    index index.html;

    # 前端路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理到後端
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 健康檢查
    location /health {
        proxy_pass http://localhost:8080/api/health;
        access_log off;
    }
}
EOF
    
    # 啟用配置
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo ln -sf /etc/nginx/sites-available/tspl-simulator /etc/nginx/sites-enabled/
    echo -e "${GREEN}✓ Nginx 配置已創建${NC}"
fi

# 測試並重載 Nginx
sudo nginx -t && sudo systemctl reload nginx
echo ""

# 最終測試
echo "=============================================="
echo "  測試結果"
echo "=============================================="
echo ""

# 獲取公網 IP
PUBLIC_IP=$(curl -s ifconfig.me)

echo "📊 服務狀態:"
echo "----------------------------------------"
systemctl is-active nginx >/dev/null 2>&1 && echo -e "Nginx: ${GREEN}運行中${NC}" || echo -e "Nginx: ${RED}未運行${NC}"
systemctl is-active tspl-simulator >/dev/null 2>&1 && echo -e "後端: ${GREEN}運行中${NC}" || echo -e "後端: ${YELLOW}未運行 (需要部署)${NC}"
echo ""

echo "🌐 訪問地址:"
echo "----------------------------------------"
echo "公網 IP: ${PUBLIC_IP}"
echo "網頁訪問: http://${PUBLIC_IP}/"
echo ""

echo "🧪 本地測試:"
echo "----------------------------------------"
if curl -s http://localhost/ | grep -q "nginx\|html" ; then
    echo -e "${GREEN}✓ Nginx 本地訪問正常${NC}"
else
    echo -e "${RED}✗ Nginx 本地訪問失敗${NC}"
fi

if curl -s http://localhost:8080/api/health >/dev/null 2>&1 ; then
    echo -e "${GREEN}✓ 後端 API 正常${NC}"
else
    echo -e "${YELLOW}⚠ 後端 API 無回應 (可能尚未部署)${NC}"
fi
echo ""

echo "=============================================="
echo "  重要提醒"
echo "=============================================="
echo ""
echo -e "${YELLOW}⚠️  請務必在 Oracle Cloud Console 配置安全列表!${NC}"
echo ""
echo "步驟:"
echo "1. 登入: https://cloud.oracle.com/"
echo "2. 導航: Networking → Virtual Cloud Networks"
echo "3. 點擊你的 VCN → Security Lists → Default Security List"
echo "4. 點擊 'Add Ingress Rules'"
echo "5. 添加規則:"
echo "   - Source CIDR: 0.0.0.0/0"
echo "   - IP Protocol: TCP"
echo "   - Destination Port Range: 80"
echo "6. 再添加一條端口 443 的規則"
echo ""
echo -e "${GREEN}完成後就可以通過 http://${PUBLIC_IP}/ 訪問了!${NC}"
echo ""
