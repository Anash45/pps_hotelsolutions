"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";
import { data7Days, data30Days, data90Days } from "@/utils/dummyViews";
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const date = new Date(label);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        const formattedDate = `${dd}.${mm}`;
        const formattedDate2 = `${dd}.${mm}.${yyyy}`;

        return (
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    border: "1px solid #00000000",
                    padding: "10px 12px",
                    boxShadow: "0 4px 25px rgba(0, 0, 0, 0.1)",
                }}
            >
                <p
                    style={{
                        margin: 0,
                        color: "#64748B",
                        fontWeight: 400,
                        fontSize: 10,
                        lineHeight: "16px",
                    }}
                >
                    {formattedDate2}
                </p>
                <p
                    style={{
                        margin: 0,
                        color: "#2563EB",
                        fontWeight: 500,
                        fontSize: 12,
                        lineHeight: "16px",
                    }}
                >
                    Views: {payload[0].value}
                </p>
                <p
                    style={{
                        margin: 0,
                        color: "#2563EB",
                        fontWeight: 500,
                        fontSize: 12,
                        lineHeight: "16px",
                    }}
                >
                    Unique Views: {payload[1].value}
                </p>
            </div>
        );
    }
    return null;
};
export default function DashboardViewsChart({ selectedDuration, chartViews }) {
    // Pick dataset based on selected duration
    const chartData =
        selectedDuration === "7 Days"
            ? data7Days
            : selectedDuration === "30 Days"
            ? data30Days
            : data90Days;

    console.log("Chart Views: ", chartViews);

    return (
        <div className="p-4 rounded-xl bg-white flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        Overview hotel info site views
                    </h5>
                    <p className="text-xs text-[#544854]">
                        Description of this graph can land here
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-2 w-2 shrink-0 bg-[#85AF84] rounded-full"></div>
                    <span className="text-[#334155] font-medium text-xs leading-5">
                        :Line Page views/day
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-72">
                <ResponsiveContainer>
                    <LineChart
                        data={chartViews}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        {/* Grid */}
                        <CartesianGrid
                            strokeDasharray="0 0"
                            stroke="#929CAB"
                            vertical={false}
                            className="opacity-10"
                        />

                        {/* X Axis */}
                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => {
                                const dt = new Date(date);
                                const dd = String(dt.getDate()).padStart(
                                    2,
                                    "0"
                                );
                                const mm = String(dt.getMonth() + 1).padStart(
                                    2,
                                    "0"
                                );
                                return `${dd}.${mm}`; // 09.12 format
                            }}
                            tick={{
                                fill: "#929CAB",
                                fontSize: 10,
                                fontFamily: "Arial",
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* Y Axis */}
                        <YAxis
                            tick={{
                                fill: "#929CAB",
                                fontSize: 10,
                                fontFamily: "Arial",
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        {/* Smooth Line */}
                        <Line
                            type="monotone"
                            dataKey="total_views"
                            stroke="#83AF82"
                            strokeWidth={2}
                            dot={false}
                        />

                        {/* Smooth Line */}
                        <Line
                            type="monotone"
                            dataKey="unique_views"
                            stroke="#ff0000"
                            strokeWidth={2}
                            dot={false}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
