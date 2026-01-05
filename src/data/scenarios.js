// src/data/scenarios.js

// 這是你的劇本資料庫
export const scenarios = {
    // 1. 開場劇情 (Key: "intro")
    "intro": {
        bg: "/backgrounds/black.png",
        //bgm: "/audio/bgm/bg1.mp3",
        lines: [
            { speaker: "鬧鐘", text: "(叮鈴鈴鈴鈴鈴鈴! ! !)",
                voice: "/audio/sfx/Clock.mp3"
             },
            { speaker: "son", text: "「爸爸，快起床啦! ! ! 」" },
            { speaker: "我", text: "「讓我再睡一會兒···拜託··· 」",},
            { speaker: "我", text: "(打呼嚕······)",
                sound: "/audio/sfx/打火機.m4a"
             },
             { speaker: "son", text: "「你再不起床我們就要遲到了! 」"},
             { speaker: "我", text: "「什麼? ! ! 」"},
             { speaker: "son", text: "「今天是人家第一天上學的大日子哎。 」"},
             { speaker: "我", text: "(我猛然驚醒)", bg: "/backgrounds/bg.png",
                effect: "shake"},
             
             { speaker: "我", text: "",
                character: "/characters/father1.png"
             }          
        ],


        // 當 lines 跑完後，顯示這些選項
        choices: [
            { 
                text: "立刻抱起來哄", 
                nextScene: "hug_baby",  // 選擇後跳轉的場景 I
            },
            { 
                text: "先檢查尿布", 
                nextScene: "check_diaper", 
            },
            { 
                text: "假裝沒聽到 (繼續睡)", 
                nextScene: "ignore_baby", 
            }
        ]
    },

    // 2. 分支 A: 抱起來
    "hug_baby": {
        bg: "/backgrounds/background.png",
        bgm: "/audio/bgm/hospital_theme.mp3",
        lines: [
            { speaker: "我", text: "乖喔... 爸爸/媽媽在這裡...",
                voice: "/audio/voice/babycry.mp3",
                character: "/characters/MET4905_KeyVisual7_A2.png"
             },
            { speaker: "寶寶", text: "嗚... 嗚哇..." },
            { speaker: "系統", text: "寶寶感受到體溫，慢慢安靜了下來。" },
        ],
        choices: [
            { text: "把他放回床上", nextScene: "end_demo", },
            { text: "抱著睡覺", nextScene: "end_demo", }
        ]
    },

    // 3. 分支 B: 檢查尿布
    "check_diaper": {
        lines: [
            { speaker: "我", text: "是不是便便了？" },
            { speaker: "系統", text: "你熟練地打開尿布... 果然是一大包驚喜。" },
            { speaker: "我", text: "天啊，這味道..." }
        ],
        choices: [
            { text: "捏著鼻子換", nextScene: "end_demo",  }
        ]
    },

    // 4. 分支 C: 忽略
    "ignore_baby": {
        lines: [
            { speaker: "我", text: "(太累了... 讓我再睡五分鐘...)" },
            { speaker: "寶寶", text: "哇啊啊啊！！！(哭聲變大了)" },
            { speaker: "伴侶", text: "你怎麼都不起來哄一下？！" }
        ],
        choices: [
            { text: "立刻道歉", nextScene: "end_demo", },
            { text: "吵架", nextScene: "end_demo", }
        ]
    },

    // 結束範例
    "end_demo": {
        bg: "/backgrounds/background.png",
        lines: [
            { speaker: "系統", text: "（第一章節範例結束）" }
        ],
        choices: [
            { text: "Done", nextScene: "intro", } // 這裡之後可以寫個邏輯重置遊戲
        ]
    }
};