import { useEffect, useState } from "react";
import axios from "axios";
import InputError from "./InputError";
import LightButton from "./LightButton";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import HotelPageEditor from "./HotelPageEditor";

export default function HotelPageModal({
    onClose,
    selectedHotel = null,
    title = "Edit page",
    description = "Edit individual pages here.",
}) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
    }, []);
    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 200);
    };

    const [formErrors, setFormErrors] = useState({});
    const [existingPage, setExistingPage] = useState(null);
    const [formData, setFormData] = useState({
        hotel_id: selectedHotel?.id ?? null,
        title: existingPage?.title ?? "",
        content: existingPage?.content ?? "",
    });

    // Handles field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        console.log(name, value);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setFormErrors({}); // reset

        try {
            const response = await axios.post("/hotel-pages", formData);
            console.log("Saved:", response.data);

            // close modal after success
            handleClose();
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setFormErrors(err.response.data.errors); // show validation errors
            } else {
                console.error("Unexpected error:", err);
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
                        <InputLabel
                            htmlFor="title"
                            value="Page name"
                            className="text-[#475569] text-xs font-medium"
                        />
                        <TextInput
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            type="text"
                            className="date-inp block w-full"
                            placeholder="Page name"
                            required
                        />
                        <InputError message={formErrors.title?.[0]} />
                    </div>
                    <div className="space-y-1">
                        <HotelPageEditor
                            formData={formData}
                            existingPage={existingPage}
                            handleChange={handleChange}
                        />
                        <InputError message={formErrors.content?.[0]} />
                    </div>
                </div>

                <div className="flex items-center gap-2 justify-end flex-wrap">
                    {Object.keys(formErrors).length > 0 && (
                        <InputError message="Fix the errors in the form." />
                    )}
                    <LightButton onClick={handleClose}>Cancel</LightButton>
                    <PrimaryButton
                        disabled={!selectedHotel}
                        onClick={handleSave}
                    >
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}
