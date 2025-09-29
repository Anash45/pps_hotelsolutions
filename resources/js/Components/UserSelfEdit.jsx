import { useState } from "react";
import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import { usePage, router } from "@inertiajs/react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import Divider from "./Divider";
import SelectInput from "./SelectInput";
import AskDetails from "./AskDetails";
import axios from "axios";
import FlashMessage from "./FlashMessage";

export default function UserSelfEdit() {
    const [showAskDetails, setShowAskDetails] = useState(false);

    if (showAskDetails) {
        return <AskDetails />;
    }

    const { codeDetails } = usePage().props;
    const [formErrors, setFormErrors] = useState({});
    const [formSuccess, setFormSuccess] = useState("");
    const [gdprConsent, setGdprConsent] = useState(true);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        salutation: "",
        title: "",
        first_name: "",
        last_name: "",
        room_number: "",
        phone_number: "",
        email: "",
        stay_from: "",
        stay_till: "",
        gdpr_consent: gdprConsent,
        code_id: codeDetails?.code ?? null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});
        setFormSuccess("");
        setLoading(true);

        try {
            const response = await axios.post(
                route("keyassignment.userStore"),
                formData
            );

            if (response.data.success) {
                setLoading(false);
                // ✅ show success popup/box
                console.log("✅ Saved:", response.data.message);
                setFormSuccess(response.data.message);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                // you can also set some success state to trigger a UI message
            } else {
                setLoading(false);
                // ❌ backend returned failure (e.g. duplicate assignment)
                console.log("⚠️ Error:", response.data.message);
                setFormErrors({ general: [response.data.message] });
            }
        } catch (error) {
            setLoading(false);
            if (error.response?.status === 422) {
                // Laravel validation or custom error
                const data = error.response.data;
                console.log("⚠️ Validation failed:", data);

                setFormErrors(data.errors || { general: [data.message] });
            } else {
                console.error("Unexpected error:", error);
                setFormErrors({ general: ["Something went wrong."] });
            }
        }
    };

    console.log(formErrors);

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
                <h2 className="text-lg text-[#201A20] font-semibold">
                    Register Key Finder
                </h2>
                <p className="text-xs font-medium text-[#475569]">
                    Setup key finder
                </p>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
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
                        />
                        <InputError message={formErrors.stay_from} />
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
                        />
                        <InputError message={formErrors.stay_till} />
                    </div>
                </div>
                <Divider />
                <div className="grid grid-cols-1 gap-3">
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
                        <InputError message={formErrors.salutation} />
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
                        <InputError message={formErrors.title} />
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
                        />
                        <InputError message={formErrors.first_name} />
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
                        />
                        <InputError message={formErrors.last_name} />
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
                        <InputError message={formErrors.room_number} />
                    </div>

                    {/* Mobile phone number */}
                    <div>
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
                        <InputError message={formErrors.phone_number} />
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
                        />
                        <InputError message={formErrors.email} />
                    </div>
                </div>
            </div>

            <FlashMessage message={formSuccess} />
            <div className="flex items-center gap-2 justify-end flex-wrap">
                {loading ? <p className="text-sm">Loading...</p> : ""}
                {Object.keys(formErrors).length > 0 && (
                    <InputError
                        message={`${
                            formErrors?.general ?? "Fix the errors in the form."
                        }`}
                    />
                )}
                <LightButton onClick={() => setShowAskDetails(true)}>
                    Cancel
                </LightButton>
                <PrimaryButton disabled={loading} type="submit">Save</PrimaryButton>
            </div>
        </form>
    );
}
