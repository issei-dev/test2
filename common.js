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
// ... (今までの common.js のコード) ...

// ===============================================
// キャラクターの元データ（図鑑のようなもの）
// ===============================================
const CHARACTER_MASTER_DATA = {
    // キャラクターID: 1
    1: {
        evolutions: [
            { name: "ひよこナイト", image: "images/hiyoko_knight.png", rank: "D" },
            { name: "にわとり騎士", image: "images/niwatori_knight.png", rank: "C" },
            { name: "イーグルライダー", image: "images/eagle_rider.png", rank: "A" },
        ]
    },
    // キャラクターID: 2
    2: {
        evolutions: [
            { name: "みならい魔法使い", image: "images/minarai_mahoutsukai.png", rank: "D" },
            { name: "一人前の魔導士", image: "images/ichininmae_madoushi.png", rank: "B" },
            { name: "大賢者", image: "images/daikenja.png", rank: "S" },
        ]
    }
    // 新しいキャラクターを追加したければ、ここにID:3...と追加していく
};
