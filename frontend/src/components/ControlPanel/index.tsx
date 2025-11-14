import React from 'react';
import { renderTSPL } from '../../services/tsplApi';
import { RenderData } from '../../types/tspl';
import './styles.css';

interface ControlPanelProps {
  tsplCode: string;
  onRenderDataUpdate: (data: RenderData | null) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (error: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  tsplCode,
  onRenderDataUpdate,
  onLoadingChange,
  onError,
}) => {
  const handlePreview = async () => {
    if (!tsplCode.trim()) {
      onError('請輸入 TSPL 命令');
      return;
    }

    try {
      onLoadingChange(true);
      onError('');

      const response = await renderTSPL(tsplCode);

      if (response.success && response.data) {
        onRenderDataUpdate(response.data);
      } else {
        onError('渲染失敗');
      }
    } catch (error: any) {
      onError(error.message || '渲染失敗');
      onRenderDataUpdate(null);
    } finally {
      onLoadingChange(false);
    }
  };

  const handleClear = () => {
    onRenderDataUpdate(null);
    onError('');
  };

  return (
    <div className="control-panel">
      <button className="btn btn-primary" onClick={handlePreview}>
        預覽
      </button>
      <button className="btn btn-secondary" onClick={handleClear}>
        清除
      </button>
    </div>
  );
};

export default ControlPanel;
