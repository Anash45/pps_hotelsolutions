import { PageContext } from "@/context/PageProvider";
import { useContext } from "react";

export default function HotelBrandingPreview() {
    const { brandingFormData } = useContext(PageContext);
    console.log(brandingFormData);

    return (
        <div className="py-4 md:px-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-3 xl:order-2 order-1">
            
        </div>
    );
}
