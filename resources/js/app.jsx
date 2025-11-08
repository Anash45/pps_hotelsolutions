import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./context/ModalProvider";
import { PageProvider } from "./context/PageProvider";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import axios from "axios"; // ← needed for switching later
import { TranslationProvider } from "./context/TranslationProvider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Get current locale (if shared from Laravel middleware)
        const currentLocale = props.initialPage.props.locale || "en";

        const handleLangChange = async (lang) => {
            console.log("Switching language to:", lang);

            try {
                const response = await axios.post("/language", {
                    locale: lang,
                });
                console.log("Language API response:", response.data);
            } catch (error) {
                console.error(
                    "Error switching language:",
                    error.response?.data || error.message
                );
            }

            // Reload to apply new locale
            window.location.reload();
        };

        root.render(
            <TranslationProvider locale={currentLocale}>
                <PageProvider>
                    <ModalProvider>
                        <LanguageSwitcher
                            currentLocale={currentLocale}
                            onChange={handleLangChange}
                        />
                        <App {...props} />
                    </ModalProvider>
                </PageProvider>
            </TranslationProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
