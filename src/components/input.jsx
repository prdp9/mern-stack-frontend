const Input = ({ type = 'text',
    placeholder = 'Enter',
    value,
    onChange,
    label,
    name,
    ...props
}) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={name}>{label && label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                className="border p-2 rounded-md "
                value={value}
                onChange={onChange}
                name={name}
                {...props}
            />
        </div>

    )
}

export default Input