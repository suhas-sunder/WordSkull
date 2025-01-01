import { useState, useEffect } from "react";
import Icon from "../utils/other/Icon";

interface PropType {
  optionalText?: string;
  id: string;
  type: string;
  accept: string;
  required?: boolean;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  imgUrl?: string;
}

function UploadImage({
  optionalText,
  id,
  type,
  accept,
  required,
  setSelectedFile,
  imgUrl,
}: PropType) {
  const [imagePreview, setImagePreview] = useState<string | null>(""); //Change the username to be dynamic

  // Set imagePreview based on imgUrl or selected file
  useEffect(() => {
    if (imgUrl) {
      setImagePreview(imgUrl);
    } else {
      setImagePreview(null);
    }
  }, [imgUrl]);

  const validateAndPreview = (file: File) => {
    if (file.size > 1 * 1024 * 1024) {
      alert("File is too large. Please select an image under 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndPreview(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndPreview(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {imagePreview ? (
        <div className="relative mt-4">
          <button
            onClick={removeImage}
            className="absolute top-0 right-0 w-[1em] h-[1em] flex justify-center items-center text-xl bg-red-500 text-white rounded-full p-1 transform -translate-y-1/2 translate-x-1/2 hover:bg-red-600 "
            aria-label="Remove image"
          >
            <Icon icon="close" customStyle="fill-white scale-75" />
          </button>
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full max-h-60 object-contain"
          />
        </div>
      ) : (
        <>
          <input
            type={type}
            id={id}
            name={id}
            accept={accept}
            {...(required && { required: true })}
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed text-lg text-center p-8 gap-5 cursor-pointer w-full border-orange-400 text-skull-brown/40"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById(id)?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById(id)?.click();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <p>
              {required ? "*" : "(Optional) "}Drag & Drop your {optionalText}{" "}
              image here or click to browse
            </p>
            <p>
              {" "}
              Original images only. Please don&apos;t post anything that
              infringes any copyright
            </p>
            <p>Upload Limit: 1MB max</p>
          </div>
        </>
      )}
    </div>
  );
}

export default UploadImage;
