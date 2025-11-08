import { useState } from "react";
import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import { usePage } from "@inertiajs/react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import InputError from "./InputError";
import Divider from "./Divider";
import SelectInput from "./SelectInput";
import AskDetails from "./AskDetails";
import axios from "axios";
import FlashMessage from "./FlashMessage";
import { useLang } from "@/context/TranslationProvider";

export default function UserSelfEdit() {
    const [showAskDetails, setShowAskDetails] = useState(false);
    const { t } = useLang("Components.userSelfEdit");

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
                setFormSuccess(response.data.message);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                setLoading(false);
                setFormErrors({ general: [response.data.message] });
            }
        } catch (error) {
            setLoading(false);
            if (error.response?.status === 422) {
                const data = error.response.data;
                setFormErrors(data.errors || { general: [data.message] });
            } else {
                setFormErrors({ general: [t("genericError")] });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
                <h2 className="text-lg text-[#201A20] font-semibold">
                    {t("title")}
                </h2>
                <p className="text-xs font-medium text-[#475569]">
                    {t("subtitle")}
                </p>
            </div>

            <div className="space-y-3">
                {/* Stay Dates */}
                <div className="grid grid-cols-1 gap-3">
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
                        />
                        <InputError message={formErrors.stay_from} />
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
                        />
                        <InputError message={formErrors.stay_till} />
                    </div>
                </div>

                <Divider />

                <div className="grid grid-cols-1 gap-3">
                    {/* Salutation */}
                    {gdprConsent && (
                        <div className="space-y-1">
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
                                    {
                                        value: "Mr",
                                        label: t("mr"),
                                    },
                                    {
                                        value: "Mrs",
                                        label: t("mrs"),
                                    },
                                    {
                                        value: "Ms",
                                        label: t("ms"),
                                    },
                                ]}
                            />
                            <InputError message={formErrors.salutation} />
                        </div>
                    )}

                    {/* Title */}
                    {gdprConsent && (
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="title"
                                value={t("titleLabel")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                type="text"
                                className="block w-full"
                                placeholder={t("titlePlaceholder")}
                            />
                            <InputError message={formErrors.title} />
                        </div>
                    )}

                    {/* First name */}
                    {gdprConsent && (
                        <div className="space-y-1">
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
                                placeholder={t(
                                    "firstNamePlaceholder"
                                )}
                            />
                            <InputError message={formErrors.first_name} />
                        </div>
                    )}

                    {/* Last name */}
                    {gdprConsent && (
                        <div className="space-y-1">
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
                                placeholder={t(
                                    "lastNamePlaceholder"
                                )}
                            />
                            <InputError message={formErrors.last_name} />
                        </div>
                    )}

                    {/* Room number */}
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
                            placeholder={t(
                                "roomNumberPlaceholder"
                            )}
                        />
                        <InputError message={formErrors.room_number} />
                    </div>

                    {/* Mobile phone */}
                    <div>
                        <InputLabel
                            htmlFor="phone_number"
                            value={t("phoneNumber")}
                            className="text-[#475569] text-xs font-medium"
                        />
                        <TextInput
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            type="tel"
                            className="block w-full"
                            placeholder={t(
                                "phoneNumberPlaceholder"
                            )}
                        />
                        <InputError message={formErrors.phone_number} />
                    </div>

                    {/* Email */}
                    {gdprConsent && (
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="email"
                                value={t("email")}
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="block w-full"
                                placeholder={t("emailPlaceholder")}
                            />
                            <InputError message={formErrors.email} />
                        </div>
                    )}
                </div>
            </div>

            <FlashMessage message={formSuccess} />
            <div className="flex items-center gap-2 justify-end flex-wrap">
                {loading && (
                    <p className="text-sm">{t("loading")}</p>
                )}
                {Object.keys(formErrors).length > 0 && (
                    <InputError
                        message={
                            formErrors?.general ?? t("formError")
                        }
                    />
                )}
                <LightButton onClick={() => setShowAskDetails(true)}>
                    {t("cancel")}
                </LightButton>
                <PrimaryButton disabled={loading} type="submit">
                    {t("save")}
                </PrimaryButton>
            </div>
        </form>
    );
}
