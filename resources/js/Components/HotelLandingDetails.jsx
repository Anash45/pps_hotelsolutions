import { PageContext } from "@/context/PageProvider";
import { usePage } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import HotelLandingButtons from "./HotelLandingButtons";
import { useLang } from "@/context/TranslationProvider";
import AutoTranslate from "./AutoTranslate";

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        return format(parseISO(dateStr), "dd.MM.yyyy");
    } catch {
        return dateStr;
    }
}

const HotelLandingDetails = () => {
    const { codeDetails } = usePage().props;
    const { brandingFormData } = useContext(PageContext);
    const { t } = useLang("Components.HotelLandingDetails");

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
                        <span className="text-base font-medium">
                            <AutoTranslate text={`Guest Name`} />
                        </span>
                        <span className="text-base font-medium ml-auto">
                            <AutoTranslate text={`Room 312`} />
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-base font-medium">
                            {keyDetails?.title} {keyDetails?.first_name}{" "}
                            {keyDetails?.last_name}
                        </span>

                        {keyDetails?.room_number && (
                            <span className="text-base font-medium ml-auto">
                                <AutoTranslate text={`Room`} /> {keyDetails?.room_number}
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
                        className="max-h-32 max-w-48 h-auto w-auto object-contain object-center mx-auto"
                    />
                ) : (
                    <img
                        src={`/images/building-placeholder.webp`}
                        alt="Hotel"
                        className="max-h-32 max-w-48 h-auto w-auto object-contain object-center mx-auto"
                    />
                )}

                <div className="flex flex-col">
                    <p className="text-2xl font-semibold">
                        {brandingFormData.heading ?? <AutoTranslate text={`Hotel Name`} />}
                    </p>

                    {keyDetails?.stay_from && keyDetails?.stay_till ? (
                        <span className="text-sm font-montserrat">
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

                {brandingFormData.sub_heading && (
                    <p className="text-lg text-center">
                        <AutoTranslate text={brandingFormData.sub_heading} />
                    </p>
                )}
            </div>

            {brandingFormData.banner_image_url ? (
                <img
                    src={`${brandingFormData.banner_image_url}`}
                    alt="Hotel"
                    className="max-h-[150px] h-auto w-full rounded-[12px] object-cover object-center border mx-auto"
                />
            ) : (
                <img
                    src={`/images/building-placeholder.webp`}
                    alt="Hotel"
                    className="h-[132px] w-full rounded-[12px] object-cover object-center border mx-auto"
                />
            )}

            <HotelLandingButtons
                codeDetails={codeDetails}
                brandingFormData={brandingFormData}
            />
        </div>
    );
};

export default HotelLandingDetails;
