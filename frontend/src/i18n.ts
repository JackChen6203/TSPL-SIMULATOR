import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'zh-TW': {
    translation: {
      // Header
      title: 'TSPL 模擬器',
      subtitle: '模擬和預覽 TSPL 標籤列印效果',
      
      // Theme
      darkMode: '深色模式',
      lightMode: '淺色模式',
      
      // Language
      language: '語言',
      
      // Editor
      editor: '編輯器',
      preview: '預覽',
      validate: '驗證',
      render: '渲染',
      clear: '清除',
      
      // Examples
      examples: '範例',
      selectExample: '選擇範例',
      
      // Status
      loading: '載入中...',
      error: '錯誤',
      success: '成功',
      
      // Backend
      backendStatus: '後端狀態',
      connected: '已連接',
      disconnected: '未連接',
      
      // Validation
      validationErrors: '驗證錯誤',
      noErrors: '沒有錯誤',
      
      // Footer
      madeWith: '使用',
      by: '製作',
    }
  },
  'en': {
    translation: {
      // Header
      title: 'TSPL Simulator',
      subtitle: 'Simulate and preview TSPL label printing effects',
      
      // Theme
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      
      // Language
      language: 'Language',
      
      // Editor
      editor: 'Editor',
      preview: 'Preview',
      validate: 'Validate',
      render: 'Render',
      clear: 'Clear',
      
      // Examples
      examples: 'Examples',
      selectExample: 'Select Example',
      
      // Status
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      
      // Backend
      backendStatus: 'Backend Status',
      connected: 'Connected',
      disconnected: 'Disconnected',
      
      // Validation
      validationErrors: 'Validation Errors',
      noErrors: 'No Errors',
      
      // Footer
      madeWith: 'Made with',
      by: 'by',
    }
  },
  'ja': {
    translation: {
      // Header
      title: 'TSPL シミュレーター',
      subtitle: 'TSPL ラベル印刷効果のシミュレーションとプレビュー',
      
      // Theme
      darkMode: 'ダークモード',
      lightMode: 'ライトモード',
      
      // Language
      language: '言語',
      
      // Editor
      editor: 'エディター',
      preview: 'プレビュー',
      validate: '検証',
      render: 'レンダリング',
      clear: 'クリア',
      
      // Examples
      examples: '例',
      selectExample: '例を選択',
      
      // Status
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功',
      
      // Backend
      backendStatus: 'バックエンドステータス',
      connected: '接続済み',
      disconnected: '未接続',
      
      // Validation
      validationErrors: '検証エラー',
      noErrors: 'エラーなし',
      
      // Footer
      madeWith: '作成',
      by: 'by',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-TW', // 默認語言
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
