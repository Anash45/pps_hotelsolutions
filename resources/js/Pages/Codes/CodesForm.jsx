import { useEffect, useState } from "react";
import { getDomain } from "@/utils/viteConfig";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import LightButton from "@/Components/LightButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { usePage, useForm } from "@inertiajs/react";
import CodesPreview from "./CodesPreview";
import Divider from "@/Components/Divider";
import { useLang } from "@/context/TranslationProvider";

export default function CodesForm({ previewCodes, setPreviewCodes }) {
    const { t } = useLang("Components.codesForm");
    const { hotels, keyTypes } = usePage().props;

    const [linkDomain, setLinkDomain] = useState(
        "https://app.ppshotelsolutions.de"
    );

    useEffect(() => {
        (async () => {
            const domain = await getDomain();
            setLinkDomain(domain);
            setData("domain", domain);
        })();
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        hotel_id: hotels.length > 0 ? hotels[0].id : "",
        key_type: keyTypes.length > 0 ? keyTypes[0].name : "",
        no_of_codes: "10",
        domain: linkDomain,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("codes.store"), {
            data,
            onSuccess: (page) => {
                if (page.props.flash.generatedCodes) {
                    setPreviewCodes(page.props.flash.generatedCodes);
                }
            },
        });
    };

    const clearPreview = () => setPreviewCodes([]);

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="grid gap-3 md:grid-cols-2 grid-cols-1"
            >
                {/* Hotel Select */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="hotel"
                        value={t("hotel")}
                        className="text-[#344054] font-medium"
                    />
                    <SelectInput
                        id="hotel"
                        name="hotel_id"
                        value={data.hotel_id}
                        onChange={(e) => setData("hotel_id", e.target.value)}
                        className="w-full block"
                        options={hotels.map((h) => ({
                            value: h.id,
                            label: h.hotel_name,
                        }))}
                    />
                </div>

                {/* Key Type Select */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="key_type"
                        value={t("keyType")}
                        className="text-[#344054] font-medium"
                    />
                    <SelectInput
                        id="key_type"
                        name="key_type"
                        value={data.key_type}
                        onChange={(e) => setData("key_type", e.target.value)}
                        className="w-full block"
                        options={keyTypes.map((k) => ({
                            value: k.name,
                            label: k.display_name,
                        }))}
                    />
                </div>

                {/* Number of Codes */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="no_of_codes"
                        value={t("numberOfCodes")}
                        className="text-[#344054] font-medium"
                    />
                    <TextInput
                        id="no_of_codes"
                        name="no_of_codes"
                        value={data.no_of_codes}
                        onChange={(e) => setData("no_of_codes", e.target.value)}
                        className="block w-full"
                        required
                    />
                </div>

                {/* Domain */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="domain"
                        value={t("domainReadOnly")}
                        className="text-[#344054] font-medium"
                    />
                    <TextInput
                        id="domain"
                        name="domain"
                        value={linkDomain}
                        readOnly
                        className="block w-full"
                    />
                </div>

                {/* Buttons */}
                <div className="flex-wrap gap-1 items-center md:col-span-2 flex mt-3">
                    <PrimaryButton type="submit" disabled={processing}>
                        {t("generateCodes")}
                    </PrimaryButton>
                    <LightButton type="button" onClick={clearPreview}>
                        {t("clearPreview")}
                    </LightButton>
                </div>
            </form>

            {previewCodes.length > 0 && (
                <div className="flex flex-col gap-3 py-3">
                    <p className="text-[#079E04] text-xs font-medium">
                        {previewCodes.length} {t("urlsGenerated")}
                    </p>
                    <p className="text-xs leading-5 font-medium text-[#475569]">
                        {t("urlsImmediatelyActive")}
                    </p>
                    <Divider className="mt-3" />
                </div>
            )}

            {previewCodes.length > 0 && (
                <CodesPreview
                    domain={data.domain}
                    previewCodes={previewCodes}
                />
            )}
        </>
    );
}
