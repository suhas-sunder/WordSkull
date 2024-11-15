import { Form } from "@remix-run/react";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import { Fragment, useState } from "react";
import TextInput from "./TextInput";
import UploadImage from "./UploadImage";
import TextArea from "./TextArea";

const ArticleSection = ({ index }: { index: number }) => {
  return (
    <>
      {" "}
      <TextInput
        id={`article-title-${index}`}
        name={`article-title-${index}`}
        label={`Section ${index} Title - (1 to 80 chars)`}
        minLength={1}
        maxLength={80}
        placeholder="Enter title"
      />
      <UploadImage
        id={`article-image-${index}`}
        type="file"
        accept="image/*"
        optionalText=""
      />
      <TextArea
        label="Brief Description (200 to 1000 chars)"
        id="brief-description"
        name="brief-description"
        minLength={200}
        maxLength={1000}
        placeholder="Please write a unique and original description of your game. If I get too many submissions that are 'copy pasted' from other websites, I run the risk of being flagged for duplicate content.
                  
Keep it safe for work. Don't include any profanity or adult content.

Thank you 😊!"
      />
    </>
  );
};

function IndieGameArticlesForm() {
  const [sections, setSections] = useState(1);

  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        Article (Optional)
      </h2>
      <TextInput
        id={`article-author`}
        name={`article-author`}
        label={`Author Name - Will be your username if left blank (1 to 80 chars)`}
        minLength={1}
        maxLength={80}
        placeholder="Enter author name"
      />
      <TextInput
        id={`article-profession`}
        name={`article-profession`}
        label={`Profession - Will default to "Indie Game Developer" if left blank (1 to 80 chars)`}
        minLength={1}
        maxLength={80}
        placeholder="Enter profession"
      />
      {new Array(sections).fill("").map((_, index) => (
        <Fragment key={index}>
          <ArticleSection index={index + 1} />
        </Fragment>
      ))}
      <div className="flex gap-5 w-full justify-center items-center">
        {sections < 20 && (
          <button
            type="button"
            className="flex justify-center items-center rounded-md bg-pumpkin-orange text-white px-4 py-2 w-[12em] hover:bg-orange-500 whitespace-nowrap"
            onClick={() => setSections((prevState) => prevState + 1)}
          >
            Add Section
          </button>
        )}
        <button
          type="button"
          className="flex justify-center items-center rounded-md bg-pumpkin-orange  text-white px-4 py-2 w-[12em] hover:bg-orange-500 whitespace-nowrap"
          onClick={() =>
            setSections((prevState) =>
              prevState > 1 ? prevState - 1 : prevState
            )
          }
        >
          Remove Section
        </button>
      </div>
      <IndieTOSCheckbox id="indie-terms-articles" />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameArticlesForm;
