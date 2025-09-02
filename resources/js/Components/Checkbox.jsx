export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-[#84AF83] shadow-sm focus:ring-[#84AF83] ' +
                className
            }
        />
    );
}
