// アプリケーション全体で使うデータ構造
let appData = {
    lastStampDate: null,
    consecutiveDays: 0,
    totalPoints: 0,
    characters: [], // 今は空
    stampHistory: []
};

// データをlocalStorageから読み込む関数
function loadData() {
    const jsonData = localStorage.getItem('myStudyApp');
    if (jsonData) {
        appData = JSON.parse(jsonData);
    }
}

// データをlocalStorageに保存する関数
function saveData() {
    const jsonData = JSON.stringify(appData);
    localStorage.setItem('myStudyApp', jsonData);
}

// YYYY-MM-DD形式で今日の日付を返す関数
function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
