import {
  ActionFunctionArgs,
  Form,
  json,
  useActionData,
} from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import accountAPI from "../client/components/api/accountAPI";
import SaveAndSubmit from "../client/components/ui/interactive/SaveAndSubmit";
import { useState } from "react";
import Icon from "../client/components/utils/other/Icon";

interface ActionData {
  error?: string;
  message?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    // Extract form data
    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");
    const secret = formData.get("secret-key");

    // Validate form fields
    if (!username || !password || !secret) {
      return json({ error: "All fields are required." }, { status: 400 });
    }

    // Make the POST request
    const response = await accountAPI.post(`/register-indie-dev`, {
      method: "POST",
      responseType: "arraybuffer",
      data: {
        username,
        password,
        secret,
      },
    });

    if (response.status === 200) {
      return json({ message: "Form submitted successfully" });
    }

    return json(
      { error: "Registration failed. Please try again." },
      { status: response.status }
    );
  } catch (error) {
    console.error("Error during form submission:", error);

    if (error instanceof Error) {
      return json(
        { error: `An error occurred: ${error.message}` },
        { status: 500 }
      );
    }

    return json({ error: "An unknown error occurred." }, { status: 500 });
  }
}

export default function CreateIndieShowcase() {
  const data = useActionData() as ActionData;
  const [showPassword, setShowPassword] = useState(false);
  const { darkThemeActive } = useTheme();

  return (
    <div className="flex animate-fadeIn flex-col gap-3 justify-center items-center w-full mt-[3em]">
      <header className="flex flex-col justify-center items-center gap-3 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-slate-400" : "text-skull-dark-brown"
          } w-full z-1  flex justify-center items-center flex-col md:flex-row text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          Manage Indie Showcase
        </h1>
      </header>
      <main>
        <Form
          method="post"
          className="flex flex-col gap-10 mt-10 font-lato tracking-wider w-full min-w-[300px]"
        >
          <div className="flex gap-5 text-xl w-full">
            <label htmlFor="secret-key" className="sr-only">
              Admin Username
            </label>
            <input
              type="text"
              name="secret-key"
              id="secret-key"
              placeholder="Admin Username"
              required
              className="flex w-full border-2 rounded-md px-2 py-1"
            />
          </div>
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
              className="flex w-full border-2 rounded-md px-2 py-1"
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
              className="flex border-2 rounded-md px-2 py-1 w-full"
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
          {data?.error && (
            <div
              className={` text-rose-500 font-lato flex w-full justify-center items-center max-w-[300px] text-center leading-loose`}
            >
              {data?.error}
            </div>
          )}
          {data?.message && (
            <div
              className={` text-green-500 font-lato flex w-full justify-center items-center max-w-[300px] text-center leading-loose`}
            >
              {data?.message}
            </div>
          )}
          <SaveAndSubmit />
        </Form>
      </main>
    </div>
  );
}
