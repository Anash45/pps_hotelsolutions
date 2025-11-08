import GuestBox from "@/Components/GuestBox";
import HotelKeyFinder from "@/Components/HotelKeyFinder";
import HotelLanding from "@/Components/HotelLanding";
import AskDetails from "@/Components/AskDetails";
import { PageContext } from "@/context/PageProvider";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import { mapHotelToBrandingFormData } from "@/utils/mapHotelToBrandingFormData";

function Show() {
    const { selectedHotel = null, codeDetails } = usePage().props;
    const { brandingFormData, setBrandingFormData, loadingButton } =
        useContext(PageContext);
    const [defaultView, setDefaultView] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        if (selectedHotel) {
            setBrandingFormData(
                mapHotelToBrandingFormData(selectedHotel, { user_view: true })
            );
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
        } else if (stayTill && stayTill > now || !phoneNumber) {
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
            <Head>
                {/* ✅ Page Title */}
                <title>{brandingFormData?.heading ?? "Hotel"}</title>

                {/* ✅ Favicon / Browser Tab Icon */}
                <link
                    rel="icon"
                    type="image/png"
                    href={
                        brandingFormData?.logo_image_url ??
                        "/images/building-placeholder.webp"
                    }
                />

                {/* ✅ Open Graph (Facebook, WhatsApp, LinkedIn, etc.) */}
                <meta
                    property="og:title"
                    content={brandingFormData?.heading ?? "Hotel"}
                />
                <meta
                    property="og:description"
                    content={
                        brandingFormData?.meta_description ??
                        brandingFormData?.description ??
                        "Book your perfect stay with us!"
                    }
                />
                <meta
                    property="og:image"
                    content={
                        brandingFormData?.logo_image_url ??
                        "/images/building-placeholder.webp"
                    }
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={
                        typeof window !== "undefined"
                            ? window.location.href
                            : ""
                    }
                />

                {/* ✅ Twitter / X Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={brandingFormData?.heading ?? "Hotel"}
                />
                <meta
                    name="twitter:description"
                    content={
                        brandingFormData?.meta_description ??
                        brandingFormData?.description ??
                        "Book your perfect stay with us!"
                    }
                />
                <meta
                    name="twitter:image"
                    content={
                        brandingFormData?.logo_image_url ??
                        "/images/building-placeholder.webp"
                    }
                />
            </Head>
            <GuestBox
                realPhone={true}
                defaultView={defaultView}
                showNextBox={ComponentToShow === HotelKeyFinder}
            >
                <ComponentToShow />
            </GuestBox>

            {loadingButton && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="loader border-t-transparent border-4 border-[#b6ffb5] rounded-full w-10 h-10 animate-spin"></div>
                </div>
            )}
        </>
    );
}

Show.layout = (page) => (
    <>
        <GuestKeyLayout children={page} />
    </>
);

export default Show;
