import { useLang } from "@/context/TranslationProvider";
import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import { Download, Eye, Trash2 } from "lucide-react";

export default function CodeGroupsPreview({
    previewGroups,
    domain,
    setPreviewCodes,
}) {
    const { t } = useLang("Components.codeGroupsPreview");

    function handlePreviewCodes(
        codes = [],
        hotel_name = "",
        key_type_name = ""
    ) {
        if (!Array.isArray(codes) || codes.length === 0) {
            console.warn("No codes to preview");
            return;
        }

        const updatedCodes = codes.map((code) => ({
            ...code,
            hotel_name,
            key_type_name,
        }));

        setPreviewCodes(updatedCodes);
    }

    return (
        <div>
            <div className="overflow-auto w-full max-h-[730px]">
                <div className="xl:w-max min-w-full space-y-3">
                    {/* Header */}
                    <div className="hidden lg:flex border-b gap-4 border-gray-200 pb-2 px-4 text-xs font-semibold text-[#263238]">
                        <div className="w-28 shrink-0">{t("createdAt")}</div>
                        <div className="flex-1 min-w-[120px] shrink-0">
                            {t("hotel")}
                        </div>
                        <div className="w-24 shrink-0">{t("type")}</div>
                        <div className="w-14">{t("number")}</div>
                        <div className="w-16 text-center shrink-0">
                            {t("action")}
                        </div>
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
                                        {t("createdAt")}:{" "}
                                    </span>
                                    <span className="text-xs text-body">
                                        {dayjs(cg.created_at).format(
                                            "DD.MM.YYYY, HH:mm"
                                        )}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-[120px] shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        {t("hotel")}:{" "}
                                    </span>
                                    <span className="text-xs text-body">
                                        {cg.hotel.hotel_name}
                                    </span>
                                </div>
                                <div className="lg:w-24 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        {t("type")}:{" "}
                                    </span>
                                    <span className="text-xs text-body">
                                        {cg.key_type.display_name}
                                    </span>
                                </div>
                                <div className="lg:w-14 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        {t("number")}:{" "}
                                    </span>
                                    <span className="text-xs text-body">
                                        {cg.count}
                                    </span>
                                </div>
                                <div className="lg:w-16 flex items-center gap-2 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        {t("action")}:{" "}
                                    </span>
                                    <span className="text-xs text-blue-500 flex gap-1">
                                        <button
                                            className="text-center"
                                            onClick={() =>
                                                handlePreviewCodes(
                                                    cg?.codes ?? [],
                                                    cg?.hotel?.hotel_name ?? "",
                                                    cg?.key_type?.name ?? ""
                                                )
                                            }
                                        >
                                            <Eye
                                                size={16}
                                                className="text-body mx-auto"
                                                strokeWidth={2}
                                            />
                                        </button>
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
                                            onClick={() =>
                                                confirm(t("confirmDelete"))
                                            }
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
