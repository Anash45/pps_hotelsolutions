import { PageContext } from "@/context/PageProvider";
import { Link } from "@inertiajs/react";
import { useContext } from "react";

const GuestBox = ({
    realPhone = false,
    noBranding = false,
    defaultView = false,
    children,
    showNextBox = false,
}) => {
    console.log(defaultView, noBranding);
    const { brandingFormData } = useContext(PageContext);
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
                style={{
                    backgroundColor: `${
                        noBranding || defaultView
                            ? "#ffffff"
                            : brandingFormData?.background_color ?? "#ffffff"
                    }`,
                }}
            >
                {children}
            </div>
            {showNextBox && (
                <div
                    className={`p-3 max-w-[430px] mx-auto w-full rounded-xl space-y-3 relative mt-auto ${
                        realPhone ? "scale-[1]" : "scale-[0.9]"
                    } origin-top`}
                    style={{
                        backgroundColor: `${
                            brandingFormData?.background_color ?? "#ffffff"
                        }`,
                    }}
                >
                    {(brandingFormData.key_finder_bottom_heading ||
                        brandingFormData.key_finder_bottom_description) && (
                        <div>
                            {brandingFormData.key_finder_bottom_heading && (
                                <h4 className="text-[#161616] text-[22px] font-semibold">
                                    {brandingFormData.key_finder_bottom_heading}
                                </h4>
                            )}

                            {brandingFormData.key_finder_bottom_description && (
                                <p
                                    className="text-base leading-tight"
                                    dangerouslySetInnerHTML={{
                                        __html: brandingFormData.key_finder_bottom_description,
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <div className="relative rounded-lg overflow-hidden h-[100px]">
                        <img
                            src={`${
                                brandingFormData?.section_banner_image_url ??
                                "/images/building-placeholder.webp"
                            }`}
                            alt="Next"
                            className="w-full bg-white relative h-full object-cover"
                        />
                        <a
                            href={
                                brandingFormData?.key_finder_bottom_btn_url ??
                                "#"
                            }
                            className={`block px-4 py-1.5 rounded-lg border font-medium text-base absolute bottom-2 right-2 w-fit`}
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
                            {brandingFormData?.key_finder_bottom_btn_text ??
                                "Enter button text"}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
export default GuestBox;
