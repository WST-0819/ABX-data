// js/api.js
export const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdOy22a2Li6l51RSKeA29mpBcSqTuPlDUuePw2QLRmerWJL--xvYX1CL9V47r-csEFIqjWveW8N2AT/pub?gid=1596306221&single=true&output=csv";

export async function fetchAntibioticData() {
    const cachedData = sessionStorage.getItem('antibiotic_data');
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    // 當快取不存在時，進行實際請求
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSdOy22a2Li6l51RSKeA29mpBcSqTuPlDUuePw2QLRmerWJL--xvYX1CL9V47r-csEFIqjWveW8N2AT/pub?gid=1596306221&single=true&output=csv'); // 確保這裡是正確的網址
        const csvText = await response.text();
        
        // 使用 PapaParse 解析
        const results = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true
        });

        const data = results.data;
        sessionStorage.setItem('antibiotic_data', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("CSV 獲取失敗:", error);
        throw error;
    }
}

        Papa.parse(GOOGLE_SHEET_CSV_URL, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                if (results.data && results.data.length > 0) {
                    sessionStorage.setItem('antibiotic_data', JSON.stringify(results.data));
                    resolve(results.data);
                } else {
                    reject('無效的資料格式');
                }
            },
            error: function(err) {
                reject(err);
            }
        });
    });
}
 
