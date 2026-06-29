// 你的 Google 試算表 CSV 網址 (帶有強制更新的參數)
const baseCSVUrl = "https://docs.google.com/spreadsheets/d/15JAyvXkQbDUWUPUpz2ZCQUw373DtBDLCbQqFdrPemCw/pub?gid=1596306221&single=true&output=csv";

function loadData() {
  document.getElementById("table-container").innerHTML = "<p>資料載入中，請稍候...</p>";
  
  // 動態加上時間戳記，避免瀏覽器讀取到舊的快取資料
  const CSV_URL = `${baseCSVUrl}&t=${new Date().getTime()}`;
  
  Papa.parse(CSV_URL, {
    download: true,
    header: true,
    complete: function(results) {
      let data = results.data;
      if (data.length === 0) {
        document.getElementById("table-container").innerHTML = "<p>查無資料</p>";
        return;
      }

      let tableHTML = "<table id='myTable'><thead><tr>";
      let headers = Object.keys(data[0]); 
      headers.forEach(header => { tableHTML += `<th>${header}</th>`; });
      tableHTML += "</tr></thead><tbody>";

      data.forEach(row => {
        // 排除因試算表空白行產生的無效資料
        if(Object.values(row).join('').trim() === '') return; 
        
        tableHTML += "<tr>";
        headers.forEach(header => { tableHTML += `<td>${row[header] || ""}</td>`; });
        tableHTML += "</tr>";
      });

      tableHTML += "</tbody></table>";
      document.getElementById("table-container").innerHTML = tableHTML;
      document.getElementById("tabs").style.display = "block";
      
      // 預設切換至腎功能模式
      switchMode('renal', document.querySelector('.tab-btn.active'));
    },
    error: function(err) {
      console.error(err);
      document.getElementById("table-container").innerHTML = "<p style='color:red;'>資料載入失敗，請確認網址或網路狀態。</p>";
    }
  });
}

function filterTable() {
  let input = document.getElementById("searchInput").value.toUpperCase();
  let rows = document.querySelectorAll("#myTable tbody tr");
  for (let i = 0; i < rows.length; i++) {
    let rowText = rows[i].textContent.toUpperCase(); 
    rows[i].style.display = rowText.includes(input) ? "" : "none";
  }
}

function switchMode(mode, btnElement) {
  let buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if(btnElement) btnElement.classList.add("active");

  let table = document.getElementById("myTable");
  if (!table) return;
  let headers = table.querySelectorAll("th");
  let rows = table.querySelectorAll("tbody tr");

  // 模式篩選關鍵字設定（已加入 CAPD）
  let keywords = {
    renal: ["CRCL", "腎"],
    dialysis: ["透析", "HD", "CVVH", "CAPD"], 
    hepatic: ["肝", "HEPATIC"],
    pediatric: ["兒", "小兒", "PEDIATRIC"],
    ecmo: ["ECMO", "葉克膜"]
  };

  headers.forEach((th, colIndex) => {
    let headerText = th.textContent.toUpperCase();
    
    let isRenalCol = keywords.renal.some(kw => headerText.includes(kw));
    let isDialysisCol = keywords.dialysis.some(kw => headerText.includes(kw));
    let isHepaticCol = keywords.hepatic.some(kw => headerText.includes(kw));
    let isPediatricCol = keywords.pediatric.some(kw => headerText.includes(kw));
    let isEcmoCol = keywords.ecmo.some(kw => headerText.includes(kw));

    let isBasicCol = !(isRenalCol || isDialysisCol || isHepaticCol || isPediatricCol || isEcmoCol); 

    let showColumn = false;
    if (mode === 'all') showColumn = true;
    else if (mode === 'renal') showColumn = isBasicCol || isRenalCol;
    else if (mode === 'dialysis') showColumn = isBasicCol || isDialysisCol;
    else if (mode === 'hepatic') showColumn = isBasicCol || isHepaticCol;
    else if (mode === 'pediatric') showColumn = isBasicCol || isPediatricCol;
    else if (mode === 'ecmo') showColumn = isBasicCol || isEcmoCol;

    th.style.display = showColumn ? "" : "none";
    rows.forEach(row => {
      if(row.cells[colIndex]) {
        row.cells[colIndex].style.display = showColumn ? "" : "none";
      }
    });
  });
}
