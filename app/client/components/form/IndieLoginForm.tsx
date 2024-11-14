import { Form } from "@remix-run/react";
import { useState } from "react";
import Icon from "../utils/other/Icon";

function IndieLoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form
      method="post"
      className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
    >
      <div className="flex gap-5 justify-center items-center text-xl">
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="border-2 rounded-md px-2 py-1"
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
          className="flex border-2 rounded-md px-2 py-1 w-full"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="flex absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <Icon icon="dice" /> : <Icon icon="copy" />}
        </button>
      </div>
    </Form>
  );
}

export default IndieLoginForm;
