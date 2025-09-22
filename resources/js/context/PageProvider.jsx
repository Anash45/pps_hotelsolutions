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
        buttons: []
    });

    const handleBrandingChange = (e) => {
        const { name, value } = e.target;
        setBrandingFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <PageContext.Provider
            value={{ brandingFormData, setBrandingFormData, handleBrandingChange }}
        >
            {children}
        </PageContext.Provider>
    );
};
