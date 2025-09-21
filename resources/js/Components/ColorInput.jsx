import React, { useState, useRef, useEffect } from "react";
import { RgbaColorPicker } from "react-colorful";

export default function ColorInput({ name, value, onChange, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState("bottom"); // "bottom" or "top"
    const wrapperRef = useRef(null);

    // Convert hex → rgba
    const hexToRgba = (hex) => {
        let cleanHex = hex.replace("#", "");
        if (cleanHex.length === 3) {
            cleanHex = cleanHex
                .split("")
                .map((ch) => ch + ch)
                .join("");
        }
        const bigint = parseInt(cleanHex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b, a: 1 };
    };

    // Convert rgba → hex (ignore alpha)
    const rgbaToHex = ({ r, g, b }) => {
        return (
            "#" +
            [r, g, b]
                .map((x) => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                })
                .join("")
        );
    };

    const [rgba, setRgba] = useState(hexToRgba(value || "#000000"));

    const handleColorChange = (newColor) => {
        setRgba(newColor);
        const hex = rgbaToHex(newColor);

        onChange({
            target: {
                name,
                value: hex, // ✅ always hex
            },
        });
    };

    // Close picker if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Decide whether to open top or bottom
    useEffect(() => {
        if (isOpen && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const pickerHeight = 200;
            setPosition(spaceBelow < pickerHeight ? "top" : "bottom");
        }
    }, [isOpen]);

    return (
        <div
            ref={wrapperRef}
            className={`relative flex items-center gap-3 ${className}`}
        >
            {/* Color box (click to toggle picker) */}
            <div
                className="p-1 rounded-lg border border-[#CCD1D8] bg-white cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    className="w-[34px] h-6 rounded border border-[#CCD1D8]"
                    style={{ backgroundColor: value }}
                ></div>
            </div>

            {/* Hex code text */}
            <span className="text-sm text-[#232323]">{value}</span>

            {/* Color picker dropdown */}
            {isOpen && (
                <div
                    className={`absolute ${
                        position === "bottom"
                            ? "top-full mt-2"
                            : "bottom-full mb-2"
                    } left-0 z-50`}
                >
                    <RgbaColorPicker color={rgba} onChange={handleColorChange} />
                </div>
            )}
        </div>
    );
}
