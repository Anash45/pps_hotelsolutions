import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import SelectInput from "@/Components/SelectInput";
import HotelsTitle from "./HotelsTitle";
import HotelBrandingForm from "@/Components/HotelBrandingForm";
import HotelBrandingPreview from "@/Components/HotelBrandingPreview";

export default function Hotels() {
    const { auth, hotels = [], selectedHotel = null } = usePage().props;

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
            <Head title="Configurator" />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <HotelsTitle title={"Configurator"} selectedHotel={selected} />

                <div>
                    {isAdmin && (
                        <div className="mb-6 w-64">
                            <SelectInput
                                id="hotel_id"
                                name="hotel_id"
                                value={selected}
                                onChange={handleHotelChange}
                                className="w-full block"
                                options={[
                                    { value: "", label: "Select Hotel" },
                                    ...hotels.map((h) => ({
                                        value: String(h.id),
                                        label: h.hotel_name,
                                    })),
                                ]}
                            />
                        </div>
                    )}
                </div>

                <div className="grid xl:grid-cols-[60%,40%] grid-cols-1 gap-[14px]">
                    <HotelBrandingForm />
                    <HotelBrandingPreview />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
