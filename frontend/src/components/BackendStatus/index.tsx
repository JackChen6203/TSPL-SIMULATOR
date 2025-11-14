import React, { useEffect, useState } from 'react';
import { healthCheck } from '../../services/tsplApi';
import './styles.css';

const BackendStatus: React.FC = () => {
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      setIsChecking(true);
      const available = await healthCheck();
      setIsBackendAvailable(available);
      setIsChecking(false);
    };

    checkBackend();

    // 每 30 秒檢查一次
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isChecking) {
    return null;
  }

  if (isBackendAvailable) {
    return (
      <div className="backend-status backend-status-online">
        <span className="status-dot status-dot-online"></span>
        <span>後端已連接</span>
      </div>
    );
  }

  return (
    <div className="backend-status backend-status-offline">
      <span className="status-dot status-dot-offline"></span>
      <div className="status-content">
        <strong>模擬模式</strong>
        <span className="status-hint">
          後端未啟動 -
          <a
            href="#install-go"
            onClick={(e) => {
              e.preventDefault();
              alert('請按照以下步驟啟動後端:\n\n1. 安裝 Go: https://go.dev/dl/\n2. 重新啟動終端\n3. 執行: cd backend && go mod download\n4. 執行: go run cmd/server/main.go\n\n詳見: README_NOW.md');
            }}
          >
            如何啟動?
          </a>
        </span>
      </div>
    </div>
  );
};

export default BackendStatus;
