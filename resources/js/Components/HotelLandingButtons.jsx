import axios from "axios";
import { getIcon } from "@/data/iconMap";
import { useModal } from "@/context/ModalProvider";

export default function HotelLandingButtons({ brandingFormData }) {
    const { openModal } = useModal();
    const handleView = async (buttonId) => {
        try {
            await axios.post(`/buttons/${buttonId}/view`);
            console.log("✅ View tracked for button", buttonId);
        } catch (err) {
            console.error("❌ Failed to track view", err.response?.data || err);
        }
    };

    return (
        <div className="space-y-2">
            {brandingFormData?.buttons.map((button, idx) => {
                const Icon = getIcon(button.icon);

                // build href depending on type
                let href = "#";
                if (button.type === "url" || button.type === "map") {
                    href = button.url;
                } else if (button.type === "phone") {
                    href = `tel:${button.phone}`;
                } else if (button.type === "whatsapp") {
                    href = `https://wa.me/${button.whatsapp}`;
                } else if (button.type === "email") {
                    href = `mailto:${button.email}`;
                } else if (button.type === "page" && button.page_id) {
                    href = `/pages/${button.page_id}`;
                }

                return (
                    <a
                        key={idx}
                        className="block w-full px-4 py-3 rounded-xl border text-sm hotel-button"
                        style={{
                            color:
                                button.text_color ??
                                brandingFormData.button_text_color,
                            backgroundColor:
                                button.background_color ??
                                brandingFormData.primary_color,
                            borderColor:
                                button.background_color ??
                                brandingFormData.primary_color,
                        }}
                        target={
                            ["url", "map", "phone", "whatsapp", "email"].includes(button.type)
                                ? "_blank"
                                : "_self"
                        }
                        href={href}
                        onClick={(e) => {
                            // Track view
                            handleView(button.id || button.button_id);

                            // Special handling for WiFi
                            if (button.type === "wifi") {
                                e.preventDefault();
                                openModal("HotelWifiModal", {
                                    wifiName: button.wifi_name,
                                    wifiPassword: button.wifi_password,
                                });
                            }
                        }}
                    >
                        <div className="flex justify-start items-center gap-2">
                            {Icon ? <Icon size={18} /> : <span />}
                            <span>{button.text}</span>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
