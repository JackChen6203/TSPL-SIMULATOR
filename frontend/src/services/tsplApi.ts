// 純前端版本 - 所有功能都在瀏覽器中運行
import { RenderResponse, ExamplesResponse } from '../types/api';
import { mockRenderTSPL, mockGetExamples } from './mockApi';

// 渲染 TSPL (純前端實作)
export const renderTSPL = async (tsplCode: string): Promise<RenderResponse> => {
  return mockRenderTSPL(tsplCode);
};

// 取得範例 (純前端實作)
export const getExamples = async (): Promise<ExamplesResponse> => {
  return mockGetExamples();
};

// 健康檢查 (純前端版本總是回傳 true)
export const healthCheck = async (): Promise<boolean> => {
  return true;
};
