import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import DashboardTitle from "./DashboardTitle";
import { useEffect, useState } from "react";
import DashboardStats from "./DashboardStats";
import DashboardViewsChart from "./DashboardViewsChart";
import DashboardButtonsViewsChart from "./DashboardButtonsViewsChart";
import SelectInput from "@/Components/SelectInput";

export default function Dashboard() {
    const {
        auth,
        hotels = [],
        selectedHotel = null,
        viewsData = {},
    } = usePage().props;

    const [durations, setDurations] = useState([
        "7_days",
        "30_days",
        "90_days",
    ]);
    const [selectedDuration, setSelectedDuration] = useState(durations[0]);
    const [currentViews, setCurrentViews] = useState(null);

    const [selected, setSelected] = useState(
        selectedHotel ? String(selectedHotel.id) : ""
    );
    const isAdmin = auth.user.role === "admin";

    const handleHotelChange = (e) => {
        setSelected(e.target.value);
        router.get(route("dashboard"), { hotel_id: e.target.value });
    };

    // 🔥 Update currentViews whenever duration or viewsData changes
    useEffect(() => {
        if (viewsData && selectedDuration && viewsData[selectedDuration]) {
            setCurrentViews(viewsData[selectedDuration] || []);
        } else {
            setCurrentViews([]);
        }
    }, [viewsData, selectedDuration]);

    console.log("Hotels:", selectedHotel);
    console.log("Views Data:", viewsData);
    console.log("Current Views:", currentViews);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <DashboardTitle
                    durations={durations}
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
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
                <div className="flex flex-col gap-3.5">
                    <DashboardStats dashboardStats={viewsData?.all_time ?? {}} />
                    <DashboardViewsChart selectedDuration={selectedDuration} chartViews={currentViews?.chart_data ?? {}} />
                    <DashboardButtonsViewsChart
                        buttonsViews={currentViews?.buttons ?? {}}
                        selectedDuration={selectedDuration}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
