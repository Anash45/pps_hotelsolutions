import { PageContext } from "@/context/PageProvider";
import { Link, usePage } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import { getIcon } from "@/data/iconMap";
import PrimaryButton from "./PrimaryButton";
import LightButton from "./LightButton";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        return format(parseISO(dateStr), "dd.MM.yyyy");
    } catch {
        return dateStr;
    }
}

const HotelKeyFinderDetails = ({}) => {
    const { brandingFormData } = useContext(PageContext);
    const { codeDetails } = usePage().props;
    const keyDetails = {};

    console.log(codeDetails);

    return (
        <div className="space-y-4">
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

                <p className="text-[#161616] text-2xl font-semibold">
                    {brandingFormData.keyfinder_heading ?? ""}
                </p>
            </div>
            {brandingFormData.key_finder_page_text ? (
                <p
                    style={{
                        color: brandingFormData?.page_text_color ?? "#020617",
                        whiteSpace: "pre-wrap", // optional if you prefer preserving all spacing
                    }}
                    className="text-center text-base"
                    dangerouslySetInnerHTML={{
                        __html: brandingFormData.key_finder_page_text,
                    }}
                />
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
                        <span>Telefon</span>
                    </span>
                </LightButton>
                <PrimaryButton
                    onClick={() =>
                        window.open(
                            `https://wa.me/${codeDetails?.key_assignment?.phone_number}?text=` +
                                encodeURIComponent(
                                    "I found your key. Please contact me."
                                )
                        )
                    }
                    className="text-base"
                >
                    <div className="flex text-base justify-center items-center gap-2">
                        <FaWhatsapp className="h-6 w-6" />
                        <span>Whatsapp</span>
                    </div>
                </PrimaryButton>
            </div>
        </div>
    );
};
export default HotelKeyFinderDetails;
