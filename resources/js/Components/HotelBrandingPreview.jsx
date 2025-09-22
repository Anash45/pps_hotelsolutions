import { PageContext } from "@/context/PageProvider";
import { useContext } from "react";
import MobileFrame from "./MobileFrame";
import GuestBox from "./GuestBox";
import HotelLanding from "./HotelLanding";

export default function HotelBrandingPreview() {
    const { brandingFormData } = useContext(PageContext);
    // console.log(brandingFormData);

    return (
        <div className="py-4 md:px-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-3 position-sticky top-0">
            <MobileFrame>
                <GuestBox>
                    <HotelLanding />
                </GuestBox>
            </MobileFrame>
        </div>
    );
}
