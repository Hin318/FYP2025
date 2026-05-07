

export const scenarios = {
    "intro": {
         bgm:"/audio/bgm/HappyBgm1.mp3",
        lines: [
            { speaker: "神秘人", text:"（在這繁忙的辦公室. . .）", video:"backgrounds/Scene1Video.mp4", sound: "", },
            
            { speaker: "神秘人", text: "（充滿著鍵盤的敲擊聲）", ambient: "/audio/sfx/Keyboard.mp3" },

            { speaker: "神秘人", text: "（每個人都在忙碌地工作）",ambient:"/audio/sfx/OfficePhonecalling1.mp3" },

            { speaker: "神秘人", text: "", video:"backgrounds/s1T.mp4" , hideDialogue:"true", sound:"/audio/sfx/whooshtransition1.mp3", ambient:"stop"},

            { speaker: "我", text: "（而在辦公室另一頭. . .）",  bgm:"audio/bgm/Event.mp3",voice:"",ambient:"/audio/sfx/Photocopie1.mp3"},

            { speaker: "我", text: "唉 (嘆氣)", voice:"",ambient:"stop"},

            { speaker: "我", text: "「什麼時候才能下班呢？」", voice:"",  },

            { speaker: "我", text: "我一邊打印着手中的文件一邊喃喃自語地說着話", video:"stop",bg:"/backgrounds/s2_2.png", ambient:"/audio/sfx/Photocopie2.mp3",entryTransition: "cross-dissolve"},

            { speaker: "我", text: "(不知不覺間，影印機已經完成了它的工作。)",ambient:"stop", sound:"/audio/sfx/Photocopie3.mp3",  },

            { speaker: "我", text: "「1、2、3、4、5. . . . .」", voice:""},

            {speaker: "我", text: "「齊了！」", voice:"", bg:"/backgrounds/s2_4.png", entryTransition: "cross-dissolve" ,exitTransition:"fade"},

            { speaker: "我", text: "", video:"backgrounds/Scene3Video_K3.mp4", entryTransition:"fade",sound:"/audio/sfx/Footsteps.mp3", hideDialogue:"true"},

            { speaker: "我", text: "我雙手捧著那一疊厚厚的文件，緩慢地從影印房。"},

            {speaker: "我", text: "什麼？你說那疊厚厚的文件重嗎？不，其實一點都不重。", voice:""  },

            { speaker: "我", text: "只是…我在扮工而已。",  voice:"", exitTransition: "fade"  },

            { speaker: "我", text: "", video: "backgrounds/Scene4Video_K3.mp4", sound: "/audio/sfx/FootstepSpeedx2.mp3", hideDialogue:"true" },

            { speaker: "我", text: "（回到辦公室的範圍） " },  

            { speaker: "我", text: "必需加緊腳步" },

            { speaker: "我", text: "這就是扮工的至高境界！", exitTransition: "fade" },

            { speaker: "我", text: "", video:"/backgrounds/s5_Video.mp4", hideDialogue:"true" },

            { speaker: "我", text: "回到座位後，我再一次檢查文件",   },

            { speaker: "我", text: "確定沒有遺漏後，我終於開始認真工作",  exitTransition:"fade"  },

            { speaker: "我", text: "工作中. . .", video:"/backgrounds/s6_Video.mp4" , entryTransition:"fade", exitTransition:"fade"   },

            { speaker: "我", text: "經過長時間的奮鬥，那堆積如山的文件已經被我完全擊敗。（鬆了一口氣）",video:"stop",bg:"/backgrounds/s6_2.png",  },

            { speaker: "我", text: "「我還是挺能幹的嘛！」 ",  },

            { speaker: "我", text: "「在這裡是不是有點屈才？」 ",},

            { speaker: "我", text: "「到底我這顆埋藏於石頭裏的琥珀什麼時候才會被發現呢？」", },

            { speaker: "我", text: " 當我還在沾沾自喜時，突然想起. . .",}, 

            { speaker:"我", text:"「對喔！差點忘了！」",bg:""},
            
            { speaker:"我", text:"「說好的跟兒子約定好了今天準時回去跟他慶祝生日的。」",  bg:"", exitTransition: "whip",  }, 
            
            { speaker:"我", text:"（拉起衣袖）",  bg:"/backgrounds/s7_1.png", hideDialogue: true, sound:"/audio/sfx/whooshtransition1.mp3"  },
                
            { speaker:"我", text:"（拉起衣袖）", bg:"/backgrounds/s7_2.png", entryTransition: "cross-dissolve"  },

            { speaker: "我", text: "手錶上顯示，距離下班時間還有５分鐘。", bg:"/backgrounds/s7_4.png",ambient:"/audio/sfx/Tick.mp3", entryTransition: "cross-dissolve", exitTransition: "fade" },

            { speaker: "我", text: "而此時，遠處的腳步聲正在步步逼近", video:"backgrounds/Scene8Video_K3.mp4", sound:"/audio/sfx/Footsteps.mp3", ambient:"stop", exitTransition: "fade" },

            { speaker: "我", text: "「還有2分鐘！」", video:"stop",bg:"/backgrounds/s7_4.png", ambient:"/audio/sfx/Tickx2.mp3" },

            { speaker: "我", text: "「！！！」", effect:"shake",sound:"/audio/sfx/tap.mp3"  },

            { speaker: "我", text: "「是誰在拍我肩膊！」", bg:"/backgrounds/s9_1.png", bgTransition: "", ambient:"stop",  },

             { speaker: "我", text: "「我回頭一看，發現是……」", bg:"/backgrounds/s9_2.png", entryTransition: "cross-dissolve"  },

             { speaker: "老闆", text: "「是我！」", bg:"/backgrounds/s9_3.png",voice:"/audio/voice/bossvoice1.mp3",bgm:"/audio/bgm/Angry.mp3", effect:"shake" }, 

             { speaker: "我", text: "「老. . .老闆好。」",  },

            { speaker: "我", text: "（萬萬沒想到老闆竟然會在這時候找我）",  },

             { speaker: "老闆", text: "「現在，這裡有份十分緊急的文件交給你！」", voice:"/audio/voice/bossvoice2.mp3",bg:"/backgrounds/s9_4.jpg", effect:"shake"},

             { speaker: "老闆", text: "「今晚前我就要收到！」",  },

             { speaker: "老闆", text: "「你聽清楚了嗎？！」", effect:"shake" },

              { speaker: "我", text: "「清. . .清楚！」", },

              { speaker: "老闆", text: "「如果這次你做得好的話，我會考慮提拔一下你的。」", bg:"/backgrounds/s10.png", },

              { speaker: "神秘人", text: "今天是兒子的5歲生日, 而我答應了準時晚上回家跟他慶祝生日, 但此時老闆要求你今天加班完成工作, 而你知道拒絕老闆是一定不會有好結果的, 你會如何抉擇呢？", bg:"/backgrounds/s10ChoiceScene.png", },

           ],  


        choices: [
            
                { 
                    
                    text: "婉拒老闆", 
                    nextScene: "Choice1A_K3G",
                    stats: { relationship: 20 } 
                },
                { 
                    
                    text: "無奈接受", 
                    nextScene: "Choice1B_K3B", 
                    stats: { relationship: -20 }
                },
        ]

        
    },

    "Choice1A_K3G": {
        bg: "/backgrounds/K3G&B_s1.png",
        bgm:"/audio/bgm/Angry.mp3",
        lines: [
            { speaker: "我", text: "老闆放下文件在我枱上" ,},

            { speaker: "我", text: "然後頭也不回地轉身離開", bg:"/backgrounds/K3B_s1.png", entryTransition:"fade" },

            { speaker: "我", text: "老闆走後..." , bg: "/backgrounds/K3B_s2.png", entryTransition:"cross-dissolve" },

            { speaker: "我", text: "我很不忿" , bg: "/backgrounds/K3G_s1.png", },

            { speaker: "我", text: "於是我決定做出一個大膽的決定" , bg: "/backgrounds/K3B_s1_1.png", effect:"shake", entryTransition:"cross-dissolve" },

             { speaker: "我", text: "直接衝出公司門口！！", sound:"/audio/sfx/Rush.mp3", bgm:"audio/bgm/orchestralmission.mp3",bg:"/backgrounds/K3B_s6.png",exitTransition:"fade"   },

             { speaker: "我", text: "", video:"backgrounds/K3B_s7.mp4", hideDialogue:"true"   },

             { speaker: "我", text: "「終於到了… 」",bg: "/backgrounds/K3B_s8_1.jpg", video:"stop", entryTransition:"fade"},

            { speaker: "神秘人", text: "請點擊木門進入房間 ",

                touchRegion: {
                x: '40%',       // 隱形按鈕的水平位置 (距離左邊)
                y: '5%',       // 隱形按鈕的垂直位置 (距離上面)
                width: '20%',   // 隱形按鈕的寬度
                height: '80%',  // 隱形按鈕的高度
                
                // 可選附加功能：
                sound: "/audio/sfx/DoorOpen.mp3", // 點下去順便播開門音效
    }
                
             },

                           { speaker: "我", text: "", video:"backgrounds/K3B_s8_2.mp4", hideDialogue:"true",
              },

              { speaker: "神秘人", text: "點擊圓圈內的開關以展開後續劇情", video:"stop", bgm:"audio/bgm/HappyBgm1.mp3", bg: "/backgrounds/K3B_s9_1.png", entryTransition:"fade",
                 touchRegion: {
                x: '86.5%',       // 隱形按鈕的水平位置 (距離左邊)
                y: '34%',       // 隱形按鈕的垂直位置 (距離上面)
                width: '3%',   // 隱形按鈕的寬度
                height: '10%',  // 隱形按鈕的高度
                
                // 可選附加功能：
                sound: "/audio/sfx/LightOpen.mp3", // 點下去順便播開門音效
                                }
              },

              { speaker: "柔晴(老婆)", text: "「咦，今天怎麼那麼早回來了。」",bg: "/backgrounds/K3B_s9_2.png", entryTransition:"fade", centerChar:"/characters/mumsimple.png"},

               { speaker: "我", text: "(總不可能說我是偷跑回來吧)",  centerChar:"/characters/mumsimple.png"},

               { speaker: "我", text: "「我.....」", centerChar:"/characters/mumsimple.png"},

               { speaker: "柔晴(老婆)", text: "「不管什麼原因都不重要啦。」", centerChar:"/characters/mumsimple.png"},

               { speaker: "柔晴(老婆)", text: "「因為...」", centerChar:"/characters/mumsimple.png"},

              { speaker: "柔晴(老婆)", text: "「沒有任何事情是比兒子生日更重要的。」", centerChar:"/characters/mumsimple.png"},

              { speaker: "兒子", text: "「你們還不過來！蠟燭都要熄滅了！」", centerChar:"/characters/mumsimple.png"},

               { speaker: "柔晴(老婆)", text: "「來啦！」", centerChar:"/characters/mumsimple.png", exitTransition:"fade"},

               { speaker: "柔晴(老婆)", text: "", hideDialogue:"true",video:"/backgrounds/K3G_end.mp4"},

              { speaker: "柔晴(老婆)", text: "「一家人齊齊整整才是最重要的！」", exitTransition:"fade"},

              //第二日A//

              { speaker: "我", text: "", hideDialogue:"true", video:"backgrounds/Day2.mp4" },

               { speaker: "神秘人", text: "來到主題樂園",  video:"stop", bgm:"audio/bgm/Playing.mp3",bg:"/backgrounds/K3B_s14.png" },

               { speaker: "兒子", text: "「好耶！終於來到主題樂園了！」",   centerChar:"/characters/son.png" },

              { speaker: "柔晴(老婆)", text: "「好啦，我們一起進去玩吧！」",   centerChar:"/characters/mumfree.png" },

              { speaker: "神秘人", text: "點擊螢幕進入主題樂園", 

             touchRegion: {
                x: '32%',       // 隱形按鈕的水平位置 (距離左邊)
                y: '30%',       // 隱形按鈕的垂直位置 (距離上面)
                width: '40%',   // 隱形按鈕的寬度
                height: '45%',  // 隱形按鈕的高度
                
                // 可選附加功能：
                sound: "/audio/sfx/DoorOpen.mp3", // 點下去順便播開門音效
                }
              },
             { speaker: "兒子", text: "", video:"/backgrounds/K3B_s15_Video.mp4", hideDialogue:"true" },

              { speaker: "兒子", text: "哇～ 這裏好多機動遊戲呀！",  video:"stop",bg:"/backgrounds/K3B_s15.png", centerChar:"/characters/son.png",  },

              { speaker: "兒子", text: "「媽媽，我想玩過山車！」",   centerChar:"/characters/son.png" },

              { speaker: "柔晴(老婆)", text: "「乖，我們現在去喔～」",   centerChar:"/characters/mumfree.png" },

              { speaker: "我", text: "來到過山車的區域", bg:"/backgrounds/K3B_s16.png"},

              { speaker: "我", text: "由於今天是假期日，因此排隊時間相對平日較長但在排隊等候期間…",},

              { speaker: "我", text: "", hideDialogue:"true", video:"backgrounds/K3B_s16_2.mp4", },

              { speaker: "我", text: "「喂？你好？」", video:"stop", bg:"/backgrounds/K3B_s16_3.png"},

              { speaker: "老闆", text: "「喂！」", video:"stop", bg:"/backgrounds/K3B_s16_4.png", bgm:"audio/bgm/Angry.mp3",},

              { speaker: "老闆", text: "「慈雲，上次叫你做的方案你怎麼還沒給我？」",  bg:"/backgrounds/K3B_s16_5.png"},

               { speaker: "老闆", text: "「立刻給我趕回來！」",  bg:"/backgrounds/K3B_s16_5.png"},

               { speaker: "神秘人", text: "如果是你，你的選擇是？",  bg:"/backgrounds/K3Bs16ChoiceScene.png"},
        ],
                    choices: [
            
                { 
                    
                    text: "婉拒老闆", 
                    nextScene: "Choice2A_K3G", 
                    stats: { relationship: 30 }
                },
                { 
                    
                    text: "拋下家人，立即回公司", 
                    nextScene: "Choice2B_K3B", 
                    stats: { relationship: -30 }
                },
        ]

        
    },

    

    "Choice1B_K3B": {
        bg: "/backgrounds/K3G&B_s1.png",
        bgm:"/audio/bgm/Angry.mp3",
        lines: [
            { speaker: "我", text: "老闆放下文件在我枱上",}, 

            { speaker: "我", text: "然後頭也不回地轉身離開", bg:"/backgrounds/K3B_s1.png", entryTransition:"fade" },

            { speaker: "我", text: "越行越遠...越行越遠..." , bg: "/backgrounds/K3B_s2.png", entryTransition:"cross-dissolve" },

            { speaker: "我", text: "(今天是我兒子的生日啊...)", bg: "/backgrounds/K3B_s3_1.png", ambient:"stop", entryTransition:"fade", bgm:"audio/bgm/Event.mp3",}, 

            { speaker: "我", text: "(可是...如果這次做得好的話，有機會能夠當個部門主管好像也不錯欸。)", },

            { speaker: "我", text: "(我可不能放過這次機會！)", },

            { speaker: "我", text: "(正所謂，「 有錢就是萬能，無錢就萬萬不能。」)", },

            { speaker: "我", text: "就這樣，我默認了老闆的要求。",bg: "/backgrounds/K3B_s3_2.png", bgTransition:"" },

            { speaker: "我", text: "「先通知一下吧」", bg: "/backgrounds/K3B_s3_2.png",  },

            { speaker: "我", text: "（我把手伸進口袋裡）",bg: "/backgrounds/K3B_s3_3.png", sound:"/audio/sfx/Taking.mp3",exitTransitionn:"fade" },

            { speaker: "我", text: "（打開手機. . . ）",bg: "/backgrounds/K3B_s3_4.png", ambient:"audio/sfx/TappingPhone.mp3",entryTransition:"fade" },

            { speaker: "我", text: "「老婆，今天看起來是要加班了。」",  },

            { speaker: "柔晴(老婆)", text: "「啊？但你不是跟兒子約定好了今天回來一起興祝生日的嗎」", },

            { speaker: "我", text: "「我也沒有辦法，老闆要求的。」",  },

            { speaker: "我", text: "「就這樣吧。」",  },

            { speaker: "我", text: "「我要繼續工作了」", exitTransition:"fade", ambient:"stop" },

            { speaker: "我", text: "就這樣我把剛剛收拾完的東西再度拿出來。", bg:"backgrounds/K3B_s4_1.png" },

            {speaker: "我", text: "再一次工作中...", video:"backgrounds/Scene4Video1_K3B.mp4", exitTransition:"fade" },

            { speaker: "我", text: "", hideDialogue:true, video:"backgrounds/Scene4Video2_K3B.mp4",  },

            { speaker: "我", text: "（天色已暗，整間辦公室只剩下我一個。）", video:"stop", bg:"backgrounds/K3B_s4.png", entryTransition:"fade" },

             { speaker: "我", text: "「終於做完了。」",   },

            { speaker: "我", text: "（在我說這句話的同時我已經調整好姿態）", video:"backgrounds/Scene5Video_K3B.mp4", bgm:"stop", entryTransition:"fade"   },

            { speaker: "我", text: "（下一秒的我已經從公司門口飛奔了出去）", video:"stop", sound:"/audio/sfx/Rush.mp3", bgm:"audio/bgm/orchestralmission.mp3",bg:"/backgrounds/K3B_s6.png",exitTransition:"fade"   },

            { speaker: "我", text: "", video:"backgrounds/K3B_s7.mp4", hideDialogue:"true"   },

            { speaker: "我", text: "過了幾個街口後...", },

            { speaker: "我", text: "", video:"backgrounds/K3B_s7_2.mp4", hideDialogue:"true"   },

            { speaker: "我", text: "我突然了停下來，因為在不遠處...", },

            { speaker: "我", text: "", hideDialogue:"true", video:"backgrounds/K3B_s7_3.mp4"   },

            { speaker: "我", text: "有計程車正向著我迎面駛來，我立刻招手喊停" },

            { speaker: "我", text: "", video:"backgrounds/K3B_s7_4.mp4", hideDialogue:"true", exitTransition:"fade"   },

            { speaker: "我", text: "上車後...", video:"stop", bg:"/backgrounds/K3B_s10.PNG", entryTransition:"fade" },

            { speaker: "我", text: "「大和道３號街道，謝謝。」", bg:"/backgrounds/K3B_s10_2.png"} ,

            { speaker: "我", text: "", video:"backgrounds/K3B_s7_5.mp4", hideDialogue:"true"   },

            { speaker: "我", text: "在經過一段速度與激情後..."   },

            { speaker: "我", text: "「終於到了… 」",bg: "/backgrounds/K3B_s8_1.jpg", video:"stop", entryTransition:"fade"},

            { speaker: "神秘人", text: "請點擊木門進入房間 ",

                touchRegion: {
                x: '40%',       // 隱形按鈕的水平位置 (距離左邊)
                y: '5%',       // 隱形按鈕的垂直位置 (距離上面)
                width: '20%',   // 隱形按鈕的寬度
                height: '80%',  // 隱形按鈕的高度
                
                // 可選附加功能：
                sound: "/audio/sfx/DoorOpen.mp3", // 點下去順便播開門音效
    }
                
             },

              { speaker: "我", text: "", video:"backgrounds/K3B_s8_2.mp4", hideDialogue:"true",
              },

              { speaker: "神秘人", text: "點擊圓圈內的開關以展開後續劇情", video:"stop", bgm:"audio/bgm/HappyBgm1.mp3", bg: "/backgrounds/K3B_s9_1.png", entryTransition:"fade",
                 touchRegion: {
                x: '86.5%',       // 隱形按鈕的水平位置 (距離左邊)
                y: '34%',       // 隱形按鈕的垂直位置 (距離上面)
                width: '3%',   // 隱形按鈕的寬度
                height: '10%',  // 隱形按鈕的高度
                
                // 可選附加功能：
                sound: "/audio/sfx/LightOpen.mp3", // 點下去順便播開門音效
                                }
              },

              { speaker: "我", text: "「好累啊。」",bg: "/backgrounds/K3B_s9_2.png", entryTransition:"fade", centerChar:"/characters/mumsimple.png"},

              
              { speaker: "柔晴(老婆)", text: "「現在才回來！」",centerChar:"/characters/mumangry.png" },

              { speaker: "柔晴(老婆)", text: "「你自己看看幾點了！！」", centerChar:"/characters/mumangry.png" },

              { speaker: "我", text: "「對不起，但我也是身不由己啊…」",centerChar:"/characters/mumsimple.png"},

              { speaker: "我", text: "「兒子呢，他有怎樣嗎？」", centerChar:"/characters/mumsimple.png"},

              { speaker: "柔晴(老婆)", text: "「兒子他已經睡著了。」", centerChar:"/characters/mumsimple.png"},

              { speaker: "柔晴(老婆)", text: "「你不在的時候，他問我……」", centerChar:"/characters/mumsimple.png"},

              { speaker: "兒子", text: "「媽媽…爸爸他是不是喜歡我？為什麼他不回來陪我過生日...」", bg:"/backgrounds/K3B_s12.png", entryTransition:"cross-dissolve"},

              { speaker: "我", text: "「他是不是很難過呀？」", bg: "/backgrounds/K3B_s9_2.png", entryTransition:"cross-dissolve",centerChar:"/characters/mumsimple.png" },

              { speaker: "柔晴(老婆)", text: "「肯定呀，平時你都是早出晚歸的，他根本就沒有機會能見你幾面。」", centerChar:"/characters/mumangry.png" },

              { speaker: "柔晴(老婆)", text: "「聽到你答應他會回來跟他一起興祝生日，肯定是期待的。」", centerChar:"/characters/mumsimple.png" },

              { speaker: "柔晴(老婆)", text: "「但最後你卻沒有出現，肯定是會有落差感的。」", centerChar:"/characters/mumsimple.png" },

               { speaker: "我", text: "「那我們現在該怎麼辦？」", centerChar:"/characters/mumsimple.png"},

               { speaker: "柔晴(老婆)", text: "「我有個建議！」", centerChar:"/characters/mumthink.png" },

               { speaker: "柔晴(老婆)", text: "「不如我們找一天帶他去遊樂園玩作為今天你失約補償，怎麼樣？」", centerChar:"/characters/mumthink.png" },

               { speaker: "我", text: "「可以阿，沒問題！」", centerChar:"/characters/mumsimple.png" },

               { speaker: "柔晴(老婆)", text: "「但是你明天要先跟小寶他道歉！因為你沒有兌現承諾！」", centerChar:"/characters/mumangry.png" },

               { speaker: "我", text: "「好啦！我知道了。」", centerChar:"/characters/mumangry.png" , exitTransition:"fade"},

               //第二日B//

               { speaker: "我", text: "", hideDialogue:"true", video:"backgrounds/Day2.mp4" },

               { speaker: "神秘人", text: "來到主題樂園",  video:"stop", bgm:"audio/bgm/Playing.mp3",bg:"/backgrounds/K3B_s14.png" },

               { speaker: "兒子", text: "「好耶！終於來到主題樂園了！」",   centerChar:"/characters/son.png" },

              { speaker: "柔晴(老婆)", text: "「好啦，我們一起進去玩吧！」",   centerChar:"/characters/mumfree.png" },

              { speaker: "神秘人", text: "點擊螢幕進入主題樂園", 

             touchRegion: {
                x: '32%',       // 隱形按鈕的水平位置 (距離左邊)
                y: '30%',       // 隱形按鈕的垂直位置 (距離上面)
                width: '40%',   // 隱形按鈕的寬度
                height: '45%',  // 隱形按鈕的高度
                
                // 可選附加功能：
                sound: "/audio/sfx/DoorOpen.mp3", // 點下去順便播開門音效
                }
              },

              { speaker: "兒子", text: "「哇～ 這裏好多機動遊戲呀。」！", video:"/backgrounds/K3B_s15_Video.mp4", hideDialogue:"true" },

              { speaker: "兒子", text: "",  video:"stop",bg:"/backgrounds/K3B_s15.png", centerChar:"/characters/son.png", hideDialogue:"true" },

              { speaker: "兒子", text: "「媽媽，我想玩過山車！」",   centerChar:"/characters/son.png" },

              { speaker: "柔晴(老婆)", text: "「乖，我們現在去喔～」",   centerChar:"/characters/mumfree.png" },

              { speaker: "我", text: "來到過山車的區域", bg:"/backgrounds/K3B_s16.png"},

              { speaker: "我", text: "由於今天是假期日，因此排隊時間相對平日較長但在排隊等候期間…",},

              { speaker: "我", text: "", hideDialogue:"true", video:"backgrounds/K3B_s16_2.mp4", },

              { speaker: "我", text: "「喂？你好？」", video:"stop", bg:"/backgrounds/K3B_s16_3.png"},

              { speaker: "老闆", text: "「喂！」", video:"stop", bg:"/backgrounds/K3B_s16_4.png", bgm:"audio/bgm/Angry.mp3",},

              { speaker: "老闆", text: "「慈雲，上次叫你做的方案做得十分好，顧客很滿意，但是有地方需要修改，需要你馬上回來處理。」",  bg:"/backgrounds/K3B_s16_5.png"},

               { speaker: "神秘人", text: "如果是你，你的選擇是？",  bg:"/backgrounds/K3Bs16ChoiceScene.png"},

               ], 

            choices: [
            
                { 
                    
                    text: "婉拒老闆", 
                    nextScene: "Choice2A_K3G",  
                    stats: { relationship: 30 }
                },
                { 
                    
                    text: "拋下家人，立即回公司", 
                    nextScene: "Choice2B_K3B", 
                    stats: { relationship: -30 }
                },
        ]
    },
        "Choice2A_K3G": {
        bg: "/backgrounds/K3B_s17.png",
        bgm:"audio/bgm/Angry.mp3",
        lines: [
            { speaker: "我", text: "（掛斷電話）", },
            { speaker: "兒子", text: "「爸爸，是誰呀？」",bg:"backgrounds/K3G_s17.jpg", bgm:"audio/bgm/Playing.mp3" },
            { speaker: "我", text: "「沒事，詐騙電話而已。」",bg:"backgrounds/K3G_s17_1.png" },
            { speaker: "兒子", text: "「到我們了！」", exitTransition:"fade"},
            { speaker: "我", text: "「走吧，我們進去吧～」",entryTransition:"fade",bg:"backgrounds/K3G_s18.png" },
            { speaker: "我", text: "難得來到了兒子期待而久的遊樂園...", },
            { speaker: "我", text: "怎麼可以破壞掉這歡樂的氣氛呢？", },

                        { 
                isChapterEnd: true,                         
                hideDialogue: true,                  
                speaker: "",
                text: "" 
            }
        ]
    },
    

               

        "Choice2B_K3B": {
        bg: "/backgrounds/K3B_s17.png",
        bgm:"audio/bgm/Angry.mp3",
        lines: [
            { speaker: "我", text: "「啊…要我現在回公司嗎？」", },

            { speaker: "我", text: "「好的好的…」", bg:"backgrounds/K3B_s17_2.png"},

            { speaker: "我", text: "「我現在馬上回去。」", }, 

            { speaker: "兒子", text: "「爸爸，你又要走了嗎？」",bgm:"audio/bgm/Playing.mp3",bg:"backgrounds/K3B_s17_3.png"  },

            { speaker: "我", text: "兒子看起來有點不開心", },

            { speaker: "我", text: "「老闆要我回去公司一趟，我很抱歉。」", },

            { speaker: "兒子", text: "「你明明說過今天陪我的！」", },

            { speaker: "兒子", text: "「為什麼要食言！」",bg:"backgrounds/K3B_s17_4.png"  },

            { speaker: "兒子", text: "「你都那麼不守信用的...」", },

            { speaker: "兒子", text: "「我討厭你！」",bg:"backgrounds/K3B_s17_5.png"  },

            { speaker: "神秘人", text: "兒子因為你一次又一次的食言，變得越來越討厭你。」"},

            { 
                
                isChapterEnd: true,                         
                hideDialogue: true,                  
                speaker: "",
                text: "" 
            }

            

        ],







            

        
    },

};