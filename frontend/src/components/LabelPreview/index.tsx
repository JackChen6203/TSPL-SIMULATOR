import React from 'react';
import Canvas from './Canvas';
import { RenderData } from '../../types/tspl';
import { useTranslation } from 'react-i18next';
import './styles.css';

interface LabelPreviewProps {
  renderData: RenderData | null;
  isLoading: boolean;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ renderData, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div className="label-preview">
      <div className="preview-header">
        <h3>{t('preview')}</h3>
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
            <p>{t('rendering')}</p>
          </div>
        ) : renderData ? (
          <Canvas renderData={renderData} />
        ) : (
          <div className="preview-empty">
            <p>{t('emptyPreview')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelPreview;
