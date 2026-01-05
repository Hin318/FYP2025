// src/components/GameScene.jsx
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { scenarios } from '../data/scenarios';
import { saveGame } from '../utils/saveSystem';

const GameScene = ({ childName, onUpdateStats, stats, initialScene }) => {
  // 1. 基礎狀態定義
  const [currentSceneId, setCurrentSceneId] = useState(initialScene || 'intro');
  const [lineIndex, setLineIndex] = useState(0);

  // 取得劇本資料 (如果沒抓到給空物件，防呆)
  const currentScenario = scenarios[currentSceneId] || { lines: [], choices: [] };
  
  // 背景圖 State (初始值)
  const [currentBg, setCurrentBg] = useState(
    currentScenario.bg || "/backgrounds/default.jpg"
  );

  const [screenEffect, setScreenEffect] = useState("");

  // 音訊 Refs (使用 useRef 保持參照)
  const bgmRef = useRef(null);
  const voiceRef = useRef(null);
  const sfxRef = useRef(null);

  // 初始化音訊 (只會在組件第一次載入時執行)
  useEffect(() => {
    bgmRef.current = new Audio();
    voiceRef.current = new Audio();
    sfxRef.current = new Audio();

    // 離開組件時的清理工作
    return () => {
        if (bgmRef.current) bgmRef.current.pause();
        if (voiceRef.current) voiceRef.current.pause();
        if (sfxRef.current) sfxRef.current.pause();
    };
  }, []);

  // ================= 邏輯處理區 (useEffect) =================

  // 邏輯 1: 背景更換處理 (合併版)
  // 邏輯 1: 背景更換 & 畫面特效處理 (合併版)
  useEffect(() => {
    if (!currentScenario) return;
    
    const currentLine = currentScenario.lines[lineIndex];
    
    // --- A. 處理背景 ---
    const lineBg = currentLine?.bg;
    const sceneBg = currentScenario.bg;
    let targetBg = null;

    if (lineBg) {
        targetBg = lineBg;
    } else if (lineIndex === 0 && sceneBg) {
        targetBg = sceneBg;
    }

    if (targetBg && targetBg !== currentBg) {
        setCurrentBg(targetBg);
    }

    // --- B. [NEW] 處理特效 (震動) ---
    // 如果這一句有 effect: "shake"，就設定特效，否則清空
    if (currentLine?.effect === "shake") {
        setScreenEffect("effect-shake");
    } else {
        setScreenEffect(""); // 這一句沒特效，記得要把震動關掉
    }

  }, [lineIndex, currentSceneId, currentBg]);
  // ↑ 這裡如果還有黃色波浪線可以忽略，或者是依照我的設定加上 eslint-disable


  // 邏輯 2: BGM 處理
  useEffect(() => {
    if (!currentScenario || !bgmRef.current) return;

    const bgmInstance = bgmRef.current;
    const newBgmSrc = currentScenario.bgm;

    // 如果有設定 BGM 且跟現在播的不一樣
    if (newBgmSrc && !bgmInstance.src.includes(newBgmSrc)) {
        bgmInstance.pause();
        bgmInstance.src = newBgmSrc;
        bgmInstance.loop = true;
        bgmInstance.volume = 0.5;
        
        // 嘗試播放 (加入防呆)
        const playPromise = bgmInstance.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // 如果被擋，加入點擊監聽來救援
                const resumeAudio = () => {
                   if(bgmRef.current) bgmRef.current.play();
                   document.removeEventListener('click', resumeAudio);
                };
                document.addEventListener('click', resumeAudio);
            });
        }
    } else if (!newBgmSrc) {
        // 如果沒設定 BGM，就暫停
        bgmInstance.pause();
    }
  }, [currentSceneId]); // 只在換場景時檢查 BGM


  // 邏輯 3: 語音 (Voice) 與 音效 (SFX)
  useEffect(() => {
    if (!currentScenario || !voiceRef.current || !sfxRef.current) return;
    
    const currentLine = currentScenario.lines[lineIndex];
    if (!currentLine) return;

    // --- 語音 Voice ---
    voiceRef.current.pause();
    voiceRef.current.currentTime = 0; // 重置時間
    if (currentLine.voice) {
        voiceRef.current.src = currentLine.voice;
        voiceRef.current.play().catch(e => console.error("語音播放失敗", e));
    }

    // --- 音效 SFX ---
    sfxRef.current.pause();
    sfxRef.current.currentTime = 0; // 切斷上一個音效
    if (currentLine.sound) {
        sfxRef.current.src = currentLine.sound;
        sfxRef.current.volume = 0.8;
        sfxRef.current.loop = false;
        sfxRef.current.play().catch(e => console.log("音效播放失敗", e));
    }
  }, [lineIndex, currentSceneId]); // 換行或換場景時觸發


  // ================= 渲染準備區 =================

  // 再次確認資料安全性
  if (!currentScenario || !currentScenario.lines) {
      return <div>讀取中...或找不到場景 {currentSceneId}</div>;
  }

  const currentLine = currentScenario.lines[lineIndex];
  const isDialogueFinished = !currentLine; // 如果沒對話了，代表要選選項
  const characterImage = currentLine ? currentLine.character : null;

  // 點擊下一句
  const handleNextDialogue = () => {
    if (lineIndex < currentScenario.lines.length) {
      setLineIndex(prev => prev + 1);
    }
  };

  // 處理選項點擊
  const handleChoice = (choice) => {
    if (choice.stats) onUpdateStats(choice.stats);
    setCurrentSceneId(choice.nextScene); // 切換場景 ID
    setLineIndex(0); // 重置對話行數
  };

  // ================= 畫面渲染 (JSX) =================

  return (
    <div className={`game-scene-container ${screenEffect}`}
      style={{
        backgroundImage: `url(${currentBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out',
        width: '100%',
        height: '100vh',
        position: 'relative'
      }}
    >
      {/* 存檔按鈕 */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 50 }}>
        <button 
            onClick={() => saveGame({ sceneId: currentSceneId, childName, stats })}
            style={{
                padding: '10px 20px',
                fontFamily: 'Zen Maru Gothic',
                fontWeight: 'bold',
                backgroundColor: '#FFDAC1',
                border: '3px solid #5A3E2B',
                borderRadius: '10px',
                cursor: 'pointer'
            }}> 
            💾 存檔
        </button>
      </div>

      {/* 角色立繪 */}
      <div className={`character-container ${characterImage ? 'visible' : 'hidden'}`}>
        {characterImage && (
            <img key={characterImage} src={characterImage} alt="Character" className="character-img"/>
        )}
      </div>

      {/* 選擇題介面 */}
      {isDialogueFinished && (
        <div className="choices-overlay">
          <div className="choices-container">
            {currentScenario.choices.map((choice, idx) => (
              <button key={idx} className="choice-btn" onClick={() => handleChoice(choice)}>
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      )}
    
      {/* 對話框介面 */}
      {!isDialogueFinished && (
        <div className="dialogue-clickable-area" onClick={handleNextDialogue}>
            <div className="dialogue-wrapper">
                {currentLine.speaker && (
                    <div className="name-tag">{currentLine.speaker}</div>
                )}
                <div className="dialogue-box">
                    <p className="dialogue-text">
                        {currentLine.text.replace("{childName}", childName)}
                    </p>
                    <div className="next-indicator">▼</div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default GameScene;