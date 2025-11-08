import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import SelectInput from "@/Components/SelectInput";
import HotelsTitle from "./HotelsTitle";
import HotelBrandingForm from "@/Components/HotelBrandingForm";
import HotelBrandingPreview from "@/Components/HotelBrandingPreview";
import { useLang } from "@/context/TranslationProvider";

export default function Hotels() {
    const { t } = useLang();
    const { auth, hotels = [], selectedHotel = null } = usePage().props;
    const [formErrors, setFormErrors] = useState({});

    const [selected, setSelected] = useState(
        selectedHotel ? String(selectedHotel.id) : ""
    );
    const isAdmin = auth.user.role === "admin";

    const handleHotelChange = (e) => {
        setSelected(e.target.value);
        router.get(route("hotels.index"), { hotel_id: e.target.value });
    };

    return (
        <AuthenticatedLayout>
            <Head title={t("hotels.title")} />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <HotelsTitle
                    setFormErrors={setFormErrors}
                    title={t("hotels.title")}
                    selectedHotel={selected}
                />

                {isAdmin && (
                    <div className="w-64">
                        <SelectInput
                            id="hotel_id"
                            name="hotel_id"
                            value={selected}
                            onChange={handleHotelChange}
                            className="w-full block"
                            options={[
                                {
                                    value: "",
                                    label: t("hotels.SelectInput.placeholder"),
                                },
                                ...hotels.map((h) => ({
                                    value: String(h.id),
                                    label: h.hotel_name,
                                })),
                            ]}
                        />
                    </div>
                )}

                <div className="grid xl:grid-cols-[60%,40%] grid-cols-1 gap-[14px] items-start">
                    <HotelBrandingForm formErrors={formErrors} />
                    <div className="xl:order-2 order-1 xl:sticky static top-4">
                        <HotelBrandingPreview />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
