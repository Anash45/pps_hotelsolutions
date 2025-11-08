import { useLang } from "@/context/TranslationProvider";
import { useContext, useEffect } from "react";
import ColorInput from "./ColorInput";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { PageContext } from "@/context/PageProvider";
import BrandingImageUploader from "./BrandingImagesUploader";
import Divider from "./Divider";
import Textarea from "./Textarea";
import { usePage } from "@inertiajs/react";
import HotelBrandingButtons from "./HotelBrandingButtons";
import HotelBrandingPages from "./HotelBrandingPages";
import { mapHotelToBrandingFormData } from "@/utils/mapHotelToBrandingFormData";

export default function HotelBrandingForm({ formErrors }) {
    const { t } = useLang("Components.HotelBrandingForm");
    const { auth, selectedHotel = null, flash } = usePage().props;
    const { brandingFormData, handleBrandingChange, setBrandingFormData } =
        useContext(PageContext);

    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData(mapHotelToBrandingFormData(selectedHotel));
        }
    }, [selectedHotel]);

    return (
        <div className="py-4 md:px-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-3 xl:order-1 order-2">
            {/* Branding Section */}
            <div className="flex flex-col gap-1">
                <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                    {t("brandingTitle")}
                </h5>
                <p className="text-xs text-[#544854]">
                    {t("brandingDescription")}
                </p>
            </div>

            {Object.keys(formErrors).length > 0 && (
                <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                    <p className="font-bold mb-2">{t("fixErrorsMessage")}</p>
                    <ul className="list-disc list-inside space-y-1">
                        {Object.entries(formErrors).map(
                            ([field, messages], idx) => (
                                <li key={idx}>{messages.join(", ")}</li>
                            )
                        )}
                    </ul>
                </div>
            )}

            <div className="space-y-3">
                {/* Heading */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="heading"
                        value={t("headingUnderLogo")}
                        className="text-[#475569] text-xs font-medium"
                    />
                    <TextInput
                        id="heading"
                        name="heading"
                        type="text"
                        value={brandingFormData.heading}
                        onChange={handleBrandingChange}
                        className="block w-full"
                        placeholder={t("headingUnderLogo")}
                        required
                    />
                </div>

                {/* Sub Heading */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="sub_heading"
                        value={t("subHeadingUnderHeading")}
                        className="text-[#475569] text-xs font-medium"
                    />
                    <TextInput
                        id="sub_heading"
                        name="sub_heading"
                        type="text"
                        value={brandingFormData.sub_heading}
                        onChange={handleBrandingChange}
                        className="block w-full"
                        placeholder={t("subHeadingUnderHeading")}
                        required
                    />
                </div>

                {/* Colors */}
                <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="primary_color"
                            value={t("primaryColorButtons")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="primary_color"
                            name="primary_color"
                            type="text"
                            value={brandingFormData.primary_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("primaryColorButtons")}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="background_color"
                            value={t("backgroundColorPage")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="background_color"
                            name="background_color"
                            type="text"
                            value={brandingFormData.background_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("backgroundColorPage")}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="text_color"
                            value={t("textColorMainText")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="text_color"
                            name="text_color"
                            type="text"
                            value={brandingFormData.text_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("textColorMainText")}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="button_text_color"
                            value={t("buttonTextColor")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="button_text_color"
                            name="button_text_color"
                            type="text"
                            value={brandingFormData.button_text_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("buttonTextColor")}
                            required
                        />
                    </div>
                </div>

                {/* Upload Images */}
                <div className="space-y-3">
                    <div className="space-y-1">
                        <InputLabel
                            value={t("uploadLogo")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <BrandingImageUploader
                            name="logo_image"
                            value={
                                brandingFormData.logo_image ??
                                brandingFormData.logo_image_url
                            }
                            onChange={handleBrandingChange}
                            label={t("uploadLogo")}
                        />
                    </div>

                    <div className="space-y-1">
                        <InputLabel
                            value={t("uploadBanner")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <BrandingImageUploader
                            name="banner_image"
                            value={
                                brandingFormData.banner_image ??
                                brandingFormData.banner_image_url
                            }
                            onChange={handleBrandingChange}
                            label={t("uploadBanner")}
                        />
                    </div>
                </div>

                <Divider />
                <HotelBrandingButtons />
                <Divider />
                <HotelBrandingPages />
                <Divider />

                {/* Keyfinder Page */}
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        {t("keyfinderPageTitle")}
                    </h5>
                    <p className="text-xs text-[#544854]">
                        {t("keyfinderWhatsAppText")}
                    </p>
                </div>

                <div className="space-y-1">
                    <InputLabel
                        htmlFor="keyfinder_heading"
                        value={t("keyfinderPageHeading")}
                        className="text-[#475569] text-xs font-medium"
                    />
                    <TextInput
                        id="keyfinder_heading"
                        name="keyfinder_heading"
                        type="text"
                        value={brandingFormData.keyfinder_heading}
                        onChange={handleBrandingChange}
                        className="block w-full"
                        placeholder={t("keyfinderPageHeading")}
                        required
                    />
                </div>

                <div className="space-y-1">
                    <Textarea
                        id="key_finder_page_text"
                        name="key_finder_page_text"
                        type="text"
                        rows={5}
                        value={brandingFormData.key_finder_page_text}
                        onChange={handleBrandingChange}
                        className="block w-full"
                        placeholder={t("keyfinderPageTextPlaceholder")}
                        required
                    />
                </div>

                {/* Keyfinder Preview */}
                <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="primary_color"
                            value={t("telephonePreviewReadOnly")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <TextInput
                            id="key_finder_page_text"
                            name="key_finder_page_text"
                            type="text"
                            defaultValue={"+49 170 1234567"}
                            className="block w-full"
                            placeholder={"+49 170 1234567"}
                            readOnly
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="button_text_color"
                            value={t("colorsPreview")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="page_text_color"
                            name="page_text_color"
                            value={brandingFormData.page_text_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("colorPlaceholder")}
                            required
                        />
                    </div>
                </div>

                <div className="py-2">
                    <Divider />
                </div>

                {/* Keyfinder Bottom Section */}
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        {t("keyfinderBottomSectionTitle")}
                    </h5>
                    <p className="text-xs text-[#544854]">
                        {t("keyfinderBottomSectionDescription")}
                    </p>
                </div>

                <div className="space-y-1">
                    <InputLabel
                        htmlFor="key_finder_bottom_heading"
                        value={t("sectionHeading")}
                        className="text-[#475569] text-xs font-medium"
                    />
                    <TextInput
                        id="key_finder_bottom_heading"
                        name="key_finder_bottom_heading"
                        type="text"
                        value={brandingFormData.key_finder_bottom_heading}
                        onChange={handleBrandingChange}
                        className="block w-full"
                        placeholder=""
                        required
                    />
                </div>

                <div className="space-y-1">
                    <InputLabel
                        htmlFor="key_finder_bottom_description"
                        value={t("sectionDescription")}
                        className="text-[#475569] text-xs font-medium"
                    />
                    <Textarea
                        id="key_finder_bottom_description"
                        name="key_finder_bottom_description"
                        type="text"
                        rows={5}
                        value={brandingFormData.key_finder_bottom_description}
                        onChange={handleBrandingChange}
                        className="block w-full"
                        placeholder=""
                        required
                    />
                </div>

                <div className="space-y-1">
                    <InputLabel
                        value={t("uploadSectionBanner")}
                        className="text-[#475569] text-xs font-medium"
                    />
                    <BrandingImageUploader
                        name="section_banner_image"
                        value={
                            brandingFormData.section_banner_image ??
                            brandingFormData.section_banner_image_url
                        }
                        onChange={handleBrandingChange}
                        label={t("uploadSectionBanner")}
                    />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="key_finder_bottom_btn_text"
                            value={t("nextBookingButtonText")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <TextInput
                            id="key_finder_bottom_btn_text"
                            name="key_finder_bottom_btn_text"
                            type="text"
                            value={brandingFormData.key_finder_bottom_btn_text}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("keyfinderBottomButtonTextExample")}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="key_finder_bottom_btn_url"
                            value={t("nextBookingButtonUrl")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <TextInput
                            id="key_finder_bottom_btn_url"
                            name="key_finder_bottom_btn_url"
                            type="text"
                            value={brandingFormData.key_finder_bottom_btn_url}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("keyfinderBottomButtonUrlExample")}
                            required
                        />
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="key_finder_bottom_btn_text_color"
                            value={t("sectionButtonTextColor")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="key_finder_bottom_btn_text_color"
                            name="key_finder_bottom_btn_text_color"
                            value={
                                brandingFormData?.key_finder_bottom_btn_text_color ??
                                brandingFormData.button_text_color
                            }
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("colorPlaceholder")}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="key_finder_bottom_btn_bg_color"
                            value={t("sectionButtonBgColor")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="key_finder_bottom_btn_bg_color"
                            name="key_finder_bottom_btn_bg_color"
                            value={
                                brandingFormData?.key_finder_bottom_btn_bg_color ??
                                brandingFormData.primary_color
                            }
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder={t("colorPlaceholder")}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
