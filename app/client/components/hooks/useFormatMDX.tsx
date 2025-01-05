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
        aria-label="Descriptive h1 main heading content"
        className={`${
          darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
        } w-full z-1 flex-row flex justify-center items-center text-4xl sm:text-5xl text-center mt-1 sm:leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        {...props}
      />
    ),
    h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
      <h2
        aria-label="Descriptive h2 heading content"
        className={`${
          darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
        } flex py-2 text-3xl font-lora mt-4 text-center justify-center sm:justify-start sm:text-left leading-relaxed sm:leading-[0.7em] capitalize text-skull-dark-brown mb-3`}
        {...props}
      />
    ),
    h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
      <h3
        aria-label="Descriptive h3 heading content"
        className={`leading-relaxed lg:leading-normal ${
          darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
        } flex py-2 text-2xl font-nunito mt-4 text-skull-dark-brown`}
        {...props}
      />
    ),
    p: (props: React.HTMLProps<HTMLParagraphElement>) => (
      <p
        aria-label="Descriptive paragraph content"
        className={`${
          darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
        } font-lato text-lg tracking-wider leading-loose mb-3 gap-8`}
        {...props}
      />
    ),
    ul: (props: React.HTMLProps<HTMLUListElement>) => (
      <ul
        aria-label="Descriptive list item content"
        className={`${
          darkThemeActive ? "text-stone-200" : "text-skull-dark-brown"
        } font-lato text-lg tracking-wider leading-loose gap-8 px-4 sm:px-6 list-decimal list-inside space-y-2 mb-3`}
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
          aria-label="Descriptive ordered list item content"
          className={`${
            darkThemeActive ? "text-stone-200" : "text-skull-dark-brown"
          } font-lato text-lg tracking-wider  leading-loose gap-8 px-4 sm:px-6 list-decimal list-inside space-y-2 mb-3`}
          type={validType}
          {...restProps}
        />
      );
    },
    li: (props: React.HTMLProps<HTMLLIElement>) => <li {...props} />,
    a: (props: React.HTMLProps<HTMLElement>) => {
      const { href, children } = props;
      const isExternal = href?.startsWith("https:");
      const isTrusted = trustedWebsites?.includes(href as string);

      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <Link
          className={`text-pumpkin-orange hover:text-amber-600 font-lora`}
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
