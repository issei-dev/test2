
// ページが完全に読み込まれてから、全ての処理を開始する
document.addEventListener('DOMContentLoaded', () => {
    // --- HTML要素の取得 ---
    // この処理をイベントリスナーの中に移動する
    const todayDateEl = document.getElementById('todayDate');
    const totalPointsDisplayEl = document.getElementById('totalPointsDisplay');
    const stampContainerEl = document.getElementById('stampContainer');
    const stampMessageEl = document.getElementById('stampMessage');

    // --- グローバル変数 ---
    const STAMP_COUNT = 5;
    let stampedCountToday = 0;

    // --- メイン処理 ---
    // DOMContentLoadedの中で直接メインの処理を呼び出す
    loadData();
    initializePage();

    // ↓ここから下の関数定義はそのまま
    function initializePage() {
        // ... (以下、initializePageの中身は変更なし)
    }

    function renderStamps() {
        // ... (以下、renderStampsの中身は変更なし)
    }
    
    // ... (他の関数も同様にこの中に配置)
});

// ページ初期化の関数
function initializePage() {
    const todayStr = getTodayString();

    // 1. 日付の表示
    const today = new Date();
    todayDateEl.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

    // 2. ポイントの表示
    updatePointDisplay();

    // 3. 連続ボーナスのチェック
    if (appData.lastStampDate !== todayStr) {
        // 日付が変わってから最初のアクセス
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
        
        if (appData.lastStampDate === yesterdayStr) {
            // 連続記録が継続
            // （ここではまだ日数を加算しない。スタンプを押した時に加算する）
        } else if(appData.lastStampDate) {
            // 連続が途切れた
            appData.consecutiveDays = 0;
            saveData();
        }
        stampedCountToday = 0;
    } else {
        // 今日すでにアクセスしている
        // 今日押したスタンプ数を履歴から数える
        stampedCountToday = appData.stampHistory.filter(history => history.date === todayStr).length;
    }
    
    // 4. スタンプの描画
    renderStamps();
}

// スタンプを描画する関数
function renderStamps() {
    stampContainerEl.innerHTML = ''; // 一旦空にする

    for (let i = 1; i <= STAMP_COUNT; i++) {
        const stampEl = document.createElement('div');
        stampEl.classList.add('stamp');
        stampEl.dataset.stampId = i;

        if (i <= stampedCountToday) {
            // すでに押されているスタンプ
            stampEl.classList.add('checked');
            stampEl.classList.add('disabled');
            stampEl.textContent = '✔';
        } else if (i === stampedCountToday + 1) {
            // 次に押せるスタンプ
            stampEl.addEventListener('click', handleStampClick);
        } else {
            //まだ押せないスタンプ
            stampEl.classList.add('disabled');
        }
        stampContainerEl.appendChild(stampEl);
    }
    
    if (stampedCountToday >= STAMP_COUNT) {
        stampMessageEl.textContent = "今日のチャレンジは完了です！";
    }
}

// スタンプがクリックされたときの処理
function handleStampClick(event) {
    const clickedStamp = event.target;
    clickedStamp.classList.add('checked');
    clickedStamp.classList.add('disabled');
    clickedStamp.textContent = '✔';
    clickedStamp.removeEventListener('click', handleStampClick);

    stampedCountToday++;
    
    let bonusPoints = 0;
    // 今日の最初のスタンプだった場合、連続ボーナスを処理
    if (stampedCountToday === 1) {
        const todayStr = getTodayString();
        // 日付が変わってから最初のスタンプか確認
        if (appData.lastStampDate !== todayStr) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

            if(appData.lastStampDate === yesterdayStr) {
                appData.consecutiveDays++; // 連続記録を更新
            } else {
                appData.consecutiveDays = 1; // 連続記録リセットor開始
            }

            bonusPoints = appData.consecutiveDays * 2; // 例: 連続日数 x 2ポイント
            stampMessageEl.textContent = `${appData.consecutiveDays}日連続ボーナス！ +${bonusPoints}ポイント！`;

            appData.lastStampDate = todayStr;
        }
    } else {
        stampMessageEl.textContent = `スタンプ ${stampedCountToday}個目！ +1ポイント！`;
    }

    // ポイント加算
    appData.totalPoints += (1 + bonusPoints);
    
    // 履歴に追加
    appData.stampHistory.push({ date: getTodayString(), stampId: clickedStamp.dataset.stampId });

    saveData();
    updatePointDisplay();
    renderStamps(); // 次のスタンプを押せるように再描画
}

// ポイント表示を更新する関数
function updatePointDisplay() {
    totalPointsDisplayEl.textContent = appData.totalPoints;
}
