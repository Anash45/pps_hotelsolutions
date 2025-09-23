import { PageContext } from "@/context/PageProvider";
import { useContext } from "react";
import "react-quill/dist/quill.snow.css";

export default function HotelCustomPage({ page = null }) {
    const { brandingFormData } = useContext(PageContext);
    return (
        <div className="space-y-4 px-2">
            {/* <div className="space-y-3 text-center">
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

                <p className="text-[#161616] text-2xl">
                    {brandingFormData.heading ?? "Hotel Name"}
                </p>
            </div> */}
            <div className="space-y-3">
                {/* <h3 className="text-lg font-medium text-center">
                    {page?.title}
                </h3> */}
                <div dangerouslySetInnerHTML={{ __html: page?.content }} className="custom-page-content" />
            </div>
        </div>
    );
}
