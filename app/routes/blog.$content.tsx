/* eslint-disable jsx-a11y/heading-has-content */
import { MetaFunction } from "@remix-run/node";
import { json, redirect, useLoaderData } from "react-router-dom";
import { bundleMDX } from "mdx-bundler";
import cloudflareR2API from "../client/components/api/cloudflareR2API";
import MDXContent from "../client/components/utils/generators/MDXContent";
import localforage from "localforage";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import Languages from "../client/components/data/Languages";

interface AboutMDXData {
  code: string;
  title: string;
  description: string;
  heading?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const meta: MetaFunction = ({ data }: any) => {
  // const slug = params.lang;

  return [
    { title: data?.title || "WordSkull About Page" },
    {
      name: "description",
      content: data?.description
        ? data?.description
        : "WordSkull the ultimate word game inspired by word & puzzle games like Wordle, crosswords, cryptogram, with new features and daily challenges! 🎉📲",
    },
  ];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
  const { languageList } = Languages();
  const slug = params.lang;

  if (!languageList.includes(slug)) {
    return redirect("/about");
  }

  try {
    const response = await cloudflareR2API.get(
      "/word-skull/mdx-wordskull/about-fr.mdx",
      {
        method: "GET",
        responseType: "arraybuffer",
      }
    );

    if (!response || response.status !== 200) return redirect("/404");

    const mdxContent = Buffer.from(response.data).toString("utf-8");

    const { code, frontmatter } = await bundleMDX({ source: mdxContent });

    const title = frontmatter.title;
    const description = frontmatter.description;
    const heading = frontmatter.heading;

    return json({
      code,
      title,
      description,
      heading,
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
      const { code, title, description, heading }: AboutMDXData =
        await serverLoader();

      // Store the fetched data in localForage for future use
      const mdxData = { code, title, description, heading };
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
function BlogContent() {
  const { code } = useLoaderData() as AboutMDXData;

  return <MDXContent code={code} />;
}

export default BlogContent;
