import { PageContext } from "@/context/PageProvider";
import { useContext, useMemo, useState } from "react";
import MobileFrame from "./MobileFrame";
import GuestBox from "./GuestBox";
import HotelLanding from "./HotelLanding";
import PrimaryButton from "./PrimaryButton";
import HotelKeyFinder from "./HotelKeyFinder";
import HotelCustomPage from "./HotelCustomPage";
import { useLang } from "@/context/TranslationProvider";

export default function HotelBrandingPreview() {
    const { brandingFormData } = useContext(PageContext);
    const { t } = useLang("Components.HotelBrandingPreview");

    const tabs = useMemo(() => {
        const landingTab = {
            button: t("landingTab"),
            component: <HotelLanding />,
        };
        const keyFinderTab = {
            button: t("keyFinderTab"),
            component: <HotelKeyFinder />,
        };

        const customTabs =
            brandingFormData?.pages?.map((page) => ({
                button: page.title,
                component: <HotelCustomPage page={page} />,
            })) || [];

        return [landingTab, ...customTabs, keyFinderTab];
    }, [brandingFormData, t]);

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="py-4 md:px-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-3 sticky top-0">
            <div className="space-y-2 mb-6">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        {t("livePreviewTitle")}
                    </h5>
                    <p className="text-xs text-[#544854]">
                        {t("livePreviewDescription")}
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
                <GuestBox showNextBox={tabs.length - 1 === activeTab}>
                    {tabs[activeTab].component}
                </GuestBox>
            </MobileFrame>
        </div>
    );
}
