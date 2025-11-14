import React, { useState } from 'react';
import './App.css';
import TSPLEditor from './components/TSPLEditor';
import LabelPreview from './components/LabelPreview';
import ControlPanel from './components/ControlPanel';
import ExampleSelector from './components/ExampleSelector';
import SyntaxChecker from './components/SyntaxChecker';
import { RenderData } from './types/tspl';

const App: React.FC = () => {
  const [tsplCode, setTsplCode] = useState<string>('');
  const [renderData, setRenderData] = useState<RenderData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleCodeChange = (code: string) => {
    setTsplCode(code);
    setError('');
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>TSPL Simulator</h1>
        <p>模擬和預覽 TSPL 標籤列印效果</p>
      </header>

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
          />

          {error && (
            <div className="error-message">
              <strong>錯誤:</strong> {error}
            </div>
          )}
        </div>

        <div className="right-panel">
          <LabelPreview
            renderData={renderData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
