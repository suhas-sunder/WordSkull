import { Form } from "@remix-run/react";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import TextInput from "./TextInput";

function IndieGameDetailsForm() {
  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        Additional Game Details (Optional)
      </h2>
      <TextInput
        id="game-developer"
        name="game-developer"
        label="Developer Name (80 chars max)"
        maxLength={80}
        placeholder="Enter Developer Name"
      />
      <TextInput
        id="game-publisher"
        name="game-publisher"
        label="Publisher Name (80 chars max)"
        maxLength={80}
        placeholder="Enter Publisher Name"
      />
      <TextInput
        id="game-genre"
        name="game-genre"
        label="Genre (80 chars max)"
        maxLength={80}
        placeholder="Enter Genre"
      />
      <TextInput
        id="game-platforms"
        name="game-platforms"
        label="Platforms (Comma separated list - 255 chars max)"
        maxLength={255}
        placeholder="Enter Platforms"
      />
      Base Game Price, Release Date, Single Player, Multiplayer, Co-op,
      Achievements, Demo, , Controller Support, Tags from list.
      <IndieTOSCheckbox id="indie-terms-four" />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameDetailsForm;
