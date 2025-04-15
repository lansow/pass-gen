import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [options, setOptions] = useState({
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
  });
  const [passwordLen, setPasswordLen] = useState(12); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const handleSliderChange = (e) => {
    setPasswordLen(parseInt(e.target.value));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setOptions(prev => ({ ...prev, [name]: checked }));
  };

  const generatePassword = () => {
    const { numbers, lowercase, uppercase, symbols } = options;
    let chars = '';
    chars += numbers ? '0123456789' : '';
    chars += lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '';
    chars += uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
    chars += symbols ? '~!@#$%^&*()_+-=' : '';

    if (!chars) {
      setError('حداقل یک نوع کاراکتر را انتخاب کنید!');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < passwordLen; i++) {
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(generatedPassword);
    setError('');
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('خطا در کپی کردن:', err);
          setError('خطا در کپی کردن رمز عبور');
        });
    }
  };

  return (
    <div className="app-container">
      <div className="password-generator">
        <h1>تولید کننده رمز عبور</h1>

        <div className="password-display-container">
          {password ? (
            <div 
              className={`password-display ${copied ? 'copied' : ''}`} 
              onClick={copyToClipboard}
              ref={passwordRef}
            >
              <span className="password-text">{password}</span>
              <span className="copy-icon">{copied ? '✓' : '📋'}</span>
            </div>
          ) : (
            <div className="password-placeholder">
              رمز عبور اینجا نمایش داده می‌شود
            </div>
          )}
        </div>

        <div className="controls-container">
          <div className="slider-container">
            <div className="slider-header">
              <label htmlFor="length-slider">طول رمز عبور</label>
              <span className="slider-value">{passwordLen}</span>
            </div>
            <input
              type="range"
              id="length-slider"
              min="4"
              max="32"
              value={passwordLen}
              onChange={handleSliderChange}
              className="slider"
            />
            <div className="slider-labels">
              <span>4</span>
              <span>32</span>
            </div>
          </div>

          <div className="options-title">گزینه‌های رمز عبور</div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="uppercase"
                checked={options.uppercase}
                onChange={handleCheckboxChange}
              />
              <span className="checkbox-text">حروف بزرگ (A-Z)</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="lowercase"
                checked={options.lowercase}
                onChange={handleCheckboxChange}
              />
              <span className="checkbox-text">حروف کوچک (a-z)</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="numbers"
                checked={options.numbers}
                onChange={handleCheckboxChange}
              />
              <span className="checkbox-text">اعداد (0-9)</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="symbols"
                checked={options.symbols}
                onChange={handleCheckboxChange}
              />
              <span className="checkbox-text">نمادها (!@#$%^&*)</span>
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button onClick={generatePassword} className="generate-btn">
            تولید رمز عبور
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;