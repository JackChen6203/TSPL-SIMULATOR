#!/bin/bash

echo "================================================"
echo "TSPL Simulator 診斷工具"
echo "================================================"
echo ""

echo "1. 檢查後端服務狀態"
echo "---"
sudo systemctl status tspl-simulator --no-pager
echo ""

echo "2. 檢查後端進程"
echo "---"
ps aux | grep tspl-simulator | grep -v grep
echo ""

echo "3. 檢查端口 8080 監聽狀態"
echo "---"
sudo netstat -tlnp | grep 8080 || echo "端口 8080 未被監聽"
echo ""

echo "4. 檢查後端日誌 (最近 30 行)"
echo "---"
sudo journalctl -u tspl-simulator -n 30 --no-pager
echo ""

echo "5. 檢查 Nginx 狀態"
echo "---"
sudo systemctl status nginx --no-pager
echo ""

echo "6. 檢查 Nginx 配置"
echo "---"
sudo nginx -t
echo ""

echo "7. 檢查 Nginx 監聽端口"
echo "---"
sudo netstat -tlnp | grep nginx || echo "Nginx 未監聽任何端口"
echo ""

echo "8. 測試本地 API 連接"
echo "---"
curl -v http://127.0.0.1:8080/api/health 2>&1 || echo "無法連接到後端"
echo ""

echo "9. 檢查防火牆規則"
echo "---"
sudo ufw status
echo ""

echo "10. 檢查文件權限"
echo "---"
ls -la /opt/tspl-simulator/backend/tspl-simulator
ls -la /opt/tspl-simulator/backend/.env
echo ""

echo "11. 檢查環境變數文件內容"
echo "---"
cat /opt/tspl-simulator/backend/.env 2>/dev/null || echo ".env 文件不存在"
echo ""

echo "================================================"
echo "診斷完成"
echo "================================================"
