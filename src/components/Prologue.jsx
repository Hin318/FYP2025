// src/components/Prologue.jsx
import React, { useState, useEffect } from 'react';

// --- 修改重點：把 storyLines 搬到這裡 (函數外面) ---
const storyLines = [
  "『看來你已經準備好了』",
  "『努力成為一名頂尖爸媽吧！』",
  "『現在你將會進入平行時空...』",
];

const Prologue = ({ onAnimationEnd }) => {
  // 裡面原本的 const storyLines = ... 記得刪掉

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in'); 
  const [startReveal, setStartReveal] = useState(false); 

  // ... (下面的 useEffect 代碼完全不用動，黃色波浪線會自動消失)
  useEffect(() => {
    // 如果已經開始揭幕，就不跑文字邏輯了
    if (startReveal) return;

    // 設定文字停留時間 (例如：閱讀 2.5 秒)
    const readTimer = setTimeout(() => {
      setFadeState('out'); // 1. 先淡出目前文字
    }, 2500);

    return () => clearTimeout(readTimer);
  }, [currentLineIndex, startReveal]);

  // 監聽淡出動畫結束，切換下一句
  useEffect(() => {
    if (fadeState === 'out') {
      const switchTimer = setTimeout(() => {
        // 檢查是否還有下一句
        if (currentLineIndex < storyLines.length - 1) {
          setCurrentLineIndex(prev => prev + 1); // 換下一句
          setFadeState('in'); // 淡入
        } else {
          // 2. 全部講完了，開始揭幕動畫
          setStartReveal(true);
        }
      }, 1000); // 這邊是「淡出後」等待多久出現下一句 (1秒)
      
      return () => clearTimeout(switchTimer);
    }
  }, [fadeState, currentLineIndex]);


  // 處理最後的揭幕動畫結束
  useEffect(() => {
    if (startReveal) {
      // 這裡的時間 (4000) 要配合 CSS 的 animation 時間
      const endTimer = setTimeout(() => {
        onAnimationEnd();
      }, 4000);
      return () => clearTimeout(endTimer);
    }
  }, [startReveal, onAnimationEnd]);


 return (
    <div 
      className="prologue-screen"
      style={{
        // [新增] 1. 強制設定整個容器為全黑背景
        backgroundColor: 'black',
        // [新增] 2. 設定文字顏色為白色
        color: 'white',
        // [新增] 3. 填滿螢幕並讓內容置中
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed', // 確保蓋在所有東西上面
        top: 0,
        left: 0,
        zIndex: 9999 // 確保最上層
      }}
    >
      <div className={`memory-bg ${startReveal ? 'start-anim' : ''}`}></div>

      {/* 黑色遮罩層：只有當 startReveal 為 true 時，才加上動畫 class */}
      <div className={`black-overlay ${startReveal ? 'start-anim' : ''}`}></div>

      {/* 文字層：只在還沒揭幕時顯示 */}
      {!startReveal && (
        <div className={`memory-text ${fadeState === 'in' ? 'visible' : 'hidden'}`}>
          <p>{storyLines[currentLineIndex]}</p>
        </div>
      )}
    </div>
  );
};

export default Prologue;