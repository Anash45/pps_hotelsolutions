import { useEffect, useState } from "react";
import InputError from "./InputError";
import SelectInput from "./SelectInput";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

export default function CreateKeyModal({
    onClose,
    keyTypes,
    codes,
    title = "Register new key",
    description = "Scan QR code (barcode scanner input line) - or insert code/URL",
}) {
    const [show, setShow] = useState(false);

    // Animate in after mount
    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
    }, []);

    // Close with fade-out animation
    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 200); // match transition duration
    };

    // FUNCTIONS INSIDE POPUP
    const LINK_URL =
        import.meta.env.VITE_LINK_URL ||
        "https://test-app.ppshotelsolutions.de";
    const selectOptions = codes.map((c) => ({
        value: c.id,
        label: `${LINK_URL}/${c.code}`,
    }));

    const keyTypesOptions = keyTypes.map((kt) => ({
        value: kt.id,
        label: kt.display_name,
    }));

    console.log(keyTypes);

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
                    <div className="flex md:flex-row flex-col gap-3 items-end">
                        <div className="space-y-1 grow">
                            <InputLabel
                                htmlFor="title"
                                value="Title"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                isSearchable={true}
                                id="title"
                                name="title"
                                className="w-full block"
                                placeholder="Neue Seite"
                                options={selectOptions}
                            />
                            <InputError className="mt-1" />
                        </div>
                        <div>
                            <PrimaryButton>
                                <div className="py-[1px]">Recognize</div>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="keyType"
                                value="Type"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <SelectInput
                                id="keyType"
                                name="keyType"
                                className="w-full block"
                                placeholder="Key Type"
                                options={keyTypesOptions}
                            />
                            <InputError className="mt-1" />
                        </div>
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="stay_from"
                                value="Stay From"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="stay_from"
                                name="stay_from"
                                type="date"
                                className="block w-full"
                                placeholder="dd.mm.yyyy"
                                required
                            />
                            <InputError className="mt-1" />
                        </div>
                        <div className="space-y-1">
                            <InputLabel
                                htmlFor="stay_till"
                                value="Stay Till"
                                className="text-[#475569] text-xs font-medium"
                            />
                            <TextInput
                                id="stay_till"
                                name="stay_till"
                                type="date"
                                className="block w-full"
                                placeholder="dd.mm.yyyy"
                                required
                            />
                            <InputError className="mt-1" />
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={handleClose}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                Close
            </button>
        </div>
    );
}
