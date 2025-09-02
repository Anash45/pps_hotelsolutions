export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center font-normal rounded-md border border-transparent bg-primary px-4 py-[7px] text-sm leading-6 tracking-widest text-white transition duration-150 ease-in-out hover:bg-[#6CAC6A] focus:bg-[#6CAC6A] focus:outline-none focus:ring-2 focus:ring-[#6CAC6A] focus:ring-offset-2 active:bg-[#6CAC6A] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
