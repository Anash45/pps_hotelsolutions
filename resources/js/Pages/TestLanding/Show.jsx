import GuestBox from "@/Components/GuestBox";
import HotelKeyFinder from "@/Components/HotelKeyFinder";
import HotelLanding from "@/Components/HotelLanding";
import AskDetails from "@/Components/AskDetails";
import { PageContext } from "@/context/PageProvider";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import { mapHotelToBrandingFormData } from "@/utils/mapHotelToBrandingFormData";

function Show() {
    const { selectedHotel = null, codeDetails = {} } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);
    const { url } = usePage();


    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData(
                mapHotelToBrandingFormData(selectedHotel, { user_view: true })
            );
        }
    }, [selectedHotel, url]);


    let ComponentToShow = HotelLanding;

    return (
        <>
            <Head title={brandingFormData?.heading ?? "Hotel"} />
            <GuestBox realPhone={true}>
                <ComponentToShow />
            </GuestBox>
        </>
    );
}

Show.layout = (page) => <GuestKeyLayout children={page} />;

export default Show;
