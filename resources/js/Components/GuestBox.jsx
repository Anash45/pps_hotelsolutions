import { PageContext } from "@/context/PageProvider";
import { useContext } from "react";

const GuestBox = ({ realPhone = false, noBranding = false, defaultView = false, children }) => {

    console.log(defaultView, noBranding);
    const { brandingFormData } = useContext(PageContext);
    return (
        <div className={`${realPhone ? 'pt-16 px-3': 'pt-20'} pb-10 max-h-full overflow-y-auto scrollbar-hidden`}>
            <div className={`rounded-2xl py-4 guest-box ${realPhone ? 'scale-[1] sm:px-4 px-3':'scale-[0.9] px-2'} origin-top max-w-[430px] mx-auto`} style={{backgroundColor: `${noBranding || defaultView ? ('#ffffff') : brandingFormData?.background_color ?? "#ffffff"}`}}>
                {children}
            </div>
        </div>
    );
};
export default GuestBox;
