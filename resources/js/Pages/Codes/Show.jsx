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
    const { selectedHotel = null, codeDetails } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);
    const [defaultView, setDefaultView] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData(mapHotelToBrandingFormData(selectedHotel, { user_view: true }));
        }
    }, [selectedHotel, url]);

    const keyAssignment = codeDetails?.key_assignment;
    const keyTypeName = codeDetails?.key_type?.name;

    const stayTillRaw = keyAssignment?.stay_till;
    const stayTill = stayTillRaw ? new Date(stayTillRaw) : null;
    const now = new Date();
    const isExpired = stayTill !== null && stayTill < now;

    const status = codeDetails?.status;
    const phoneNumber = keyAssignment?.phone_number?.trim();

    console.log("Data:", {
        keyTypeName,
        status,
        phoneNumber,
        stayTillRaw,
        isExpired,
    });

    let ComponentToShow = HotelLanding;
    let shouldSetDefaultView = false;

    if (keyTypeName === "key_finder") {
        if (status === "inactive") {
            ComponentToShow = AskDetails;
            shouldSetDefaultView = true;
            console.log("1");
        } else if (!phoneNumber) {
            ComponentToShow = HotelLanding;
            console.log("2");
        } else if (stayTill && stayTill > now) {
            // stay_till not expired
            ComponentToShow = HotelLanding;
            console.log("3");
        } else if (status === "active" && phoneNumber && isExpired) {
            ComponentToShow = HotelKeyFinder;
            console.log("4");
        }
    }

    useEffect(() => {
        if (shouldSetDefaultView) {
            setDefaultView(true);
        }
    }, [shouldSetDefaultView]);

    return (
        <>
            <Head title={brandingFormData?.heading ?? "Hotel"} />
            <GuestBox realPhone={true} defaultView={defaultView}>
                <ComponentToShow />
            </GuestBox>
        </>
    );
}

Show.layout = (page) => <GuestKeyLayout children={page} />;

export default Show;
