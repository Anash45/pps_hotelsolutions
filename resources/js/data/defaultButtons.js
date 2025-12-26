// resources/js/config/defaultButtons.js
import { Wifi, Globe, Phone, MapPin } from "lucide-react";

export const defaultButtons = [
    {
        order: 1,
        title: "Connect to WiFi",
        type: "link",
        url: "#",
        icon: "Wifi", // string instead of component
        background_color: null,
        text_color: null,
    },
    {
        order: 2,
        title: "Visit Website",
        type: "link",
        url: "https://hotel.com",
        icon: "Globe",
        background_color: null,
        text_color: null,
    },
    {
        order: 3,
        title: "Call Reception",
        type: "tel",
        url: "tel:+123456789",
        icon: "Phone",
        background_color: null,
        text_color: null,
    },
    {
        order: 4,
        title: "Find Us",
        type: "map",
        url: "https://maps.google.com?q=hotel",
        icon: "MapPin",
        background_color: null,
        text_color: null,
    },
];
