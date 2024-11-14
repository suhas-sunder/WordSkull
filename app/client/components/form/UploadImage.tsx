import { useState } from "react";

interface PropType {
  optionalText?: string;
  id: string;
  type: string;
  accept: string;
}

function UploadImage({ optionalText, id, type, accept }: PropType) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Validate file size and display preview
  const validateAndPreview = (file: File) => {
    // Check if file size is less than 1MB
    if (file.size > 1 * 1024 * 1024) {
      alert("File is too large. Please select an image under 1MB.");
      return;
    }

    // Create a file reader to preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle file input change (from clicking the browse button)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndPreview(file);
    }
  };

  // Handle drag-and-drop image upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndPreview(file);
    }
  };

  // Allow dropping files by preventing the default behavior
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {imagePreview ? (
        <div className="mt-4">
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
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            required
          />
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed text-gray-500 text-lg text-center p-8 gap-5 cursor-pointer w-full"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("image-input")?.click()}
            onKeyDown={(e) => {
              // Add logic to handle keypress (e.g., Enter or Spacebar)
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById("image-input")?.click();
              }
            }}
            role="button" // Make the div semantically a button
            tabIndex={0} // Make it focusable
          >
            <p>
              * Drag & Drop your {optionalText} image here or click to browse
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
