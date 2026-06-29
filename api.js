// js/api.js
export const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdOy22a2Li6l51RSKeA29mpBcSqTuPlDUuePw2QLRmerWJL--xvYX1CL9V47r-csEFIqjWveW8N2AT/pub?gid=1596306221&single=true&output=csv";

export async function fetchAntibioticData() {
  return new Promise((resolve, reject) => {
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
 
