import React, { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

// Utility: convert rgba() string → hex
function parseCssToHex(input) {
  if (!input) return "#000000";

  const ctx = document.createElement("canvas").getContext("2d");
  ctx.fillStyle = input;
  const computed = ctx.fillStyle; // browser converts it (always rgb(...))

  const match = computed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (match) {
    const [_, r, g, b] = match;
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = parseInt(x, 10).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }
  return input; // already hex or unknown
}

export default function ColorInput({ name, value, onChange, className = "" }) {
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(value || "#000000");

  // keep in sync with external value
  useEffect(() => {
    if (value) {
      setColor(parseCssToHex(value));
    }
  }, [value]);

  const handleChange = (newColor) => {
    setColor(newColor);
    onChange?.({ target: { name, value: newColor } });
  };

  const handleInputChange = (e) => {
    const inputVal = e.target.value.trim();
    const hex = parseCssToHex(inputVal);
    setColor(hex);
    onChange?.({ target: { name, value: hex } });
  };

  // close on outside click
  useEffect(() => {
    const close = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative flex items-center gap-3 ${className}`}>
      {/* Color box */}
      <div
        className="p-1 rounded-lg border border-[#CCD1D8] bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="w-[34px] h-6 rounded border border-[#CCD1D8]"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Input */}
      <input
        type="text"
        className="text-sm text-[#232323] border border-[#c0c0c0] px-2 py-1 rounded w-32"
        value={color}
        onChange={handleInputChange}
        placeholder="#RRGGBB or CSS color"
      />

      {/* Picker */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-50">
          <HexColorPicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}
