// resources/js/config/iconMap.js
import * as LucideIcons from "lucide-react";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";

// Map of allowed icons (use clean names as keys)
export const iconMap = {
    // Lucide icons
    FileText: LucideIcons.FileText,
    MapPin: LucideIcons.MapPin,
    Globe: LucideIcons.Globe,
    Phone: LucideIcons.Phone,
    Wifi: LucideIcons.Wifi,

    // Social icons (react-icons/fa)
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram,
    FaPinterest: FaPinterest,
};

// ✅ Helper: safely get icon by name with debug logging
export function getIcon(name) {
    console.log("[iconMap] Requested icon:", name);

    if (!name) {
        console.warn("[iconMap] No name provided.");
        return null;
    }

    const icon = iconMap[name];

    if (icon) {
        console.log("[iconMap] Found icon:", name, icon);
    } else {
        console.warn("[iconMap] Icon not found for:", name);
        console.info("[iconMap] Available keys:", Object.keys(iconMap));
    }

    return icon || null;
}
