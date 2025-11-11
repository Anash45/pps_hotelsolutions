import { PageContext } from "@/context/PageProvider";
import { usePage } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import PrimaryButton from "./PrimaryButton";
import LightButton from "./LightButton";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";
import { useLang } from "@/context/TranslationProvider";
import { useAutoTranslate } from "@/context/AutoTranslateProvider";

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        return format(parseISO(dateStr), "dd.MM.yyyy");
    } catch {
        return dateStr;
    }
}

const HotelKeyFinderDetails = () => {
    const { brandingFormData } = useContext(PageContext);
    const context = useAutoTranslate();
    const isDE = context?.isDE || null;
    const { codeDetails } = usePage().props;
    const { t } = useLang("Components.HotelKeyFinderDetails");

    return (
        <div className="space-y-4">
            <div className="space-y-3 text-center">
                {brandingFormData.logo_image_url ? (
                    <img
                        src={brandingFormData.logo_image_url}
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

                <p className="text-[#161616] text-2xl font-semibold">
                    {isDE && brandingFormData.keyfinder_heading_de
                        ? brandingFormData.keyfinder_heading_de
                        : brandingFormData.keyfinder_heading}
                </p>
            </div>

            {brandingFormData.key_finder_page_text ||
            brandingFormData.key_finder_page_text_de ? (
                <p
                    style={{
                        color: brandingFormData?.page_text_color ?? "#020617",
                        whiteSpace: "pre-wrap",
                    }}
                    className="text-center text-base"
                >
                    {isDE && brandingFormData.key_finder_page_text_de
                        ? brandingFormData.key_finder_page_text_de
                        : brandingFormData.key_finder_page_text}
                </p>
            ) : null}

            <p
                style={{
                    color: brandingFormData?.page_text_color ?? "#020617",
                }}
                className="text-center text-base font-bold"
            >
                {codeDetails?.key_assignment?.phone_number ?? ""}
            </p>

            <div className="grid grid-cols-2 gap-2">
                <LightButton
                    onClick={() =>
                        (window.location = `tel:+${codeDetails?.key_assignment?.phone_number}`)
                    }
                    className="border-[#F1F1F1]"
                >
                    <span className="text-[#020617] text-base flex items-center justify-center gap-2">
                        <Phone className="h-5 w-5" />
                        <span>{isDE ? "Telefon" : "Phone"}</span>
                    </span>
                </LightButton>

                <PrimaryButton
                    onClick={() =>
                        window.open(
                            `https://wa.me/${codeDetails?.key_assignment?.phone_number}?text=` +
                                encodeURIComponent(t("whatsappMessage"))
                        )
                    }
                    className="text-base"
                >
                    <div className="flex text-base justify-center items-center gap-2">
                        <FaWhatsapp className="h-6 w-6" />
                        <span>
                            <span>WhatsApp</span>
                        </span>
                    </div>
                </PrimaryButton>
            </div>
        </div>
    );
};

export default HotelKeyFinderDetails;
