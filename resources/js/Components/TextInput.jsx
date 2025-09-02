import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
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
        <input
            {...props}
            type={type}
            className={
                'rounded-lg placeholder:text-[#64748B] text-grey900 text-sm leading-none px-[14px] py-[13px] border border-[#9CAADE] focus:outline-0 focus:border-primary focus:shadow-none' +
                className
            }
            ref={localRef}
        />
    );
});
