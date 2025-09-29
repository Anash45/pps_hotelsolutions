import GuestBox from "@/Components/GuestBox";
import UnsubscribeData from "@/Components/UnsubscribeData";
import GuestKeyLayout from "@/Layouts/GuestKeyLayout";
import { Head } from "@inertiajs/react";

function Unsubscribe({ code }) {
    
    let ComponentToShow = UnsubscribeData;


    return (
        <>
            <Head title={"Unsubscribe"} />
            <GuestBox realPhone={true} noBranding={true}>
                <ComponentToShow />
            </GuestBox>
        </>
    );
}

Unsubscribe.layout = (page) => <GuestKeyLayout children={page} />;

export default Unsubscribe;
