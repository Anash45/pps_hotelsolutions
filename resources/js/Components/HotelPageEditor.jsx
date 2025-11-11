import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputLabel from "./InputLabel";

// Toolbar config
const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
];

const modules = { toolbar: toolbarOptions };
const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "align",
];

const HotelPageEditor = ({
    fieldName,
    formData,
    handleChange,
    label,
    placeholder,
}) => {
    const quillRef = useRef();
    const [editorValue, setEditorValue] = useState(formData?.[fieldName] || "");

    // Sync editor if parent updates
    useEffect(() => {
        if (quillRef.current && formData?.[fieldName] !== editorValue) {
            const editor = quillRef.current.getEditor();
            editor.setContents(
                editor.clipboard.convert(formData[fieldName] || "")
            );
            setEditorValue(formData[fieldName] || "");
        }
    }, [formData?.[fieldName]]);

    const handleEditorChange = (content) => {
        setEditorValue(content);
        handleChange({ target: { name: fieldName, value: content } });
    };

    return (
        <div className="space-y-1">
            {label && (
                <InputLabel
                    value={label}
                    className="text-[#475569] text-xs font-medium"
                />
            )}
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={editorValue}
                modules={modules}
                formats={formats}
                onChange={handleEditorChange}
                placeholder={placeholder}
                className="min-h-[250px] border rounded bg-white"
            />
        </div>
    );
};

export default HotelPageEditor;
