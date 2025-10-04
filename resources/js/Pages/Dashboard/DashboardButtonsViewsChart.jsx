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

export default function DashboardButtonsViewsChart({ selectedDuration, buttonsViews = [] }) {
    // Ensure buttonsViews is always an array
    const safeButtonsViews = Array.isArray(buttonsViews) ? buttonsViews : [];

    // Colors for each button (left square & bar fill)
    const barColors = generateShades("#74B574", safeButtonsViews.length || 1);

    // Custom Legend
    const CustomLegend = ({ data }) => {
        if (!data || !data.length) return null;
        return (
            <div className="flex flex-wrap gap-4 mt-4">
                {data.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center gap-2">
                        <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: barColors[index % barColors.length] }}
                        ></span>
                        <span className="text-sm font-medium text-gray-700 font-['Arial']">
                            {entry.button_text || "N/A"}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    // Custom left label
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

    // Custom right label
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

    return (
        <div className="p-4 rounded-xl bg-white flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-2">
                <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                    Overview hotel info site views
                </h5>
                <p className="text-xs text-[#544854]">
                    Description of this graph can land here
                </p>
            </div>

            {/* Chart */}
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%" id="buttonsChart">
                    <BarChart
                        layout="vertical"
                        data={safeButtonsViews}
                        margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                        barCategoryGap={34}
                    >
                        <XAxis hide type="number" />
                        <YAxis type="category" dataKey="button_text" hide />

                        <Tooltip
                            formatter={(value) => [`${value}%`, "Percentage"]}
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
                                    fill={barColors[props.index % barColors.length]}
                                    rx={2}
                                />
                            )}
                        >
                            <LabelList dataKey="button_text" content={<CustomLeftLabel />} />
                            <LabelList dataKey="total_views" content={<CustomRightLabel />} />
                        </Bar>

                        {safeButtonsViews.length > 0 && (
                            <Legend
                                verticalAlign="bottom"
                                align="left"
                                content={<CustomLegend data={safeButtonsViews} />}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
