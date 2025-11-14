import React from 'react';
import Canvas from './Canvas';
import { RenderData } from '../../types/tspl';
import './styles.css';

interface LabelPreviewProps {
  renderData: RenderData | null;
  isLoading: boolean;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ renderData, isLoading }) => {
  return (
    <div className="label-preview">
      <div className="preview-header">
        <h3>標籤預覽</h3>
        {renderData && (
          <span className="preview-info">
            {renderData.width} × {renderData.height} mm
          </span>
        )}
      </div>
      <div className="preview-content">
        {isLoading ? (
          <div className="preview-loading">
            <div className="spinner"></div>
            <p>渲染中...</p>
          </div>
        ) : renderData ? (
          <Canvas renderData={renderData} />
        ) : (
          <div className="preview-empty">
            <p>請輸入 TSPL 命令並點擊「預覽」按鈕</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelPreview;
