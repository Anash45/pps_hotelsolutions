// Modal.jsx
import { X } from "lucide-react";
import React from "react";

const NotificationModal = ({ isOpen, onClose, title, description }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-start justify-center p-4 bg-black bg-opacity-70 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[14px] mt-8 max-w-[500px] w-full p-8  notification-modal relative"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                <button
                    onClick={onClose}
                    className="rounded-full bg-black/10 h-8 w-8 flex flex-col items-center justify-center absolute top-4 right-4"
                >
                    <X strokeWidth={2} className="text-black h-4" />
                </button>
                <div className="flex flex-col">
                    <h2 className="text-xl text-[#1F1F1F] font-semibold">
                        {title}
                    </h2>
                    <p className="text-[#929CAB] text-sm leading-5 font-medium">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
