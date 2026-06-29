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
        
        htmlBuffer += `
            <div class="drug-card" data-name="${name.toLowerCase()}" data-ingredient="${ingredient.toLowerCase()}">
                <div class="drug-header">
                    <div class="drug-title">${name || '未命名藥品'}</div>
                    <div class="drug-ingredient">成分: ${ingredient}</div>
                </div>
                
                <div class="info-section section-adult">
                    <div class="info-group"><span class="info-label">維持劑量：</span>${row['成人劑量/維持劑量'] || '無資料'}</div>
                    <div class="info-group"><span class="info-label">頻率/途徑：</span>${row['成人劑量/頻率'] || ''} ${row['成人劑量/途徑'] || ''}</div>
                    <div class="info-group"><span class="info-label">腎功能調整：</span>${row['成人劑量/腎功能調整'] || '不須調整'}</div>
                    <div class="info-group"><span class="info-label">肝功能調整：</span>${row['成人劑量/肝功能調整'] || '不須調整'}</div>
                </div>

                <div class="info-section section-dialysis">
                    <table class="sub-table">
                        <thead>
                            <tr><th>類型</th><th>劑量建議 / 頻率</th><th>備註</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><b>HD</b></td><td>${row['血液透析-HD/維持劑量'] || 'No data'} ${row['血液透析-HD/頻率'] || ''}</td><td>${row['血液透析-HD/備註'] || ''}</td></tr>
                            <tr><td><b>CAPD</b></td><td>${row['血液透析-CAPD/維持劑量'] || 'No data'} ${row['血液透析-CAPD/頻率'] || ''}</td><td>${row['血液透析-CAPD/備註'] || ''}</td></tr>
                            <tr><td><b>CVVH</b></td><td>${row['血液透析-CVVH/建議劑量'] || 'No data'} ${row['血液透析-CVVH/頻率'] || ''}</td><td>${row['血液透析-CVVH/備註'] || ''}</td></tr>
                        </tbody>
                    </table>
                </div>

                <div class="info-section section-ecmo">
                    <div class="info-group"><span class="info-label">ECMO 劑量調整：</span></div>
                    <div>${row['ECMO'] || '無相關資料'}</div>
                </div>

                <div class="info-section section-pediatric">
                    <div class="info-group"><span class="info-label">幼兒劑量：</span></div>
                    <div>${row['幼兒'] || '無相關資料'}</div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = htmlBuffer;
}
