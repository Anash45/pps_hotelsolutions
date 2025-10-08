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

export default function CreateKeyModal({
    onClose,
    keyTypes,
    selectedHotel,
    onSuccess,
    code = null,
    title = "Register new key",
    description = "Scan QR code (barcode scanner input line) - or insert code/URL",
}) {
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

    // fetch domain at component mount
    useEffect(() => {
        (async () => {
            const domain = await getDomain();
            console.log("Fetched domain:", domain);
            setLinkDomain(domain); // update local state
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
        hotel_id: selectedHotel ?? null, // ✅ include here
        salutation: existingCode?.key_assignment?.salutation ?? "",
        title: existingCode?.key_assignment?.title ?? "",
        first_name: existingCode?.key_assignment?.first_name ?? "",
        last_name: existingCode?.key_assignment?.last_name ?? "",
        room_number: existingCode?.key_assignment?.room_number ?? "",
        phone_number: existingCode?.key_assignment?.phone_number ?? "",
        email: existingCode?.key_assignment?.email ?? "",
        stay_from: existingCode?.key_assignment?.stay_from ?? "",
        stay_till: existingCode?.key_assignment?.stay_till ?? "",
        gdpr_consent: existingCode?.key_assignment?.gdpr_consent ?? gdprConsent, // keep inside formData
        code_id: existingCode?.id ?? null,
        ...(existingCode ? { id: existingCode.key_assignment.id } : {}),
    });

    console.log(selectedHotel, keyTypes, keyTypeId, existingCode);

    const [formErrors, setFormErrors] = useState({});
    const [barcodeInput, setBarcodeInput] = useState(existingCode?.code ?? "");
    const [recognized, setRecognized] = useState(
        existingCode?.code ? existingCode.code !== "" : false
    );
    const [selectedCode, setSelectedCode] = useState(existingCode ?? null);
    const [recognizeError, setRecognizeError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");

    // Sync gdprConsent when changed (if you add a checkbox)
    const handleGdprChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            gdpr_consent: e.target.checked,
        }));

        setGdprConsent(e.target.checked);
    };

    // Sync hotel_id when hotel changes
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            hotel_id: selectedHotel, // ✅ always in sync
        }));
    }, [selectedHotel]);

    // When a code is selected
    useEffect(() => {
        if (selectedCode) {
            setFormData((prev) => ({
                ...prev,
                code_id: selectedCode.id,
            }));
        }
    }, [selectedCode]);

    useEffect(() => {
        if (existingCode === null) {
            setRecognized(false);
            setSelectedCode(null);
            setKeyTypeId(null);
        }
        setRecognizeError("");
    }, [barcodeInput, selectedHotel]);

    // Handles field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        console.log(name, value);
    };

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!recognized || !selectedCode) return;

        const url = formData.id ? `/keys/${formData.id}` : "/keys";
        const method = formData.id ? "put" : "post";

        try {
            const res = await axios[method](url, formData);

            console.log(formData);

            console.log("✅ Success response:", res.data);
            setFormErrors({});

            setTimeout(() => {
                handleClose();
            }, 2000);
            onSuccess();
            setLoading(false);
            if (existingCode !== null) {
                setSubmitSuccess("Key has been updated!");
            } else {
                setSubmitSuccess("Key has been created!");
            }
        } catch (err) {
            setLoading(false);
            if (err.response?.data?.errors) {
                console.log("❌ Validation errors:", err.response.data.errors);
                setFormErrors(err.response.data.errors);
            } else {
                console.error("❌ Unexpected error:", err);
            }
        } finally {
            setLoading(false);
            console.log("📌 Request finished");
        }
    };

    const handleRecognize = async () => {
        setRecognizeError("");
        setRecognized(false);
        setSelectedCode(null);

        if (!barcodeInput.trim() || !selectedHotel) {
            setRecognizeError("Please enter barcode/URL and select a hotel.");
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
                console.log("✅ Recognized:", res.data.code);
            } else {
                setRecognizeError("Key not recognized or already assigned.");
            }
        } catch (e) {
            if (e.response) {
                if (e.response.status === 404) {
                    setRecognizeError("Code not found.");
                } else if (e.response.status === 422) {
                    setRecognizeError(
                        e.response.data.error || "Code already active/assigned."
                    );
                } else {
                    setRecognizeError("Unexpected error occurred.");
                }
                console.error("❌ Error response:", e.response.data);
            } else {
                setRecognizeError("Network error.");
                console.error("❌ Network/Unknown error:", e);
            }
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
                        {title}
                    </h2>
                    {description && (
                        <p className="text-xs font-medium text-[#475569]">
                            {description}
                        </p>
                    )}
                </div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex md:flex-row flex-col gap-3 items-end">
                            <div className="space-y-1 grow">
                                <InputLabel
                                    htmlFor="barcode"
                                    value="Barcode / URL"
                                    className="text-[#475569] text-xs font-medium"
                                />
                                <TextInput
                                    id="barcode"
                                    name="barcode"
                                    type="text"
                                    className="block w-full"
                                    placeholder="Barcode or URL"
                                    value={barcodeInput}
                                    onChange={(e) =>
                                        setBarcodeInput(e.target.value)
                                    }
                                    required
                                    readOnly={!!existingCode} // ✅ lock field if existingCode is set
                                />
                            </div>

                            {/* ✅ Show button only when creating new (existingCode is null) */}
                            {!existingCode && (
                                <div>
                                    <PrimaryButton onClick={handleRecognize}>
                                        <div className="py-[1px]">
                                            Recognize
                                        </div>
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                        {recognized && selectedCode && (
                            <div className="text-green-600 text-sm">
                                Key recognized: {linkDomain}/key/{selectedCode.code}
                            </div>
                        )}
                        <InputError message={recognizeError} />
                    </div>
                    {submitSuccess !== "" && (
                        <Alert type="success" message={submitSuccess} />
                    )}

                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                        {/* Disable all inputs if not recognized */}
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="key_type"
                                value="Key Type"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                id="key_type"
                                value={keyTypeId}
                                onChange={() => {
                                    console.log("Readonly!");
                                }}
                                className="w-full block"
                                placeholder="Key Type"
                                options={keyTypesOptions}
                            />
                            <InputError message={formErrors.key_type?.[0]} />
                        </div>
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="stay_from"
                                value="Stay from"
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
                                value="Stay till"
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
                                Enter guest data (name, title, salutation, email
                                etc.)
                            </span>
                            <span className="text-xs text-slate600">
                                If disabled, no person names will be saved for
                                new keys.
                            </span>
                        </div>
                    </label>
                    <Divider />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        {/* Salutation */}
                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="salutation"
                                value="Salutation"
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

                        {/* Title */}
                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="title"
                                value="Title"
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

                        {/* First name */}
                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="first_name"
                                value="First Name"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="First name"
                                required
                            />
                            <InputError message={formErrors.first_name?.[0]} />
                        </div>

                        {/* Last name */}
                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="last_name"
                                value="Last Name"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="Last name"
                                required
                            />
                            <InputError message={formErrors.last_name?.[0]} />
                        </div>

                        {/* Room number */}
                        <div className={`space-y-1`}>
                            <InputLabel
                                htmlFor="room_number"
                                value="Room Number"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="room_number"
                                name="room_number"
                                value={formData.room_number}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="Room #"
                            />
                            <InputError message={formErrors.room_number?.[0]} />
                        </div>

                        {/* Mobile phone number */}
                        <div
                            className={`space-y-1 ${
                                keyTypeId == 2 ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="phone_number"
                                value="Mobile Phone Number (for Key finder only)"
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

                        {/* Email (full width) */}
                        <div
                            className={`space-y-1 ${
                                gdprConsent ? "block" : "hidden"
                            }`}
                        >
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
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
                        {loading ? <p className="text-sm">Loading...</p> : ""}
                        {Object.keys(formErrors).length > 0 && (
                            <InputError message="Fix the errors in the form." />
                        )}
                        <LightButton onClick={handleClose}>Cancel</LightButton>
                        <PrimaryButton
                            disabled={!recognized || loading}
                            onClick={handleSubmit}
                        >
                            {existingCode === null
                                ? "Register new Key"
                                : "Update Key"}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
