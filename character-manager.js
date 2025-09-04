document.addEventListener('DOMContentLoaded', () => {
    // このページがキャラクターページでないなら、何もしないで終了
    if (!document.getElementById('characterListContainer')) {
        return;
    }

    // --- HTML要素の取得 ---
    const totalPointsDisplayEl = document.getElementById('totalPointsDisplay');
    const characterListContainerEl = document.getElementById('characterListContainer');

    // --- メイン処理 ---
    loadData();
    initializeCharacterPage();

    function initializeCharacterPage() {
        // ★★★キャラクターの初期化処理を削除★★★
        updatePointDisplay();
        renderCharacters();
    }

    // ポイント表示を更新
    function updatePointDisplay() {
        totalPointsDisplayEl.textContent = appData.totalPoints;
    }

    // renderCharacters() 関数
    function renderCharacters() {
        // ...(中身は変更なし。以前のコードのまま)...
    }

    // handleLevelUpClick() 関数
    function handleLevelUpClick(event) {
        // ...(中身は変更なし。以前のコードのまま)...
    }
});
