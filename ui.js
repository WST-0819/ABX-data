// js/ui.js
// ui.js
export function renderGrid(data, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return; // 確保元素存在

    let htmlBuffer = '';

    data.forEach(row => {
        if (!row['藥品名稱'] && !row['藥品成分']) return;

        const name = row['藥品名稱'] || '';
        const ingredient = row['藥品成分'] || '';
        
        // 拼接 HTML 結構
        htmlBuffer += `
            <div class="drug-card" data-name="${name}" data-ingredient="${ingredient}">
                <h3>${name}</h3>
                <p>${ingredient}</p>
            </div>
        `;
    });
    grid.innerHTML = htmlBuffer;
}
