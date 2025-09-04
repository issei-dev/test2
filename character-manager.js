document.addEventListener('DOMContentLoaded', () => {
    // --- HTML要素の取得 ---
    const totalPointsDisplayEl = document.getElementById('totalPointsDisplay');
    const characterListContainerEl = document.getElementById('characterListContainer');

    // --- メイン処理 ---
    loadData();
    initializeCharacterPage();

    function initializeCharacterPage() {
        // テスト用にキャラクターを初期化（まだキャラクターがいない場合）
        if (appData.characters.length === 0) {
            appData.characters.push({
                id: 1, // マスターデータのID:1のキャラクター
                level: 1,
                evolutionIndex: 0 // evolutions配列の0番目
            });
            appData.characters.push({
                id: 2, // マスターデータのID:2のキャラクター
                level: 1,
                evolutionIndex: 0
            });
            saveData();
        }

        updatePointDisplay();
        renderCharacters();
    }

    // ポイント表示を更新
    function updatePointDisplay() {
        totalPointsDisplayEl.textContent = appData.totalPoints;
    }

    // キャラクター一覧を描画する関数
    function renderCharacters() {
        characterListContainerEl.innerHTML = ''; // コンテナを空にする

        appData.characters.forEach(charData => {
            const master = CHARACTER_MASTER_DATA[charData.id];
            const currentEvolution = master.evolutions[charData.evolutionIndex];
            
            // レベルアップに必要なポイントを計算 (例: レベル * 10)
            const requiredPoints = charData.level * 10;
            const canLevelUp = appData.totalPoints >= requiredPoints;

            const card = document.createElement('div');
            card.className = 'card character-card';
            card.innerHTML = `
                <img src="${currentEvolution.image}" alt="${currentEvolution.name}">
                <h3>${currentEvolution.name} (Lv. ${charData.level})</h3>
                <p>ランク: ${currentEvolution.rank}</p>
                <p>次のレベルまで: ${requiredPoints} P</p>
                <button class="level-up-button" data-character-id="${charData.id}" ${canLevelUp ? '' : 'disabled'}>
                    レベルアップ！
                </button>
            `;

            characterListContainerEl.appendChild(card);
        });
        
        // 作成した全てのボタンにイベントリスナーを設定
        document.querySelectorAll('.level-up-button').forEach(button => {
            button.addEventListener('click', handleLevelUpClick);
        });
    }

    // レベルアップボタンがクリックされたときの処理
    function handleLevelUpClick(event) {
        const charId = parseInt(event.target.dataset.characterId, 10);
        const characterToUpdate = appData.characters.find(c => c.id === charId);
        
        if (!characterToUpdate) return;

        const requiredPoints = characterToUpdate.level * 10;

        if (appData.totalPoints >= requiredPoints) {
            // ポイントを消費
            appData.totalPoints -= requiredPoints;
            // レベルアップ
            characterToUpdate.level++;

            // 進化のチェック
            const master = CHARACTER_MASTER_DATA[characterToUpdate.id];
            // 次の進化形態が存在し、かつレベルが進化条件（例: 10レベルごと）に達した場合
            if (master.evolutions[characterToUpdate.evolutionIndex + 1] && characterToUpdate.level % 10 === 0) {
                characterToUpdate.evolutionIndex++;
                alert('おめでとう！キャラクターが進化したよ！');
            }

            saveData();
            updatePointDisplay();
            renderCharacters(); // 画面を再描画
        } else {
            alert('ポイントが足りません！');
        }
    }
});
