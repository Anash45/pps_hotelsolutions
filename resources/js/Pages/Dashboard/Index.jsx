import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import DashboardTitle from "./DashboardTitle";
import { useEffect, useState } from "react";
import DashboardStats from "./DashboardStats";
import DashboardViewsChart from "./DashboardViewsChart";
import DashboardButtonsViewsChart from "./DashboardButtonsViewsChart";
import SelectInput from "@/Components/SelectInput";
import { useLang } from "@/context/TranslationProvider";

export default function Dashboard() {
    const { t } = useLang();

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
    const [selectedDuration, setSelectedDuration] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("dashboard_selectedDuration");
            if (saved && ["7_days", "30_days", "90_days"].includes(saved)) {
                return saved;
            }
        }
        return durations[0];
    });
        // Persist selectedDuration to localStorage
        useEffect(() => {
            if (typeof window !== "undefined" && selectedDuration) {
                localStorage.setItem("dashboard_selectedDuration", selectedDuration);
            }
        }, [selectedDuration]);
    const [currentViews, setCurrentViews] = useState(null);

    const [selected, setSelected] = useState(
        selectedHotel ? String(selectedHotel.id) : ""
    );
    const isAdmin = auth.user.role === "admin";

    const handleHotelChange = (e) => {
        setSelected(e.target.value);
        router.get(route("dashboard"), { hotel_id: e.target.value });
    };

    useEffect(() => {
        if (viewsData && selectedDuration && viewsData[selectedDuration]) {
            setCurrentViews(viewsData[selectedDuration] || []);
        } else {
            setCurrentViews([]);
        }
    }, [viewsData, selectedDuration]);

    return (
        <AuthenticatedLayout>
            <Head title={t("dashboard.title")} />

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
                                {
                                    value: "",
                                    label: t("dashboard.selectHotel"),
                                },
                                ...hotels.map((h) => ({
                                    value: String(h.id),
                                    label: h.hotel_name,
                                })),
                            ]}
                        />
                    </div>
                )}

                <div className="flex flex-col gap-3.5">
                    <DashboardStats
                        dashboardStats={viewsData?.all_time ?? {}}
                    />
                    <DashboardViewsChart
                        selectedDuration={selectedDuration}
                        chartViews={currentViews?.chart_data ?? {}}
                        noDataMessage={t("dashboard.chartDataUnavailable")}
                    />
                    <DashboardButtonsViewsChart
                        buttonsViews={currentViews?.buttons ?? {}}
                        selectedDuration={selectedDuration}
                        noDataMessage={t("dashboard.viewsDataUnavailable")}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
