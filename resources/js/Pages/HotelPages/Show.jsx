import GuestBox from "@/Components/GuestBox";
import HotelCustomPage from "@/Components/HotelCustomPage";
import HotelLanding from "@/Components/HotelLanding";
import { PageContext } from "@/context/PageProvider";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { mapHotelToBrandingFormData } from "@/utils/mapHotelToBrandingFormData";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect } from "react";

function Show({ code }) {
    const { selectedHotel = null, page } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);
    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData(mapHotelToBrandingFormData(selectedHotel));
        }
    }, [selectedHotel]);

    return (
        <>
            <Head title={page?.title ?? "Hotel Page"} />
            <GuestBox realPhone={true}>
                <HotelCustomPage page={page} />
            </GuestBox>
        </>
    );
}

// ✅ Attach layout
Show.layout = (page) => <GuestKeyLayout children={page} />;

export default Show;
