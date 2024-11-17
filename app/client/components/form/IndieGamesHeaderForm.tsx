import { Form } from "@remix-run/react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import { useFetcher } from "react-router-dom";
import { useState } from "react";

function IndieGamesHeaderForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fetcher = useFetcher();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents default form submission

    // Create a new FormData object from the form
    const formData = new FormData(event.currentTarget);

    // Add selected image file if available
    if (selectedFile) {
      formData.set("main-header-img", selectedFile);
    } else {
      alert("Please select an image before submitting.");
      return;
    }

    // Submit the form data with all fields included
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  return (
    <Form
      method="post"
      className="flex flex-col w-full gap-5"
      onSubmit={handleSubmit} 
    >
      <input
        type="text"
        id="placeholder-indie-game-header"
        name="placeholder-indie-game-header"
        className="hidden"
      />
      <TextInput
        id="game-name"
        name="game-name"
        label="* Title Of Your Game (1 to 80 chars)"
        required={true}
        minLength={1}
        maxLength={80}
        placeholder="Enter title"
      />
      <TextArea
        label="* Brief Description (300 to 1000 chars)"
        id="brief-game-description"
        name="brief-game-description"
        required={true}
        minLength={300}
        maxLength={1000}
        placeholder="The text you enter here will be displayed in the header of your game's page. It will also be the preview text when displayed on other pages. I have just two requests: 

                  1. Please write a unique and original description of your game. If I get too many submissions that are 'copy pasted' from other websites, I run the risk of being flagged for duplicate content.
                  
                  2. Keep it safe for work. Don't include any profanity or adult content.

                  Thank you 😊!
                  "
      />
      <UploadImage
        id="main-header-img"
        type="file"
        accept="image/*"
        optionalText="game's promotional"
        required={true}
        setSelectedFile={setSelectedFile} // Set selected file for image upload
      />
      <IndieTOSCheckbox id="indie-terms-one" />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGamesHeaderForm;
