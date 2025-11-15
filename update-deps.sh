#!/bin/bash

echo "=== 更新 npm 依賴 ==="

cd frontend

# 刪除舊的 node_modules 和 lock file
rm -rf node_modules package-lock.json

# 重新安裝並生成新的 lock file
npm install

echo ""
echo "✅ 依賴已更新"
echo ""
echo "請執行以下命令提交更改:"
echo "git add frontend/package-lock.json"
echo "git commit -m 'chore: update package-lock.json with new dependencies'"
echo "git push origin master"
