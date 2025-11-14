import React, { useEffect, useState } from 'react';
import { validateTSPL, ValidationResult } from '../../services/tsplValidator';
import './styles.css';

interface SyntaxCheckerProps {
  tsplCode: string;
}

const SyntaxChecker: React.FC<SyntaxCheckerProps> = ({ tsplCode }) => {
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  useEffect(() => {
    if (tsplCode.trim()) {
      const result = validateTSPL(tsplCode);
      setValidation(result);
    } else {
      setValidation(null);
    }
  }, [tsplCode]);

  if (!validation || (!validation.errors.length && !validation.warnings.length)) {
    return null;
  }

  return (
    <div className="syntax-checker">
      <div className="syntax-checker-header">
        <h4>語法檢查</h4>
        {validation.isValid ? (
          <span className="status-badge status-success">✓ 無錯誤</span>
        ) : (
          <span className="status-badge status-error">✗ {validation.errors.length} 個錯誤</span>
        )}
      </div>

      <div className="syntax-checker-content">
        {validation.errors.map((error, index) => (
          <div key={`error-${index}`} className="validation-message validation-error">
            <span className="message-icon">❌</span>
            <div className="message-content">
              {error.line > 0 && <span className="line-number">行 {error.line}:</span>}
              <span className="message-text">{error.message}</span>
            </div>
          </div>
        ))}

        {validation.warnings.map((warning, index) => (
          <div key={`warning-${index}`} className="validation-message validation-warning">
            <span className="message-icon">⚠️</span>
            <div className="message-content">
              {warning.line > 0 && <span className="line-number">行 {warning.line}:</span>}
              <span className="message-text">{warning.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyntaxChecker;
