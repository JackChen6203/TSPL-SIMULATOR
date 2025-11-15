import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';

interface TSPLEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TSPLEditor: React.FC<TSPLEditorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="tspl-editor">
      <div className="editor-header">
        <h3>{t('editor')}</h3>
      </div>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={handleChange}
        placeholder={t('editorPlaceholder')}
        spellCheck={false}
      />
    </div>
  );
};

export default TSPLEditor;
