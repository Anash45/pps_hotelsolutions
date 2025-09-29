import { usePage, router } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";

export default function UnsubscribeData() {
    const { codeDetails, flash } = usePage().props;

    console.log(codeDetails);
    return (
        <div className="space-y-4 text-center sm:px-7 py-4 text-base">
            <div className="h-[120px] w-[120px] flex items-center justify-center mx-auto rounded-full border-light border">
                <img
                    src="/images/key_icon.svg"
                    alt="Key"
                    className="h-16 w-16"
                />
            </div>
            <h1 className="text-xl font-bold">Keyfinder abgemeldet</h1>
            <p>Ihre Daten wurden gelöscht und die Keyfinder-Funktion.</p>
            <PrimaryButton onClick={()=>{location=`/key/${codeDetails.code}`}}>Landing Page</PrimaryButton>
        </div>
    );
}
