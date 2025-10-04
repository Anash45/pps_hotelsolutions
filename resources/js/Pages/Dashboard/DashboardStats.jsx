export default function DashboardStats({ dashboardStats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-[20px] stat-box">
                <div className="flex flex-col gap-2 text-[#242424]">
                    <span className="text-sm font-manrope font-medium leading-tight">
                        Site view today
                    </span>
                    <h4 className="text-3xl font-bold">
                        {dashboardStats?.hotel_views?.total_views ?? 0}
                    </h4>
                </div>
            </div>
            <div className="bg-white p-4 rounded-[20px] stat-box">
                <div className="flex flex-col gap-2 text-[#242424]">
                    <span className="text-sm font-manrope font-medium leading-tight">
                        Unique Site view today
                    </span>
                    <h4 className="text-3xl font-bold">
                        {dashboardStats?.hotel_views?.unique_views ?? 0}
                    </h4>
                </div>
            </div>
            <div className="bg-white p-4 rounded-[20px] stat-box">
                <div className="flex flex-col gap-2 text-[#242424]">
                    <span className="text-sm font-manrope font-medium leading-tight">
                        Total Keys
                    </span>
                    <h4 className="text-3xl font-bold">
                        {dashboardStats?.codes?.total_keys ?? 0}
                    </h4>
                </div>
            </div>
            <div className="bg-white p-4 rounded-[20px] stat-box">
                <div className="flex flex-col gap-2 text-[#242424]">
                    <span className="text-sm font-manrope font-medium leading-tight">
                        Active Keys
                    </span>
                    <h4 className="text-3xl font-bold">
                        {dashboardStats?.codes?.active_keys ?? 0}
                    </h4>
                </div>
            </div>
        </div>
    );
}
