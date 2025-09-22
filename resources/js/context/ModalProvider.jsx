import { createContext, useContext, useState } from "react";
import TestModal from "@/Components/TestModal";
import CreateKeyModal from "@/Components/CreateKeyModal";
import { router } from "@inertiajs/react";
import HotelPageModal from "@/Components/HotelPageModal";

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
                </div>
            )}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
