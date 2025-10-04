export function generateShades(baseColor, count) {
    if (count <= 1) return [baseColor]; // handle single case

    const shades = [];
    const base = parseInt(baseColor.replace("#", ""), 16);
    const r = (base >> 16) & 255;
    const g = (base >> 8) & 255;
    const b = base & 255;

    for (let i = 0; i < count; i++) {
        // start at 1.3 (lighter) and move to 1.0 (original color)
        const factor = 1.3 - (i / (count - 1)) * 0.3; // range 1.3 → 1.0
        const rr = Math.min(255, Math.floor(r * factor));
        const gg = Math.min(255, Math.floor(g * factor));
        const bb = Math.min(255, Math.floor(b * factor));
        shades.push(`rgb(${rr}, ${gg}, ${bb})`);
    }
    return shades;
}