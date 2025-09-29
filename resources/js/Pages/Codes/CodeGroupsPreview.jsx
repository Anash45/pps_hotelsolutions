import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import { Download, Trash2 } from "lucide-react";

export default function CodeGroupsPreview({ previewGroups, domain }) {
    return (
        <div>
            <h3 className="text-grey900 font-semibold text-lg mb-3">
                Preview: generated URLs
            </h3>
            <div className="overflow-auto w-full max-h-[730px]">
                <div className="xl:w-max min-w-full space-y-3">
                    {/* Header */}
                    <div className="hidden lg:flex border-b gap-4 border-gray-200 pb-2 px-4 text-xs font-semibold text-[#263238]">
                        <div className="w-28 shrink-0">Created at</div>
                        <div className="flex-1 min-w-[120px] shrink-0">
                            Hotel
                        </div>
                        <div className="w-24 shrink-0">Type</div>
                        <div className="w-14">Number</div>
                        <div className="w-10 text-center shrink-0">Action</div>
                    </div>

                    {/* Rows */}
                    {previewGroups.map((cg, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-400 rounded-lg py-2 px-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 transition"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:flex-1 lg:gap-4 w-full">
                                <div className="lg:w-28 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        Created at:{" "}
                                    </span>
                                    <span className="text-xs text-body">
                                        <span>
                                            {dayjs(cg.created_at).format(
                                                "DD.MM.YYYY, HH:mm"
                                            )}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex-1 min-w-[120px] shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        Hotel:{" "}
                                    </span>
                                    <span className="text-xs text-body">
                                        <span>{cg.hotel.hotel_name}</span>
                                    </span>
                                </div>
                                <div className="lg:w-24 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        Type:{" "}
                                    </span>
                                    <span className="text-xs text-body">
                                        <span>{cg.key_type.display_name}</span>
                                    </span>
                                </div>
                                <div className="lg:w-14 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        Number:{" "}
                                    </span>
                                    <span className="text-xs text-body">
                                        <span>{cg.count}</span>
                                    </span>
                                </div>
                                <div className="lg:w-10 flex items-center gap-2 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        Action:{" "}
                                    </span>
                                    <span className="text-xs text-body flex gap-1">
                                        <a
                                            target="_blank"
                                            href={route(
                                                "codes.group.download",
                                                cg.id
                                            )}
                                            className="text-center"
                                        >
                                            <Download
                                                size={16}
                                                className="text-body mx-auto"
                                                strokeWidth={2}
                                            />
                                        </a>
                                        <a
                                            onClick={() => confirm('Are you sure? It will only be deleted if there are no key assignments')}
                                            href={route(
                                                "codes.group.delete",
                                                cg.id
                                            )}
                                            className="text-center"
                                        >
                                            <Trash2
                                                size={16}
                                                className="text-red-600 mx-auto"
                                                strokeWidth={2}
                                            />
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
