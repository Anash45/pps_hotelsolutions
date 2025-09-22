// resources/js/config/iconMap.js
import * as LucideIcons from "lucide-react";

// Map of allowed icons
export const iconMap = {
    Wifi: LucideIcons.Wifi,
    Globe: LucideIcons.Globe,
    Phone: LucideIcons.Phone,
    MapPin: LucideIcons.MapPin,
    // ➕ Add more as needed
};

// Helper: get icon by name safely
export function getIcon(name) {
    return iconMap[name] || null;
}
