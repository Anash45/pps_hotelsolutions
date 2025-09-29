import GuestBox from "@/Components/GuestBox";
import HotelCustomPage from "@/Components/HotelCustomPage";
import HotelLanding from "@/Components/HotelLanding";
import { PageContext } from "@/context/PageProvider";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect } from "react";

function Show({ code }) {
    const { selectedHotel = null, page } = usePage().props;
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
                logo_image: null, // reset file input
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
                    button_id: btn.id ?? null, // keep DB id separate if needed
                    hotel_id: btn.hotel_id ?? selectedHotel.id,

                    // required fields
                    type: btn.type || "",
                    text: btn.text || "",
                    icon: btn.icon || "",

                    // order + colors
                    order: btn.order ?? 0,
                    text_color: btn.text_color || "#ffffff",
                    background_color: btn.background_color || "#84af83",

                    // type-specific fields
                    url: btn.url || "",
                    phone: btn.phone || "",
                    wifi_name: btn.wifi_name || "",
                    wifi_password: btn.wifi_password || "",
                    page_id: btn.page_id ?? null,
                })),
            }));
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
