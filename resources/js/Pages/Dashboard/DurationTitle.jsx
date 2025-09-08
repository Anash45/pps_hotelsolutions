export default function DashboardTitle({
    durations,
    selectedDuration,
    setSelectedDuration,
}) {
    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            <h5 className="font-bold text-xl text-grey900">Dashboard</h5>
            <div className="flex items-center p-1 rounded-lg text-sm font-medium bg-[#F1F5F9]">
                {durations.map((duration, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1.5 rounded-lg ${
                            selectedDuration == duration
                                ? "bg-[#85AF84] text-white"
                                : ""
                        }`}
                        onClick={() => {
                            setSelectedDuration(duration);
                        }}
                    >
                        {duration}
                    </button>
                ))}
            </div>
        </div>
    );
}
