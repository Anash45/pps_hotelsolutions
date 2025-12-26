// TextArea.jsx
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextArea(
    { className = "", isFocused = false, value, onChange, ...props },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <textarea
            {...props}
            ref={localRef}
            value={value}
            onChange={onChange}
            className={
                "rounded-lg placeholder:text-[#64748B] text-grey900 text-sm leading-none px-[14px] py-[13px] border border-[#9CAADE] focus:outline-0 focus:border-primary focus:shadow-none resize-y min-h-[100px]" +
                className
            }
        />
    );
});
