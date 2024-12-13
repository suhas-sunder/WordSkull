import { Form } from "@remix-run/react";
import { useState } from "react";
import Icon from "../utils/other/Icon";
import SaveAndSubmit from "../ui/interactive/SaveAndSubmit";
import FormSuccessErrorMsg from "../utils/errors/FormSuccessErrorMsg";

interface PropType {
  actionData: { error?: string; message?: string };
}

function IndieLoginForm({ actionData }: PropType) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form
      method="post"
      className="flex flex-col gap-10 mt-10 font-lato tracking-wider  max-w-[350px] w-full text-center"
    >
      <div className="flex gap-5 text-xl w-full">
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
          className="flex w-full border-2 rounded-md px-2 py-1  outline-orange-200 border-orange-400"
        />
      </div>
      <div className="flex relative w-full min-h-10">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          required
          className="flex border-2 rounded-md px-2 py-1 w-full  outline-orange-200 border-orange-400"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="flex absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 pr-2 hover:text-gray-300"
        >
          {showPassword ? (
            <Icon icon="showPassword" />
          ) : (
            <Icon icon="hidePassword" />
          )}
        </button>
      </div>
      <FormSuccessErrorMsg actionData={actionData} />
      <SaveAndSubmit />
    </Form>
  );
}

export default IndieLoginForm;
