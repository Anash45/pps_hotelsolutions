import { useContext, useState } from "react";
import { usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { PageContext } from "@/context/PageProvider";
import axios from "axios";
import LightButton from "@/Components/LightButton";

export default function HotelsTitle({ title }) {
    const { auth, selectedHotel = null } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);
    const [formLoading, setFormLoading] = useState(false);

    const handleSave = async () => {
        if (!selectedHotel) return;
        setFormLoading(true);

        const formData = new FormData();
        Object.entries(brandingFormData).forEach(([key, value]) => {
            if (value instanceof File || typeof value === "string") {
                formData.append(key, value);
            }
        });
        console.log("Sending Form Data: ", brandingFormData);

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
                    logo_image: null, // reset file input
                    logo_image_url: data.hotel.logo_image
                        ? `/storage/${data.hotel.logo_image}`
                        : null,
                    banner_image: null,
                    banner_image_url: data.hotel.banner_image
                        ? `/storage/${data.hotel.banner_image}`
                        : null,
                }));
            }
            setFormLoading(false);
        } catch (error) {
            console.error("Error updating branding:", error);
            setFormLoading(false);
        }
    };

    function goToTestLanding(userRole, hotelId) {
        const url =
            userRole === "admin"
                ? `/test-landing?hotel_id=${hotelId}`
                : `/test-landing`;

        // Open in a new tab
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
                    Test Landing
                </LightButton>
                <PrimaryButton
                    onClick={handleSave}
                    disabled={!selectedHotel || formLoading}
                >
                    {formLoading ? "Saving..." : "Save & Publish"}
                </PrimaryButton>
            </div>
        </div>
    );
}
