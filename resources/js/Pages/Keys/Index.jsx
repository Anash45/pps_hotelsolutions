import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import SelectInput from "@/Components/SelectInput";
import KeysTable from "./KeysTable";
import KeysTitle from "./KeysTitle";
import { useLang } from "@/context/TranslationProvider";

export default function Keys() {
    const { t } = useLang();
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
            <Head title={t("keys.page.title")} />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <KeysTitle
                    title={t("keys.KeysTitle.title")}
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
                                    label: t("keys.page.selectHotel"),
                                },
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
