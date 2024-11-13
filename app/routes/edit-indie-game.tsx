import { Form, Link } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import { useState } from "react";
import Icon from "../client/components/utils/other/Icon";
import SocialLinks from "../client/components/navigation/SocialLinks";

export default function EditIndieGame() {
  const [showPassword, setShowPassword] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { darkThemeActive } = useTheme();

  // Handle file input change (from clicking the browse button)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndPreview(file);
    }
  };

  // Handle drag-and-drop image upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndPreview(file);
    }
  };

  // Allow dropping files by preventing the default behavior
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Validate file size and display preview
  const validateAndPreview = (file: File) => {
    // Check if file size is less than 1MB
    if (file.size > 1 * 1024 * 1024) {
      alert("File is too large. Please select an image under 1MB.");
      return;
    }

    // Create a file reader to preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`${
        darkThemeActive ? "text-slate-300" : "text-skull-dark-brown"
      } flex justify-center flex-col items-center mt-[3em]`}
    >
      <header className="flex flex-col justify-center items-center gap-3 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-slate-400" : "text-skull-dark-brown"
          } w-full z-1  flex justify-center items-center flex-col md:flex-row text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          Your Game&apos;s Page Header
        </h1>
      </header>
      <main className="flex flex-col gap-5 justify-center items-center w-full max-w-[1200px]">
        {showPassword ? (
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
        ) : (
          <div className="flex flex-col w-full max-w-[800px] mx-auto tracking-wider px-5">
            <Form method="post" className="flex flex-col w-full gap-5">
              <div className="flex flex-col gap-5 font-lato text-xl">
                <label
                  htmlFor="game-name"
                  className="whitespace-nowrap font-nunito"
                >
                  * Title Of Your Game
                </label>
                <input
                  type="text"
                  name="game-name"
                  placeholder="Enter title"
                  id="game-name"
                  required
                  className="flex border-2 rounded-md px-4 py-2 w-full outline-skull-dark-brown outline-skull-dark-brown"
                />
              </div>
              <div className="flex flex-col gap-5 font-lato text-xl">
                <label
                  htmlFor="brief-description"
                  className="whitespace-nowrap font-nunito"
                >
                  * Brief Description (Min 200 characters)
                </label>
                <textarea
                  name="brief-description"
                  id="brief-description"
                  placeholder="The text you enter here will be displayed in the header of your game's page. It will also be the preview text when displayed on other pages. I have just two requests: 

                  1. Please write a unique and original description of your game. If I get too many submissions that are 'copy pasted' from other websites, I run the risk of being flagged for duplicate content.
                  
                  2. Keep it safe for work. Don't include any profanity or adult content.

                  Thank you 😊!
                  "
                  className="flex border-2 rounded-md px-4 py-3 w-full min-h-[19em] scrollbar-thin scrollbar-thumb-skull-dark-brown scrollbar-track-skull-brown outline-skull-dark-brown"
                  minLength={200}
                  required
                />
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                {imagePreview ? (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-60 object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      id="image-input"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <div
                      className="flex flex-col items-center justify-center border-2 border-dashed text-gray-500 text-lg text-center p-8 gap-5 cursor-pointer w-full"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() =>
                        document.getElementById("image-input")?.click()
                      }
                      onKeyDown={(e) => {
                        // Add logic to handle keypress (e.g., Enter or Spacebar)
                        if (e.key === "Enter" || e.key === " ") {
                          document.getElementById("image-input")?.click();
                        }
                      }}
                      role="button" // Make the div semantically a button
                      tabIndex={0} // Make it focusable
                    >
                      <p>
                        * Drag & Drop your game&apos;s preview image here or
                        click to browse (1MB max).
                      </p>
                      <p>
                        {" "}
                        Original images only. Please don&apos;t post anything
                        that infringes any copyright.
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-5 text-lg">
                <h3 className="whitespace-nowrap font-lora w-full justify-center items-center text-center">
                  Links To Your Game (Optional)
                </h3>
                <label htmlFor="steam" className="font-nunito">
                  Steam
                </label>
                <input
                  type="text"
                  name="steam"
                  id="steam"
                  placeholder="Paste your Steam URL"
                  className="flex border-2 rounded-md px-4 py-2 w-full outline-skull-dark-brown"
                />
                <label htmlFor="itch" className="font-nunito">
                  Itch.io
                </label>
                <input
                  type="text"
                  name="itch"
                  id="itch"
                  placeholder="Paste your Itch URL"
                  className="flex border-2 rounded-md px-4 py-2 w-full outline-skull-dark-brown"
                />
                <label htmlFor="gog" className="font-nunito">
                  GOG
                </label>
                <input
                  type="text"
                  name="gog"
                  id="gog"
                  placeholder="Paste your GOG URL"
                  className="flex border-2 rounded-md px-4 py-2 w-full outline-skull-dark-brown"
                />
              </div>
              <div className="flex flex-col gap-5 text-lg">
                <h3 className="whitespace-nowrap font-lora w-full justify-center items-center text-center">
                  Social Media Links (Optional)
                </h3>

                <label htmlFor="Twitter" className="font-nunito">
                  Twitter
                </label>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  placeholder="Paste your Twitter URL"
                  className="flex border-2 rounded-md px-4 py-2 w-full outline-skull-dark-brown"
                />
              </div>
              <div className="flex flex-col gap-5 text-lg">
                <h3 className="whitespace-nowrap font-lora w-full justify-center items-center text-center">
                  Support/Donation Links (Optional)
                </h3>

                <label htmlFor="payPal" className="font-nunito">
                  Paypal
                </label>
                <input
                  type="text"
                  name="payPal"
                  id="payPal"
                  placeholder="Paste your PayPal URL"
                  className="flex border-2 rounded-md px-4 py-2 w-full outline-skull-dark-brown"
                />
                <label htmlFor="kofi" className="font-nunito">
                  Ko-fi
                </label>
                <input
                  type="text"
                  name="kofi"
                  id="kofi"
                  placeholder="Paste your Ko-fi URL"
                  className="flex border-2 rounded-md px-4 py-2 w-full outline-skull-dark-brown"
                />
                <label htmlFor="patreon" className="font-nunito">
                  Patreon
                </label>
                <input
                  type="text"
                  name="patreon"
                  id="patreon"
                  placeholder="Paste your Patreon URL"
                  className="flex border-2 rounded-md px-4 py-2 w-full outline-skull-dark-brown"
                />
              </div>
              <div className="flex gap-3 my-5">
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms" className="font-nunito">
                  I have read and accept the{" "}
                  <Link
                    to="#indie-game-terms-of-service"
                    className={`${
                      darkThemeActive
                        ? "text-orange-600"
                        : "text-pumpkin-orange"
                    } hover:text-amber-600 font-lora`}
                  >
                    Terms of Service
                  </Link>
                </label>
              </div>
              <div className="flex gap-5 mx-auto font-lato mb-8">
                <button
                  type="submit"
                  className="flex justify-center w-[10em] items-center rounded-md bg-skull-dark-brown text-white px-4 py-2  hover:bg-skull-brown"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="flex justify-center items-center rounded-md bg-green-600 text-white px-4 py-2 w-[10em] hover:bg-green-500"
                >
                  Submit
                </button>
              </div>
            </Form>
            <Form>
              <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
                Additional Game Details (Optional - Goes below header)
              </h2>
            </Form>
            <Form>
              <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
                Article (Optional - If you want to go in-depth about your game)
              </h2>
            </Form>
            <Form
              method="post"
              className="flex flex-col gap-8 justify-center items-center"
            >
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
          </div>
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
          By submitting your indie game to be featured on WordSkull, you agree
          to the following terms and conditions:
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
        <p>
          Once you have submitted your game, I will post it on my social media
          pages. If you don&apos;t want me to share it for any reason, please
          let me know.
        </p>
        <p>
          I&apos;m planning on displaying all games in random order on the{" "}
          <Link
            to="/best-indie-games-showcase"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            Indie Games page
          </Link>
          , as well as, the sidebar on relevant pages. This way all contributors
          get a fair chance at being featured. I won&apos;t put priority towards
          any game on the{" "}
          <Link
            to="/best-indie-games-showcase"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            Indie Games page
          </Link>
          , including mine. Additionally, I will not be accepting paid
          promotions to have any games featured above others.
        </p>
        <p>
          Eventually, depending on how this website evolves, I may monetize it
          with ads. I haven&apos;t thought that far ahead to be honest. Just
          working on getting my word and puzzle games finished. However, I
          don&apos;t want it to come as a surprise if I do decide to monetize it
          in the future, so here is the disclaimer.{" "}
        </p>
        <p>
          Thank you for your submission. If my submission form is missing any
          features, or if you have any questions or concerns, please don&apos;t
          hesitate to{" "}
          <Link
            to="/socials"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            contact me
          </Link>
          . I&apos;m excited to have your game showcased on WordSkull!
        </p>
      </section>
      <section>
        <SocialLinks />
      </section>
    </div>
  );
}
