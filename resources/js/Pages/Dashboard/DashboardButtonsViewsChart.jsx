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
import { getButtonDataByDuration } from "@/utils/dummyButtonView";

export default function DashboardButtonsViewsChart({ selectedDuration }) {
    const chartData = getButtonDataByDuration(selectedDuration);

    // Colors for each button (left square & bar fill)
    const barColors = ["#A6DBA5", "#8CC78C", "#74B574", "#649D64", "#5D8C5C"];

    const CustomLegend = ({ data }) => {
    return (
        <div className="flex flex-wrap gap-4 mt-4">
            {data.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-2">
                    <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: barColors[index % barColors.length] }}
                    ></span>
                    <span className="text-sm font-medium text-gray-700 font-['Arial']">
                        {entry.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

    // Custom label for left side (button name with colored square)
    const CustomLeftLabel = (props) => {
        const { y, width, index } = props;
        return (
            <g transform={`translate(0, ${y - 5})`}>
                {/* Button name */}
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
                    {chartData[index].name}
                </text>
            </g>
        );
    };

    // Custom label for right side (percentage)
    const CustomRightLabel = (props) => {
        const { x, y, width, value } = props;
        return (
            <text
                x={x + width + 10} // offset to the far right
                y={y + 6}
                fill="#334155"
                fontSize={12}
                fontFamily="Arial"
                textAnchor="start"
                alignmentBaseline="middle"
            >
                {value}%
            </text>
        );
    };

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
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    id={"buttonsChart"}
                >
                    <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                        barCategoryGap={34} // gap between bars
                    >
                        <XAxis hide type="number" />

                        <YAxis type="category" dataKey="name" hide />

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
                            dataKey="percentage"
                            isAnimationActive={false}
                            barSize={12}
                            fill="#A6DBA5"
                            cursor="default" // disables hover highlight
                            shape={(props) => {
                                const index = props.index;
                                return (
                                    <rect
                                        x={props.x}
                                        y={props.y}
                                        width={props.width}
                                        height={props.height}
                                        fill={
                                            barColors[index % barColors.length]
                                        }
                                        rx={2}
                                    />
                                );
                            }}
                        >
                            {/* Custom left labels */}
                            <LabelList
                                dataKey="name"
                                content={<CustomLeftLabel />}
                            />
                            {/* Custom right labels */}
                            <LabelList
                                dataKey="percentage"
                                content={<CustomRightLabel />}
                            />
                        </Bar>

                        {/* Custom Legend */}
                        <Legend
                            verticalAlign="bottom"
                            align="left"
                            content={<CustomLegend data={chartData} />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
