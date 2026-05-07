
import { useState } from 'react'
import './App.css'
import MainMenu from './components/MainMenu'
import Prologue from './components/Prologue'
import GameScene from './components/GameScene'
import StatsDisplay from './components/StatsDisplay'
import ArchiveMenu from './components/ArchiveMenu' // 🌟 新增這行：引入世界樹組件
import { loadGame } from './utils/saveSystem';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [childName, setChildName] = useState('');

  
  const [stats, setStats] = useState({
    sanity: 0,         
    relationship: 0, 
    development: 0    
 });

  const [loadedScene, setLoadedScene] = useState(null);

 
  const handleUpdateStats = (changes) => {
    setStats(prevStats => {
       
        const newStats = { ...prevStats };
        
       
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
        
        setStats(saveData.stats);
       
        setChildName(saveData.childName);
        
        setLoadedScene(saveData.sceneId);
        
        setCurrentScreen('gameplay');
    } else {
        alert("找不到存檔紀錄！");
    }
  };
  
const handleStartClick = () => {
    setLoadedScene(null); 
    setJumpLineIndex(0);           // 🌟 重新開始要歸零
    setCurrentScreen('prologue'); 
  };

const [jumpLineIndex, setJumpLineIndex] = useState(0);

// 💥 加上第三個參數：snapshotStats
  const handleJumpToScene = (sceneId, lineIdx = 0, snapshotStats) => {
      setLoadedScene(sceneId);
      setJumpLineIndex(lineIdx);     // 🌟 記錄要跳到哪一行
      setCurrentScreen('gameplay');
      
      // 💥 真正的「時光倒流 (回車)」魔法在這裡！
      // 如果 Archive 有傳遞歷史分數過來，就強制用它覆蓋現在的分數
      if (snapshotStats) {
          setStats(snapshotStats); 
          // ⚠️ 注意：如果你的分數狀態設定函數不叫 setStats（例如叫 setGameStats 或 updateStats），請記得把這裡換成你實際的名字！
      }
  };


  
  const handlePrologueFinish = () => setCurrentScreen('gameplay');

return (
    <div className="App">
      {currentScreen === 'menu' && (
          <MainMenu 
              onStartGame={handleStartClick} 
              onLoadGame={handleLoadGame}
              onJumpToScene={handleJumpToScene} 
          />
      )}

      {/* 🌟 1. 註冊 Archive 畫面：當 currentScreen 是 'archive' 時顯示世界樹 */}
      {currentScreen === 'archive' && (
          <ArchiveMenu 
              onClose={() => setCurrentScreen('menu')} // 點擊返回時回主畫面
              onJumpToScene={handleJumpToScene}        // 支援從世界樹跳轉
          />
      )}

      {currentScreen === 'prologue' && <Prologue onAnimationEnd={handlePrologueFinish} />}

      {currentScreen === 'gameplay' && (
        <div className="game-container" style={{/*...*/}}>
          <StatsDisplay stats={stats} />
          
          <GameScene 
              key={`${loadedScene || 'new-game'}-${jumpLineIndex}`} 
              childName={childName} 
              stats={stats} 
              onUpdateStats={handleUpdateStats} 
              initialScene={loadedScene} 
              initialLineIndex={jumpLineIndex} 
              // 🌟 2. 接上熱線：當遊戲結束時，請大老闆把畫面切換到 'archive'
              onExit={() => setCurrentScreen('archive')} 
          />
        </div>
      )}
    </div>
  )
}

export default App