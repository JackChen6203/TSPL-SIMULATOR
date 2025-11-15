#!/bin/bash

echo "=============================================="
echo "  Oracle Cloud 連線診斷腳本"
echo "=============================================="
echo ""

# 顏色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 獲取公網 IP
PUBLIC_IP=$(curl -s ifconfig.me)

echo -e "${BLUE}你的公網 IP: ${PUBLIC_IP}${NC}"
echo ""

# 1. 檢查 iptables 詳細規則
echo -e "${YELLOW}[1/6] 檢查 iptables 規則${NC}"
echo "=============================================="
sudo iptables -L INPUT -n -v --line-numbers
echo ""

# 2. 檢查監聽端口
echo -e "${YELLOW}[2/6] 檢查監聽端口${NC}"
echo "=============================================="
sudo netstat -tlnp | grep -E ':(22|80|443|8080)'
echo ""

# 3. 檢查 Nginx 狀態
echo -e "${YELLOW}[3/6] 檢查 Nginx 狀態${NC}"
echo "=============================================="
sudo systemctl status nginx --no-pager -l
echo ""

# 4. 測試本地連接
echo -e "${YELLOW}[4/6] 測試本地連接${NC}"
echo "=============================================="
echo "測試 localhost:80..."
curl -I http://localhost/ 2>&1 | head -n 5
echo ""
echo "測試 0.0.0.0:80..."
curl -I http://0.0.0.0/ 2>&1 | head -n 5
echo ""
echo "測試公網IP:80..."
curl -I http://${PUBLIC_IP}/ 2>&1 | head -n 5
echo ""

# 5. 檢查路由和網絡接口
echo -e "${YELLOW}[5/6] 檢查網絡接口${NC}"
echo "=============================================="
ip addr show | grep -E "inet |ens"
echo ""

# 6. 嘗試修復 - 清除並重建 iptables 規則
echo -e "${YELLOW}[6/6] 重建 iptables 規則${NC}"
echo "=============================================="

# 顯示當前 INPUT 鏈的 REJECT 規則
echo "尋找 REJECT 規則..."
sudo iptables -L INPUT -n --line-numbers | grep -i reject

echo ""
echo "當前完整 INPUT 鏈:"
sudo iptables -L INPUT -n --line-numbers

echo ""
echo -e "${GREEN}準備重建規則...${NC}"
read -p "是否繼續? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # 確保 80 和 443 規則在 REJECT 之前
    echo "刪除舊的 80/443 規則 (如果存在)..."
    sudo iptables -D INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null
    sudo iptables -D INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null
    
    # 插入新規則到第 6 行 (在 REJECT 之前)
    echo "添加新規則到第 6 行..."
    sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
    sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
    
    echo "保存規則..."
    sudo netfilter-persistent save 2>/dev/null || sudo iptables-save | sudo tee /etc/iptables/rules.v4 > /dev/null
    
    echo ""
    echo -e "${GREEN}✓ 規則已重建${NC}"
    echo ""
    echo "新的 INPUT 鏈:"
    sudo iptables -L INPUT -n --line-numbers
fi

echo ""
echo "=============================================="
echo -e "${YELLOW}  診斷總結${NC}"
echo "=============================================="
echo ""
echo "請檢查以下各項:"
echo ""
echo "1. iptables 規則中是否有 80, 443?"
echo "   → 執行: sudo iptables -L INPUT -n | grep -E 'dpt:(80|443)'"
echo ""
echo "2. Nginx 是否正在監聽 0.0.0.0:80?"
echo "   → 應該看到: 0.0.0.0:80 或 :::80"
echo ""
echo "3. 本地 curl 是否成功?"
echo "   → curl http://localhost/ 應該返回 HTML"
echo ""
echo "4. Oracle Security List 是否包含:"
echo "   → Source: 0.0.0.0/0, Protocol: TCP, Port: 80"
echo "   → Source: 0.0.0.0/0, Protocol: TCP, Port: 443"
echo ""
echo "5. 從外部測試:"
echo "   → 訪問: http://${PUBLIC_IP}/"
echo ""
