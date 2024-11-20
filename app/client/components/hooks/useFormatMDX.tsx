/* eslint-disable jsx-a11y/heading-has-content */
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function useFormatMDX() {
  const { darkThemeActive } = useTheme();
  const trustedWebsites = [
    "https://www.emojikitchengame.com",
    "https://www.wordskull.com",
    "https://www.dragonmythology.com",
    "https://www.productivitygarden.com",
    "https://www.makeconfetti.com",
    "https://www.freetypingcamp.com",
  ];

  const CustomComponents = {
    h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
      <h1
        className={`${
          darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
        } w-full z-1 flex-row flex justify-center items-center text-4xl sm:text-5xl text-center mt-1 sm:leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        {...props}
      />
    ),
    h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
      <h2
        className={`${
          darkThemeActive ? "text-stone-100" : "text-skull-super-dark-brown"
        } flex py-2 text-3xl font-lora mt-4 text-center justify-center lg:justify-start lg:text-left leading-relaxed sm:leading-[0.7em] capitalize text-skull-super-dark-brown mb-3`}
        {...props}
      />
    ),
    h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
      <h3
        className={`leading-relaxed lg:leading-normal ${
          darkThemeActive ? "text-stone-100" : "text-skull-super-dark-brown"
        } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
        {...props}
      />
    ),
    p: (props: React.HTMLProps<HTMLParagraphElement>) => (
      <p
        className={`${
          darkThemeActive ? "text-stone-100" : "text-skull-super-dark-brown"
        } font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8`}
        {...props}
      />
    ),
    ul: (props: React.HTMLProps<HTMLUListElement>) => (
      <ul
        className={`${
          darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown"
        } font-lato text-lg tracking-wider  leading-loose pl-8 gap-8 px-4 sm:px-6 md:px-14 list-decimal list-inside space-y-2 mb-3`}
        {...props}
      />
    ),
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => {
      // eslint-disable-next-line react/prop-types
      const { type, ...restProps } = props;
      const validType = ["1", "a", "A", "i", "I"].includes(type as string)
        ? type
        : undefined;

      // Return the ol component with the validated type and other props
      return (
        <ol
          className={`${
            darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown"
          } font-lato text-lg tracking-wider  leading-loose pl-8 gap-8 px-4 sm:px-6 md:px-14 list-decimal list-inside space-y-2 mb-3`}
          type={validType}
          {...restProps}
        />
      );
    },
    li: (props: React.HTMLProps<HTMLLIElement>) => <li {...props} />,
    a: (props: React.HTMLProps<HTMLElement>) => {
      const { href, children } = props;
      const isExternal = href && href.startsWith("https:");
      const isTrusted = trustedWebsites.includes(href as string);

      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <Link
          className={`${
            darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
          } hover:text-amber-600 font-lora`}
          to={href as string} // Use 'to' for internal links
          target={isExternal ? "_blank" : undefined}
          rel={
            isExternal
              ? isTrusted
                ? "noopener noreferrer"
                : "noopener noreferrer nofollow"
              : undefined
          }
        >
          {children}
        </Link>
      );
    },
  };

  return CustomComponents;
}

export default useFormatMDX;
