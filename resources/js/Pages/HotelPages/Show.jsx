import GuestBox from "@/Components/GuestBox";
import HotelCustomPage from "@/Components/HotelCustomPage";
import HotelLanding from "@/Components/HotelLanding";
import { PageContext } from "@/context/PageProvider";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { mapHotelToBrandingFormData } from "@/utils/mapHotelToBrandingFormData";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect } from "react";

function Show() {
    const { selectedHotel = null, page, key } = usePage().props;
    const { setBrandingFormData } = useContext(PageContext);

    // keep brandingFormData for hotel styles/config only
    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData(mapHotelToBrandingFormData(selectedHotel));
        }
    }, [selectedHotel]);

    console.log("Three: ", selectedHotel, page, key);

    return (
        <>
            <Head title={page?.title ?? "Hotel Page"} />
            <GuestBox realPhone={true}>
                {/* ✅ pass key separately */}
                <HotelCustomPage page={page} guestKey={key} />
            </GuestBox>
        </>
    );
}

// ✅ Attach layout
Show.layout = (page) => <GuestKeyLayout children={page} />;

export default Show;
