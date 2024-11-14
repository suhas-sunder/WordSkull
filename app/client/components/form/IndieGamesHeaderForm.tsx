import { Form } from "@remix-run/react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";

function IndieGamesHeaderForm() {
  return (
    <Form method="post" className="flex flex-col w-full gap-5">
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
        label="* Brief Description (200 to 500 chars)"
        id="brief-description"
        name="brief-description"
        required={true}
        minLength={200}
        maxLength={500}
        placeholder="The text you enter here will be displayed in the header of your game's page. It will also be the preview text when displayed on other pages. I have just two requests: 

                  1. Please write a unique and original description of your game. If I get too many submissions that are 'copy pasted' from other websites, I run the risk of being flagged for duplicate content.
                  
                  2. Keep it safe for work. Don't include any profanity or adult content.

                  Thank you 😊!
                  "
      />
      <UploadImage
        id="image"
        type="file"
        accept="image/*"
        optionalText="game's promotional"
      />
      <IndieTOSCheckbox id="indie-terms-one" />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGamesHeaderForm;
