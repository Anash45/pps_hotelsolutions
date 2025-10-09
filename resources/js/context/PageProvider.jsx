import React, { createContext, useState } from "react";

// Create Context
export const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [brandingFormData, setBrandingFormData] = useState({
        heading: "",
        primary_color: "#000000",
        background_color: "#c1c1c1",
        text_color: "#1b1b1b",
        button_text_color: "#ffffff",
        logo_image: null,
        banner_image: null,
        key_finder_page_text: "",
        page_text_color: "#000000",
        buttons: [],
    });
    const [loadingButton, setLoadingButton] = useState(null);

    const handleBrandingChange = (e) => {
        const { name, value } = e.target;

        setBrandingFormData((prev) => {
            // Default: just update the field
            let updates = { [name]: value };

            // Special case: logo_image
            if (name === "logo_image") {
                updates.logo_image_url = value
                    ? typeof value === "string"
                        ? `/storage/${value}`
                        : URL.createObjectURL(value)
                    : null;
            }

            // Special case: banner_image
            if (name === "banner_image") {
                updates.banner_image_url = value
                    ? typeof value === "string"
                        ? `/storage/${value}`
                        : URL.createObjectURL(value)
                    : null;
            }

            return { ...prev, ...updates };
        });
    };

    return (
        <PageContext.Provider
            value={{
                brandingFormData,
                setBrandingFormData,
                handleBrandingChange,
                loadingButton,
                setLoadingButton,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};
