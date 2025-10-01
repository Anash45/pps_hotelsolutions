import { PageContext } from "@/context/PageProvider";
import { Link, usePage } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import { getIcon } from "@/data/iconMap";
import PrimaryButton from "./PrimaryButton";
import LightButton from "./LightButton";

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
                        className="max-h-24 max-w-36 h-auto w-auto object-contain object-center border border-[#c0c0c0] mx-auto"
                    />
                ) : (
                    <img
                        src={`/images/building-placeholder.webp`}
                        alt="Hotel"
                        className="max-h-24 max-w-36 h-auto w-auto object-contain object-center border border-[#c0c0c0] mx-auto"
                    />
                )}

                <p className="text-[#161616] text-2xl">
                    {brandingFormData.heading ?? "Hotel Name"}
                </p>
            </div>
            <p
                style={{
                    color: brandingFormData?.page_text_color ?? "#020617",
                }}
                className="text-center text-sm"
            >
                {brandingFormData.key_finder_page_text}
            </p>
            <p
                style={{
                    color: brandingFormData?.page_text_color ?? "#020617",
                }}
                className="text-center text-sm font-bold"
            >
                {codeDetails?.key_assignment?.phone_number ?? ""}
            </p>
            <div className="grid grid-cols-2 gap-2">
                <LightButton
                    onClick={() => window.open(`tel:+${codeDetails?.key_assignment?.phone_number}`)}
                    className="border-[#F1F1F1]"
                >
                    <span className="text-[#020617]">Phone</span>
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
                    className=""
                >
                    Whats app
                </PrimaryButton>
            </div>
        </div>
    );
};
export default HotelKeyFinderDetails;
