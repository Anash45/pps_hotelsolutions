import { useState, useEffect, useRef } from "react";

export default function LanguageSwitcher({ currentLocale = "en", onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const languages = [
        { code: "en", label: "English", flag: "/images/uk.png" },
        { code: "de", label: "Deutsch", flag: "/images/germany.png" },
    ];

    const handleSelect = (code) => {
        setOpen(false);
        onChange?.(code);
    };

    const currentLang =
        languages.find((l) => l.code === currentLocale) || languages[0];

    // ✅ Close the drop-up when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="px-4" ref={ref}>
            <div className="relative">
                {/* Drop-up menu */}
                {open && (
                    <div
                        className="absolute bottom-12 left-0 right-0 mb-2 w-full rounded-lg shadow-lg bg-white border border-gray-200 transition-all duration-150"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={`flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 ${
                                    lang.code === currentLocale
                                        ? "font-semibold text-primary"
                                        : "text-gray-700"
                                }`}
                            >
                                <img
                                    src={lang.flag}
                                    alt={lang.label}
                                    className="h-4 w-4 mr-2"
                                />
                                {lang.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Floating trigger button with current flag */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full rounded-lg text-base p-3 bg-primary text-white flex justify-start gap-3 items-center hover:bg-primary focus:outline-none"
                    title="Change language"
                >
                    <img
                        src={currentLang.flag}
                        alt={currentLang.label}
                        className="h-6 w-6 rounded-full"
                    />
                    <span>{currentLang.label}</span>
                </button>
            </div>
        </div>
    );
}
