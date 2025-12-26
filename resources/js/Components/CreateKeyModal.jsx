import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

import InputError from "./InputError";
import SelectInput from "./SelectInput";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import LightButton from "./LightButton";
import Divider from "./Divider";
import axios from "axios";
import Alert from "./Alert";
import { getDomain } from "@/utils/viteConfig";
import { useLang } from "@/context/TranslationProvider";

export default function CreateKeyModal({
    onClose,
    keyTypes,
    selectedHotel,
    onSuccess,
    code = null,
    title,
    description,
}) {
    const { t } = useLang("Components.CreateKeyModal");

    const [existingCode, setexistingCode] = useState(code);
    const [show, setShow] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 200);
    };

    const [linkDomain, setLinkDomain] = useState(
        "https://test-app.ppshotelsolutions.de"
    );

    useEffect(() => {
        (async () => {
            const domain = await getDomain();
            setLinkDomain(domain);
        })();
    }, []);

    const keyTypesOptions = keyTypes.map((kt) => ({
        value: kt.id,
        label: kt.display_name,
    }));

    const [gdprConsent, setGdprConsent] = useState(
        existingCode?.key_assignment?.gdpr_consent ?? true
    );
    const [keyTypeId, setKeyTypeId] = useState(
        existingCode?.key_type_id ?? null
    );
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        hotel_id: selectedHotel ?? null,
        salutation: existingCode?.key_assignment?.salutation ?? "",
        title: existingCode?.key_assignment?.title ?? "",
        first_name: existingCode?.key_assignment?.first_name ?? "",
        last_name: existingCode?.key_assignment?.last_name ?? "",
        room_number: existingCode?.key_assignment?.room_number ?? "",
        phone_number: existingCode?.key_assignment?.phone_number ?? "",
        email: existingCode?.key_assignment?.email ?? "",
        stay_from: existingCode?.key_assignment?.stay_from ?? "",
        stay_till: existingCode?.key_assignment?.stay_till ?? "",
        gdpr_consent: existingCode?.key_assignment?.gdpr_consent ?? gdprConsent,
        code_id: existingCode?.id ?? null,
        ...(existingCode ? { id: existingCode.key_assignment.id } : {}),
    });

    const [formErrors, setFormErrors] = useState({});
    const [barcodeInput, setBarcodeInput] = useState(existingCode?.code ?? "");
    const [recognized, setRecognized] = useState(
        existingCode?.code ? existingCode.code !== "" : false
    );
    const [selectedCode, setSelectedCode] = useState(existingCode ?? null);
    const [recognizeError, setRecognizeError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");

    const handleGdprChange = (e) => {
        setFormData((prev) => ({ ...prev, gdpr_consent: e.target.checked }));
        setGdprConsent(e.target.checked);
    };

    useEffect(() => {
        setFormData((prev) => ({ ...prev, hotel_id: selectedHotel }));
    }, [selectedHotel]);

    useEffect(() => {
        if (selectedCode)
            setFormData((prev) => ({ ...prev, code_id: selectedCode.id }));
    }, [selectedCode]);

    useEffect(() => {
        if (existingCode === null) {
            setRecognized(false);
            setSelectedCode(null);
            setKeyTypeId(null);
        }
        setRecognizeError("");
    }, [barcodeInput, selectedHotel]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!recognized || !selectedCode) return;

        const url = formData.id ? `/keys/${formData.id}` : "/keys";
        const method = formData.id ? "put" : "post";

        try {
            const res = await axios[method](url, formData);
            setFormErrors({});
            setTimeout(() => handleClose(), 2000);
            onSuccess();
            setLoading(false);
            setSubmitSuccess(
                existingCode !== null ? t("updateKey") : t("registerNewKey")
            );
        } catch (err) {
            setLoading(false);
            if (err.response?.data?.errors)
                setFormErrors(err.response.data.errors);
        }
    };

    const handleRecognize = async () => {
        setRecognizeError("");
        setRecognized(false);
        setSelectedCode(null);

        if (!barcodeInput.trim() || !selectedHotel) {
            setRecognizeError(t("barcodeAndHotelRequired"));
            return;
        }

        try {
            const res = await axios.post("/keys/recognize", {
                input: barcodeInput.trim(),
                hotel_id: selectedHotel,
            });

            if (res.data.recognized && res.data.code) {
                setRecognized(true);
                setSelectedCode(res.data.code);
                setKeyTypeId(res.data.code.key_type_id);
            } else {
                setRecognizeError(t("keyNotRecognized"));
            }
        } catch (e) {
            if (e.response) {
                if (e.response.status === 404)
                    setRecognizeError(t("codeNotFound"));
                else if (e.response.status === 422)
                    setRecognizeError(t("codeAlreadyAssigned"));
                else setRecognizeError(t("unexpectedError"));
            } else setRecognizeError(t("networkError"));
        }
    };

    return (
        <div
            className={`transform rounded-xl bg-white py-4 px-6 shadow-xl transition-all duration-200 w-[624px] max-w-full 
            ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
            <div className="space-y-3">
                <div className="space-y-1">
                    <h2 className="text-lg text-[#201A20] font-semibold">
                        {title || t("title")}
                    </h2>
                    {description && (
                        <p className="text-xs font-medium text-[#475569]">
                            {description || t("description")}
                        </p>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex md:flex-row flex-col gap-3 items-end">
                            <div className="space-y-1 grow">
                                <InputLabel
                                    htmlFor="barcode"
                                    value={t("barcode")}
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <TextInput
                                    id="barcode"
                                    name="barcode"
                                    type="text"
                                    className="block w-full"
                                    placeholder={t("barcode")}
                                    value={barcodeInput}
                                    onChange={(e) =>
                                        setBarcodeInput(e.target.value)
                                    }
                                    required
                                    readOnly={!!existingCode}
                                />
                            </div>
                            {!existingCode && (
                                <div>
                                    <PrimaryButton onClick={handleRecognize}>
                                        <div className="py-[1px]">
                                            {t("recognize")}
                                        </div>
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>

                        {recognized && selectedCode && (
                            <div className="text-green-600 text-sm">
                                {t("keyRecognized", {
                                    link: `${linkDomain}/key/${selectedCode.code}`,
                                })}
                            </div>
                        )}

                        <InputError message={recognizeError} />
                    </div>

                    {submitSuccess && (
                        <Alert type="success" message={submitSuccess} />
                    )}

                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="key_type"
                                value={t("keyType")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                id="key_type"
                                value={keyTypeId}
                                onChange={() => {}}
                                className="w-full block"
                                placeholder={t("keyType")}
                                options={keyTypesOptions}
                            />
                            <InputError message={formErrors.key_type?.[0]} />
                        </div>
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="stay_from"
                                value={t("stayFrom")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="stay_from"
                                name="stay_from"
                                value={formData.stay_from}
                                onChange={handleChange}
                                type="date"
                                className="date-inp block w-full"
                                placeholder="dd.mm.yyyy"
                                required
                            />
                            <InputError message={formErrors.stay_from?.[0]} />
                        </div>
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="stay_till"
                                value={t("stayTill")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="stay_till"
                                name="stay_till"
                                value={formData.stay_till}
                                onChange={handleChange}
                                type="date"
                                className="date-inp block w-full"
                                placeholder="dd.mm.yyyy"
                                required
                            />
                            <InputError message={formErrors.stay_till?.[0]} />
                        </div>
                    </div>

                    <label
                        htmlFor="gdpr_consent"
                        className="flex p-3 rounded-lg items-center gap-3 border border-[#9CAADE]"
                    >
                        <input
                            type="checkbox"
                            name="gdprConsent"
                            checked={formData.gdpr_consent}
                            onChange={handleGdprChange}
                            id="gdpr_consent"
                            className="text-primary rounded"
                        />
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-slate600">
                                {t("gdprConsentLabel")}
                            </span>
                            <span className="text-xs text-slate600">
                                {t("gdprConsentDescription")}
                            </span>
                        </div>
                    </label>

                    <Divider />

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="salutation"
                                value={t("salutation")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                id="salutation"
                                name="salutation"
                                value={formData.salutation}
                                onChange={handleChange}
                                className="w-full block"
                                options={[
                                    { value: "Mr", label: "Mr." },
                                    { value: "Mrs", label: "Mrs." },
                                    { value: "Ms", label: "Ms." },
                                ]}
                            />
                            <InputError message={formErrors.salutation?.[0]} />
                        </div>

                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="title"
                                value={t("titleField")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="e.g. Dr."
                            />
                            <InputError message={formErrors.title?.[0]} />
                        </div>

                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="first_name"
                                value={t("firstName")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder={t("firstName")}
                                required
                            />
                            <InputError message={formErrors.first_name?.[0]} />
                        </div>

                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="last_name"
                                value={t("lastName")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder={t("lastName")}
                                required
                            />
                            <InputError message={formErrors.last_name?.[0]} />
                        </div>

                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="room_number"
                                value={t("roomNumber")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="room_number"
                                name="room_number"
                                value={formData.room_number}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder={t("roomNumber")}
                            />
                            <InputError message={formErrors.room_number?.[0]} />
                        </div>

                        <div
                            className={`space-y-1 ${
                                keyTypeId == 2 ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="phone_number"
                                value={t("mobilePhone")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                type="tel"
                                className="block w-full"
                                placeholder="+49 123 456789"
                            />
                            <InputError
                                message={formErrors.phone_number?.[0]}
                            />
                        </div>

                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="email"
                                value={t("emailAddress")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="block w-full"
                                placeholder="example@email.com"
                                required
                            />
                            <InputError message={formErrors.email?.[0]} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 justify-end flex-wrap">
                        {loading && <p className="text-sm">{t("loading")}</p>}
                        {Object.keys(formErrors).length > 0 && (
                            <InputError message={t("fixErrors")} />
                        )}
                        <LightButton onClick={handleClose}>
                            {t("cancel")}
                        </LightButton>
                        <PrimaryButton
                            disabled={!recognized || loading}
                            onClick={handleSubmit}
                        >
                            {existingCode === null
                                ? t("registerNewKey")
                                : t("updateKey")}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
