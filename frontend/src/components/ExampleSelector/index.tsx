import React, { useEffect, useState } from 'react';
import { getExamples } from '../../services/tsplApi';
import { Example } from '../../types/api';
import './styles.css';

interface ExampleSelectorProps {
  onSelectExample: (code: string) => void;
}

const ExampleSelector: React.FC<ExampleSelectorProps> = ({ onSelectExample }) => {
  const [examples, setExamples] = useState<Example[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = async () => {
    try {
      setLoading(true);
      const response = await getExamples();
      setExamples(response.examples);
    } catch (error) {
      console.error('載入範例失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectExample = (code: string) => {
    onSelectExample(code);
  };

  return (
    <div className="example-selector">
      <label htmlFor="example-select">選擇範例:</label>
      <select
        id="example-select"
        onChange={(e) => {
          const selected = examples.find((ex) => ex.name === e.target.value);
          if (selected) {
            handleSelectExample(selected.code);
          }
        }}
        disabled={loading}
      >
        <option value="">-- 選擇範例 --</option>
        {examples.map((example) => (
          <option key={example.name} value={example.name}>
            {example.name} - {example.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExampleSelector;
