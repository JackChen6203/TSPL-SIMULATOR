#!/bin/bash

echo "================================================"
echo "SSL 證書深度診斷工具"
echo "================================================"
echo ""

echo "1. 檢查 SSL 證書文件"
echo "---"
ls -la /etc/ssl/cloudflare/
echo ""

echo "2. 驗證證書格式"
echo "---"
openssl x509 -in /etc/ssl/cloudflare/cert.pem -text -noout | head -20
echo ""

echo "3. 檢查證書有效期"
echo "---"
openssl x509 -in /etc/ssl/cloudflare/cert.pem -noout -dates
echo ""

echo "4. 檢查證書的 Common Name 和 SANs"
echo "---"
openssl x509 -in /etc/ssl/cloudflare/cert.pem -noout -subject
openssl x509 -in /etc/ssl/cloudflare/cert.pem -noout -ext subjectAltName
echo ""

echo "5. 驗證私鑰和證書是否匹配"
echo "---"
CERT_MODULUS=$(openssl x509 -noout -modulus -in /etc/ssl/cloudflare/cert.pem | openssl md5)
KEY_MODULUS=$(openssl rsa -noout -modulus -in /etc/ssl/cloudflare/key.pem | openssl md5)
echo "證書 MD5: $CERT_MODULUS"
echo "私鑰 MD5: $KEY_MODULUS"
if [ "$CERT_MODULUS" = "$KEY_MODULUS" ]; then
    echo "✅ 私鑰和證書匹配"
else
    echo "❌ 私鑰和證書不匹配!"
fi
echo ""

echo "6. 測試本地 HTTPS 連接"
echo "---"
curl -vk https://127.0.0.1/ 2>&1 | grep -E "(SSL|certificate|CN=)"
echo ""

echo "7. 檢查 Nginx SSL 配置"
echo "---"
sudo nginx -T 2>&1 | grep -A5 "ssl_certificate"
echo ""

echo "8. 從外部測試 HTTPS (通過 Cloudflare)"
echo "---"
curl -v https://tsplsimulator.dpdns.org/ 2>&1 | head -30
echo ""

echo "9. 檢查證書鏈"
echo "---"
openssl s_client -connect 127.0.0.1:443 -servername tsplsimulator.dpdns.org </dev/null 2>/dev/null | openssl x509 -noout -text | grep -E "(Issuer|Subject|Not)"
echo ""

echo "10. 檢查是否為 Cloudflare Origin Certificate"
echo "---"
openssl x509 -in /etc/ssl/cloudflare/cert.pem -noout -issuer | grep -i cloudflare && echo "✅ 這是 Cloudflare Origin Certificate" || echo "❌ 這不是 Cloudflare Origin Certificate"
echo ""

echo "================================================"
echo "診斷完成"
echo "================================================"
