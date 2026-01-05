// src/utils/saveSystem.js

const SAVE_KEY = 'my_galgame_save_data'; // 存檔在瀏覽器裡的鑰匙名稱

// 存檔功能
export const saveGame = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(SAVE_KEY, jsonString);
    alert("✅ 存檔成功！");
    console.log("遊戲已儲存:", data);
  } catch (error) {
    console.error("存檔失敗:", error);
    alert("❌ 存檔失敗，請檢查瀏覽器設定。");
  }
};

// 讀檔功能
export const loadGame = () => {
  try {
    const jsonString = localStorage.getItem(SAVE_KEY);
    if (!jsonString) return null; // 如果沒有存檔
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("讀檔失敗:", error);
    return null;
  }
};

// 檢查是否有存檔 (用來決定主選單要不要顯示「繼續遊戲」)
export const hasSaveFile = () => {
  return localStorage.getItem(SAVE_KEY) !== null;
};