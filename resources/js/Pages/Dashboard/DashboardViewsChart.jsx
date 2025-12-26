"use client";

import { useLang } from "@/context/TranslationProvider";
import React from "react";
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

const CustomTooltip = ({ active, payload, label }) => {
    const { t } = useLang();
    if (active && Array.isArray(payload) && payload.length) {
        const date = new Date(label);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        const formattedDate2 = `${dd}.${mm}.${yyyy}`;

        const totalViews = payload[0]?.value ?? 0;
        const uniqueViews = payload[1]?.value ?? 0;

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
                    {t("dashboard.DashboardViewsChart.views")}: {totalViews}
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
                    {t("dashboard.DashboardViewsChart.uniqueViews")}: {uniqueViews}
                </p>
            </div>
        );
    }
    return null;
};

export default function DashboardViewsChart({ selectedDuration, chartViews }) {
    const { t } = useLang();
    // Ensure chartViews is always an array
    const safeChartViews = Array.isArray(chartViews) ? chartViews : [];

    return (
        <div className="p-4 rounded-xl bg-white flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        {t("dashboard.DashboardViewsChart.header")}
                    </h5>
                    <p className="text-xs text-[#544854]">
                        {t("dashboard.DashboardViewsChart.description")}
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <div className="h-2 w-2 shrink-0 bg-[#85AF84] rounded-full"></div>
                    <span className="text-[#334155] font-medium text-xs leading-5">
                        {t("dashboard.DashboardViewsChart.linePageViews")}
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full h-72">
                <ResponsiveContainer>
                    <LineChart
                        data={safeChartViews}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="0 0"
                            stroke="#929CAB"
                            vertical={false}
                            className="opacity-10"
                        />

                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) => {
                                if (!date) return "";
                                const dt = new Date(date);
                                const dd = String(dt.getDate()).padStart(
                                    2,
                                    "0"
                                );
                                const mm = String(dt.getMonth() + 1).padStart(
                                    2,
                                    "0"
                                );
                                return `${dd}.${mm}`;
                            }}
                            tick={{
                                fill: "#929CAB",
                                fontSize: 10,
                                fontFamily: "Arial",
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

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

                        <Line
                            type="monotone"
                            dataKey="total_views"
                            stroke="#83AF82"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="unique_views"
                            stroke="#ff0000"
                            strokeWidth={2}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
