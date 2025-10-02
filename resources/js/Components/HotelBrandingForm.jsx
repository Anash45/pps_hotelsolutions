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

export default function HotelBrandingForm() {
    const { auth, selectedHotel = null } = usePage().props;
    const { brandingFormData, handleBrandingChange, setBrandingFormData } =
        useContext(PageContext);
    console.log("Form Data: ", brandingFormData);

    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData(
                mapHotelToBrandingFormData(selectedHotel)
            );
        }
    }, [selectedHotel]);

    return (
        <div className="py-4 md:px-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-3 xl:order-1 order-2">
            <div className="flex flex-col gap-1">
                <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                    Branding
                </h5>
                <p className="text-xs text-[#544854]">
                    Description of this graph can land here
                </p>
            </div>
            <div className="space-y-3">
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="heading"
                        value="Heading (under logo)"
                        className="text-[#475569] text-xs font-medium"
                    />
                    <TextInput
                        id="heading"
                        name="heading"
                        type="text"
                        value={brandingFormData.heading}
                        onChange={handleBrandingChange}
                        className="block w-full"
                        placeholder="Heading (under logo)"
                        required
                    />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="primary_color"
                            value="Primary color (buttons)"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="primary_color"
                            name="primary_color"
                            type="text"
                            value={brandingFormData.primary_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder="Heading (under logo)"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="background_color"
                            value="Background color (page)"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="background_color"
                            name="background_color"
                            type="text"
                            value={brandingFormData.background_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder="Heading (under logo)"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="text_color"
                            value="Text color (main text)"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="text_color"
                            name="text_color"
                            type="text"
                            value={brandingFormData.text_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder="Heading (under logo)"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="button_text_color"
                            value="Button text color"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="button_text_color"
                            name="button_text_color"
                            type="text"
                            value={brandingFormData.button_text_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder="Heading (under logo)"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="space-y-1">
                        <InputLabel
                            value="Upload logo"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <BrandingImageUploader
                            name="logo_image"
                            value={
                                brandingFormData.logo_image ??
                                brandingFormData.logo_image_url
                            }
                            onChange={handleBrandingChange}
                            label="Logo Image"
                        />
                    </div>
                    <div className="space-y-1">
                        <InputLabel
                            value="Upload banner"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <BrandingImageUploader
                            name="banner_image"
                            value={
                                brandingFormData.banner_image ??
                                brandingFormData.banner_image_url
                            }
                            onChange={handleBrandingChange}
                            label="Logo Image"
                        />
                    </div>
                </div>
                <Divider />

                <HotelBrandingButtons />

                <Divider />

                <HotelBrandingPages />

                <Divider />

                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        Keyfinder page
                    </h5>
                    <p className="text-xs text-[#544854]">
                        WhatsApp text is fixed: "I found your key. Please
                        contact me."
                    </p>
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
                        placeholder="Sie haben diesen Schlüssel gefunden? Bitte kontaktieren Sie den Eigentümer unter:"
                        required
                    />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 grid-cols-1">
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="primary_color"
                            value="Telephone (Preview, read-only)"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <TextInput
                            id="key_finder_page_text"
                            name="key_finder_page_text"
                            type="text"
                            defaultValue={"+49 170 1234567"}
                            className="block w-full"
                            placeholder="+49 170 1234567"
                            readOnly
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="button_text_color"
                            value="Colors (Preview)"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <ColorInput
                            id="page_text_color"
                            name="page_text_color"
                            value={brandingFormData.page_text_color}
                            onChange={handleBrandingChange}
                            className="block w-full"
                            placeholder="Color"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
