import { useContext, useState } from "react";
import { usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { PageContext } from "@/context/PageProvider";
import axios from "axios";
import LightButton from "@/Components/LightButton";
import { useLang } from "@/context/TranslationProvider";

export default function HotelsTitle({ title, setFormErrors }) {
    const { t } = useLang();
    const { auth, selectedHotel = null } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);
    const [formLoading, setFormLoading] = useState(false);

    const handleSave = async () => {
        if (!selectedHotel) return;
        setFormErrors({});
        setFormLoading(true);

        const formData = new FormData();
        Object.entries(brandingFormData).forEach(([key, value]) => {
            if (value instanceof File || typeof value === "string") {
                formData.append(key, value);
            }
        });

        if (brandingFormData.logo_image_url == null) {
            formData.append("logo_image_removed", true);
        }
        if (brandingFormData.banner_image_url == null) {
            formData.append("banner_image_removed", true);
        }
        if (brandingFormData.section_banner_image_url == null) {
            formData.append("section_banner_image_removed", true);
        }

        try {
            const { data } = await axios.post(
                route("hotels.updateBranding", selectedHotel.id),
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (data.success) {
                setBrandingFormData((prev) => ({
                    ...prev,
                    ...data.hotel,
                    logo_image: null,
                    logo_image_url: data.hotel.logo_image
                        ? `/storage/${data.hotel.logo_image}`
                        : null,
                    banner_image: null,
                    banner_image_url: data.hotel.banner_image
                        ? `/storage/${data.hotel.banner_image}`
                        : null,
                    section_banner_image: null,
                    section_banner_image_url: data.hotel.section_banner_image
                        ? `/storage/${data.hotel.section_banner_image}`
                        : null,
                }));
            }
            setFormLoading(false);
        } catch (error) {
            setFormLoading(false);

            if (error.response && error.response.status === 422) {
                setFormErrors(error.response.data.errors);
            } else {
                console.error("Unexpected error updating branding:", error);
            }
        }
    };

    function goToTestLanding(userRole, hotelId) {
        const url =
            userRole === "admin"
                ? `/test-landing?hotel_id=${hotelId}`
                : `/test-landing`;

        window.open(url, "_blank");
    }

    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            <h5 className="font-bold text-xl text-grey900">{title}</h5>
            <div className="flex flex-wrap gap-2">
                <LightButton
                    disabled={!selectedHotel}
                    className="bg-slate-300"
                    onClick={() =>
                        goToTestLanding(auth.user.role, selectedHotel.id)
                    }
                >
                    {t("hotels.HotelsTitle.testLanding")}
                </LightButton>
                <PrimaryButton
                    onClick={handleSave}
                    disabled={!selectedHotel || formLoading}
                >
                    {formLoading
                        ? t("hotels.HotelsTitle.saving")
                        : t("hotels.HotelsTitle.savePublish")}
                </PrimaryButton>
            </div>
        </div>
    );
}
