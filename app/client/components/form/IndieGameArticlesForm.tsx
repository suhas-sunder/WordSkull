import { Form } from "@remix-run/react";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";

function IndieGameArticlesForm() {
  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        Article (Optional)
      </h2>
      title, image or youtube url, description
      <IndieTOSCheckbox id="indie-terms-five" />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameArticlesForm;
