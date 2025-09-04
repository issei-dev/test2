// アプリケーション全体で使うデータ構造の「ひな形」
const initialAppData = {
    lastStampDate: null,
    consecutiveDays: 0,
    totalPoints: 0,
    characters: [
        { id: 1, level: 1, evolutionIndex: 0 },
        { id: 2, level: 1, evolutionIndex: 0 }
    ],
    stampHistory: []
};

// グローバルなappData変数の宣言
// ... (既存の common.js のコード) ...

let appData = {
    totalPoints: 0,
    characters: [],
    // 日付ごとのスタンプの記録を格納する新しいオブジェクト
    // 例: { "2025-09-04": [{text: "そろたっち"}, {text: "音読"}] }
    stamps: {}
};

// ... (既存の saveData, loadData 関数) ...

// データをlocalStorageから読み込む関数（初期化処理も含む）
function loadData() {
    const jsonData = localStorage.getItem('myStudyApp');
    if (jsonData) {
        // 保存されたデータがある場合
        appData = JSON.parse(jsonData);
    } else {
        // 保存されたデータが全くない場合（アプリの初回起動時）
        appData = initialAppData;
        saveData(); // 初期データを保存
    }
}
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
