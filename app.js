// ⚠️ 請記得在步驟四完成後，將下方的網址替換成你自己的 Google 試算表 CSV 網址
const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/你的試算表ID/pub?output=csv';

let dataset = [];

// 網頁開啟時，自動去撈取 Google 試算表的資料
window.onload = function() {
    Papa.parse(SPREADSHEET_CSV_URL, {
        download: true,
        header: true, // 自動將試算表第一行視為欄位名稱
        complete: function(results) {
            dataset = results.data;
            console.log("資料載入成功，共 " + dataset.length + " 筆。");
        },
        error: function(err) {
            console.error("試算表載入失敗:", err);
        }
    });
};

// 點擊搜尋按鈕時執行的功能
function searchData() {
    const keyword = document.getElementById('keyword').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // 清空上一次的搜尋結果

    if (!keyword) {
        resultsContainer.innerHTML = '<p style="color:red;">請輸入關鍵字后再搜尋！</p>';
        return;
    }

    // 篩選資料：假設你的試算表第一行欄位有名為 name 與 description 的欄位
    // 如果欄位名稱不同，請修改 item.欄位名稱
    const filtered = dataset.filter(item => {
        const nameMatch = item.name ? item.name.toLowerCase().includes(keyword) : false;
        const descMatch = item.description ? item.description.toLowerCase().includes(keyword) : false;
        return nameMatch || descMatch;
    });

    if (filtered.length === 0) {
        resultsContainer.innerHTML = '<p>查無相關資料。</p>';
        return;
    }

    // 將篩選出來的資料顯示在網頁上
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = `
            <span class="category">${item.category || '未分類'}</span>
            <div style="font-size:18px; font-weight:bold;">${item.name || '無名稱'}</div>
            <p style="margin:5px 0 0 0; color:#666;">${item.description || '無說明'}</p>
        `;
        resultsContainer.appendChild(div);
    });
}
