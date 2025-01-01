import { useState } from "react";

interface PropType {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value?: string;
}

function TextInput({
  label,
  id,
  name,
  placeholder,
  required,
  minLength,
  maxLength,
  value,
}: PropType) {
  // Initialize the local state with the `value` prop or an empty string
  const [inputValue, setInputValue] = useState(value || "");

  // Handle change event and update the state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
        value={inputValue} // Use the local state here
        onChange={handleChange} // Handle changes
        className="flex border-2 rounded-md px-4 py-2 w-full outline-orange-200 border-orange-400 placeholder:text-skull-brown/40 text-amber-600"
      />
    </div>
  );
}

export default TextInput;
