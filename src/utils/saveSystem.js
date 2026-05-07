
const SAVE_KEY = 'my_galgame_save_data'; 

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

export const loadGame = () => {
  try {
    const jsonString = localStorage.getItem(SAVE_KEY);
    if (!jsonString) return null; 
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("讀檔失敗:", error);
    return null;
  }
};

export const hasSaveFile = () => {
  return localStorage.getItem(SAVE_KEY) !== null;
};