import { Form } from "@remix-run/react";
import { ActionDataMsgErr } from "../utils/errors/ProcessErrors";
import FormSuccessErrorMsg from "../utils/errors/FormSuccessErrorMsg";

interface PropType {
  actionData: ActionDataMsgErr;
  trackFormSubmitted: string;
  setTrackFormSubmitted: React.Dispatch<React.SetStateAction<string>>;
}

function IndieGameSettingsForm({
  actionData,
  trackFormSubmitted,
  setTrackFormSubmitted,
}: PropType) {
  return (
    <Form
      method="post"
      onSubmit={() => setTrackFormSubmitted("game-settings")}
      className="flex flex-col gap-8 justify-center items-center"
    >
      <input
        type="text"
        id="placeholder-indie-game-settings"
        name="placeholder-indie-game-settings"
        className="hidden"
      />
      <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
        Account Settings
      </h2>
      <button
        type="submit"
        name="logout"
        className="flex justify-center items-center rounded-md hover:bg-amber-600 bg-pumpkin-orange  text-white px-4 py-2 w-[20em] whitespace-nowrap"
      >
        Logout
      </button>
      <button
        type="button"
        className="flex justify-center items-center rounded-md hover:bg-amber-600 bg-pumpkin-orange  text-white px-4 py-2 w-[20em] whitespace-nowrap"
      >
        Update Password
      </button>
      <button
        type="submit"
        name="delete-account"
        className="flex justify-center items-center rounded-md bg-rose-600 text-white px-4 py-2 w-[20em] hover:bg-rose-500 whitespace-nowrap"
      >
        ☠️ Delete Account
      </button>
      {trackFormSubmitted === "game-settings" && <FormSuccessErrorMsg actionData={actionData} />}
    </Form>
  );
}

export default IndieGameSettingsForm;
