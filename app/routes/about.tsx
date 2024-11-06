/* eslint-disable jsx-a11y/heading-has-content */
import { MetaFunction } from "@remix-run/node";
import { json, Link, redirect, useLoaderData } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";
import * as aboutMDX from "./mdx/about-fr.mdx"; // Ensure the pa
import { MDXProvider } from "@mdx-js/react";
import { bundleMDX } from "mdx-bundler";
import cloudflareR2API from "../client/components/api/cloudflareR2API";
import { useEffect } from "react";
import MDXContent from "../client/components/utils/generators/MDXContent";

// Meta function to set page metadata
// export const meta: MetaFunction = () => {
//   return [
//     {
//       title:
//         "💀 About WordSkull - A Unique Collection of Word and Puzzle Games 🎉✨",
//     },
//     {
//       name: "description",
//       content:
//         "WordSkull the ultimate word game inspired by word & puzzle games like Wordle, crosswords, cryptogram, with new features and daily challenges! 🎉📲",
//     },
//   ];
// };

export const meta: MetaFunction = ({ data }: any) => {
  return [
    { title: data?.title ? `${data?.title} | Case Studies` : "Case Studies" },
    {
      name: "description",
      content: data?.description
        ? data?.description
        : "Description for legal page!",
    },
  ];
};

export async function loader() {
  try {
    const response = await cloudflareR2API.get(
      "/word-skull/mdx-wordskull/about-en.mdx",
      {
        method: "GET",
        responseType: "arraybuffer",
      }
    );

    console.log(response);

    if (!response || response.status !== 200) return redirect("/404");

    // Convert arraybuffer to string (assuming MDX is in UTF-8)
    const mdxContent = Buffer.from(response.data).toString("utf-8");

    // Bundle the MDX source with `bundleMDX`
    const { code, frontmatter } = await bundleMDX({ source: mdxContent });

    const metaData = {
      title: frontmatter.title || "Untitled",
      description: frontmatter.description || "",
    };

    // Return the bundled code and metadata
    return json({
      code,
      ...metaData,
    });
  } catch (error) {
    console.error("Error fetching or bundling MDX content:", error);
    return redirect("/404");
  }
}

const trustedWebsites = [
  "https://example.com",
  "https://anothertrustedsit.com",
  // Add more trusted websites here
];

function About() {
  const { code, title, description } = useLoaderData();

  useEffect(() => {
    console.log(code, title, description);
  }, [title, description, code]);

  const { darkThemeActive } = useTheme();
  const components = {
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
    <div
      className={`${
        darkThemeActive ? "text-slate-300" : "text-skull-dark-brown"
      } flex justify-center flex-col items-center mt-[3em]`}
    >
      <header className="flex flex-col justify-center items-center gap-6 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-slate-400" : "text-skull-dark-brown"
          } w-full z-1 flex-row flex justify-center items-center text-4xl sm:text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          <span className="mr-2">Discover the Story Behind</span>
          <span className="whitespace-nowrap">
            {" "}
            <span className="inline-flex">W</span>
            <span className="inline-flex animate-scalePulse">💀</span>
            <span className="inline-flex">rd</span>
          </span>
          <span className="inline-flex">Skull</span>
        </h1>
        <p className="font-lato text-lg tracking-wider leading-loose  mb-3 pl-5 max-w-[1200px]">
          👋🏽Hi! My name is Suhas, and I’m excited to share my journey creating a
          word game website that provides a fun and engaging learning
          experience. Here is a link to my{" "}
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="https://github.com/suhas-sunder"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub profile
          </Link>
          . If you want to learn more about me, feel free to visit my
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="https://www.suhassunder.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            portfolio website
          </Link>{" "}
          or visit any of my
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/socials"
          >
            {" "}
            social pages
          </Link>
          .
        </p>
      </header>
      <main className="flex max-w-[1200px] w-full mt-4 justify-center">
        <article className="flex flex-col max-w-[800px] mx-10">
          <MDXContent code={code} />
        </article>
        <section className="flex w-full mt-4">
          This will be the section where related blogs are displayed. Maybe
          filtered by tags or keywords based on what this page is about.
        </section>
      </main>
      <section>
        <SocialLinks />
      </section>
    </div>
  );
}

export default About;
