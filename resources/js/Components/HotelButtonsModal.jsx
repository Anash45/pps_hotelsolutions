import { useContext, useEffect, useState } from "react";
import InputError from "./InputError";
import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { PageContext } from "@/context/PageProvider";
import {
    FileText,
    Globe,
    Hotel,
    Mail,
    MapPin,
    Phone,
    Utensils,
    Wifi,
} from "lucide-react";
import SelectInput from "./SelectInput";
import ColorInput from "./ColorInput";
import {
    FaFacebook,
    FaInstagram,
    FaPinterest,
    FaSwimmingPool,
    FaWhatsapp,
} from "react-icons/fa";
import { router } from "@inertiajs/react";

export default function HotelButtonsModal({
    onClose,
    button = null, // null = create, object = edit
    selectedHotel = null,
    title = button ? "Edit button" : "Create button",
    description = "",
}) {
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

    // Initialize formData
    const [formData, setFormData] = useState({
        type: button?.type ?? "",
        text: button?.text ?? "",
        icon: button?.icon ?? "",
        text_color: button?.text_color ?? "#ffffff",
        background_color: button?.background_color ?? "#84af83",
        url: button?.url ?? "",
        phone: button?.phone ?? "",
        whatsapp: button?.whatsapp ?? "",
        email: button?.email ?? "",
        wifi_name: button?.wifi_name ?? "",
        wifi_password: button?.wifi_password ?? "",
        page_id: button?.page_id ?? "",
    });

    // Handle field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        console.log(name, value);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setFormErrors({}); // reset errors

        try {
            let response;
            console.log(formData);
            if (button) {
                // Editing existing button
                response = await axios.put(`/buttons/${button.button_id}`, {
                    ...formData,
                    hotel_id: selectedHotel?.id,
                });
            } else {
                // Creating new button
                response = await axios.post("/buttons", {
                    ...formData,
                    hotel_id: selectedHotel?.id,
                });
            }

            console.log("Saved:", response.data);

            // Refresh the hotel with its buttons
            router.reload({ only: ["selectedHotel"] });

            // // Close modal after success
            setTimeout(() => handleClose(), 500);
        } catch (err) {
            if (err.response && err.response.status === 422) {
                // Validation errors
                setFormErrors(err.response.data.errors);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    };

    console.log("Selected btn: ", button);

    return (
        <div
            className={`transform rounded-xl bg-white py-4 px-6 shadow-xl transition-all duration-200 w-[624px] max-w-full 
        ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
            <div className="space-y-3">
                <div className="space-y-1">
                    <h2 className="text-lg text-[#201A20] font-semibold">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-xs font-medium text-[#475569]">
                            {description}
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        {/* Button Type */}
                        <div>
                            <InputLabel
                                htmlFor="type"
                                value="Button Type"
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
                                        label: "Page",
                                        icon: FileText,
                                    },
                                    {
                                        value: "map",
                                        label: "Map",
                                        icon: MapPin,
                                    },
                                    { value: "url", label: "URL", icon: Globe },
                                    {
                                        value: "phone",
                                        label: "Phone",
                                        icon: Phone,
                                    },
                                    {
                                        value: "email",
                                        label: "Email",
                                        icon: Mail,
                                    },
                                    {
                                        value: "whatsapp",
                                        label: "Whatsapp",
                                        icon: FaWhatsapp,
                                    },
                                    {
                                        value: "wifi",
                                        label: "Wifi",
                                        icon: Wifi,
                                    },
                                ]}
                            />
                            <InputError message={formErrors.type?.[0]} />
                        </div>

                        {/* Button Text */}
                        <div>
                            <InputLabel
                                htmlFor="text"
                                value="Button Text"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="text"
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="Button Text"
                            />
                            <InputError message={formErrors.text?.[0]} />
                        </div>

                        {/* Colors */}
                        <div className="grid md:grid-cols-3 gap-3 md:col-span-2">
                            {/* Button Icon */}
                            <div>
                                <InputLabel
                                    htmlFor="icon"
                                    value="Button Icon"
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
                                    ]}
                                />
                                <InputError message={formErrors.icon?.[0]} />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="text_color"
                                    value="Button Text Color"
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <ColorInput
                                    id="text_color"
                                    name="text_color"
                                    value={formData.text_color}
                                    onChange={handleChange}
                                    type="text"
                                    className="block w-full"
                                />
                                <InputError
                                    message={formErrors.text_color?.[0]}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="background_color"
                                    value="Button BG Color"
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <ColorInput
                                    id="background_color"
                                    name="background_color"
                                    value={formData.background_color}
                                    onChange={handleChange}
                                    type="text"
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
                                value="URL"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="https://example.com"
                            />
                            <InputError message={formErrors.url?.[0]} />
                        </div>
                    ) : null}

                    {formData.type === "phone" ? (
                        <div>
                            <InputLabel
                                htmlFor="phone"
                                value="Phone Number"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                className="block w-full"
                                placeholder="+1234567890"
                            />
                            <InputError message={formErrors.phone?.[0]} />
                        </div>
                    ) : null}

                    {/* WhatsApp */}
                    {formData.type === "whatsapp" ? (
                        <div>
                            <InputLabel
                                htmlFor="whatsapp"
                                value="WhatsApp Number"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="whatsapp"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                type="tel"
                                className="block w-full"
                                placeholder="+1234567890"
                            />
                            <InputError message={formErrors.whatsapp?.[0]} />
                        </div>
                    ) : null}

                    {/* Email */}
                    {formData.type === "email" ? (
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="block w-full"
                                placeholder="example@email.com"
                            />
                            <InputError message={formErrors.email?.[0]} />
                        </div>
                    ) : null}

                    {formData.type === "wifi" ? (
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <InputLabel
                                    htmlFor="wifi_name"
                                    value="WiFi Name"
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <TextInput
                                    id="wifi_name"
                                    name="wifi_name"
                                    value={formData.wifi_name}
                                    onChange={handleChange}
                                    type="text"
                                    className="block w-full"
                                    placeholder="Network SSID"
                                />
                                <InputError
                                    message={formErrors.wifi_name?.[0]}
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="wifi_password"
                                    value="WiFi Password"
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <TextInput
                                    id="wifi_password"
                                    name="wifi_password"
                                    value={formData.wifi_password}
                                    onChange={handleChange}
                                    type="text"
                                    className="block w-full"
                                    placeholder="Password"
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
                                value="Select Page"
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
                        <InputError message="Fix the errors in the form." />
                    )}
                    <LightButton onClick={handleClose}>Cancel</LightButton>
                    <PrimaryButton
                        onClick={handleSave}
                        disabled={!selectedHotel}
                    >
                        {button ? "Save" : "Create"}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
