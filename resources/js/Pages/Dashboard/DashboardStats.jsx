export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-[20px] stat-box">
                <div className="flex flex-col gap-2 text-[#242424]">
                    <span className="text-sm font-manrope font-medium leading-tight">Site view today</span>
                    <h4 className="text-3xl font-bold">658.74</h4>
                </div>
            </div>
            <div className="bg-white p-4 rounded-[20px] stat-box">
                <div className="flex flex-col gap-2 text-[#242424]">
                    <span className="text-sm font-manrope font-medium leading-tight">Unique Site view today</span>
                    <h4 className="text-3xl font-bold">658.74</h4>
                </div>
            </div>
            <div className="bg-white p-4 rounded-[20px] stat-box">
                <div className="flex flex-col gap-2 text-[#242424]">
                    <span className="text-sm font-manrope font-medium leading-tight">TBD</span>
                    <h4 className="text-3xl font-bold">658.74</h4>
                </div>
            </div>
            <div className="bg-white p-4 rounded-[20px] stat-box">
                <div className="flex flex-col gap-2 text-[#242424]">
                    <span className="text-sm font-manrope font-medium leading-tight">TBD</span>
                    <h4 className="text-3xl font-bold">658.74</h4>
                </div>
            </div>
        </div>
    );
}
