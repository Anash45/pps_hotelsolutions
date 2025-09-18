import { useEffect, useState } from "react";
import InputError from "./InputError";
import SelectInput from "./SelectInput";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import LightButton from "./PrimaryButton copy";
import Divider from "./Divider";
import axios from "axios";

export default function CreateKeyModal({
    onClose,
    keyTypes,
    selectedHotel,
    title = "Register new key",
    description = "Scan QR code (barcode scanner input line) - or insert code/URL",
}) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
    }, []);
    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 200);
    };
    console.log(selectedHotel);

    const LINK_URL =
        import.meta.env.VITE_LINK_URL ||
        "https://test-app.ppshotelsolutions.de";

    const keyTypesOptions = keyTypes.map((kt) => ({
        value: kt.id,
        label: kt.display_name,
    }));

    const [showFields, setShowFields] = useState(false);
    const [gdprConsent, setGdprConsent] = useState(false);
    const [formData, setFormData] = useState({
        salutation: "",
        title: "",
        first_name: "",
        last_name: "",
        room_number: "",
        mobile_number: "",
        email: "",
        stay_from: "",
        stay_till: "",
        keyType: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [barcodeInput, setBarcodeInput] = useState("");
    const [recognized, setRecognized] = useState(false);
    const [selectedCode, setSelectedCode] = useState(null);
    const [recognizeError, setRecognizeError] = useState("");

    useEffect(() => {
        setRecognized(false);
        setSelectedCode(null);
        setRecognizeError("");
    }, [barcodeInput, selectedHotel]);

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
            } else {
                setRecognizeError("Key not recognized or already assigned.");
            }
        } catch (e) {
            setRecognizeError("Recognition failed.");
        }
    };

    // Handles field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!recognized || !selectedCode) return;

        const url = formData.id ? `/keys/${formData.id}` : "/keys";
        const method = formData.id ? "put" : "post";

        axios[method](url, {
            ...formData,
            code_id: selectedCode.id,
            hotel_id: selectedHotel,
            gdprConsent: gdprConsent,
        })
            .then(() => setFormErrors({}))
            .catch((err) => {
                if (err.response?.data?.errors) {
                    setFormErrors(err.response.data.errors);
                }
            });
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
                                />
                            </div>
                            <div>
                                <PrimaryButton onClick={handleRecognize}>
                                    <div className="py-[1px]">Recognize</div>
                                </PrimaryButton>
                            </div>
                        </div>
                        {recognized && selectedCode && (
                            <div className="text-green-600 text-sm">
                                Key recognized: {LINK_URL}/{selectedCode.code}
                            </div>
                        )}
                        <InputError message={recognizeError} />
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                        {/* Disable all inputs if not recognized */}
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="keyType"
                                value="Key Type"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                id="keyType"
                                name="keyType"
                                onChange={handleChange}
                                className="w-full block"
                                placeholder="Key Type"
                                options={keyTypesOptions}
                            />
                            <InputError message={formErrors.keyType?.[0]} />
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
                            name="gdpr_consent"
                            checked={gdprConsent}
                            onChange={(e) => setGdprConsent(e.target.checked)}
                            id="gdpr_consent"
                            className="text-primary rounded"
                        />
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium text-slate600">
                                Enter guest data (name, title, salutation)
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
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="salutation"
                                value="Salutation"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                id="salutation"
                                name="salutation"
                                onChange={handleChange}
                                className="w-full block"
                                options={[
                                    { value: "mr", label: "Mr." },
                                    { value: "mrs", label: "Mrs." },
                                    { value: "ms", label: "Ms." },
                                ]}
                            />
                            <InputError message={formErrors.salutation?.[0]} />
                        </div>

                        {/* Title */}
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="title"
                                value="Title"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="title"
                                name="title"
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="e.g. Dr."
                            />
                            <InputError message={formErrors.title?.[0]} />
                        </div>

                        {/* First name */}
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="first_name"
                                value="First Name"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="first_name"
                                name="first_name"
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="First name"
                                required
                            />
                            <InputError message={formErrors.first_name?.[0]} />
                        </div>

                        {/* Last name */}
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="last_name"
                                value="Last Name"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="last_name"
                                name="last_name"
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="Last name"
                                required
                            />
                            <InputError message={formErrors.last_name?.[0]} />
                        </div>

                        {/* Room number */}
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="room_number"
                                value="Room Number"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="room_number"
                                name="room_number"
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder="Room #"
                            />
                            <InputError message={formErrors.room_number?.[0]} />
                        </div>

                        {/* Mobile phone number */}
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="mobile_number"
                                value="Mobile Phone Number"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="mobile_number"
                                name="mobile_number"
                                onChange={handleChange}
                                type="tel"
                                className="block w-full"
                                placeholder="+49 123 456789"
                            />
                            <InputError message={formErrors.mobile_number?.[0]} />
                        </div>

                        {/* Email (full width) */}
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="email"
                                name="email"
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
                        <LightButton onClick={handleClose}>Cancel</LightButton>
                        <PrimaryButton disabled={!recognized} onClick={handleSubmit}>
                            Register new Key
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
