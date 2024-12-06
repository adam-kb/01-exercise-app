const EditInput = ({
  label,
  name,
  placeholder,
  defaultValue,
  type = "text"
}: {
  label: string,
  name: string,
  placeholder: string,
  defaultValue: string,
  type?: string
}) => {

  const inputClasses = "peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500";

  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="mb-2 block text-sm font-medium">
          {label}
        </label>
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          className={inputClasses}
          defaultValue={
            defaultValue || ""
          }
        />
      </div>
    )
  }
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={inputClasses}
        defaultValue={defaultValue}
      />
    </div>
  )

}

export default EditInput;
