import { PageContext } from "@/context/PageProvider";
import { Link } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import { getIcon } from "@/data/iconMap";

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        return format(parseISO(dateStr), "dd.MM.yyyy");
    } catch {
        return dateStr;
    }
}

const HotelLandingDetails = ({}) => {
    const { brandingFormData } = useContext(PageContext);
    const keyDetails = {};

    return (
        <div
            className="space-y-4"
            style={{ color: `${brandingFormData?.text_color ?? '#020617'}` }}
        >
            <div className="flex justify-between gap-3 flex-wrap">
                <span className="text-sm font-medium">Max Mustermann</span>
                <span className="text-xs">Zimmer 312</span>
            </div>
            <div className="space-y-3 text-center">
                {brandingFormData.logo_image_url ? (
                    <img
                        src={`${brandingFormData.logo_image_url}`}
                        alt="Hotel"
                        className="h-16 w-16 rounded-[10px] object-contain object-center border border-[#c0c0c0] mx-auto"
                    />
                ) : (
                    <img
                        src={`/images/building-placeholder.webp`}
                        alt="Hotel"
                        className="h-16 w-16 rounded-[10px] object-contain object-center border border-[#c0c0c0] mx-auto"
                    />
                )}
                <div className="flex flex-col">
                    <p className="text-2xl">
                        {brandingFormData.heading ?? "Hotel Name"}
                    </p>
                    <span className="text-xs font-montserrat">
                        {keyDetails?.stay_from
                            ? formatDate(keyDetails?.stay_from)
                            : "22.12.2025"}{" "}
                        -{" "}
                        {keyDetails?.stay_till
                            ? formatDate(keyDetails?.stay_till)
                            : "22.12.2025"}
                    </span>
                </div>
            </div>
            {brandingFormData.banner_image_url ? (
                <img
                    src={`${brandingFormData.banner_image_url}`}
                    alt="Hotel"
                    className="h-[132px] w-full rounded-[12px] object-cover object-center border mx-auto"
                />
            ) : (
                <img
                    src={`/images/building-placeholder.webp`}
                    alt="Hotel"
                    className="h-[132px] w-full rounded-[12px] object-cover object-center border mx-auto"
                />
            )}
            <div className="space-y-2">
                {brandingFormData?.buttons.map((button, idx) => {
                    const Icon = getIcon(button.icon);

                    return (
                        <Link
                            key={idx}
                            className={`block w-full px-4 py-3 rounded-xl border text-sm hotel-button`}
                            style={{
                                color: `${
                                    button.text_color ??
                                    brandingFormData.button_text_color
                                }`,
                                backgroundColor: `${
                                    button.background_color ??
                                    brandingFormData.primary_color
                                }`,
                                borderColor: `${
                                    button.background_color ??
                                    brandingFormData.primary_color
                                }`,
                            }}
                            href={button.url}
                        >
                            <div className="flex justify-start items-center gap-2">
                                {Icon ? <Icon size={18} /> : <span></span>}
                                <span>{button.title}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
export default HotelLandingDetails;
