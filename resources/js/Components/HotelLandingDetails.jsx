import { PageContext } from "@/context/PageProvider";
import { Link, usePage } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import HotelLandingButtons from "./HotelLandingButtons";

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        return format(parseISO(dateStr), "dd.MM.yyyy");
    } catch {
        return dateStr;
    }
}

const HotelLandingDetails = ({}) => {
    const { codeDetails } = usePage().props;
    const { brandingFormData } = useContext(PageContext);

    // ✅ Extract key_assignment into keyDetails (fallback empty object)
    const keyDetails = codeDetails?.key_assignment ?? {};

    return (
        <div
            className="space-y-4"
            style={{ color: `${brandingFormData?.text_color ?? "#020617"}` }}
        >
            <div className="flex justify-between gap-3 flex-wrap">
                {!brandingFormData.user_view ||
                brandingFormData.user_view === false ? (
                    <>
                        <span className="text-sm font-medium">Guest Name</span>
                        <span className="text-xs">Zimmer 312</span>
                    </>
                ) : (
                    <>
                        {keyDetails?.first_name || keyDetails?.last_name && (
                            <span className="text-sm font-medium">
                                {keyDetails?.first_name} {keyDetails?.last_name}
                            </span>
                        )}
                        {keyDetails?.room_number && (
                            <span className="text-xs">
                                Zimmer {keyDetails?.room_number}
                            </span>
                        )}
                    </>
                )}
            </div>
            <div className="space-y-3 text-center">
                {brandingFormData.logo_image_url ? (
                    <img
                        src={`${brandingFormData.logo_image_url}`}
                        alt="Hotel"
                        className="max-h-24 max-w-36 h-auto w-auto object-contain object-center mx-auto"
                    />
                ) : (
                    <img
                        src={`/images/building-placeholder.webp`}
                        alt="Hotel"
                        className="max-h-24 max-w-36 h-auto w-auto object-contain object-center mx-auto"
                    />
                )}
                <div className="flex flex-col">
                    <p className="text-2xl">
                        {brandingFormData.heading ?? "Hotel Name"}
                    </p>
                    {keyDetails?.stay_from && keyDetails?.stay_till ? (
                        <span className="text-xs font-montserrat">
                            {keyDetails?.stay_from
                                ? formatDate(keyDetails?.stay_from)
                                : ""}{" "}
                            -{" "}
                            {keyDetails?.stay_till
                                ? formatDate(keyDetails?.stay_till)
                                : ""}
                        </span>
                    ) : null}
                </div>
            </div>
            {brandingFormData.banner_image_url ? (
                <img
                    src={`${brandingFormData.banner_image_url}`}
                    alt="Hotel"
                    className="h-[150px] w-full rounded-[12px] object-cover object-center border mx-auto"
                />
            ) : (
                <img
                    src={`/images/building-placeholder.webp`}
                    alt="Hotel"
                    className="h-[132px] w-full rounded-[12px] object-cover object-center border mx-auto"
                />
            )}
            <HotelLandingButtons brandingFormData={brandingFormData} />
        </div>
    );
};
export default HotelLandingDetails;
