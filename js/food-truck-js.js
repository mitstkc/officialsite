// DOM要素が読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
  // フィルターボタンにイベントリスナーを追加
  const filterButtons = document.querySelectorAll('.filter-button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // すべてのボタンからアクティブクラスを削除
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // クリックされたボタンにアクティブクラスを追加
      this.classList.add('active');
      
      // フィルター値を取得
      const filter = this.getAttribute('data-filter');
      
      // トラックをフィルタリング
      filterTrucks(filter);
    });
  });
  
  // 現在の曜日に基づいて自動的にフィルターを選択
  selectCurrentDayFilter();
});

/**
 * 現在の曜日に基づいてフィルターを選択する関数
 */
function selectCurrentDayFilter() {
  // 現在の日本時間を取得
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0:日曜日, 1:月曜日, ..., 6:土曜日
  
  // 曜日に応じたフィルターの値
  let filter = 'all';
  
  // 土曜日と日曜日はすべて表示、それ以外は対応する曜日を表示
  switch(dayOfWeek) {
    case 1: // 月曜日
      filter = 'monday';
      break;
    case 2: // 火曜日
      filter = 'tuesday';
      break;
    case 3: // 水曜日
      filter = 'wednesday';
      break;
    case 4: // 木曜日
      filter = 'thursday';
      break;
    case 5: // 金曜日
      filter = 'friday';
      break;
    default: // 土曜日(6)と日曜日(0)
      filter = 'all';
      break;
  }
  
  // 対応するボタンをアクティブにし、フィルタリングを実行
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    if (button.getAttribute('data-filter') === filter) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // フィルタリングを実行
  filterTrucks(filter);
}

/**
 * トラックカードをフィルタリングする関数
 * @param {string} filter - フィルタリングする曜日（'all', 'monday', 'tuesday', etc.）
 */
function filterTrucks(filter) {
  const trucks = document.querySelectorAll('.truck-card');
  
  trucks.forEach(truck => {
    if (filter === 'all') {
      truck.classList.remove('hidden');
    } else {
      const days = truck.getAttribute('data-days');
      if (days === filter) {
        truck.classList.remove('hidden');
      } else {
        truck.classList.add('hidden');
      }
    }
  });
}

/**
 * モーダルを開く関数
 * @param {string} id - 開くモーダルのID
 */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // スクロールを無効化
  }
}

/**
 * モーダルを閉じる関数
 * @param {string} id - 閉じるモーダルのID
 */
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // スクロールを有効化
  }
}

// モーダル外をクリックしたときにモーダルを閉じる
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
