import { Form, useSubmit } from "@remix-run/react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import { useState } from "react";
import FormSuccessErrorMsg from "../utils/errors/FormSuccessErrorMsg";

type PropType = {
  actionData: { error?: string; message?: string };
};

function IndieGamesHeaderForm({ actionData }: PropType) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const submit = useSubmit(); // Get submit function from Remix

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);

    if (selectedFile) {
      formData.set("main-header-img", selectedFile);
    } else {
      alert("Please select an image before submitting.");
      return;
    }

    // Use the submit function from Remix
    submit(formData, {
      method: "post",
      encType: "multipart/form-data", // Ensure encoding is correct for file uploads
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
      {/* If image exist in R2 then show it and disable upload image until user clicks the cancel button. Then allow user to upload new image. This way, the submission form doesn't trigger a new image upload */}
      <UploadImage
        id="main-header-img"
        type="file"
        accept="image/*"
        optionalText="game's promotional"
        required={true}
        setSelectedFile={setSelectedFile} // Set selected file for image upload
      />
      <IndieTOSCheckbox id="indie-terms-one" />
      <FormSuccessErrorMsg actionData={actionData} />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGamesHeaderForm;
