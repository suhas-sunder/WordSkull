/* eslint-disable jsx-a11y/heading-has-content */

import { MDXProvider } from "@mdx-js/react";
import { Link } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";

function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  
  const { darkThemeActive } = useTheme();
  const trustedWebsites = [
    "https://example.com",
    "https://anothertrustedsit.com",
    // Add more trusted websites here
  ];

  const CustomComponents = {
    h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
      <h1
        className="font-recursive text-center sm:text-left text-darker-blue font-bold text-[2.625rem]"
        {...props}
      />
    ),
    h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
      <h2
        className="font-recursive text-center sm:text-left text-darker-blue font-bold text-[1.5rem] sm:text-[2.625rem] sm:leading-[3.2rem]"
        {...props}
      />
    ),
    h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
      <h3
        className="font-recursive text-center sm:text-left text-dark-blue font-bold text-[1.25rem] sm:text-[2rem] sm:leading-[2.5rem]"
        {...props}
      />
    ),
    p: (props: React.HTMLProps<HTMLParagraphElement>) => (
      <p
        className="font-inter text-light-gray text-center sm:text-left font-normal text-[1rem]"
        {...props}
      />
    ),
    ul: (props: React.HTMLProps<HTMLUListElement>) => (
      <ul
        className="list-disc flex flex-col gap-5 pl-6 text-light-gray font-inter text-[1rem]"
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
          className="list-decimal flex flex-col gap-5 pl-6 text-light-gray font-inter text-[1rem]"
          type={validType}
          {...restProps}
        />
      );
    },
    li: (props: React.HTMLProps<HTMLLIElement>) => (
      <li className="mb-2 text-light-gray" {...props} />
    ),
    blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
      <blockquote
        className="pl-4 border-l-4 border-light-gray italic text-gray-600"
        {...props}
      />
    ),
    strong: (props: React.HTMLProps<HTMLElement>) => (
      <strong className="font-bold text-darker-blue" {...props} />
    ),
    em: (props: React.HTMLProps<HTMLElement>) => (
      <em className="italic text-darker-blue" {...props} />
    ),
    a: (props: React.HTMLProps<HTMLElement>) => {
      const { href, children } = props;
      const isExternal = href && href.startsWith("https:");
      const isTrusted = trustedWebsites.includes(href as string);

      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <Link
          className={`${
            darkThemeActive ? "text-orange-600" : "text-skull-super-dark-brown"
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

  return (
    <MDXProvider>
      <Component components={CustomComponents} />
    </MDXProvider>
  );
}

export default MDXContent;
