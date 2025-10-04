import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import SelectInput from "@/Components/SelectInput";
import KeysTable from "./KeysTable";
import KeysTitle from "./KeysTitle";

export default function Keys() {
    const {
        auth,
        hotels = [],
        codes = [],
        selectedHotel = null,
    } = usePage().props;

    const [selected, setSelected] = useState(
        selectedHotel ? String(selectedHotel) : ""
    );
    const isAdmin = auth.user.role === "admin";

    const handleHotelChange = (e) => {
        setSelected(e.target.value);
        router.get(route("keys.index"), { hotel_id: e.target.value });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Keys" />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <KeysTitle
                    title={"Keys Management"}
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
                                { value: "", label: "Select Hotel" },
                                ...hotels.map((h) => ({
                                    value: String(h.id),
                                    label: h.hotel_name,
                                })),
                            ]}
                        />
                    </div>
                )}

                <KeysTable selectedHotel={selectedHotel} codes={codes} />
            </div>
        </AuthenticatedLayout>
    );
}
