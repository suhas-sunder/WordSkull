import { useState } from "react";

interface PropType {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value?: string;  // Optional value prop
}

function TextArea({
  label,
  id,
  name,
  placeholder,
  required,
  minLength,
  value,  // Optional value prop
  maxLength,
}: PropType) {
  // Use useState to control the input's value
  const [inputValue, setInputValue] = useState<string>(value || ""); // Default value is empty string

  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value); // Update state with the new value
  };

  return (
    <div className="flex flex-col gap-5 font-lato text-lg">
      <label htmlFor={id} className="whitespace-nowrap font-nunito">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        value={inputValue} // Use state as value for the textarea
        onChange={handleChange} // Update state on input change
        placeholder={placeholder}
        className="flex border-2 rounded-md px-4 py-3 w-full min-h-[19em] scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-amber-100 outline-orange-200 border-orange-400 placeholder:text-skull-brown/40 text-amber-600"
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
}

export default TextArea;
