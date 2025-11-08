import React, { createContext, useContext, useMemo } from "react";
import en from "../locales/en.json";
import de from "../locales/de.json";

const translationsMap = { en, de };
const TranslationContext = createContext();

export function TranslationProvider({ locale = "en", children }) {
    const translations = translationsMap[locale] || en;

    // Base translation function
    const tFn = (key, params = {}, baseKey = "") => {
        const fullKey = baseKey ? `${baseKey}.${key}` : key;
        const keys = fullKey.split(".");
        let str = keys.reduce((obj, k) => (obj ? obj[k] : undefined), translations);

        if (!str) str = fullKey;

        Object.keys(params).forEach((param) => {
            str = str.replace(`:${param}`, params[param]);
        });

        return str;
    };

    const value = useMemo(
        () => ({
            t: (key, params = {}, baseKey = "") => tFn(key, params, baseKey),
            locale,
        }),
        [locale, translations]
    );

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    );
}

// Custom hook for convenience
export function useLang(baseKey = "") {
    const { t } = useContext(TranslationContext);

    // Returns a t function with baseKey pre-bound
    const tWithBase = (key, params = {}) => t(key, params, baseKey);

    return { t: tWithBase };
}
