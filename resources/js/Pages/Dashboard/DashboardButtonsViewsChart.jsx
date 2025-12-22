import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    Legend,
} from "recharts";
import { generateShades } from "@/utils/generateBarsColors";
import { useLang } from "@/context/TranslationProvider";

export default function DashboardButtonsViewsChart({
    selectedDuration,
    buttonsViews = [],
}) {
    const { t } = useLang();

    const safeButtonsViews = Array.isArray(buttonsViews) ? buttonsViews : [];
    const barColors = generateShades("#74B574", safeButtonsViews.length || 1);



    const CustomLeftLabel = ({ y, index }) => {
        const text = safeButtonsViews[index]?.button_text || "";
        return (
            <g transform={`translate(0, ${y - 5})`}>
                <text
                    x={0}
                    y={0}
                    fill="#515154"
                    fontSize={12}
                    fontWeight={500}
                    fontFamily="Arial"
                    textAnchor="start"
                    alignmentBaseline="left"
                >
                    {text}
                </text>
            </g>
        );
    };

    const CustomRightLabel = ({ x, y, width, value }) => (
        <text
            x={x + width + 10}
            y={y + 6}
            fill="#334155"
            fontSize={12}
            fontFamily="Arial"
            textAnchor="start"
            alignmentBaseline="middle"
        >
            {value != null ? value : 0}
        </text>
    );

    // Dynamically calculate chart height based on number of items
    const baseHeight = 64 * 4; // 4 rows default (256px)
    const perItemHeight = 24; // px per item
    const minHeight = 192; // minimum chart height
    const maxHeight = 600; // maximum chart height
    const chartHeight = Math.max(
        minHeight,
        Math.min(
            baseHeight + (safeButtonsViews.length - 4) * perItemHeight,
            maxHeight
        )
    );

    return (
        <div className="p-4 rounded-xl bg-white flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-2">
                <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                    {t("dashboard.DashboardButtonsViewsChart.header")}
                </h5>
                <p className="text-xs text-[#544854]">
                    {t("dashboard.DashboardButtonsViewsChart.description")}
                </p>
            </div>

            {/* Chart */}
            <div className="w-full" style={{ height: chartHeight }}>
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    id="buttonsChart"
                >
                    <BarChart
                        layout="vertical"
                        data={safeButtonsViews}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        barCategoryGap={34}
                    >
                        <XAxis hide type="number" />
                        <YAxis type="category" dataKey="button_text" hide />

                        <Tooltip
                            formatter={(value) => [
                                `${value}%`,
                                t(
                                    "dashboard.DashboardButtonsViewsChart.tooltipPercentage"
                                ),
                            ]}
                            contentStyle={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                                border: "1px solid #E2E8F0",
                                fontFamily: "Arial",
                                fontSize: 12,
                            }}
                        />

                        <Bar
                            dataKey="total_views"
                            isAnimationActive={false}
                            barSize={12}
                            fill="#A6DBA5"
                            cursor="default"
                            shape={(props) => (
                                <rect
                                    x={props.x}
                                    y={props.y}
                                    width={props.width}
                                    height={props.height}
                                    fill={
                                        barColors[
                                            props.index % barColors.length
                                        ]
                                    }
                                    rx={2}
                                />
                            )}
                        >
                            <LabelList
                                dataKey="button_text"
                                content={<CustomLeftLabel />}
                            />
                            <LabelList
                                dataKey="total_views"
                                content={<CustomRightLabel />}
                            />
                        </Bar>

                        {safeButtonsViews.length > 0 && (
                            <Legend
                                verticalAlign="bottom"
                                align="left"
                                iconSize={16}
                                wrapperStyle={{
                                    paddingTop: 16,
                                    paddingBottom: 8,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    rowGap: 12,
                                    columnGap: 32,
                                    maxWidth: "100%",
                                }}
                                payload={safeButtonsViews.map((entry, index) => ({
                                    value: entry.button_text || "N/A",
                                    type: "square",
                                    color: barColors[index % barColors.length],
                                }))}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
