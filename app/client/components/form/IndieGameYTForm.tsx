import { Form } from "@remix-run/react";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import TextInput from "./TextInput";

function IndieGameYTForm() {
  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        YouTube Game Trailer (Optional)
      </h2>
      <TextInput
        id="yt-title"
        name="yt-title"
        label="Title Of Your Video (80 chars max)"
        maxLength={80}
        placeholder="Enter title"
      />
      <TextInput
        id="yt-url"
        name="yt-url"
        label="YT Video URL (255 chars max)"
        maxLength={255}
        placeholder="Enter YT URL (Remember, it must be public or unlisted)"
      />
      <IndieTOSCheckbox id="indie-terms-three" />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameYTForm;
