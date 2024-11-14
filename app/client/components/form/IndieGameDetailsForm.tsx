import { Form } from "@remix-run/react";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";

function IndieGameDetailsForm() {
  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        Additional Game Details (Optional)
      </h2>
      Developer, Publisher, Genre, Platforms, Single Player, Multiplayer, Co-op,
      Achievements, Release Date, Demo, Base Game Price, Controller Support,
      Tags
      <IndieTOSCheckbox id="indie-terms-four" />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameDetailsForm;
