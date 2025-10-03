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

export default function CodesForm() {
    const { hotels, keyTypes } = usePage().props;

    const [linkDomain, setLinkDomain] = useState(
        "https://test-app.ppshotelsolutions.de"
    );

    // fetch domain at component mount
    useEffect(() => {
        (async () => {
            const domain = await getDomain();
            console.log("Fetched domain:", domain);
            setLinkDomain(domain); // update local state
            setData("domain", domain); // update form field
        })();
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        hotel_id: hotels.length > 0 ? hotels[0].id : "",
        key_type: keyTypes.length > 0 ? keyTypes[0].name : "",
        no_of_codes: "10",
        domain: linkDomain,
    });

    const [previewCodes, setPreviewCodes] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("codes.store"), {
            data,
            onSuccess: (page) => {
                console.log(page);
                // backend should return generated codes in page or props
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
                        value="Hotel"
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
                        value="Key Type"
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
                        value="Number of Codes"
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

                {/* Domain (read-only) */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="domain"
                        value="Domain (read-only)"
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
                        Generate Codes
                    </PrimaryButton>
                    <LightButton type="button" onClick={clearPreview}>
                        Clear Preview
                    </LightButton>
                </div>
            </form>

            {previewCodes.length > 0 && (
                <div className="flex flex-col gap-3 py-3">
                    <p className="text-[#079E04] text-xs font-medium">
                        {previewCodes.length} URLs generated and CSV downloaded.
                    </p>
                    <p className="text-xs leading-5 font-medium text-[#475569]">
                        Once generated, the URLs are **immediately active**. The
                        CSV is automatically downloaded and stored in the
                        **History** on the right.
                    </p>
                    <Divider className="mt-3" />
                </div>
            )}

            {/* Preview Table */}
            {previewCodes.length > 0 && (
                <CodesPreview
                    domain={data.domain}
                    previewCodes={previewCodes}
                />
            )}
        </>
    );
}
