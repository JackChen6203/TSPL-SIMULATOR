#!/bin/bash

echo "================================================"
echo "修復 SSL 證書鏈 - Full (strict) 模式"
echo "================================================"
echo ""

echo "問題: Cloudflare Origin Certificate 缺少中間證書鏈"
echo "解決: 添加 Cloudflare Origin CA 根證書到證書鏈"
echo ""

# 步驟 1: 下載 Cloudflare Origin CA
echo "1. 下載 Cloudflare Origin CA 根證書..."
sudo mkdir -p /etc/ssl/cloudflare
cd /etc/ssl/cloudflare

# 下載 Cloudflare Origin CA RSA Root
sudo curl -s https://developers.cloudflare.com/ssl/static/origin_ca_rsa_root.pem -o origin_ca_rsa_root.pem

if [ $? -eq 0 ]; then
    echo "✅ 已下載 Origin CA 根證書"
else
    echo "❌ 下載失敗"
    exit 1
fi
echo ""

# 步驟 2: 創建完整證書鏈
echo "2. 創建完整證書鏈..."
# 證書 + 中間證書 = 完整鏈
sudo cp cert.pem cert-original.pem.backup
sudo cat cert.pem origin_ca_rsa_root.pem > cert-fullchain.pem
sudo mv cert-fullchain.pem cert.pem
echo "✅ 證書鏈已創建"
echo ""

# 步驟 3: 驗證證書鏈
echo "3. 驗證證書鏈..."
openssl verify -CAfile origin_ca_rsa_root.pem cert.pem
echo ""

# 步驟 4: 測試 nginx 配置
echo "4. 測試 nginx 配置..."
if sudo nginx -t; then
    echo "✅ nginx 配置正常"
else
    echo "❌ nginx 配置錯誤"
    echo "恢復原始證書..."
    sudo cp cert-original.pem.backup cert.pem
    exit 1
fi
echo ""

# 步驟 5: 重載 nginx
echo "5. 重載 nginx..."
sudo systemctl reload nginx
echo "✅ nginx 已重載"
echo ""

# 步驟 6: 測試連接
echo "6. 測試本地 HTTPS 連接..."
curl -v --resolve tsplsimulator.dpdns.org:443:127.0.0.1 https://tsplsimulator.dpdns.org/ 2>&1 | head -30
echo ""

echo "================================================"
echo "修復完成!"
echo "================================================"
echo ""
echo "下一步:"
echo "1. 在 Cloudflare 將 SSL 模式改回 'Full (strict)'"
echo "2. 測試 https://tsplsimulator.dpdns.org"
echo "3. 如果仍有問題,執行: sudo ./deploy/setup-cloudflare-origin-pull.sh"
echo ""
