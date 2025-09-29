import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import UserSelfEdit from "./UserSelfEdit";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function AskDetails() {
    const { codeDetails, flash } = usePage().props;
    const [showSelfEdit, setShowSelfEdit] = useState(false);

    const handleNoClick = () => {
        router.get(route("key.makeActive", { code: codeDetails.code }));
    };

    const handleYesClick = () => {
        setShowSelfEdit(true);
    };

    if (showSelfEdit) {
        return <UserSelfEdit />;
    }

    return (
        <div className="space-y-4 text-center sm:px-7 py-4 text-base">
            <div className="h-[120px] w-[120px] flex items-center justify-center mx-auto rounded-full border-light border">
                <img src="/images/key_icon.svg" alt="Key" className="h-16 w-16" />
            </div>
            <p>This key can serve as a key finder after your stay.</p>
            <p>
                To do so you must enter your mobile number along with other details
                in next dialog so that a finder can{" "}
                <span className="font-bold">contact you</span>.
            </p>
            <p>Would you like to use the key finder function?</p>
            <div className="flex flex-col gap-2">
                <PrimaryButton onClick={handleYesClick}>Yes</PrimaryButton>
                <LightButton onClick={handleNoClick}>No</LightButton>
            </div>
        </div>
    );
}
