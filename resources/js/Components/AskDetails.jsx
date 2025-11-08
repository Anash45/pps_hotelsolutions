import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import UserSelfEdit from "./UserSelfEdit";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { useLang } from "@/context/TranslationProvider";

export default function AskDetails() {
    const { codeDetails, flash } = usePage().props;
    const [showSelfEdit, setShowSelfEdit] = useState(false);
    const { t } = useLang("Components.AskDetails");

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
                <img
                    src="/images/key_icon.svg"
                    alt="Key"
                    className="h-16 w-16"
                />
            </div>
            <p dangerouslySetInnerHTML={{ __html: t("description1") }} />
            <p dangerouslySetInnerHTML={{ __html: t("description2") }} />
            <p>{t("question")}</p>
            <div className="flex flex-col gap-2">
                <PrimaryButton onClick={handleYesClick}>
                    {t("yes")}
                </PrimaryButton>
                <LightButton onClick={handleNoClick}>{t("no")}</LightButton>
            </div>
        </div>
    );
}
