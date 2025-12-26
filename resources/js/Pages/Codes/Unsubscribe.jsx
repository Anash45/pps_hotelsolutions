import GuestBox from "@/Components/GuestBox";
import UnsubscribeData from "@/Components/UnsubscribeData";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { Head } from "@inertiajs/react";
import { useLang } from "@/context/TranslationProvider";

function Unsubscribe({ code }) {
    const { t } = useLang("Pages.unsubscribe");

    let ComponentToShow = UnsubscribeData;

    return (
        <>
            <Head title={t("pageTitle")} />
            <GuestBox realPhone={true} noBranding={true}>
                <ComponentToShow />
            </GuestBox>
        </>
    );
}

Unsubscribe.layout = (page) => <GuestKeyLayout>{page}</GuestKeyLayout>;

export default Unsubscribe;
