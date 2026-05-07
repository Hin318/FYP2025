/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { scenarios } from '../data/scenarios';
import { saveGame } from '../utils/saveSystem';

const GameScene = ({ childName, onUpdateStats, stats, initialScene, initialLineIndex, onExit }) => {
  const [currentSceneId, setCurrentSceneId] = useState(initialScene || 'intro');
  const [lineIndex, setLineIndex] = useState(initialLineIndex || 0);

  const currentScenario = scenarios[currentSceneId] || { lines: [], choices: [] };
  const currentLine = currentScenario.lines[lineIndex];

  // ==========================================
  // 🌟 [提煉] 劇本變數與動態特效判定 (唯一宣告點，絕不報錯)
  // ==========================================
  const lineVideo = currentLine?.video;
  const sceneVideo = currentScenario.video;
  const lineBg = currentLine?.bg;
  const sceneBg = currentScenario.bg;

  // 🌟 好感度立繪動態控制
  const [isAffectionVisible, setIsAffectionVisible] = useState(false); 
  // 🌟 分數判定雷達：根據目前的分數，回傳對應的「圖片檔名前綴」
  const getAffectionTier = (score) => {
      if (score >= 100) return "100";
      if (score >= 50) return "50";
      if (score >= 0) return "0";
      if (score >= -20) return "-20";
      if (score >= -50) return "-50";
      return "-100";
  };
  // 控制探頭或縮回
  const [tempAffectionImg, setTempAffectionImg] = useState(null);      // 控制短暫的變臉反應
  const affectionTimerRef = useRef(null);                              // 計時器

  const isExplicitStop = lineVideo === "stop" || lineVideo === "clear";
  const isSwitchingToImage = Boolean(lineBg && !lineVideo);
  
  // 決定影片是否該強制隱藏 (防閃爍)
  const forceVideoOff = isExplicitStop || isSwitchingToImage;

  // 動態 CSS 過場速度
  const isSmoothTransition = currentLine?.entryTransition === "cross-dissolve" || currentLine?.entryTransition === "fade";

  const videoTransitionOutStyle = isSmoothTransition ? 'opacity 0.8s ease-in-out' : 'opacity 0s linear 0.15s';

  const blackScreenTransition = isSmoothTransition ? 'none' : 'opacity 0s linear 0.15s';

  // ==========================================
  // 時光機函式 (用於 Archive 跳轉)
  // ==========================================
  const getLatestState = (key) => {
      const startIndex = Math.min(initialLineIndex || 0, currentScenario.lines.length - 1);
      for (let i = startIndex; i >= 0; i--) {
          if (currentScenario.lines[i] && currentScenario.lines[i][key] !== undefined) {
              return currentScenario.lines[i][key];
          }
      }
      return currentScenario[key];
  };

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef(null);
  const delayTimerRef = useRef(null);

  const [currentBg, setCurrentBg] = useState(() => getLatestState('bg') || "/backgrounds/default.jpg");
  const [currentEntryClass, setCurrentEntryClass] = useState("img-entry-instant");
  


  const [currentVideo, setCurrentVideo] = useState(() => {
      const video = getLatestState('video');
      return (video === "stop" || video === "clear") ? null : video;
  });

  const [videoExitClass] = useState("");
  const [screenEffect, setScreenEffect] = useState("");

  const bgmRefA = useRef(null);
  const bgmRefB = useRef(null);
  const activeBgmLayer = useRef('A'); // 紀錄現在是哪一軌在播
  const voiceRef = useRef(null);
  const sfxRef = useRef(null);
  const ambientRef = useRef(null);
  const videoRefA = useRef(null);
  const videoRefB = useRef(null);
  
  const [activeExitClass, setActiveExitClass] = useState("");
  const [globalTransition, setGlobalTransition] = useState("");

  const isDialogueFinished = !currentLine;
  const touchRegion = currentLine?.touchRegion;
  const arrowConfig = currentLine?.touchRegion?.arrow;
  const showDialogueBox = !currentLine?.hideDialogue && !isDialogueFinished;

  const leftChar = currentLine?.leftChar;
  const rightChar = currentLine?.rightChar;
  const centerChar = currentLine?.centerChar;

  const [isTransitionLocked, setIsTransitionLocked] = useState(false);
  const globalTimers = useRef([]);

  const setSafeTimeout = (callback, delay) => {
      const id = setTimeout(callback, delay);
      globalTimers.current.push(id);
      return id;
  };

  const clearAllSafeTimeouts = () => {
      globalTimers.current.forEach(clearTimeout);
      globalTimers.current = [];
  };

const [prevBg, setPrevBg] = useState(currentBg);

// --- 進度解鎖與分數快照系統 (雙核防護版) ---
  useEffect(() => {
      const savedProgress = JSON.parse(localStorage.getItem('archiveProgress')) || ['start'];
      const savedSnapshots = JSON.parse(localStorage.getItem('archiveSnapshots')) || {};
      let newUnlocks = [...savedProgress];
      let dataUpdated = false;

      // 🌟 工具 A：純解鎖 (專給選項後的節點用，嚴格保護分數不被覆蓋！)
      const unlockOnly = (key) => {
          if (!newUnlocks.includes(key)) {
              newUnlocks.push(key);
              dataUpdated = true;
          }
      };

      // 🌟 工具 B：解鎖並拍照 (給沒有選項的劇情中途用)
      const unlockAndSnapshot = (key) => {
          unlockOnly(key);
          if (savedSnapshots[key]?.relationship !== stats?.relationship) {
              savedSnapshots[key] = { ...stats }; 
              dataUpdated = true;
          }
      };

      // 1. 序章 (安全拍照)
      if (currentSceneId === 'intro' && lineIndex === 0) unlockAndSnapshot('start');
      if (currentSceneId === 'intro' && lineIndex === 46) unlockAndSnapshot('boss_event'); 

      // 2. 第一層選擇結果 (💥分數已在按鈕存好，這裡只准 unlockOnly！)
      if (currentSceneId === 'Choice1A_K3G' && lineIndex === 0) unlockOnly('reject_boss'); 
      if (currentSceneId === 'Choice1B_K3B' && lineIndex === 0) unlockOnly('accept_boss'); 

      // 3. 遊樂園故事
if ((currentSceneId === 'Choice1A_K3G' && lineIndex === 22) || 
          (currentSceneId === 'Choice1B_K3B' && lineIndex === 35)) {
          unlockAndSnapshot('park_event'); 
      }

// 4. 結局結果 (💥分數已在按鈕存好，這裡只准 unlockOnly！)
      const isShowingChoices = isDialogueFinished && currentScenario.choices && currentScenario.choices.length > 0;
      if ((currentSceneId === 'Choice1A_K3G' || currentSceneId === 'Choice1B_K3B') && isShowingChoices) {
          unlockAndSnapshot('park_choice_event'); 
      }

      // 💥 補上這裡：5. 最終結局解鎖 (分數在點擊選項時已經存好了，所以這裡只用 unlockOnly)
      if (currentSceneId === 'Choice2A_K3G' && lineIndex === 0) unlockOnly('park_good_route');
      if (currentSceneId === 'Choice2B_K3B' && lineIndex === 0) unlockOnly('park_bad_route');

      if (dataUpdated) {
          localStorage.setItem('archiveProgress', JSON.stringify(newUnlocks));
          localStorage.setItem('archiveSnapshots', JSON.stringify(savedSnapshots));
      }

  }, [currentSceneId, lineIndex, isDialogueFinished, stats]);

  const handleDialogueClick = () => {
      const fullText = currentLine.text.replace("{childName}", childName);
      if (isTyping) {
          if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
          setDisplayedText(fullText);
          setIsTyping(false);
      } else {
          handleNextDialogue();
      }
  };

const handleNextDialogue = () => {
      if (isTransitionLocked || globalTransition !== "") return;

      if (lineIndex < currentScenario.lines.length) {
          setIsTransitionLocked(true);
          clearAllSafeTimeouts();

          const exitEffect = currentLine?.exitTransition || "instant";

          if (exitEffect === "fade") {
              setGlobalTransition("fade-to-black");
              setSafeTimeout(() => {
                  setLineIndex(prev => prev + 1);
                  setSafeTimeout(() => {
                      setGlobalTransition("fade-from-black");
                      setSafeTimeout(() => {
                          setGlobalTransition("");
                          setIsTransitionLocked(false);
                      }, 800);
                  }, 250);
              }, 800);
          } else {
              if (exitEffect !== "instant") {
                  setActiveExitClass(`img-exit-${exitEffect}`);
                  setSafeTimeout(() => setActiveExitClass(""), 800);
              } else {
                  // 💥 關鍵修復：如果這行是瞬間切換，強制撕掉殘留的退場標籤！
                  // 這樣上一行的 Whip 就絕對不會傳染給下一張圖 (完美解決雙重手腕)
                  setActiveExitClass(""); 
              }
              setLineIndex(prev => prev + 1);
              setSafeTimeout(() => setIsTransitionLocked(false), 100);
          }
      }
  };

  const [videoA, setVideoA] = useState(currentVideo);
  const [videoB, setVideoB] = useState(null);
  const [loadedA, setLoadedA] = useState(false);
  const [loadedB, setLoadedB] = useState(false);
  const [activeLayer, setActiveLayer] = useState('A');

  const handleRegionClick = () => {
      if (touchRegion?.sound) {
          const tempAudio = new Audio(touchRegion.sound);
          tempAudio.volume = 0.5;
          tempAudio.play().catch(e => console.error("獨立音效播放失敗:", e));
      }
      if (touchRegion?.nextBg) setCurrentBg(touchRegion.nextBg);
      handleNextDialogue();
  };

const handleChoice = (choice) => {
    if (choice.stats) {
        // 1. 算出總和 (這個只留給存檔快照用！)
        const currentScore = stats?.relationship || 0;
        const choiceChange = choice.stats.relationship || 0;
        const newTotalScore = currentScore + choiceChange;

        // 💥 修正這裡！只傳遞「這次選擇的分數 (choice.stats)」給系統就好！
        // 不要再傳 newTotalScore 給系統了，不然它會重複加兩次！
        onUpdateStats(choice.stats);

        // 3. 【絕對無敵存檔法】：把算好的總分寫入快照！ (這段維持不變，你寫得很完美)
        const savedSnapshots = JSON.parse(localStorage.getItem('archiveSnapshots')) || {};
        if (choice.nextScene === 'Choice1A_K3G') savedSnapshots['reject_boss'] = { relationship: newTotalScore };
        if (choice.nextScene === 'Choice1B_K3B') savedSnapshots['accept_boss'] = { relationship: newTotalScore };
        if (choice.nextScene === 'Choice2A_K3G') savedSnapshots['park_good_route'] = { relationship: newTotalScore };
        if (choice.nextScene === 'Choice2B_K3B') savedSnapshots['park_bad_route'] = { relationship: newTotalScore };
        localStorage.setItem('archiveSnapshots', JSON.stringify(savedSnapshots));

        // ... (下面的反應立繪邏輯保持不變) ...

        // 💥 下面的反應立繪邏輯 (let reactionImg = null...) 保持不變，不用動它！
        
        // 💥 新邏輯：根據玩家選擇的「下一個場景 ID」，直接指定對應的反應圖片
        let reactionImg = null;
        
        if (choice.nextScene.includes("Choice1A")) {
            reactionImg = "/ui/Choice1A.png";
        } else if (choice.nextScene.includes("Choice1B")) {
            reactionImg = "/ui/Choice1B.png";
        } else if (choice.nextScene.includes("Choice2A")) {
            reactionImg = "/ui/Choice2A.png";
        } else if (choice.nextScene.includes("Choice2B")) {
            reactionImg = "/ui/Choice2B.png";
        } else {
            // 防呆機制：如果以後新增了其他選項，自動用新分數去抓預設的泡泡圖
            const currentScore = stats?.relationship || 0;
            const choiceChange = choice.stats.relationship || 0;
            const newScore = currentScore + choiceChange;
            reactionImg = `/ui/${getAffectionTier(newScore)}_text.png`;
        }

        // 設定圖片並彈出
        setTempAffectionImg(reactionImg);
        setIsAffectionVisible(true);
        
        if (affectionTimerRef.current) clearTimeout(affectionTimerRef.current);
        affectionTimerRef.current = setTimeout(() => {
            setIsAffectionVisible(false);
            setTimeout(() => setTempAffectionImg(null), 600); 
        }, 2500);

    } else {
        setIsAffectionVisible(false);
    }

    setCurrentSceneId(choice.nextScene);
    setLineIndex(0);
  };

  const hasChoices = isDialogueFinished && !currentLine?.isChapterEnd && currentScenario.choices && currentScenario.choices.length > 0;
  
  useEffect(() => {
      if (hasChoices) {
          setIsAffectionVisible(true); // 選項出現，探頭！
          setTempAffectionImg(null);   // 保持現在好感度的預設臉
      } else if (!tempAffectionImg) {
          // 如果選項不見了，而且也沒有在播變臉動畫，就乖乖縮回去
          setIsAffectionVisible(false); 
      }
  }, [hasChoices, tempAffectionImg]);

  // --- Effect 1: 環境音 ---
  useEffect(() => {
    if (!currentScenario || !ambientRef.current) return;
    const ambientCmd = currentLine?.ambient;
    if (!ambientCmd) return;
    const ambientInstance = ambientRef.current;
    if (ambientCmd === "stop") {
        ambientInstance.pause();
        ambientInstance.currentTime = 0;
    } else {
        if (!ambientInstance.src.includes(ambientCmd)) {
            ambientInstance.src = ambientCmd;
            ambientInstance.loop = true;
            ambientInstance.volume = 0.5;
            ambientInstance.play().catch(e => console.log("環境音播放失敗", e));
        }
    }
  }, [lineIndex, currentScenario]);

// --- Effect 2: 音效初始化 ---
  useEffect(() => {
    bgmRefA.current = new Audio();
    bgmRefB.current = new Audio();
    voiceRef.current = new Audio();
    sfxRef.current = new Audio();
    ambientRef.current = new Audio();
    
    return () => {
        if (bgmRefA.current) bgmRefA.current.pause();
        if (bgmRefB.current) bgmRefB.current.pause();
        if (voiceRef.current) voiceRef.current.pause();
        if (sfxRef.current) sfxRef.current.pause();
        if (ambientRef.current) ambientRef.current.pause();
    };
  }, []);

// --- Effect 3: 背景、影片與特效處理 (防變暗與防閃爍終極版) ---
  useEffect(() => {
    if (!currentScenario) return;
    const isChangingScene = Boolean(lineBg || lineVideo || isExplicitStop);

    if (isExplicitStop) setCurrentVideo(null);
    else if (lineVideo) setCurrentVideo(lineVideo);
    else if (lineIndex === 0 && sceneVideo) setCurrentVideo(sceneVideo);
    else if (isChangingScene && currentVideo) setCurrentVideo(null);

    let targetBg = null;
    if (lineBg) targetBg = lineBg;
    else if (lineIndex === 0 && sceneBg) targetBg = sceneBg;

if (targetBg && targetBg !== currentBg) {
        // 抓取進場特效
        const entryTransition = currentLine?.entryTransition || "instant";
        
        // 檢查「上一張圖是不是正在飛走 (Whip)？」
        const prevLineExit = currentScenario.lines[lineIndex - 1]?.exitTransition || "instant";
        const isPlayingExit = prevLineExit !== "instant" && prevLineExit !== "fade";

        // 🌟 核心防護：判斷現在畫面上是不是有影片？
        // 就算這句寫了 video:"stop"，在 React 狀態更新前 currentVideo 依然會有值！
        const wasVideoPlaying = Boolean(currentVideo);

        setCurrentBg(targetBg);

        // 💥 終極完美分類 (徹底解決變暗與重疊)：
    if (wasVideoPlaying) {
            setPrevBg(targetBg);
            setCurrentEntryClass("img-entry-instant");
        } else if (entryTransition === "instant" && !isPlayingExit) {
            // 情況 B：普通的瞬間切換 (例如 s10.png 老闆)
            // 💥 終極修復：不要 0 毫秒瞬間清空！我們給舊圖 60 毫秒 (約 3 幀) 的時間墊在底層
            // 這樣既能完美掩護 React 渲染新圖的「黑色眨眼」，又快到肉眼絕對看不出重疊！
            setPrevBg(currentBg);
            setCurrentEntryClass("img-entry-instant");
            setTimeout(() => {
                setPrevBg(targetBg);
            }, 60);
        } else {
            setPrevBg(currentBg);
            setCurrentEntryClass(`img-entry-${entryTransition}`);
            setTimeout(() => {
                setPrevBg(targetBg);
            }, 850);
        }
    }
    if (currentLine?.effect === "shake") setScreenEffect("effect-shake");
    else setScreenEffect("");

  }, [lineIndex, currentSceneId, currentBg, currentVideo]);
  // --- Effect 3.5: 雙軌引擎 (保證順暢過渡不閃屏) ---
  useEffect(() => {
      let timerA, timerB;
      if (!currentVideo) {
          timerA = setTimeout(() => { setVideoA(null); setLoadedA(false); }, 800);
          timerB = setTimeout(() => { setVideoB(null); setLoadedB(false); }, 800);
      } else {
          if (activeLayer === 'A' && currentVideo !== videoA) {
              setVideoB(currentVideo);
              setLoadedB(false);
              setActiveLayer('B');
              timerA = setTimeout(() => setVideoA(null), 800);
          } else if (activeLayer === 'B' && currentVideo !== videoB) {
              setVideoA(currentVideo);
              setLoadedA(false);
              setActiveLayer('A');
              timerB = setTimeout(() => setVideoB(null), 800);
          }
      }
      return () => { clearTimeout(timerA); clearTimeout(timerB); };
  }, [currentVideo, activeLayer, videoA, videoB]);

  // 運算顯示層 (雙重門禁機制)
  const showA = Boolean(!forceVideoOff && videoA && ((activeLayer === 'A' && loadedA) || (activeLayer === 'B' && !loadedB)));
  const showB = Boolean(!forceVideoOff && videoB && ((activeLayer === 'B' && loadedB) || (activeLayer === 'A' && !loadedA)));
  const isVideoShowing = showA || showB;

  // --- Effect 4: BGM ---
// --- Effect 4: BGM (雙軌淡入淡出 - 遊戲開始優化版) ---
  useEffect(() => {
    if (!currentScenario || !bgmRefA.current || !bgmRefB.current) return;

    // 1. 往回追蹤最近的 BGM 設定
    let targetBgm = null;
    for (let i = lineIndex; i >= 0; i--) {
        if (currentScenario.lines[i]?.bgm !== undefined) {
            targetBgm = currentScenario.lines[i].bgm;
            break; 
        }
    }
    if (targetBgm === null) targetBgm = currentScenario.bgm;

    // 🎛️ 音量淡化控制器
    const fadeAudio = (audio, targetVol, duration) => {
        clearInterval(audio.fadeInterval);
        if (targetVol > 0 && audio.paused) {
            audio.volume = 0;
            audio.play().catch(e => console.log("BGM 播放失敗", e));
        }
        const steps = 20;
        const volStep = (targetVol - audio.volume) / steps;
        audio.fadeInterval = setInterval(() => {
            let nextVol = audio.volume + volStep;
            if (nextVol > 1) nextVol = 1;
            if (nextVol <= 0.02 && targetVol === 0) { 
                audio.volume = 0;
                audio.pause();
                clearInterval(audio.fadeInterval);
            } else if ((volStep > 0 && nextVol >= targetVol) || (volStep < 0 && nextVol <= targetVol)) {
                audio.volume = targetVol;
                clearInterval(audio.fadeInterval);
            } else {
                audio.volume = nextVol;
            }
        }, duration / steps);
    };

    const isA = activeBgmLayer.current === 'A';
    const activeRef = isA ? bgmRefA.current : bgmRefB.current;
    const inactiveRef = isA ? bgmRefB.current : bgmRefA.current;

    if (targetBgm === "stop" || !targetBgm) {
        if (!activeRef.paused) fadeAudio(activeRef, 0, 1000); 
    } else {
        const isAlreadyPlayingThis = activeRef.src.includes(targetBgm);
        
        if (!isAlreadyPlayingThis) {
            // 舊歌淡出
            if (!activeRef.paused) fadeAudio(activeRef, 0, 1500); 
            
            inactiveRef.src = targetBgm;
            inactiveRef.loop = true;

            // 🌟 核心修改：判斷是否為「遊戲開始的那一段」
            // 這裡設定為：如果是 intro 場景且在第一行 (或從外部跳轉進入)
            const isGameStart = (currentSceneId === 'intro' && lineIndex === 0);

            if (isGameStart) {
                // 💥 瞬間就位：直接設定音量並播放，不使用淡入特效
                inactiveRef.volume = 0.2; 
                inactiveRef.play().catch(e => console.log("BGM 直接播放失敗", e));
            } else {
                // 其他劇情中的音樂切換，維持 1.5 秒的淡入效果
                fadeAudio(inactiveRef, 0.2, 1500); 
            }
            
            // 切換軌道
            activeBgmLayer.current = isA ? 'B' : 'A'; 
        } else if (activeRef.paused) {
            // 同首歌恢復播放也使用較快的淡入
            fadeAudio(activeRef, 0.2, 1000);
        }
    }
  }, [lineIndex, currentSceneId]);

  // --- 影片自動播放控制 ---
  useEffect(() => {
    let fallbackTimer;
    const activeVideoRef = activeLayer === 'A' ? videoRefA.current : videoRefB.current;
    const activeVideoSrc = activeLayer === 'A' ? videoA : videoB;
    if (activeVideoSrc && activeVideoRef) {
        activeVideoRef.volume = 0.7;
        const playPromise = activeVideoRef.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("影片自動播放被阻擋:", error);
                activeVideoRef.muted = true;
                activeVideoRef.play().catch(e => console.log("靜音播放也失敗:", e));
            });
        }
        fallbackTimer = setTimeout(() => {
            if (activeLayer === 'A') setLoadedA(true);
            if (activeLayer === 'B') setLoadedB(true);
        }, 1500);
    }
    return () => clearTimeout(fallbackTimer);
  }, [activeLayer, videoA, videoB]);

  // --- Effect 5: SFX 與 語音 ---
  useEffect(() => {
    if (!currentScenario || !voiceRef.current || !sfxRef.current) return;
    if (!currentLine) return;
    
    voiceRef.current.pause();
    voiceRef.current.currentTime = 0;
    if (currentLine.voice) {
        voiceRef.current.src = currentLine.voice;
        voiceRef.current.volume = 1.0;
        voiceRef.current.play().catch(e => console.error("語音播放失敗", e));
    }
    
    sfxRef.current.pause();
    sfxRef.current.currentTime = 0;
    if (currentLine.sound) {
        sfxRef.current.src = currentLine.sound;
        sfxRef.current.volume = 0.6;
        sfxRef.current.loop = false;
        sfxRef.current.play().catch(e => console.log("音效播放失敗", e));
    }
  }, [lineIndex, currentSceneId]);

  // --- Effect 6: 打字機 ---
  useEffect(() => {
    if (!currentLine || (currentLine.hideDialogue && !currentLine.isChapterEnd)) {
        setDisplayedText("");
        setIsTyping(false);
        return;
    }
    const fullText = currentLine.text.replace("{childName}", childName);
    
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedText("");
    setIsTyping(true);
    
    let currentIndex = 0;
    const startDelay = currentLine.isChapterEnd ? 2000 : 0;
    const typeSpeed = currentLine.isChapterEnd ? 150 : 80;

    delayTimerRef.current = setTimeout(() => {
        typingTimerRef.current = setInterval(() => {
            if (currentIndex < fullText.length) {
                const currentString = fullText.substring(0, currentIndex + 1);
                setDisplayedText(currentString);
                currentIndex++;
            } else {
                clearInterval(typingTimerRef.current);
                setIsTyping(false);
            }
        }, typeSpeed);
    }, startDelay);

    return () => {
        if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [lineIndex, currentSceneId]);

  // --- Effect 7: 空白鍵 (Space) 跳過劇情 ---
  useEffect(() => {
    const handleKeyDown = (e) => {
        // 檢查玩家按下的是不是空白鍵
        if (e.code === 'Space') {
            e.preventDefault(); // 💥 重要魔法：阻止瀏覽器按空白鍵會「往下捲動」的預設行為！

            // 🛑 防呆 1：畫面上出現選項時，強制玩家用滑鼠點擊，鎖定空白鍵
            if (hasChoices) return;
            
            // 🛑 防呆 2：畫面上有需要特別點擊的區域 (隱形按鈕/放大鏡) 時，鎖定空白鍵
            if (touchRegion) return;

            // 🎯 執行與滑鼠點擊完全相同的邏輯
            if (currentLine?.isChapterEnd) {
                // 結局畫面的點擊邏輯
                if (isTyping) handleDialogueClick();
                else {
                    if (onExit) onExit();
                }
            } else if (currentLine?.hideDialogue) {
                // 隱藏對話框時的點擊邏輯 (純風景/純影片)
                handleNextDialogue();
            } else {
                // 正常對話狀態的點擊邏輯
                handleDialogueClick();
            }
        }
    };

    // 綁定鍵盤監聽器到整個視窗
    window.addEventListener('keydown', handleKeyDown);
    
    // 組件卸載或更新時，務必清理掉舊的監聽器
    return () => window.removeEventListener('keydown', handleKeyDown);
  }); // 這裡刻意不加依賴陣列 []，確保它隨時抓到最新的 isTyping 和 currentLine 狀態


  if (!currentScenario || !currentScenario.lines) {
      return <div>讀取中...或找不到場景 {currentSceneId}</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'absolute', top: 0, left: 0 }}>
        {/* 🌟 2. 遊戲舞台：終極鎖定魔法！強制它永遠保持 16:9 完美比例！ */}
        <div className={`game-scene-container ${screenEffect}`}
          style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              backgroundColor: 'black',
              /* 💥 這四行是鎖定比例的核心，請原封不動貼上 */
              width: '100vw', 
              height: '56.25vw', 
              maxWidth: '177.78vh', 
              maxHeight: '100vh'
          }}>

          

{/* 🌟 增強版預載機制：一口氣預先下載後面 3 行的圖片，徹底消滅讀取造成的黑屏空窗期！ */}
      {[1, 2, 3].map(offset => {
          const preloadBg = currentScenario.lines[lineIndex + offset]?.bg;
          return preloadBg ? <img key={`preload-${offset}`} src={preloadBg} style={{ display: 'none' }} alt="preload" /> : null;
      })}

      {/* 圖片層 */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black' }}>
          <div
              className={activeExitClass}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${prevBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: activeExitClass ? 10 : 1 }}
          />
          <div
              key={currentBg}
              className={currentEntryClass}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${currentBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: 2, backgroundColor: 'transparent' }}
          />
      </div>

      {/* =========== 1.5 影片防透圖黑幕 (zIndex: 3) =========== */}
      <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'black',
          zIndex: 3,
          opacity: isVideoShowing ? 1 : 0, 
          // 🌟 換上新的黑幕過場變數
          transition: isVideoShowing ? 'none' : blackScreenTransition,               
          pointerEvents: 'none'                                 
      }} />

      {/* 影片層 A */}
      {videoA && (
        <video ref={videoRefA} src={videoA} playsInline muted={!showA} preload="auto" onLoadedData={() => setLoadedA(true)} onPlaying={() => setLoadedA(true)} onError={() => setLoadedA(true)} onEnded={activeLayer === 'A' ? handleNextDialogue : null} className={activeLayer === 'A' && videoExitClass ? videoExitClass : ""}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'transparent', opacity: showA ? 1 : 0, transition: showA ? 'none' : videoTransitionOutStyle, zIndex: showA ? 5 : 4 }} />
      )}

      {/* 影片層 B */}
      {videoB && (
        <video ref={videoRefB} src={videoB} playsInline muted={!showB} preload="auto" onLoadedData={() => setLoadedB(true)} onPlaying={() => setLoadedB(true)} onError={() => setLoadedB(true)} onEnded={activeLayer === 'B' ? handleNextDialogue : null} className={activeLayer === 'B' && videoExitClass ? videoExitClass : ""}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'transparent', opacity: showB ? 1 : 0, transition: showB ? 'none' : videoTransitionOutStyle, zIndex: showB ? 5 : 4 }} />
      )}

      {/* 隱藏對話時點擊區域 */}
      {currentLine?.hideDialogue && !touchRegion && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 40, cursor: 'pointer' }} onClick={handleNextDialogue} />
      )}

      {/* 隱形按鈕 */}
      {touchRegion && (
        <div className="touch-region-box" onClick={(e) => { e.stopPropagation(); handleRegionClick(); }}
            style={{ position: 'absolute', left: touchRegion.x, top: touchRegion.y, width: touchRegion.width, height: touchRegion.height, cursor: touchRegion.cursor || 'pointer', zIndex: 60, }}>
            <div className="ripple-indicator" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }} />
        </div>
      )}

      {/* 提示箭頭 */}
      {arrowConfig && (
          <img src={arrowConfig.img} className="interaction-arrow" style={{ left: arrowConfig.x, top: arrowConfig.y }} alt="" />
      )}
{/* 右下角系統按鈕區 (完美等比例 + Grid 變形排版) */}
      <div className="system-btn-group">
        
        {/* 存檔按鈕 */}
        <button className="sys-btn btn-save" onClick={() => saveGame({ sceneId: currentSceneId, childName, stats })}>
            <img src="/icon/icon-save.png" alt="save" className="sys-btn-icon" /> 存檔
        </button>

        {/* 回主畫面按鈕 */}
        <button className="sys-btn btn-home" onClick={() => {
            if (window.confirm("確定要返回主選單嗎？未存檔的進度將會遺失！")) {
                window.location.reload(); 
            }
        }}>
            <img src="/icon/icon-home.png" alt="home" className="sys-btn-icon" /> 主畫面
        </button>

        {/* 上一段按鈕 */}
        <button 
            className="sys-btn btn-prev"
            onClick={() => {
                if (lineIndex > 0) {
                    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
                    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
                    setLineIndex(prev => prev - 1);
                }
            }}
            disabled={lineIndex === 0} // 反灰的樣式已經全部交給 CSS 處理了！
        >
            ↩ 上一段
        </button>

      </div>

{/* 🌟 好感度動態立繪 (12圖完美對應版) */}
      {(() => {
          // 1. 取得現在的真實分數，並透過雷達轉成檔名前綴
          const currentScore = stats?.relationship || 0; 
          const tier = getAffectionTier(currentScore);
          
          // 2. 預設的基礎圖是沒有對話泡泡的 (例如 "/ui/0.png")
          const baseImg = `/ui/${tier}.png`;
          
          // 3. 決定要顯示哪張：如果有 tempAffectionImg(選擇後的泡泡圖) 就優先顯示，沒有就顯示 baseImg
          const displayImg = tempAffectionImg || baseImg;

return (
              <div style={{
                  position: 'absolute',
                  bottom: '-10px', /* 💥 關鍵修改 1：貼齊螢幕最底部 (設定 -10px 可以稍微把圖片下方切平的邊緣藏到螢幕外) */
                  right: isAffectionVisible ? '2vw' : '-600px', /* 💥 關鍵修改 2：因為圖片變大了，縮回去的距離也要拉長到 -600px 才能藏好 */
                  opacity: isAffectionVisible ? 1 : 0,
                  zIndex: 55, /* 💥 關鍵修改 3：提高圖層高度，確保它會蓋在「選擇按鈕的半透明黑底」之上 */
                  pointerEvents: 'none',
                  transition: 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' 
              }}>
                  <img 
                      src={displayImg} 
                      alt="Affection" 
                      style={{ 
                          width: '600px', /* 💥 關鍵修改 4：寬度直接放大超過兩倍！(你可以依據喜好微調 400px ~ 500px) */
                          height: 'auto',
                          filter: 'drop-shadow(-10px 10px 25px rgba(0,0,0,0.8))', /* 加深陰影，讓立體感更強烈 */
                          display: 'block' /* 確保圖片底部不會有奇怪的縫隙 */
                      }} 
                  />
              </div>
          );
      })()}

      {/* 角色層 */}
      <div className="characters-stage">
          {leftChar && <img src={leftChar} className={`char-img char-left smooth-fade ${currentLine.speaker === "小孩" ? "" : "char-dim"}`} alt="Left" />}
          {centerChar && <img src={centerChar} className="char-img char-center smooth-fade" alt="Center" />}
          {rightChar && <img src={rightChar} className={`char-img char-right smooth-fade ${currentLine.speaker === "我" ? "" : "char-dim"}`} alt="Right" />}
      </div>

      {/* 選項按鈕層 */}
      {isDialogueFinished && !currentLine?.isChapterEnd && (
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

      {/* 對話框層 */}
      {showDialogueBox && (
          <div className="dialogue-clickable-area" style={{ pointerEvents: 'none' }}>
              <div className="dialogue-wrapper">
                  {currentLine.speaker && <div className="name-tag">{currentLine.speaker}</div>}
                  <div className="dialogue-box" onClick={touchRegion ? null : handleDialogueClick} style={{ pointerEvents: 'auto', cursor: touchRegion ? 'default' : 'pointer' }}>
                      <p className="dialogue-text">{displayedText}</p>
                      {!isTyping && <div className="next-indicator">▼</div>}
                  </div>
              </div>
          </div>
      )}

{/* 結局電影黑幕 (帶有分數與好感度泡泡結算版) */}
      {currentLine?.isChapterEnd && (() => {
          const finalScore = stats?.relationship || 0;
          const tier = getAffectionTier(finalScore);
          
          // 💥 關鍵修改：將原本的 _text.png 改成 _end.png
          const finalImg = `/ui/${tier}_end.png`;

          return (
              <div className="chapter-end-overlay"
                  onClick={() => {
                      if (isTyping) handleDialogueClick();
                      else { 
                          if (onExit) onExit(); 
                      }
                  }}
                  style={{ cursor: 'pointer' }}>
                  
                  <h1 className="chapter-end-title" style={{ marginBottom: '20px' }}>
                      你的評語:
                  </h1>

                  <img 
                      src={finalImg} 
                      alt="Final Affection" 
                      style={{ 
                          width: '650px', 
                          height: 'auto',
                          marginBottom: '20px',
                          filter: 'drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.15))',
                          opacity: 0,
                          animation: 'cinematic-fade-in 1s ease-in-out forwards 2s' 
                      }} 
                  />
                {/* 💥 修改這裡：加入防閃爍過濾器！
                      邏輯：如果現在的殘影文字不是結局台詞的一部分，就強制顯示空白 ("") */}
                  <p className="chapter-end-text">
                      {currentLine.text.replace("{childName}", childName).startsWith(displayedText) ? displayedText : ""}
                  </p>
                  
                  {!isTyping && <div className="click-to-continue-hint">點擊畫面回到世界樹➔</div>}
              </div>
          );
      })()}

      {/* 全域過場黑幕 */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black', zIndex: 45, pointerEvents: 'none', opacity: globalTransition === "fade-to-black" ? 1 : 0, transition: globalTransition ? 'opacity 0.8s ease-in-out' : 'none' }} />
      </div>
    </div>
  );
};

export default GameScene;