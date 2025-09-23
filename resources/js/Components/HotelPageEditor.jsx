import React, { useRef, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Custom toolbar config
const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
];

const modules = {
    toolbar: toolbarOptions,
};

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

const HotelPageEditor = ({ formData, handleChange }) => {
    const quillRef = useRef();
    const [editorValue, setEditorValue] = useState(
        formData?.content || "<p>Start writing...</p>"
    );

    useEffect(() => {
        if (quillRef.current && formData?.content) {
            const editor = quillRef.current.getEditor();
            // Only set content if it's different from current value
            if (formData.content !== editor.root.innerHTML) {
                editor.setContents(editor.clipboard.convert(formData.content));
            }
        }
    }, [formData?.content]);

    const handleEditorChange = (content, delta, source, editor) => {
        console.log("HTML:", content);
        console.log("Plain text:", editor.getText());
        console.log("Delta:", editor.getContents());

        setEditorValue(content);

        handleChange({
            target: { name: "content", value: content },
        });
    };

    return (
        <div className="space-y-4">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={editorValue}
                modules={modules}
                formats={formats}
                onChange={handleEditorChange}
                className="min-h-[250px] flex flex-col border rounded bg-white"
            />
        </div>
    );
};

export default HotelPageEditor;
