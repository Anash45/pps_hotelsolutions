export default function LightButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center font-normal rounded-md border border-transparent bg-[#F1F5F9] px-4 py-[7px] text-sm leading-6 tracking-widest text-[#1f1f1f] transition duration-150 ease-in-out hover:bg-[#DBE0E5] focus:bg-[#DBE0E5] focus:outline-none focus:ring-2 focus:ring-[#DBE0E5] focus:ring-offset-2 active:bg-[#DBE0E5] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
