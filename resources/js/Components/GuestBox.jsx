import { PageContext } from "@/context/PageProvider";
import { useContext } from "react";

const GuestBox = ({ children }) => {
    const { brandingFormData } = useContext(PageContext);
    return (
        <div className="pt-20 pb-10 max-h-full overflow-y-auto scrollbar-hidden">
            <div className="rounded-2xl px-2 py-4 guest-box scale-[0.9] origin-top" style={{backgroundColor: `${brandingFormData?.background_color ?? "#ffffff"}`}}>
                {children}
            </div>
        </div>
    );
};
export default GuestBox;
