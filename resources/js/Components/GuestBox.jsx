import { PageContext } from "@/context/PageProvider";
import { useContext } from "react";
import { useLang } from "@/context/TranslationProvider";
import { Link } from "@inertiajs/react";

const GuestBox = ({
    realPhone = false,
    noBranding = false,
    defaultView = false,
    children,
    showNextBox = false,
}) => {
    const { t } = useLang("Components.GuestBox"); // 🔥 translations for this component
    const { brandingFormData } = useContext(PageContext);

    const bgColor =
        noBranding || defaultView
            ? "#ffffff"
            : brandingFormData?.background_color ?? "#ffffff";

    const bottomHeading =
        brandingFormData?.key_finder_bottom_heading ?? t("defaultHeading");
    const bottomDescription =
        brandingFormData?.key_finder_bottom_description ??
        t("defaultDescription");
    const bottomBtnText =
        brandingFormData?.key_finder_bottom_btn_text ?? t("defaultButtonText");

    return (
        <div
            className={`${
                realPhone ? "pt-4 px-4" : "pt-20"
            } pb-4 max-h-full overflow-y-auto scrollbar-hidden min-h-screen h-full flex flex-col justify-between gap-8`}
        >
            <div
                className={`rounded-2xl p-3 guest-box ${
                    realPhone ? "scale-[1]" : "scale-[0.9]"
                } origin-top max-w-[430px] w-full mx-auto`}
                style={{ backgroundColor: bgColor }}
            >
                {children}
            </div>

            {showNextBox && (
                <div
                    className={`p-3 max-w-[430px] mx-auto w-full rounded-xl space-y-3 relative mt-auto ${
                        realPhone ? "scale-[1]" : "scale-[0.9]"
                    } origin-top`}
                    style={{ backgroundColor: bgColor }}
                >
                    {(bottomHeading || bottomDescription) && (
                        <div>
                            {bottomHeading && (
                                <h4 className="text-[#161616] text-[22px] font-semibold">
                                    {bottomHeading}
                                </h4>
                            )}

                            {bottomDescription && (
                                <p
                                    className="text-base leading-tight"
                                    dangerouslySetInnerHTML={{
                                        __html: bottomDescription,
                                    }}
                                />
                            )}
                        </div>
                    )}

                    <div className="relative rounded-lg overflow-hidden h-[100px]">
                        <img
                            src={
                                brandingFormData?.section_banner_image_url ??
                                "/images/building-placeholder.webp"
                            }
                            alt={t("sectionBannerAlt")}
                            className="w-full bg-white relative h-full object-cover"
                        />

                        <a
                            href={
                                brandingFormData?.key_finder_bottom_btn_url ??
                                "#"
                            }
                            className="block px-4 py-1.5 rounded-lg border font-medium text-base absolute bottom-2 right-2 w-fit"
                            style={{
                                color:
                                    brandingFormData?.key_finder_bottom_btn_text_color ??
                                    brandingFormData.button_text_color,
                                backgroundColor:
                                    brandingFormData?.key_finder_bottom_btn_bg_color ??
                                    brandingFormData.primary_color,
                                borderColor:
                                    brandingFormData?.key_finder_bottom_btn_bg_color ??
                                    brandingFormData.primary_color,
                            }}
                        >
                            {bottomBtnText}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuestBox;
