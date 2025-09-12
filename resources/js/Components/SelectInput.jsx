import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import Select from "react-select";

export default forwardRef(function SelectInput(
    {
        className = "",
        isFocused = false,
        value,
        onChange,
        options = [],
        ...props
    },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused && localRef.current) {
            localRef.current.focus();
        }
    }, [isFocused]);

    const customStyles = {
        control: (base) => ({
            ...base,
            borderColor: "#9CAADE",
            borderRadius: "0.5rem",
            minHeight: "42px",
            boxShadow: "none",
            "&:hover": { borderColor: "#64748B" },
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#64748B",
            "&:hover": { color: "#1f1f1f" },
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        option: (base, state) => ({
            ...base,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: state.isSelected ? "#84af83" : "#fff",
            color: state.isSelected ? "#ffffff" : "#1f1f1f",
            "&:hover": { backgroundColor: "#84af832a", color: "#1f1f1f" },
        }),
        menu: (base) => ({
            ...base,
            borderRadius: "0.5rem",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }),
        singleValue: (base) => ({
            ...base,
            display: "flex",
            color: "#1f1f1f",
            alignItems: "center",
            gap: "8px",
        }),
    };

    return (
        <Select
            {...props}
            inputRef={localRef}
            className={className}
            classNamePrefix="custom-select"
            options={options}
            isSearchable={false}
            value={options.find((opt) => opt.value === value) || null}
            onChange={(option) =>
                onChange({ target: { value: option?.value } })
            }
            styles={customStyles}
            formatOptionLabel={(option) => (
                <div className="flex items-center gap-2">
                    {option.icon && <span>{option.icon}</span>}
                    <span>{option.label}</span>
                </div>
            )}
        />
    );
});
