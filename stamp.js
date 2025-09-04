document.addEventListener('DOMContentLoaded', () => {
    // このページがスタンプページでないなら、何もしないで終了
    if (!document.getElementById('stampContainer')) {
        return;
    }

    // --- HTML要素の取得 ---
    const todayDateEl = document.getElementById('todayDate');
    const totalPointsDisplayEl = document.getElementById('totalPointsDisplay');
    const stampContainerEl = document.getElementById('stampContainer');
    const stampMessageEl = document.getElementById('stampMessage');

    // --- グローバル変数 ---
    const STAMP_COUNT = 5;
    let stampedCountToday = 0;

    // --- メイン処理 ---
    loadData();
    initializePage();

    // ページ初期化の関数
    function initializePage() {
        // ...(中身は変更なし。以前のコードのまま)...
    }

    // renderStamps() 関数
    function renderStamps() {
        // ...(中身は変更なし。以前のコードのまま)...
    }

    // handleStampClick() 関数
    function handleStampClick(event) {
        // ...(中身は変更なし。以前のコードのまま)...
    }

    // updatePointDisplay() 関数
    function updatePointDisplay() {
        totalPointsDisplayEl.textContent = appData.totalPoints;
    }
});
