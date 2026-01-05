// src/components/NameEntry.jsx
import React, { useState } from 'react';

// 這個組件接收一個道具 (prop) 叫做 onConfirm
// 當玩家輸入完成並點擊按鈕時，我們會呼叫這個函式把名字傳回給 App.jsx
const NameEntry = ({ onConfirm }) => {
  const [inputValue, setInputValue] = useState('');

  // 處理輸入變更
  const handleInputChange = (e) => {
    // 這裡雖然 input 標籤已經有 maxLength，但我們可以在這裡做更嚴格的控制
    const val = e.target.value;
    if (val.length <= 20) {
        setInputValue(val);
    }
  };

  // 處理提交
  const handleSubmit = () => {
    // 簡單防呆：如果沒輸入名字就不能送出 (可選)
    if (inputValue.trim() === '') {
        alert("請幫寶寶取個名字吧！");
        return;
    }
    // 呼叫父層傳來的函式，把最終的名字送出去
    onConfirm(inputValue);
  };

  return (
    // 這裡我們重複利用主選單的外框樣式，保持背景一致
    <div className="main-menu-screen modal-overlay">
      <div className="name-entry-box">
        <h2 className="name-entry-title">請命名你的孩子:</h2>
        
        <input 
            type="text" 
            className="name-input"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={20} // HTML 原生的長度限制
            placeholder="最多20個字元..."
        />
        
        {/* 顯示目前字數 (選用，增加使用者體驗) */}
        <p style={{fontSize: '0.8rem', color: '#6B5B95', marginTop: '5px'}}>
            {inputValue.length} / 20
        </p>

        <button className="menu-btn submit-btn" onClick={handleSubmit}>
          確定
        </button>
      </div>
    </div>
  );
};

export default NameEntry;