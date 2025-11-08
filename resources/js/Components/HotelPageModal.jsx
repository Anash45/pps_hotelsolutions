import { useEffect, useState } from "react";
import axios from "axios";
import InputError from "./InputError";
import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import HotelPageEditor from "./HotelPageEditor";
import { router } from "@inertiajs/react";
import { useLang } from "@/context/TranslationProvider";

export default function HotelPageModal({
    onClose,
    page = null,
    selectedHotel = null,
}) {
    const { t } = useLang("Components.hotel_page_modal");

    const title = page
        ? t("edit_title")
        : t("create_title");

    const description = page
        ? t("edit_description")
        : t("create_description");

    const [show, setShow] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        hotel_id: selectedHotel?.id ?? null,
        title: page?.title ?? "",
        content: page?.content ?? "",
    });

    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 200);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setFormErrors({});
        try {
            const response = page
                ? await axios.put(`/hotel-pages/${page.id}`, formData)
                : await axios.post("/hotel-pages", formData);

            router.reload({ only: ["selectedHotel"] });
            setTimeout(handleClose, 500);
        } catch (err) {
            if (err.response?.status === 422) {
                setFormErrors(err.response.data.errors);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    };

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
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="title"
                            value={t("page_name")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <TextInput
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            className="date-inp block w-full"
                            placeholder={t(
                                "placeholder_page_name"
                            )}
                            required
                        />
                        <InputError message={formErrors.title?.[0]} />
                    </div>

                    <div className="space-y-1">
                        <HotelPageEditor
                            formData={formData}
                            handleChange={handleChange}
                        />
                        <InputError message={formErrors.content?.[0]} />
                    </div>
                </div>

                <div className="flex items-center gap-2 justify-end flex-wrap">
                    {Object.keys(formErrors).length > 0 && (
                        <InputError
                            message={t("form_error")}
                        />
                    )}
                    <LightButton onClick={handleClose}>
                        {t("cancel")}
                    </LightButton>
                    <PrimaryButton
                        disabled={!selectedHotel}
                        onClick={handleSave}
                    >
                        {page
                            ? t("update")
                            : t("create")}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
