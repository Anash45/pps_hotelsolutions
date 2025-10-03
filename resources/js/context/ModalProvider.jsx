import { createContext, useContext, useState } from "react";
import TestModal from "@/Components/TestModal";
import CreateKeyModal from "@/Components/CreateKeyModal";
import { router } from "@inertiajs/react";
import HotelPageModal from "@/Components/HotelPageModal";
import HotelButtonsModal from "@/Components/HotelButtonsModal";
import HotelWifiModal from "@/Components/HotelWifiModal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modal, setModal] = useState(null);

    const openModal = (name, props = {}) => setModal({ name, props });
    const closeModal = () => setModal(null);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            {modal && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto sm:py-10 py-4 sm:px-4 px-2"
                    aria-modal="true"
                    role="dialog"
                >
                    {/* 🔹 Shared Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* 🔹 Modal Container */}
                    {modal?.name === "CreateKeyModal" && (
                        <CreateKeyModal
                            {...modal.props}
                            onSuccess={() => {
                                router.reload({ only: ["codes"] });
                            }}
                            onClose={closeModal}
                        />
                    )}
                    {modal?.name === "HotelPageModal" && (
                        <HotelPageModal
                            {...modal.props}
                            onSuccess={() => {
                                router.reload({ only: ["codes"] });
                            }}
                            onClose={closeModal}
                        />
                    )}
                    {modal?.name === "HotelButtonsModal" && (
                        <HotelButtonsModal
                            {...modal.props}
                            onClose={closeModal}
                        />
                    )}
                    {modal?.name === "HotelWifiModal" && (
                        <HotelWifiModal {...modal.props} onClose={closeModal} />
                    )}
                </div>
            )}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) {
        console.warn("⚠️ useModal() called outside of <ModalProvider>.");
        // Safe no-op fallbacks prevent runtime crashes
        return {
            openModal: () =>
                console.warn("openModal() called with no provider"),
            closeModal: () =>
                console.warn("closeModal() called with no provider"),
        };
    }

    return context;
};
