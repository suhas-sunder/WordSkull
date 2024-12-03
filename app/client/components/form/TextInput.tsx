interface PropType {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

function TextInput({
  label,
  id,
  name,
  placeholder,
  required,
  minLength,
  maxLength,
}: PropType) {
  return (
    <div className="flex flex-col gap-5 font-lato text-lg">
      <label htmlFor={id} className="whitespace-nowrap font-nunito">
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        id={id}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className="flex border-2 rounded-md px-4 py-2 w-full outline-orange-200 border-orange-400 placeholder:text-skull-brown text-amber-600"
      />
    </div>
  );
}

export default TextInput;
