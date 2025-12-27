import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./context/ModalProvider";
import { PageProvider } from "./context/PageProvider";
import { TranslationProvider } from "./context/TranslationProvider";
import { setupConsoleLogging } from "./utils/consoleLogger";
import ErrorBoundary from "./Components/ErrorBoundary";
import { Head } from "@inertiajs/react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

setupConsoleLogging();
console.log("[Boot] Inertia app initializing");

// Prevent browser back/forward cache (bfcache) issues on iOS Safari
if (typeof window !== 'undefined') {
    // Handle page restoration from cache - forces reload
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            console.log("[Boot] Page restored from bfcache, reloading to prevent white screen");
            window.location.reload();
        }
    });
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        try {
            return await resolvePageComponent(
                `./Pages/${name}.jsx`,
                import.meta.glob("./Pages/**/*.jsx")
            );
        } catch (err) {
            console.error("[Resolve Error] Failed to load page:", name, err);
            return () => (
                <>
                    <Head title="Error Loading Page" />
                    <div className="min-h-screen flex items-center justify-center bg-gray-100">
                        <div className="max-w-md w-full bg-white shadow rounded p-6">
                            <h1 className="text-xl font-semibold text-red-600">
                                Failed to load page
                            </h1>
                            <p className="text-sm text-gray-600">
                                An error occurred while loading "{name}". Check
                                the console for details.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-3 bg-primary hover:bg-primary text-white px-3 py-2 rounded"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </>
            );
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Get current locale (if shared from Laravel middleware)
        const currentLocale = props.initialPage.props.locale || "en";

        root.render(
            <ErrorBoundary>
                <TranslationProvider locale={currentLocale}>
                    <PageProvider>
                        <ModalProvider>
                            <App {...props} />
                        </ModalProvider>
                    </PageProvider>
                </TranslationProvider>
            </ErrorBoundary>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
