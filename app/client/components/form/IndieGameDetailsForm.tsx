import { Form } from "@remix-run/react";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import TextInput from "./TextInput";
import TwoRadioInputs from "./TwoRadioInputs";
import { ActionDataMsgErr } from "../utils/errors/ProcessErrors";
import FormSuccessErrorMsg from "../utils/errors/FormSuccessErrorMsg";

interface PropType {
  data: Record<string, unknown>;
  actionData: ActionDataMsgErr;
}

function IndieGameDetailsForm({ data, actionData }: PropType) {
  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <input
        type="text"
        id="placeholder-indie-game-details"
        name="placeholder-indie-game-details"
        className="hidden"
      />
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        Additional Game Details (Optional)
      </h2>
      <TextInput
        id="game-developer"
        name="game-developer"
        label="Developer Name (80 chars max)"
        value={(data?.devName as string) || undefined}
        maxLength={80}
        placeholder="Enter Developer Name"
      />
      <TextInput
        id="game-publisher"
        name="game-publisher"
        label="Publisher Name (80 chars max)"
        value={(data?.publisherName as string) || undefined}
        maxLength={80}
        placeholder="Enter Publisher Name"
      />
      <TextInput
        id="game-genre"
        name="game-genre"
        label="Genre (80 chars max)"
        value={(data?.genre as string) || undefined}
        maxLength={80}
        placeholder="Enter Genre"
      />
      <TextInput
        id="game-platforms"
        name="game-platforms"
        label="Platforms (Comma separated list - 255 chars max)"
        value={
          ((data?.platforms as string[]).join(", ").toString() as string) ||
          undefined
        }
        maxLength={255}
        placeholder="Enter Platforms"
      />
      <TextInput
        id="game-price"
        name="game-price"
        label="Base Game Price (10 chars max)"
        value={(data?.baseGamePrice as string) || undefined}
        maxLength={10}
        placeholder="Enter Price in USD Eg. $5.99"
      />
      <TextInput
        id="release-date"
        name="release-date"
        label="Release Date (30 chars max)"
        value={(data?.releaseDate as string) || undefined}
        maxLength={30}
        placeholder="Enter Date Eg. November 22, 2023"
      />
      <TwoRadioInputs
        legend="Single Player"
        firstOption="Yes"
        secondOption="No"
        value={(data?.singlePlayer as boolean) || undefined}
        firstInputChecked={true}
        secondInputChecked={false}
        id="single-player"
        name="single-player"
      />
      <TwoRadioInputs
        legend="Multiplayer"
        firstOption="Yes"
        firstInputChecked={false}
        secondInputChecked={true}
        value={(data?.multiplayer as boolean) || undefined}
        secondOption="No"
        id="multiplayer"
        name="multiplayer"
      />
      <TwoRadioInputs
        legend="Co-op"
        firstOption="Yes"
        firstInputChecked={false}
        secondInputChecked={true}
        value={(data?.coop as boolean) || undefined}
        secondOption="No"
        id="coop"
        name="coop"
      />
      <TwoRadioInputs
        legend="Achievements"
        firstOption="Yes"
        value={(data?.achievements as boolean) || undefined}
        firstInputChecked={false}
        secondInputChecked={true}
        secondOption="No"
        id="achievements"
        name="achievements"
      />
      <TwoRadioInputs
        legend="Demo"
        firstOption="Yes"
        value={(data?.demo as boolean) || undefined}
        firstInputChecked={false}
        secondInputChecked={true}
        secondOption="No"
        id="demo"
        name="demo"
      />
      <TwoRadioInputs
        legend="Controller Support"
        firstOption="Yes"
        value={(data?.controllerSupport as boolean) || undefined}
        firstInputChecked={false}
        secondInputChecked={true}
        secondOption="No"
        id="controller-support"
        name="controller-support"
      />
      <fieldset className="flex items-center gap-4">
        <div>
          <legend className="text-lg font-medium inline-block">
            10 Most Relevant Tags:
          </legend>
        </div>
      </fieldset>
      Tags from list.
      <IndieTOSCheckbox id="indie-terms-four" />
      <FormSuccessErrorMsg actionData={actionData} />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameDetailsForm;
