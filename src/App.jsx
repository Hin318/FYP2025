// src/App.jsx
import { useState } from 'react'
import './App.css'
import MainMenu from './components/MainMenu'
import NameEntry from './components/NameEntry'
import Prologue from './components/Prologue'
import GameScene from './components/GameScene'
import StatsDisplay from './components/StatsDisplay' // 1. 引入新組件
import { loadGame } from './utils/saveSystem';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [childName, setChildName] = useState('');

  // 2. 定義初始數值 (State)
  const [stats, setStats] = useState({
    sanity: 100,      // 理智 (滿分100)   
    relationship: 50, // 親密 (初始50)
    development: 0    // 成長 (初始0)
 });

  const [loadedScene, setLoadedScene] = useState(null);

  // 3. 定義更新數值的函式 (讓 GameScene 呼叫)
  const handleUpdateStats = (changes) => {
    setStats(prevStats => {
        // 複製原本的數值，然後加上變動值
        const newStats = { ...prevStats };
        
        // 迴圈處理每個變動 (例如: { sanity: -10, money: -50 })
        for (const [key, value] of Object.entries(changes)) {
            if (newStats[key] !== undefined) {
                newStats[key] += value;
            }
        }
        return newStats;
    });
  };
const handleLoadGame = () => {
    const saveData = loadGame();
    if (saveData) {
        // 1. 還原數值
        setStats(saveData.stats);
        // 2. 還原名字
        setChildName(saveData.childName);
        // 3. 設定要跳轉的場景
        setLoadedScene(saveData.sceneId);
        // 4. 切換畫面到遊戲中
        setCurrentScreen('gameplay');
    } else {
        alert("找不到存檔紀錄！");
    }
  };
  
const handleStartClick = () => {
    setLoadedScene(null); // 確保是新遊戲
    setCurrentScreen('naming'); 
  };

  const handleNameConfirmed = (nameInput) => {
    setChildName(nameInput);
    setCurrentScreen('prologue'); 
  }
  
  const handlePrologueFinish = () => setCurrentScreen('gameplay');

  return (
    <div className="App">
      {currentScreen === 'menu' && <MainMenu 
            onStartGame={handleStartClick} onLoadGame={handleLoadGame}/>}
      {currentScreen === 'naming' && <NameEntry onConfirm={handleNameConfirmed} />}
      {currentScreen === 'prologue' && <Prologue onAnimationEnd={handlePrologueFinish} />}

{currentScreen === 'gameplay' && (
  <div className="game-container" style={{/*...*/}}>
    <StatsDisplay stats={stats} />
    
    <GameScene 
        // [新增] 加入 key 屬性
        // 技巧：當 loadedScene 有值(讀檔)就用讀檔ID，沒值(新遊戲)就用 'new-game'
        // 這樣每次切換，React 都會知道這是「新的一局」，會徹底重置所有狀態！
        key={loadedScene || 'new-game'} 

        childName={childName} 
        stats={stats} 
        onUpdateStats={handleUpdateStats} 
        initialScene={loadedScene} 
    />
  </div>
)}
    </div>
  )
}

export default App