import { Form } from "@remix-run/react";

function IndieGameSettingsForm() {
  return (
    <Form
      method="post"
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
        className="flex justify-center items-center rounded-md bg-skull-dark-brown text-white px-4 py-2 w-[20em] hover:bg-skull-brown whitespace-nowrap"
      >
        Update Password
      </button>
      <button
        type="submit"
        className="flex justify-center items-center rounded-md bg-rose-600 text-white px-4 py-2 w-[20em] hover:bg-rose-500 whitespace-nowrap"
      >
        Delete Account
      </button>
    </Form>
  );
}

export default IndieGameSettingsForm;
