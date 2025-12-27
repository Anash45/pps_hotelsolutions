import axios from "axios";
import { useContext, useState } from "react";
import { getIcon } from "@/data/iconMap";
import { useModal } from "@/context/ModalProvider";
import { PageContext } from "@/context/PageProvider";
import AutoTranslate from "./AutoTranslate";
import { useAutoTranslate } from "@/context/AutoTranslateProvider";

export default function HotelLandingButtons({
    codeDetails = {},
    brandingFormData,
}) {
    const { openModal } = useModal();
    const { loadingButton, setLoadingButton } = useContext(PageContext);
    const context = useAutoTranslate();
    const isDE = context?.isDE || null;

    const handleView = async (buttonId) => {
        try {
            await axios.post(`/buttons/${buttonId}/view`);
        } catch (err) {
            console.error("❌ Failed to track view", err.response?.data || err);
        }
    };

    const handleClick = async (e, button) => {
        const buttonId = button.id || button.button_id;
        setLoadingButton(buttonId); // start loading
        await handleView(buttonId); // wait until tracking done
        setLoadingButton(null); // stop loading

        if (button.type === "wifi") {
            e.preventDefault();
            openModal("HotelWifiModal", {
                wifiName: button.wifi_name,
                wifiPassword: button.wifi_password,
            });
        }
    };

    return (
        <div className="space-y-2">
            {brandingFormData?.buttons.map((button, idx) => {
                const Icon = getIcon(button.icon);

                // build href depending on type
                let href = "#";
                if (button.type === "url" || button.type === "map")
                    href = button.url;
                else if (button.type === "phone") href = `tel:${button.phone}`;
                else if (button.type === "whatsapp")
                    href = `https://wa.me/${button.whatsapp}`;
                else if (button.type === "email")
                    href = `mailto:${button.email}`;
                else if (button.type === "page" && button.page_id)
                    href = codeDetails?.code
                        ? `/key/${codeDetails.code}/page/${button.page_id}`
                        : "#";

                const isLoading =
                    loadingButton === (button.id || button.button_id);

                return (
                    <a
                        key={idx}
                        className={`block w-full px-4 py-3 rounded-xl border text-base hotel-button relative ${
                            isLoading ? "opacity-75 pointer-events-none" : ""
                        }`}
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
                            ["url", "map", "whatsapp", "email"].includes(
                                button.type
                            )
                                ? "_blank"
                                : "_self"
                        }
                        href={href}
                        onClick={(e) => handleClick(e, button)}
                    >
                        <div className="flex justify-start items-center gap-2">
                            {Icon ? <Icon size={18} /> : <span />}
                            <span>
                                {isDE && button.text_de
                                    ? button.text_de
                                    : button.text}
                            </span>
                            {isLoading && (
                                <svg
                                    className="animate-spin ml-auto h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                            )}
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
