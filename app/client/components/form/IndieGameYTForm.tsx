import { Form } from "@remix-run/react";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import IndieTOSCheckbox from "./IndieTOSCheckbox";

function IndieGameYTForm() {
  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        YouTube Game Trailer (Optional)
      </h2>
      Video title, youtube url
      <IndieTOSCheckbox id="indie-terms-three" />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameYTForm;
