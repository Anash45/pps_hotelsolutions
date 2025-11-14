import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import UserSelfEdit from "./UserSelfEdit";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { useLang } from "@/context/TranslationProvider";
import { useAutoTranslate } from "@/context/AutoTranslateProvider";

export default function AskDetails() {
    const { codeDetails, flash } = usePage().props;
    const [showSelfEdit, setShowSelfEdit] = useState(false);
    const context = useAutoTranslate();
    const isDE = context?.isDE || null;

    const handleNoClick = () => {
        if (
            confirm(
                isDE
                    ? "Sind Sie sicher? Diese Handlung kann nicht rückgängig gemacht werden."
                    : "Are you sure? This action cannot be undone."
            )
        ) {
            router.get(route("key.makeActive", { code: codeDetails.code }));
        }
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
                <img
                    src="/images/key_icon.svg"
                    alt="Key"
                    className="h-16 w-16"
                />
            </div>
            <p>
                {isDE
                    ? "Dieser Schlüssel kann nach Ihrem Aufenthalt als Schlüsselfinder dienen."
                    : "This key can serve as a key finder after your stay."}
            </p>
            <p>
                {isDE ? (
                    <>
                        Um dies zu ermöglichen, müssen Sie im nächsten Dialog
                        Ihre Mobilnummer sowie weitere Angaben eingeben, damit
                        ein Finder{" "}
                        <span className="font-bold">Sie kontaktieren</span>{" "}
                        kann.
                    </>
                ) : (
                    <>
                        To do so, you must enter your mobile number along with
                        other details in the next dialog so that a finder can{" "}
                        <span className="font-bold">contact you</span>.
                    </>
                )}
            </p>

            <p>
                {isDE
                    ? "Möchten Sie die Schlüsselsuchfunktion nutzen?"
                    : "Would you like to use the key finder function?"}
            </p>
            <div className="flex flex-col gap-2">
                <PrimaryButton onClick={handleYesClick}>{isDE ? "Ja":"Yes"}</PrimaryButton>
                <LightButton onClick={handleNoClick}>{isDE ? "Nein":"No"}</LightButton>
            </div>
        </div>
    );
}
