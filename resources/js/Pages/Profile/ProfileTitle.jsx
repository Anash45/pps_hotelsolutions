import { useLang } from "@/context/TranslationProvider";

export default function ProfileTitle() {
    const { t } = useLang();
    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            <h5 className="font-bold text-xl text-grey900">
                {t("profile.ProfileTitle.title")}
            </h5>
        </div>
    );
}
