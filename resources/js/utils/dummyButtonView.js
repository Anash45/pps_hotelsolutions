// utils/dummyButtonView.js

// Pre-defined button names
const buttonNames = [
    "Wifi",
    "Contact",
    "SPA Opening Hours",
    "Restaurant menu",
    "FAQ’s",
];

// Helper to generate dummy percentages for a given number of days
function generateButtonData(days) {
    return buttonNames.map((name) => ({
        name,
        percentage: Math.floor(Math.random() * 100) + 1, // random 1-100%
        days, // optional: keep track of duration
    }));
}

// Dummy datasets for 7, 30, 90 days
export const buttonData7Days = generateButtonData(7);
export const buttonData30Days = generateButtonData(30);
export const buttonData90Days = generateButtonData(90);

// Function to get data based on selected duration
export function getButtonDataByDuration(duration) {
    if (duration === "7 Days") return buttonData7Days;
    if (duration === "30 Days") return buttonData30Days;
    if (duration === "90 Days") return buttonData90Days;
    return buttonData7Days; // fallback
}
