import { useContext, useEffect, useState } from "react";
import InputError from "./InputError";
import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import ColorInput from "./ColorInput";
import { PageContext } from "@/context/PageProvider";
import { useLang } from "@/context/TranslationProvider";
import { router } from "@inertiajs/react";
import {
    FileText,
    Globe,
    MapPin,
    Phone,
    Mail,
    Wifi,
    Utensils,
    Star,
    Stars,
    Bed,
    Beer,
    Beef,
    Clock,
} from "lucide-react";
import {
    FaFacebook,
    FaInstagram,
    FaPinterest,
    FaSkiing,
    FaSnowflake,
    FaSun,
    FaSwimmingPool,
    FaWhatsapp,
    FaDumbbell,
} from "react-icons/fa";

export default function HotelButtonsModal({
    onClose,
    button = null,
    selectedHotel = null,
}) {
    const { t } = useLang("Components.HotelButtonsModal");
    const [show, setShow] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const { brandingFormData } = useContext(PageContext);

    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 200);
    };

    const [formData, setFormData] = useState({
        type: button?.type ?? "",
        text: button?.text ?? "",
        icon: button?.icon ?? "",
        text_color:
            button?.text_color ??
            brandingFormData?.button_text_color ??
            "#ffffff",
        background_color:
            button?.background_color ??
            brandingFormData?.primary_color ??
            "#84af83",
        url: button?.url ?? "",
        phone: button?.phone ?? "",
        whatsapp: button?.whatsapp ?? "",
        email: button?.email ?? "",
        wifi_name: button?.wifi_name ?? "",
        wifi_password: button?.wifi_password ?? "",
        page_id: button?.page_id ?? "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setFormErrors({});
        try {
            let response;
            if (button) {
                response = await axios.put(`/buttons/${button.button_id}`, {
                    ...formData,
                    hotel_id: selectedHotel?.id,
                });
            } else {
                response = await axios.post("/buttons", {
                    ...formData,
                    hotel_id: selectedHotel?.id,
                });
            }
            router.reload({ only: ["selectedHotel"] });
            setTimeout(() => handleClose(), 500);
        } catch (err) {
            if (err.response?.status === 422)
                setFormErrors(err.response.data.errors);
            else console.error(err);
        }
    };

    return (
        <div
            className={`transform rounded-xl bg-white py-4 px-6 shadow-xl transition-all duration-200 w-[624px] max-w-full ${
                show ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
        >
            <div className="space-y-3">
                <div className="space-y-1">
                    <h2 className="text-lg text-[#201A20] font-semibold">
                        {button ? t("editButtonTitle") : t("createButtonTitle")}
                    </h2>
                </div>

                <div className="space-y-3">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        <div>
                            <InputLabel
                                htmlFor="type"
                                value={t("buttonTypeLabel")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full block"
                                options={[
                                    {
                                        value: "page",
                                        label: t("selectPageLabel"),
                                        icon: FileText,
                                    },
                                    {
                                        value: "map",
                                        label: t("selectMapLabel"),
                                        icon: MapPin,
                                    },
                                    {
                                        value: "url",
                                        label: t("urlLabel"),
                                        icon: Globe,
                                    },
                                    {
                                        value: "phone",
                                        label: t("phoneLabel"),
                                        icon: Phone,
                                    },
                                    {
                                        value: "email",
                                        label: t("emailLabel"),
                                        icon: Mail,
                                    },
                                    {
                                        value: "whatsapp",
                                        label: t("whatsappLabel"),
                                        icon: FaWhatsapp,
                                    },
                                    {
                                        value: "wifi",
                                        label: t("wifiNameLabel"),
                                        icon: Wifi,
                                    },
                                ]}
                            />
                            <InputError message={formErrors.type?.[0]} />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="text"
                                value={t("buttonTextLabel")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder={t("buttonTextLabel")}
                            />
                            <InputError message={formErrors.text?.[0]} />
                        </div>

                        {/* Colors */}
                        <div className="grid md:grid-cols-3 gap-3 md:col-span-2">
                            <div>
                                <InputLabel
                                    htmlFor="icon"
                                    value={t("buttonIconLabel")}
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <SelectInput
                                    id="icon"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="w-full block"
                                    options={[
                                        { value: "FileText", icon: FileText },
                                        { value: "MapPin", icon: MapPin },
                                        { value: "Globe", icon: Globe },
                                        { value: "Phone", icon: Phone },
                                        { value: "Wifi", icon: Wifi },
                                        { value: "Utensils", icon: Utensils },
                                        { value: "Star", icon: Star },
                                        { value: "Mail", icon: Mail },
                                        {
                                            value: "FaSwimmingPool",
                                            icon: FaSwimmingPool,
                                        },
                                        {
                                            value: "FaFacebook",
                                            icon: FaFacebook,
                                        },
                                        {
                                            value: "FaWhatsapp",
                                            icon: FaWhatsapp,
                                        },
                                        {
                                            value: "FaInstagram",
                                            icon: FaInstagram,
                                        },
                                        {
                                            value: "FaPinterest",
                                            icon: FaPinterest,
                                        },
                                        { value: "Stars", icon: Stars },
                                        { value: "FaSun", icon: FaSun },
                                        {
                                            value: "FaSnowflake",
                                            icon: FaSnowflake,
                                        },
                                        { value: "Bed", icon: Bed },
                                        { value: "FaSkiing", icon: FaSkiing },
                                        {
                                            value: "FaDumbbell",
                                            icon: FaDumbbell,
                                        },
                                        { value: "Beer", icon: Beer },
                                        { value: "Beef", icon: Beef },
                                        { value: "Clock", icon: Clock },
                                    ]}
                                />
                                <InputError message={formErrors.icon?.[0]} />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="btn_text_color"
                                    value={t("buttonTextColorLabel")}
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <ColorInput
                                    id="btn_text_color"
                                    name="text_color"
                                    value={formData.text_color}
                                    onChange={handleChange}
                                    className="block w-full"
                                />
                                <InputError
                                    message={formErrors.text_color?.[0]}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="btn_background_color"
                                    value={t("buttonBgColorLabel")}
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <ColorInput
                                    id="btn_background_color"
                                    name="background_color"
                                    value={formData.background_color}
                                    onChange={handleChange}
                                    className="block w-full"
                                />
                                <InputError
                                    message={formErrors.background_color?.[0]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Fields */}
                    {formData.type === "url" || formData.type === "map" ? (
                        <div>
                            <InputLabel
                                htmlFor="url"
                                value={t("urlLabel")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder={t("urlPlaceholder")}
                            />
                            <InputError message={formErrors.url?.[0]} />
                        </div>
                    ) : null}

                    {formData.type === "phone" ? (
                        <div>
                            <InputLabel
                                htmlFor="phone"
                                value={t("phoneLabel")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                className="block w-full"
                                placeholder={t("phonePlaceholder")}
                            />
                            <InputError message={formErrors.phone?.[0]} />
                        </div>
                    ) : null}

                    {formData.type === "whatsapp" ? (
                        <div>
                            <InputLabel
                                htmlFor="whatsapp"
                                value={t("whatsappLabel")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="whatsapp"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                type="tel"
                                className="block w-full"
                                placeholder={t("whatsappPlaceholder")}
                            />
                            <InputError message={formErrors.whatsapp?.[0]} />
                        </div>
                    ) : null}

                    {formData.type === "email" ? (
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value={t("emailLabel")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="block w-full"
                                placeholder={t("emailPlaceholder")}
                            />
                            <InputError message={formErrors.email?.[0]} />
                        </div>
                    ) : null}

                    {formData.type === "wifi" ? (
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <InputLabel
                                    htmlFor="wifi_name"
                                    value={t("wifiNameLabel")}
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <TextInput
                                    id="wifi_name"
                                    name="wifi_name"
                                    value={formData.wifi_name}
                                    onChange={handleChange}
                                    type="text"
                                    className="block w-full"
                                    placeholder={t("wifiNamePlaceholder")}
                                />
                                <InputError
                                    message={formErrors.wifi_name?.[0]}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="wifi_password"
                                    value={t("wifiPasswordLabel")}
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <TextInput
                                    id="wifi_password"
                                    name="wifi_password"
                                    value={formData.wifi_password}
                                    onChange={handleChange}
                                    type="text"
                                    className="block w-full"
                                    placeholder={t("wifiPasswordPlaceholder")}
                                />
                                <InputError
                                    message={formErrors.wifi_password?.[0]}
                                />
                            </div>
                        </div>
                    ) : null}

                    {formData.type === "page" ? (
                        <div>
                            <InputLabel
                                htmlFor="page_id"
                                value={t("selectPageLabel")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                id="page_id"
                                name="page_id"
                                value={formData.page_id}
                                onChange={handleChange}
                                className="w-full block"
                                options={
                                    brandingFormData.pages?.map((page) => ({
                                        value: page.id,
                                        label: page.title,
                                    })) || []
                                }
                            />
                            <InputError message={formErrors.page_id?.[0]} />
                        </div>
                    ) : null}
                </div>

                <div className="flex items-center gap-2 justify-end flex-wrap">
                    {Object.keys(formErrors).length > 0 && (
                        <InputError message={t("fixFormErrors")} />
                    )}
                    <LightButton onClick={handleClose}>
                        {t("cancelButton")}
                    </LightButton>
                    <PrimaryButton
                        onClick={handleSave}
                        disabled={!selectedHotel}
                    >
                        {button ? t("saveButton") : t("createButton")}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
