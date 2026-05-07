import React, { useState, useEffect, useRef } from 'react';
import ArchiveMenu from './ArchiveMenu'; // 確保路徑正確



const MainMenu = ({ onStartGame, onLoadGame, onJumpToScene}) => {
  const [showArchive, setShowArchive] = useState(false);
  const bgmRef = useRef(null);

  useEffect(() => {
    // 1. 初始化 BGM
    // 請確認檔案路徑是否正確 (public/audio/bgm/SweetieGirl.mp3)
    const audio = new Audio('/audio/bgm/SweetieGirl.mp3'); 
    
    
    audio.loop = true;   
    audio.volume = 0.5;  

    bgmRef.current = audio;
    


    

    // 2. 定義一個「嘗試播放」的函式
    const attemptPlay = () => {
      if (!audio) return;

      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 🎉 成功播放！
            // 既然已經在播了，就不用再監聽玩家點擊了，移除監聽器以節省資源
            document.removeEventListener('click', attemptPlay);
            document.removeEventListener('keydown', attemptPlay);
          })
          .catch(error => {
            // 把 error 放進 console.log 裡面使用它
            console.log("自動播放被阻擋，等待玩家互動後播放...", error); 
        });
      }
    };

    // 3. 一進來先試一次 (運氣好會直接播)
    attemptPlay();

    // 4. [關鍵] 掛上監聽器：只要玩家點擊網頁任意處，就執行 attemptPlay
    document.addEventListener('click', attemptPlay);
    document.addEventListener('keydown', attemptPlay); // 按鍵盤也可以

    // 5. 離開時的清理
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
      // 記得一定要移除監聽器！
      document.removeEventListener('click', attemptPlay);
      document.removeEventListener('keydown', attemptPlay);
    };
  }, []);


  return (
    <div className="main-menu-screen">
      <h1 className="game-title">Life Choices</h1>
      <div className="menu-container">
        <button className="menu-btn" onClick={onStartGame}>開始遊戲</button>
        <button className="menu-btn" onClick={onLoadGame}>你的存檔</button>
        <button className="menu-btn" onClick={() => setShowArchive(true)}>
    世界樹
</button>
        <button className="menu-btn">設定</button>
      </div>
      {/* 🌟 把 onJumpToScene 傳遞給劇情回顧 */}
      {showArchive && (
          <ArchiveMenu 
              onClose={() => setShowArchive(false)} 
              onJumpToScene={onJumpToScene} 
          />
      )}
    </div>
    
  );
  
  
};


export default MainMenu;