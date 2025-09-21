// ImageUploader.jsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react"; // install lucide-react or replace with your icon lib

export default function BrandingImageUploader({
    name,
    value,
    onChange,
    label,
    maxSizeMB = 10,
}) {
    const onDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles.length === 0) return;

            const file = acceptedFiles[0];
            // Wrap as fake event so it works with handleBrandingChange
            onChange({
                target: {
                    name,
                    value: file,
                },
            });
        },
        [name, onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [],
            "image/jpeg": [],
            "image/jpg": [],
            "image/gif": [],
            "image/svg+xml": [],
        },
        maxFiles: 1,
        maxSize: maxSizeMB * 1024 * 1024,
    });

    const handleRemove = (e) => {
        e.stopPropagation(); // prevent triggering file dialog
        onChange({
            target: {
                name,
                value: null,
            },
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <div
                {...getRootProps()}
                className={`relative border rounded-lg px-[14px] py-4 cursor-pointer transition ${
                    isDragActive ? "border-primary" : "border-[#9CAADE]"
                }`}
            >
                <input {...getInputProps()} />

                {value ? (
                    <div className="relative inline-block mb-2">
                        <img
                            src={
                                typeof value === "string"
                                    ? value // when it's a URL (loaded from backend)
                                    : URL.createObjectURL(value) // when it's a File object
                            }
                            alt="Preview"
                            className="max-h-20 max-w-full rounded-md object-contain"
                        />
                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
                        >
                            <X size={14} className="text-gray-600" />
                        </button>
                    </div>
                ) : null}

                <div className="space-y-1">
                    <p className="text-slate600 text-sm">
                        <span className="font-bold">Click to upload</span> or
                        drag and drop
                    </p>
                    <p className="text-slate600 text-xs">
                        File size should be less than {maxSizeMB}MB
                    </p>
                </div>
            </div>
        </div>
    );
}
