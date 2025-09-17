import { useEffect, useState } from "react";

export default function TestModal({ onClose, title = "Hello World" }) {
    const [show, setShow] = useState(false);

    // Animate in after mount
    useEffect(() => {
        requestAnimationFrame(() => setShow(true));
    }, []);

    // Close with fade-out animation
    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 200); // match transition duration
    };

    return (
        <div
            className={`transform rounded-2xl bg-white p-6 shadow-xl transition-all duration-200 
        ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p className="mb-6 text-gray-600">This is a test modal body.</p>
            <button
                onClick={handleClose}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                Close
            </button>
        </div>
    );
}
