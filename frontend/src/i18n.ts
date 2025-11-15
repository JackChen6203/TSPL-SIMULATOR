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
      
      // Editor & Controls
      editor: 'TSPL 編輯器',
      editorPlaceholder: '在此輸入 TSPL 命令...\n\n範例:\nSIZE 100 mm, 50 mm\nGAP 3 mm, 0 mm\nCLS\nTEXT 100,100,"3",0,1,1,"Hello TSPL"\nPRINT 1,1',
      preview: '標籤預覽',
      validate: '驗證',
      render: '渲染',
      clear: '清除',
      rendering: '渲染中...',
      
      // Examples
      examples: '範例',
      selectExample: '選擇範例',
      selectExamplePlaceholder: '-- 選擇範例 --',
      
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
      backendValidationErrors: '後端驗證錯誤',
      syntaxCheck: '語法檢查',
      noErrors: '✓ 無錯誤',
      errorsCount: '個錯誤',
      warningsCount: '個警告',
      line: '行',
      command: '命令',
      hint: '💡 提示: 請修正上述錯誤後再次嘗試渲染',
      
      // Messages
      enterTSPLCommand: '請輸入 TSPL 命令',
      emptyPreview: '請輸入 TSPL 命令並點擊「預覽」按鈕',
      loadExamplesFailed: '載入範例失敗',
      renderFailed: '渲染失敗',
      syntaxValidationFailed: 'TSPL 語法驗證失敗',
      
      // Buttons
      previewButton: '預覽',
      clearButton: '清除',
      
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
      
      // Editor & Controls
      editor: 'TSPL Editor',
      editorPlaceholder: 'Enter TSPL commands here...\n\nExample:\nSIZE 100 mm, 50 mm\nGAP 3 mm, 0 mm\nCLS\nTEXT 100,100,"3",0,1,1,"Hello TSPL"\nPRINT 1,1',
      preview: 'Label Preview',
      validate: 'Validate',
      render: 'Render',
      clear: 'Clear',
      rendering: 'Rendering...',
      
      // Examples
      examples: 'Examples',
      selectExample: 'Select Example',
      selectExamplePlaceholder: '-- Select Example --',
      
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
      backendValidationErrors: 'Backend Validation Errors',
      syntaxCheck: 'Syntax Check',
      noErrors: '✓ No Errors',
      errorsCount: 'errors',
      warningsCount: 'warnings',
      line: 'Line',
      command: 'Command',
      hint: '💡 Hint: Please fix the above errors before rendering',
      
      // Messages
      enterTSPLCommand: 'Please enter TSPL command',
      emptyPreview: 'Please enter TSPL commands and click the "Preview" button',
      loadExamplesFailed: 'Failed to load examples',
      renderFailed: 'Render failed',
      syntaxValidationFailed: 'TSPL syntax validation failed',
      
      // Buttons
      previewButton: 'Preview',
      clearButton: 'Clear',
      
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
      
      // Editor & Controls
      editor: 'TSPL エディター',
      editorPlaceholder: 'ここにTSPLコマンドを入力...\n\n例:\nSIZE 100 mm, 50 mm\nGAP 3 mm, 0 mm\nCLS\nTEXT 100,100,"3",0,1,1,"Hello TSPL"\nPRINT 1,1',
      preview: 'ラベルプレビュー',
      validate: '検証',
      render: 'レンダリング',
      clear: 'クリア',
      rendering: 'レンダリング中...',
      
      // Examples
      examples: '例',
      selectExample: '例を選択',
      selectExamplePlaceholder: '-- 例を選択 --',
      
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
      backendValidationErrors: 'バックエンド検証エラー',
      syntaxCheck: '構文チェック',
      noErrors: '✓ エラーなし',
      errorsCount: 'エラー',
      warningsCount: '警告',
      line: '行',
      command: 'コマンド',
      hint: '💡 ヒント: レンダリングする前に上記のエラーを修正してください',
      
      // Messages
      enterTSPLCommand: 'TSPLコマンドを入力してください',
      emptyPreview: 'TSPLコマンドを入力して「プレビュー」ボタンをクリックしてください',
      loadExamplesFailed: '例の読み込みに失敗しました',
      renderFailed: 'レンダリングに失敗しました',
      syntaxValidationFailed: 'TSPL構文検証に失敗しました',
      
      // Buttons
      previewButton: 'プレビュー',
      clearButton: 'クリア',
      
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
    lng: 'zh-TW',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
