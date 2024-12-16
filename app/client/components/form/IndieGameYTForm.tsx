import { Form } from "@remix-run/react";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import IndieTOSCheckbox from "./IndieTOSCheckbox";
import TextInput from "./TextInput";
import FormSuccessErrorMsg from "../utils/errors/FormSuccessErrorMsg";
import { ActionDataMsgErr } from "../utils/errors/ProcessErrors";
import { GameInfoJSONType } from "../utils/requests/GetIndieDevJson";

interface PropType {
  data: GameInfoJSONType;
  actionData: ActionDataMsgErr;
}

function IndieGameYTForm({ data, actionData }: PropType) {
  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <input
        type="text"
        id="placeholder-indie-game-youtube"
        name="placeholder-indie-game-youtube"
        className="hidden"
      />
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        YouTube Game Trailer (Optional)
      </h2>
      <TextInput
        id="yt-title"
        name="yt-title"
        label="Title Of Your Video (80 chars max)"
        value={(data?.youtubeTrailerTitle as string) || undefined}
        maxLength={80}
        placeholder="Enter title"
      />
      <TextInput
        id="yt-url"
        name="yt-url"
        label="YT Video URL (255 chars max)"
        value={(data?.youtubeVideoTrailerUrl as string) || undefined}
        maxLength={255}
        placeholder="Enter YT URL (Remember, it must be public or unlisted)"
      />
      <IndieTOSCheckbox id="indie-terms-three" />
      <FormSuccessErrorMsg actionData={actionData} />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieGameYTForm;
