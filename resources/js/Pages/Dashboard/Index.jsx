import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DashboardTitle from "./DurationTitle";
import { useState } from "react";
import DashboardStats from "./DashboardStats";
import DashboardViewsChart from "./DashboardViewsChart";
import DashboardButtonsViewsChart from "./DashboardButtonsViewsChart";

export default function Dashboard() {
    const [durations, setDurations] = useState([
        "7 Days",
        "30 Days",
        "90 Days",
    ]);
    const [selectedDuration, setSelectedDuration] = useState(durations[0]);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <DashboardTitle
                    durations={durations}
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
                />
                <div className="flex flex-col gap-3.5">
                    <DashboardStats />
                    <DashboardViewsChart selectedDuration={selectedDuration} />
                    <DashboardButtonsViewsChart selectedDuration={selectedDuration} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
