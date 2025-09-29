import GuestBox from "@/Components/GuestBox";
import HotelKeyFinder from "@/Components/HotelKeyFinder";
import HotelLanding from "@/Components/HotelLanding";
import AskDetails from "@/Components/AskDetails";
import { PageContext } from "@/context/PageProvider";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect } from "react";

function Show({ code }) {
    const { selectedHotel = null, codeDetails } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);

    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData((prev) => ({
                ...prev,
                heading: selectedHotel.heading || "",
                primary_color: selectedHotel.primary_color || "#000000",
                background_color: selectedHotel.background_color || "#c1c1c1",
                text_color: selectedHotel.text_color || "#1b1b1b",
                button_text_color: selectedHotel.button_text_color || "#ffffff",
                logo_image: null,
                logo_image_url: selectedHotel.logo_image
                    ? `/storage/${selectedHotel.logo_image}`
                    : null,
                banner_image: null,
                banner_image_url: selectedHotel.banner_image
                    ? `/storage/${selectedHotel.banner_image}`
                    : null,
                key_finder_page_text: selectedHotel.key_finder_page_text || "",
                page_text_color: selectedHotel.page_text_color || "#000000",
                pages: selectedHotel?.pages,
                buttons: (selectedHotel?.buttons || []).map((btn) => ({
                    button_id: btn.id ?? null,
                    hotel_id: btn.hotel_id ?? selectedHotel.id,
                    type: btn.type || "",
                    text: btn.text || "",
                    icon: btn.icon || "",
                    order: btn.order ?? 0,
                    text_color: btn.text_color || "#ffffff",
                    background_color: btn.background_color || "#84af83",
                    url: btn.url || "",
                    phone: btn.phone || "",
                    wifi_name: btn.wifi_name || "",
                    wifi_password: btn.wifi_password || "",
                    page_id: btn.page_id ?? null,
                })),
            }));
        }
    }, [selectedHotel]);

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

    if (keyTypeName === "key_finder") {
        if (status === "inactive") {
            ComponentToShow = AskDetails;
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
