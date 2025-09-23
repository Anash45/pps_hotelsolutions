import { PageContext } from "@/context/PageProvider";
import { useContext, useMemo, useState } from "react";
import MobileFrame from "./MobileFrame";
import GuestBox from "./GuestBox";
import HotelLanding from "./HotelLanding";
import PrimaryButton from "./PrimaryButton";
import HotelKeyFinder from "./HotelKeyFinder";
import HotelCustomPage from "./HotelCustomPage";

export default function HotelBrandingPreview() {
    const { brandingFormData } = useContext(PageContext);

    const tabs = useMemo(() => {
        const landingTab = { button: "Landing", component: <HotelLanding /> };
        const keyFinderTab = {
            button: "Key Finder",
            component: <HotelKeyFinder />,
        };

        const customTabs =
            brandingFormData?.pages?.map((page) => ({
                button: page.title,
                component: <HotelCustomPage page={page} />,
            })) || [];

        // Order: Landing → Custom Pages → Key Finder
        return [landingTab, ...customTabs, keyFinderTab];
    }, [brandingFormData]);

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="py-4 md:px-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-3 sticky top-0">
            <div className="space-y-2 mb-6">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        Live Preview
                    </h5>
                    <p className="text-xs text-[#544854]">
                        Preview is mobile (fixed width).
                    </p>
                </div>

                <div className="p-1 rounded-lg bg-[#F1F5F9] flex gap-2 flex-wrap">
                    {tabs.map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            className={`text-sm px-3 py-1.5 rounded-[6px] ${
                                activeTab === idx
                                    ? "bg-primary text-white"
                                    : "bg-transparent text-[#020617]"
                            }`}
                        >
                            {tab.button}
                        </button>
                    ))}
                </div>
            </div>

            <MobileFrame>
                <GuestBox>{tabs[activeTab].component}</GuestBox>
            </MobileFrame>
        </div>
    );
}
