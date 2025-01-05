import { Form } from "@remix-run/react";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import { Fragment, useState } from "react";
import TextInput from "./TextInput";
import UploadImage from "./UploadImage";
import TextArea from "./TextArea";
import { useFetcher } from "react-router-dom";
import FormSuccessErrorMsg from "../utils/errors/FormSuccessErrorMsg";
import { FormType } from "../../../routes/edit-indie-game.$username";

interface ArticlePropType {
  index: number;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  title?: string;
  imgUrl?: string;
  description?: string;
}

const ArticleSection = ({
  index,
  setSelectedFile,
  title,
  imgUrl,
  description,
}: ArticlePropType) => {  console.log("ArticleSection", title, imgUrl, description);
  return (
    <>
      {" "}
      <TextInput
        id={`article-title-${index}`}
        name={`article-title-${index}`}
        label={`Title for Section ${index} - (1 to 80 chars)`}
        minLength={1}
        value={title}
        maxLength={80}
        placeholder={`Enter Section ${index} title`}
      />
      <UploadImage
        id={`article-image-${index}`}
        type="file"
        accept="image/*"
        imgUrl={imgUrl}
        required={false}
        optionalText=""
        setSelectedFile={setSelectedFile}
      />
      <TextArea
        label={`Brief Description for Section ${index} - (200 to 1000 chars)`}
        id={`article-description-${index}`}
        name={`article-description-${index}`}
        value={description}
        minLength={200}
        maxLength={1000}
        placeholder={`Section ${index}: Please write a unique and original description of your game. If I get too many submissions that are 'copy pasted' from other websites, I run the risk of being flagged for duplicate content.
                  
Keep it safe for work. Don't include any profanity or adult content.

Thank you 😊!`}
      />
    </>
  );
};

function IndieGameArticlesForm({
  data,
  actionData,
  trackFormSubmitted,
  setTrackFormSubmitted,
}: FormType) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sections, setSections] = useState(data.articles.length || 1);
  const fetcher = useFetcher();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents default form submission
    setTrackFormSubmitted("game-articles");

    // Create a new FormData object from the form
    const formData = new FormData(event.currentTarget);

    // Handle selected file (existing logic for single image)
    if (selectedFile) {
      formData.set("article-img", selectedFile); // Add the selected file under the name "article-img"
    } else {
      fetcher.submit(formData, {
        method: "post",
      });
    }

    // Handle other image inputs with dynamic names like "article-img-0", "article-img-1", etc.
    const fileInputs =
      event.currentTarget.querySelectorAll('input[type="file"]');

    fileInputs.forEach((input, index) => {
      const file = (input as HTMLInputElement).files?.[0]; // Get the file from the input element
      if (file) {
        formData.set(`article-img-${index}`, file); // Attach the file to the correct index
      } 
    });

    // Submit the form data with all fields included
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  return (
    <Form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <input
        type="text"
        id="placeholder-indie-game-article"
        name="placeholder-indie-game-article"
        className="hidden"
      />
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        Article (Optional)
      </h2>
      <TextInput
        id={"article-author"}
        name={"article-author"}
        label={"Author Name - Will be your username if left blank (1 to 80 chars)"}
        value={(data?.authorName as string) || undefined}
        minLength={1}
        maxLength={80}
        placeholder="Enter author name"
      />
      <TextInput
        id={"article-profession"}
        name={"article-profession"}
        label={'Profession - Will default to "Indie Game Developer" if left blank (1 to 80 chars)'}
        minLength={1}
        value={(data?.profession as string) || undefined}
        maxLength={80}
        placeholder="Enter profession"
      />
      {new Array(sections).fill("").map((_, index) => (
        <Fragment key={index}>
          <ArticleSection
            index={index + 1}
            title={(data?.articles[index]?.title as string) || undefined}
            imgUrl={(data?.articles[index]?.imgUrl as string) || undefined}
            description={
              (data?.articles[index]?.description as string) || undefined
            }
            setSelectedFile={setSelectedFile}
          />
        </Fragment>
      ))}
      <p className="text-lg mx-auto">Total Article Sections: {sections}</p>
      <div className="flex gap-5 w-full justify-center items-center">
        {sections < 20 && (
          <button
            type="button"
            className="flex justify-center items-center rounded-md bg-green-600 text-white px-4 py-2 w-[12em] hover:bg-green-700 whitespace-nowrap"
            onClick={() => setSections((prevState) => prevState + 1)}
          >
            Add Section
          </button>
        )}
        {sections > 1 && (
          <button
            type="button"
            className="flex justify-center items-center rounded-md bg-rose-500  text-white px-4 py-2 w-[12em] hover:bg-rose-400 whitespace-nowrap"
            onClick={() =>
              setSections((prevState) =>
                prevState > 1 ? prevState - 1 : prevState
              )
            }
          >
            ☠️ Delete Section
          </button>
        )}
      </div>
      <IndieTOSCheckbox id="indie-terms-articles" />
      {trackFormSubmitted === "game-articles" && (
        <FormSuccessErrorMsg actionData={actionData} />
      )}
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameArticlesForm;
