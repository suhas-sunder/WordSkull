interface PropType {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

function TextArea({
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
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        className="flex border-2 rounded-md px-4 py-3 w-full min-h-[19em] scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-amber-100 outline-orange-400 border-orange-300"
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
}

export default TextArea;
