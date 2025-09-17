import { createContext, useContext, useState } from "react";
import TestModal from "@/Components/TestModal";

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
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    aria-modal="true"
                    role="dialog"
                >
                    {/* 🔹 Shared Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* 🔹 Modal Container (so each modal stays centered) */}
                    <div className="relative z-10">
                        {modal?.name === "TestModal" && (
                            <TestModal {...modal.props} onClose={closeModal} />
                        )}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
