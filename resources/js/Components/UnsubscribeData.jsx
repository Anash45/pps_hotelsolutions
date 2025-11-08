import { usePage } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";
import { useLang } from "@/context/TranslationProvider";

export default function UnsubscribeData() {
    const { codeDetails } = usePage().props;
    const { t } = useLang("Components.unsubscribeData");

    return (
        <div className="space-y-4 text-center sm:px-7 py-4 text-base">
            <div className="h-[120px] w-[120px] flex items-center justify-center mx-auto rounded-full border-light border">
                <img
                    src="/images/key_icon.svg"
                    alt={t("keyIconAlt")}
                    className="h-16 w-16"
                />
            </div>

            <h1 className="text-xl font-bold">{t("title")}</h1>

            <p>{t("description")}</p>

            <PrimaryButton
                onClick={() => {
                    location = `/key/${codeDetails.code}`;
                }}
            >
                {t("landingPageButton")}
            </PrimaryButton>
        </div>
    );
}
