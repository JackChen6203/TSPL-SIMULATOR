import React from 'react';
import './styles.css';

interface TSPLEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TSPLEditor: React.FC<TSPLEditorProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="tspl-editor">
      <div className="editor-header">
        <h3>TSPL 編輯器</h3>
      </div>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={handleChange}
        placeholder="在此輸入 TSPL 命令...&#10;&#10;範例:&#10;SIZE 100 mm, 50 mm&#10;GAP 3 mm, 0 mm&#10;CLS&#10;TEXT 100,100,&quot;3&quot;,0,1,1,&quot;Hello TSPL&quot;&#10;PRINT 1,1"
        spellCheck={false}
      />
    </div>
  );
};

export default TSPLEditor;
