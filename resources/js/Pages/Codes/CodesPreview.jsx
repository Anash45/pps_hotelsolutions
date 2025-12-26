import { Link } from "@inertiajs/react";
import dayjs from "dayjs";
import { useLang } from "@/context/TranslationProvider";

export default function CodesPreview({ previewCodes, domain }) {
    const { t } = useLang("Components.codesPreview");

    return (
        <div>
            <h3 className="text-grey900 font-semibold text-lg mb-3">
                {t("previewGeneratedUrls")}
            </h3>
            <div className="overflow-auto w-full max-h-[400px]">
                <div className="xl:w-max min-w-full space-y-3">
                    {/* Header */}
                    <div className="hidden lg:flex border-b gap-4 border-gray-200 pb-2 px-4 text-xs font-semibold text-[#263238]">
                        <div className="w-32 shrink-0">{t("hotel")}</div>
                        <div className="flex-1 min-w-[180px] shrink-0">
                            {t("url")}
                        </div>
                        <div className="w-24 shrink-0">{t("type")}</div>
                        <div className="w-28 shrink-0">{t("createdAt")}</div>
                    </div>

                    {/* Rows */}
                    {previewCodes.map((c, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-400 rounded-lg py-2 px-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 transition"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:flex-1 lg:gap-4">
                                <div className="lg:w-32 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        {t("hotel")}:
                                    </span>
                                    <span className="text-xs text-body">
                                        {c.hotel_name}
                                    </span>
                                </div>
                                <div className="lg:flex-1 min-w-[180px] shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        {t("code")}:
                                    </span>
                                    <span className="text-xs text-body">
                                        <Link
                                            href={`${domain}/key/${c.code}`}
                                            className="underline break-all"
                                        >
                                            {domain}/key/{c.code}
                                        </Link>
                                    </span>
                                </div>
                                <div className="lg:w-24 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        {t("type")}:
                                    </span>
                                    <span className="text-xs text-body">
                                        {c.key_type_name}
                                    </span>
                                </div>
                                <div className="lg:w-28 shrink-0">
                                    <span className="lg:hidden text-[10px] text-gray-500">
                                        {t("createdAt")}:
                                    </span>
                                    <span className="text-xs text-body">
                                        {dayjs(c.generated_at).format(
                                            "DD.MM.YYYY, HH:mm"
                                        )}
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
