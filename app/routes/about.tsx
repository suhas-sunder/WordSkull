/* eslint-disable jsx-a11y/heading-has-content */
import { MetaFunction } from "@remix-run/node";
import { json, Link, redirect, useLoaderData } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";
import { bundleMDX } from "mdx-bundler";
import cloudflareR2API from "../client/components/api/cloudflareR2API";
import MDXContent from "../client/components/utils/generators/MDXContent";
import localforage from "localforage";
import { ClientLoaderFunctionArgs } from "@remix-run/react";

interface AboutMDXData {
  code: string;
  title: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const meta: MetaFunction = ({ data }: any) => {
  return [
    { title: data?.title ? data?.title : "WordSkull About Page" },
    {
      name: "description",
      content: data?.description
        ? data?.description
        : "WordSkull the ultimate word game inspired by word & puzzle games like Wordle, crosswords, cryptogram, with new features and daily challenges! 🎉📲",
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

    const mdxContent = Buffer.from(response.data).toString("utf-8");

    const { code, frontmatter } = await bundleMDX({ source: mdxContent });

    const title = frontmatter.title;
    const description = frontmatter.description;

    return json({
      code,
      title,
      description,
    });
  } catch (error) {
    console.error("Error fetching or bundling MDX content:", error);
    return redirect("/404");
  }
}

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const cacheKey = "about-pg-mdx-data"; // Define the cache key

  try {
    // Try to get data from localForage
    const cachedData = await localforage.getItem<AboutMDXData>(cacheKey);

    if (cachedData?.code) {
      // If cache exists, return it
      return cachedData;
    } else {
      // If no cache, fetch it from the server
      const { code, title, description }: AboutMDXData = await serverLoader();

      // Store the fetched data in localForage for future use
      const mdxData = { code, title, description };
      await localforage.setItem(cacheKey, mdxData);

      // Return the fetched data
      return mdxData;
    }
  } catch (error) {
    console.error("Error fetching or caching MDX data:", error);

    // Optionally, handle the error with fallback data or an error message
    return { code: "", title: "Error", description: "Failed to load content" };
  }
}
function About() {
  const { code } = useLoaderData() as AboutMDXData;

  const { darkThemeActive } = useTheme();

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
