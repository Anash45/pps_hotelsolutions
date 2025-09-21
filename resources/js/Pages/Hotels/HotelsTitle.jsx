import { useContext } from "react";
import { usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { PageContext } from "@/context/PageProvider";
import axios from "axios";

export default function HotelsTitle({ title }) {
    const { auth, selectedHotel = null } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);

    const handleSave = async () => {
        if (!selectedHotel) return;

        const formData = new FormData();
        Object.entries(brandingFormData).forEach(([key, value]) => {
            if (value instanceof File || typeof value === "string") {
                formData.append(key, value);
            }
        });

        try {
            const { data } = await axios.post(
                route("hotels.updateBranding", selectedHotel.id),
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log(data);

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
        } catch (error) {
            console.error("Error updating branding:", error);
        }
    };

    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            <h5 className="font-bold text-xl text-grey900">{title}</h5>
            <div className="flex">
                <PrimaryButton onClick={handleSave} disabled={!selectedHotel}>
                    Save & Publish
                </PrimaryButton>
            </div>
        </div>
    );
}
