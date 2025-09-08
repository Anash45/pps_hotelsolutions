// utils/dummyData.js

// Helper to generate random views data
function generateViewsData(days) {
    const today = new Date();
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        data.push({
            date: date.toISOString().split("T")[0], // YYYY-MM-DD
            views: Math.floor(Math.random() * 200) + 50, // random views between 50–250
        });
    }

    return data;
}

// Pre-generated datasets
export const data7Days = generateViewsData(7);
export const data30Days = generateViewsData(30);
export const data90Days = generateViewsData(90);
