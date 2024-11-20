import {
  ActionFunctionArgs,
  Link,
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useLocation,
} from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";
import IndieLoginForm from "../client/components/form/IndieLoginForm";
import { json, createCookie, CookieOptions } from "@remix-run/node";
import accountAPI from "../client/components/api/accountAPI";

import { parse } from "cookie";
export function loader({ request }: LoaderFunctionArgs) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    // Check if JWT_SECRET exists
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set.");
    }

    // Get cookies from the request
    const cookieHeader = request.headers.get("Cookie");

    // Parse cookies using a parsing library like 'cookie'
    const cookies = cookieHeader ? parse(cookieHeader) : {};

    // Retrieve the JWT token from cookies
    const jwtToken = cookies.jwt;
    const username = cookies.username;

    if (!username || !jwtToken) {
      return json({});
    }

    const base64Username =
      username.replace(/-/g, "+").replace(/_/g, "/") + "==";

    // Decode the token (if you're manually decoding for logging or debugging purposes)
    const decodedUsername = Buffer.from(base64Username, "base64").toString(
      "utf-8"
    );

    const usernameWithoutQuotes = decodedUsername.replace(/^"([^"]*)"$/, "$1");
    const currentUrl = new URL(request.url);

    // If no JWT token exists, return empty response
    if (currentUrl.pathname === "/edit-indie-game") {
      return redirect(`/edit-indie-game/${usernameWithoutQuotes}`);
    } else {
      return json({});
    }
  } catch (error) {
    // Handle errors and JWT verification failures
    console.error("JWT verification error:", error);
    return json({ error: "JWT verification failed" }, { status: 401 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log("formData", formData);
  const loginForm = formData.get("placeholder-indie-game-login");

  // Handle login form
  if (loginForm !== null) {
    // Define shared cookie options
    const cookieOptions: CookieOptions = {
      httpOnly: true, // Keep the cookie secure and inaccessible to client-side scripts
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === "production", // Set secure flag for production
      sameSite: "strict", // Must match the union type
      path: "/", // Path for the cookie
    };

    // Create cookies with shared options
    const jwtCookie = createCookie("jwt", cookieOptions);
    const usernameCookie = createCookie("username", cookieOptions);

    try {
      const username = formData.get("username");
      const password = formData.get("password");

      // Validate form fields
      if (!username || !password) {
        return json({ error: "All fields are required." }, { status: 400 });
      }

      // Make the POST request to your API
      const response = await accountAPI.post(`/login-indie-dev`, {
        method: "POST",
        responseType: "arraybuffer",
        data: { username, password },
      });

      const token = response.data.jwt_token;

      if (response.status === 200 && token) {
        // Serialize the cookies
        const jwtSerialized = await jwtCookie.serialize(token);
        const usernameSerialized = await usernameCookie.serialize(username);

        // Create a Headers object and add both Set-Cookie headers
        const headers = new Headers();
        headers.append("Set-Cookie", jwtSerialized);
        headers.append("Set-Cookie", usernameSerialized);

        // Return the response with the headers
        return redirect(`/edit-indie-game/${username}`, { headers });
      }

      return json(
        { error: "Login failed. Please try again." },
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

  return json(
    { error: "Something went wrong. Form submission failed. " },
    { status: 500 }
  );
}
export default function EditIndieGame() {
  const location = useLocation();
  const { darkThemeActive } = useTheme();

  return (
    <div
      className={`${
        darkThemeActive ? "text-slate-300" : "text-skull-dark-brown"
      } flex animate-fadeIn justify-center flex-col items-center mt-[3em]`}
    >
      <header className="flex flex-col justify-center items-center gap-3 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-slate-400" : "text-skull-dark-brown"
          } w-full z-1  flex justify-center items-center flex-col md:flex-row text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          {location.pathname === "/edit-indie-game"
            ? "Edit Your Game's Page"
            : "Your Game's Page Header"}
        </h1>
      </header>
      <main className="flex flex-col gap-5 justify-center items-center w-full max-w-[1200px]">
        {location.pathname === "/edit-indie-game" ? (
          <IndieLoginForm />
        ) : (
          <Outlet />
        )}
      </main>
      <section className="flex relative flex-col gap-4 mt-14 mb-10 font-lato tracking-wider max-w-[1200px] text-lg leading-loose">
        <div
          className="absolute -top-[5em]"
          id="indie-game-terms-of-service"
        ></div>
        <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center mb-2">
          Terms and Conditions for Game Submission
        </h2>
        <p>
          By submitting your indie game to be featured on{" "}
          <Link
            to="/"
            className={`${
              darkThemeActive ? "text-amber-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            WordSkull
          </Link>
          , you agree to the following terms and conditions:
        </p>
        <ul className="font-nunito pl-5 flex gap-5 flex-col list-disc">
          <li>
            You will post original content that does not infringe any
            third-party intellectual property rights.
          </li>
          <li>You will not post duplicate content from other websites.</li>
          <li>
            You will not post content that is illegal, threatening, abusive,
            harassing, defamatory, vulgar, obscene, pornographic, or hateful.
          </li>
          <li>
            You will not post content that is spammy, misleading, or deceptive.
          </li>
          <li>
            You will not post content that violates any applicable laws or
            regulations.
          </li>
          <li>You will not link to any obscene or illegal websites.</li>
          <li>You will post content that is related to your game.</li>
          <li>
            If your content violates any of our terms or fails to meet our
            standards, we reserve the right to modify or remove your content,
            and account, without notice.
          </li>
        </ul>
        <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center mb-2">
          Final Notes
        </h2>
        <p>
          The header section is mandatory. If you haven&apos;t filled out the
          header section of the form and submitted it, your game will not show
          up on the{" "}
          <Link
            to="/best-indie-games-showcase"
            className={`${
              darkThemeActive ? "text-amber-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            Indie Games page
          </Link>
          , even if you save changes to other sections. Submissions may take
          some time to process for certain sections so don&apos;t leave the page
          until the submission is complete. All images are resized and optimized
          for web before being uploaded to the back-end. They will likely be
          resized to 640px by 360px, so a 16:9 aspect ratio is recommended for
          best results. Ideally, your image should be in PNG or JPEG format. You
          can experiment with other formats if you prefer, but there&apos;s a
          chance it may be rejected. I&apos;ve added logic to handle GIFs which
          should work in most cases, but I have not tested it extensively.
        </p>
        <p>
          All games will be featured in random order on the{" "}
          <Link
            to="/best-indie-games-showcase"
            className={`${
              darkThemeActive ? "text-amber-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            Indie Games page
          </Link>
          , as well as, the sidebar on relevant pages. This way all contributors
          get a fair chance at being featured. There will be no favoritism
          towards any game on the{" "}
          <Link
            to="/best-indie-games-showcase"
            className={`${
              darkThemeActive ? "text-amber-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            Indie Games page
          </Link>
          .
        </p>
        <p>
          Thank you for your submission. If the submission form is missing any
          features, or if you have any questions or concerns, please don&apos;t
          hesitate to{" "}
          <Link
            to="/socials"
            className={`${
              darkThemeActive ? "text-amber-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            contact us
          </Link>
          . I&apos;m excited to have your game showcased on{" "}
          <Link
            to="/"
            className={`${
              darkThemeActive ? "text-amber-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            WordSkull
          </Link>
          !
        </p>
        <p>
          Once published, you can find your game on the{" "}
          <Link
            to="/best-indie-games-showcase"
            className={`${
              darkThemeActive ? "text-amber-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            indie game&apos;s featured page
          </Link>
          !
        </p>
      </section>
      <section>
        <SocialLinks />
      </section>
    </div>
  );
}
