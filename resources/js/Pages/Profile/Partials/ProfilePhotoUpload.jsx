import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { router } from "@inertiajs/react"; // 👈 needed for direct POST/PATCH
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { UploadCloud } from "lucide-react";

export default function ProfilePhotoUpload({ value, errors, maxSizeMB = 5 }) {
    const [preview, setPreview] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [customError, setCustomError] = useState("");

    useEffect(() => {
        if (typeof value === "string" && value !== "") {
            setExistingImage(value);
            setPreview(null);
        } else {
            setExistingImage(null);
        }
    }, [value]);

    const uploadPhoto = (file) => {
        const formData = new FormData();
        formData.append("profile_image", file);

        router.post(route("profile.update.photo"), formData, {
            forceFormData: true,
            onSuccess: () => {
                console.log("✅ Photo uploaded");
            },
            onError: (err) => {
                console.error("❌ Upload error:", err);
            },
        });
    };

    const onDrop = useCallback(
        (acceptedFiles, fileRejections) => {
            if (fileRejections.length > 0) {
                const rejection = fileRejections[0];
                if (rejection.errors.some((e) => e.code === "file-too-large")) {
                    setCustomError(
                        `File is too large. Max size is ${maxSizeMB} MB.`
                    );
                } else if (
                    rejection.errors.some((e) => e.code === "file-invalid-type")
                ) {
                    setCustomError(
                        "Invalid file type. Only SVG, PNG, JPG or GIF allowed."
                    );
                }
                return;
            }

            const file = acceptedFiles[0];
            setPreview(URL.createObjectURL(file));
            setExistingImage(null);
            setCustomError("");
            uploadPhoto(file); // 👈 directly upload
        },
        [maxSizeMB]
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4 space-y-2">
                <InputLabel
                    className="text-[#344054] font-medium"
                    htmlFor="photo"
                    value="Your photo"
                />
                <InputError
                    className="mt-2"
                    message={errors?.profile_image || customError}
                />
            </div>

            <div className="md:col-span-8">
                <div className="flex gap-5 items-start">
                    <img
                        src={
                            preview
                                ? preview
                                : existingImage
                                ? `/storage/${existingImage}`
                                : "/images/user-placeholder.png"
                        }
                        alt="Preview"
                        className="h-16 w-16 object-cover rounded-full"
                    />

                    <div
                        {...getRootProps()}
                        className={`grow border-2 border-gray-300 rounded-xl py-4 px-6 flex items-center justify-center cursor-pointer hover:border-gray-400 transition ${
                            isDragActive
                                ? "border-solid border-[#7F56D9] bg-purple-100"
                                : "border-dashed bg-white"
                        }`}
                    >
                        <input {...getInputProps()} id="photo" />
                        <div className="flex flex-col gap-3 items-center justify-center text-center font-inter">
                            <div className="h-10 w-10 bg-white rounded-lg border border-[#EAECF0] shadow-sm flex items-center justify-center">
                                <UploadCloud
                                    strokeWidth={2}
                                    className="text-[#475467] h-5 w-5"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#475467] text-sm">
                                    {isDragActive ? (
                                        <span className="font-semibold text-[#6941C6]">
                                            Drop like it's hot
                                        </span>
                                    ) : (
                                        <span>
                                            <span className="font-semibold text-[#6941C6]">
                                                Click to upload
                                            </span>{" "}
                                            or drag and drop
                                        </span>
                                    )}
                                </p>
                                <p className="text-[#475467] text-xs leading-[18px]">
                                    SVG, PNG, JPG or GIF (max. {maxSizeMB} MB)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
