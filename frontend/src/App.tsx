import React, { useState } from 'react';
import './App.css';
import SEO from './components/SEO';
import Header from './components/Header';
import GoogleAd from './components/GoogleAd';
import TSPLEditor from './components/TSPLEditor';
import LabelPreview from './components/LabelPreview';
import ControlPanel from './components/ControlPanel';
import ExampleSelector from './components/ExampleSelector';
import SyntaxChecker from './components/SyntaxChecker';
import ValidationErrors from './components/ValidationErrors';
import { RenderData } from './types/tspl';
import { ValidationError } from './types/api';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [tsplCode, setTsplCode] = useState<string>('');
  const [renderData, setRenderData] = useState<RenderData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const handleCodeChange = (code: string) => {
    setTsplCode(code);
    setError('');
    setValidationErrors([]);
  };

  const handleRenderDataUpdate = (data: RenderData | null) => {
    setRenderData(data);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleError = (errorMsg: string) => {
    setError(errorMsg);
  };

  const handleValidationErrors = (errors: ValidationError[]) => {
    setValidationErrors(errors);
  };

  return (
    <div className="app">
      <SEO />
      <Header />

      {/* 頂部橫幅廣告 - Google Ads 合規 */}
      {/* TODO: 在 AdSense 後台創建廣告單元後,替換下方的 slot ID */}
      <GoogleAd
        slot="1234567890" // 替換為真實的 Ad Slot ID (例如: "9876543210")
        format="horizontal"
        className="google-ad-top"
      />

      <div className="app-container">
        <div className="left-panel">
          <ExampleSelector onSelectExample={handleCodeChange} />

          <TSPLEditor
            value={tsplCode}
            onChange={handleCodeChange}
          />

          <SyntaxChecker tsplCode={tsplCode} />

          <ControlPanel
            tsplCode={tsplCode}
            onRenderDataUpdate={handleRenderDataUpdate}
            onLoadingChange={handleLoadingChange}
            onError={handleError}
            onValidationErrors={handleValidationErrors}
          />

          {validationErrors.length > 0 && (
            <ValidationErrors errors={validationErrors} />
          )}

          {error && validationErrors.length === 0 && (
            <div className="error-message">
              <strong>{t('error')}:</strong> {error}
            </div>
          )}

          {/* 左側邊欄廣告 */}
          <GoogleAd
            slot="0987654321" // 替換為真實的 Ad Slot ID
            format="rectangle"
            className="google-ad-sidebar"
          />
        </div>

        <div className="right-panel">
          <LabelPreview
            renderData={renderData}
            isLoading={isLoading}
          />

          {/* 右側邊欄廣告 */}
          <GoogleAd
            slot="1122334455" // 替換為真實的 Ad Slot ID
            format="rectangle"
            className="google-ad-sidebar"
          />
        </div>
      </div>

      {/* 頁尾資訊 - Google Ads 要求 */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2025 TSPL Simulator. {t('madeWith')} Davis Chen</p>
          <div className="footer-links">
            <a href="/privacy.html">Privacy Policy</a>
            <span>|</span>
            <a href="/terms.html">Terms of Service</a>
            <span>|</span>
            <a href="/contact.html">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
