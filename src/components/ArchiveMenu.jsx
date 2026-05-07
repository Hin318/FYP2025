import React, { useState, useEffect, useRef } from 'react';

// 🌟 小工具：專門用來產生「未解鎖問號卡片」，這樣程式碼就不會又長又亂！
const LockedNode = () => (
    <div className="node-story" style={{ filter: 'grayscale(50%) opacity(0.8)' }}>
        <h3>???</h3>
        <div className="locked-image-placeholder">?</div>
    </div>
);

// 💥 讀取全域快照庫，並準備一個提取工具
    const savedSnapshots = JSON.parse(localStorage.getItem('archiveSnapshots')) || {};
    // 如果找不到快照，預設給 0 分防呆
const getSnapshot = (key, defaultScore = 0) => savedSnapshots[key] || { relationship: defaultScore, sanity: 100, development: 0 };



const ArchiveMenu = ({ onClose, onJumpToScene }) => {
    
    const [unlockedProgress] = useState(() => {
        try {
            const rawData = localStorage.getItem('archiveProgress');
            return rawData ? JSON.parse(rawData) : ['start'];
        } catch (e) {
            console.error("讀取進度失敗，維持初始狀態", e);
            return ['start'];

             }

    });

    // 🌟 1. 建立 Archive 專屬音軌
    const archiveBgmRef = useRef(null);

    // 🌟 2. 專業音量漸變工具 (保持跟 GameScene 一樣的絲滑感)
    const fadeAudio = (audio, targetVol, duration) => {
        if (!audio) return;
        clearInterval(audio.fadeInterval);
        
        if (targetVol > 0 && audio.paused) {
            audio.volume = 0;
            audio.play().catch(e => console.log("Archive BGM 播放失敗", e));
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

    // 🌟 3. 控制音樂開關
    useEffect(() => {
        // 設定你的音樂路徑 (請根據你的資料夾修改檔名)
        archiveBgmRef.current = new Audio("/audio/bgm/.mp3"); 
        archiveBgmRef.current.loop = true;

        // 進入頁面：1.5 秒淡入到音量 0.2
        fadeAudio(archiveBgmRef.current, 0.2, 1500);

        // 離開頁面 (Unmount)：1 秒淡出
        return () => {
            if (archiveBgmRef.current) {
                fadeAudio(archiveBgmRef.current, 0, 1000);
                // 延遲清除 ref 確保淡出完成
                setTimeout(() => { archiveBgmRef.current = null; }, 1100);
            }
        };
    }, []);

    const isUnlocked = (nodeId) => unlockedProgress.includes(nodeId);

    return (
        <div className="archive-overlay">
            <button className="archive-close-btn" onClick={onClose}>返回主畫面</button>
            <h1 className="archive-title">世界樹 ARCHIVE</h1>

<div className="tree-container">
                
                {/* 節點 1：序章 (永遠解鎖) */}
                <div className="node-story clickable" onClick={() => onJumpToScene('intro', 0, getSnapshot('start'))}>
                    <h3>約定與承諾</h3>
                    <img src="/backgrounds/s1.png" alt="office" />
                </div>
                <div className="line-v"></div>
                
                {/* 🌟 條件判斷 1：是否遇到老闆選項？ */}
                {isUnlocked('boss_event') ? (
                    <>  {/* 💥 就是這裡開啟的標籤，之前少關閉了 */}
                        <div className="node-story clickable" onClick={() => onJumpToScene('intro', 46, getSnapshot('boss_event'))}>
                            <h3>老闆的緊急要求</h3>
                            <img src="/backgrounds/s10.png" alt="office" />
                        </div>
                        <div className="line-v"></div>

                        {/* 第一層分歧：決定是否反抗 */}
                        <div className="branch-container">
                            {/* 左線：婉拒老闆 */}
                            <div className="branch-column">
                                <div className="line-v"></div>
                                <div className="node-choice">婉拒老闆</div>
                                <div className="line-v"></div>
                                {isUnlocked('reject_boss') ? (
                                    <div className="node-story clickable" onClick={() => onJumpToScene('Choice1A_K3G', 0, { relationship: 20 })}>
                                        <h3>反抗吧！</h3>
                                        <img src="/backgrounds/K3G_s1.png" alt="office" />
                                    </div>
                                ) : (
                                    <LockedNode /> 
                                )}
                                {/* 為了連回主線的垂直線 */}
                                <div className="line-v"></div>
                            </div>

                            {/* 右線：無奈接受 */}
                            <div className="branch-column">
                                <div className="line-v"></div>
                                <div className="node-choice" style={{borderColor: '#FF7676', color: '#FFB2B2'}}>無奈接受</div>
                                <div className="line-v"></div>
                                {isUnlocked('accept_boss') ? (
                                    <div className="node-story clickable" onClick={() => onJumpToScene('Choice1B_K3B', 0, { relationship: -20 })}>
                                        <h3>接受工作</h3>
                                        <img src="/backgrounds/K3B_K3B.png" alt="work" />
                                    </div>
                                ) : (
                                    <LockedNode />
                                )}
                                {/* 為了連回主線的垂直線 */}
                                <div className="line-v"></div>
                            </div>
                        </div>

                        {/* 💥 魔法合流點：左右線條在此合併 */}
                        <div style={{ width: '50%', height: '2px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}></div>
                        <div className="line-v"></div>

                        {/* 🌟 共同的遊樂園主線 (殊途同歸) */}
                        {isUnlocked('park_event') ? (
                            <>
                                {/* 1. 遊樂園故事起點 */}
                                <div className="node-story clickable" onClick={() => onJumpToScene('Choice1A_K3G', 22, getSnapshot('park_event'))}>
                                    <h3>遊樂園故事</h3>
                                    <img src="/backgrounds/K3B_s14.png" alt="park" />
                                </div>
                                <div className="line-v"></div>

                                {/* 🌟 條件判斷：玩家玩到遊樂園的選項那邊了嗎？ */}
                                {isUnlocked('park_choice_event') ? (
                                    <>
                                        {/* 2. 抉擇點 */}
                                        <div className="node-story clickable" onClick={() => onJumpToScene('Choice1A_K3G', 35, getSnapshot('park_event'))}>
                                            <h3>遊樂園的抉擇</h3>
                                            <img src="/backgrounds/K3B_s16_5.png" alt="parkchoice" />
                                        </div>
                                        <div className="line-v"></div>

                                        {/* 3. 遊樂園的第二層分歧：好與壞 */}
                                        <div className="branch-container" style={{ width: '120%' }}>
                                            
                                            {/* 遊樂園好路線 (貼心父母) */}
                                            <div className="branch-column">
                                                <div className="line-v"></div>
                                                <div className="node-choice">貼心父母</div>
                                                <div className="line-v"></div>
                                                {isUnlocked('park_good_route') ? (
                                                    <div className="node-story clickable" onClick={() => onJumpToScene('Choice2A_K3G', 0, { relationship: getSnapshot('park_event').relationship + 30 })}>
                                                        <h3>完美假期</h3>
                                                        <img src="/backgrounds/K3B_s17.png" alt="park" />
                                                    </div>
                                                ) : (
                                                    <LockedNode />
                                                )}
                                            </div>

                                            {/* 遊樂園壞路線 (冷落家人) */}
                                            <div className="branch-column">
                                                <div className="line-v"></div>
                                                <div className="node-choice" style={{borderColor: '#FF7676', color: '#FFB2B2'}}>冷落家人</div>
                                                <div className="line-v"></div>
                                                {isUnlocked('park_bad_route') ? (
                                                    <div className="node-story clickable" onClick={() => onJumpToScene('Choice2B_K3B', 0, { relationship: getSnapshot('park_event').relationship - 30 })}>
                                                        <h3>不歡而散</h3>
                                                        <img src="/backgrounds/K3B_s17.png" alt="park " />
                                                    </div>
                                                ) : (
                                                    <LockedNode />
                                                )}
                                            </div>

                                        </div>
                                    </>
                                ) : (
                                    /* 如果進了遊樂園，但還沒玩到選項，下面就會顯示問號 */
                                    <LockedNode />
                                )}
                            </>
                        ) : (
                            /* 如果連遊樂園都還沒走到，下面顯示問號 */
                            <LockedNode />
                        )}
                    </> /* 💥 就是這個結束標籤！把它補上後就不會報錯了 */
                ) : (
                    // 如果連老闆選項都還沒出來，整棵樹就只會有一個問號
                    <LockedNode />
                )}

            </div>
        </div>
    );
};

export default ArchiveMenu;