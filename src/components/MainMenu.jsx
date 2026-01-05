// src/components/MainMenu.jsx

import React from 'react';
// 我們不需要在這裡寫 CSS，因為我們會把它放在 App.css 裡統一管理，或者你可以建立 MainMenu.css

const MainMenu = ({ onStartGame, onLoadGame }) => {

  return (
    <div className="main-menu-screen">
      {/* 標題 */}
      <h1 className="game-title">Life Choices</h1>

      {/* 左側選單 */}
    <div className="menu-buttonsbg">
      <div className="menu-container">
        {/* 注意：這裡我們把 onclick 換成了 onClick (C要大寫)
            onStartGame 是一個「道具(prop)」，讓父層告訴這個按鈕按下後要幹嘛
        */}
        <button className="menu-btn" onClick={onStartGame}>Game Start</button>
        
{/* [修改] 直接把按鈕顯示出來，不用大括號 {} 包住判斷條件了 */}
        <button className="menu-btn" onClick={onLoadGame}>Data Load</button>
        <button className="menu-btn">Archive</button>
        <button className="menu-btn">Language</button>
      </div>
    </div>
  </div>
  );
};

export default MainMenu;