// js/app.js
import { fetchAntibioticData } from './api.js';
import { renderGrid } from './ui.js';

// 初始化流程
async function initApp() {
    const gridElement = document.getElementById('drugsGrid');
    try {
        const data = await fetchAntibioticData();
        renderGrid(data, 'drugsGrid');
        setupEventListeners();
    } catch (error) {
        console.error("資料載入失敗:", error);
        gridElement.innerHTML = '<div class="loading-text">資料載入失敗，請確認連線或發布設定。</div>';
    }
}

// 綁定 DOM 事件
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const grid = document.getElementById('drugsGrid');
    const buttons = document.querySelectorAll('#viewToggles .btn');

    // 搜尋功能
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        const cards = grid.getElementsByClassName('drug-card');

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const name = card.getAttribute('data-name');
            const ingredient = card.getAttribute('data-ingredient');

            if (name.includes(query) || ingredient.includes(query)) {
                card.classList.remove('hidden-search');
            } else {
                card.classList.add('hidden-search');
            }
        }
    });

    // 視圖切換功能
    document.getElementById('viewToggles').addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn')) return;

        buttons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const targetView = e.target.getAttribute('data-target');
        grid.setAttribute('data-view', targetView);
    });
}

// 執行應用程式
window.addEventListener('DOMContentLoaded', initApp);
