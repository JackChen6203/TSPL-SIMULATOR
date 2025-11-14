import { RenderData, Label } from './tspl';

// API 基礎 URL
export const API_BASE_URL = 'http://localhost:8080/api/v1';

// 解析請求
export interface ParseRequest {
  tspl_code: string;
}

// 解析回應
export interface ParseResponse {
  success: boolean;
  label?: Label;
}

// 渲染請求
export interface RenderRequest {
  tspl_code: string;
  width?: number;
  height?: number;
}

// 渲染回應
export interface RenderResponse {
  success: boolean;
  data?: RenderData;
}

// 錯誤回應
export interface ErrorResponse {
  error: string;
  details?: string;
}

// 範例
export interface Example {
  name: string;
  description: string;
  code: string;
}

// 範例列表回應
export interface ExamplesResponse {
  examples: Example[];
}
