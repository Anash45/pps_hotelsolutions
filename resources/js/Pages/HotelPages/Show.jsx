import GuestBox from "@/Components/GuestBox";
import HotelCustomPage from "@/Components/HotelCustomPage";
import { PageContext } from "@/context/PageProvider";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { mapHotelToBrandingFormData } from "@/utils/mapHotelToBrandingFormData";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect } from "react";
import { useLang } from "@/context/TranslationProvider";

function HotelPages() {
    const { selectedHotel = null, page, key } = usePage().props;
    const { setBrandingFormData } = useContext(PageContext);
    const { t } = useLang("Pages.hotelPages");

    // keep brandingFormData for hotel styles/config only
    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData(mapHotelToBrandingFormData(selectedHotel));
        }
    }, [selectedHotel]);

    console.log("Three: ", selectedHotel, page, key);

    return (
        <>
            <Head title={page?.title ?? t("defaultPageTitle")} />
            <GuestBox realPhone={true}>
                {/* ✅ pass key separately */}
                <HotelCustomPage page={page} guestKey={key} />
            </GuestBox>
        </>
    );
}

// ✅ Attach layout
HotelPages.layout = (page) => <GuestKeyLayout>{page}</GuestKeyLayout>;

export default HotelPages;
