/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/heading-has-content */

import { MDXProvider } from "@mdx-js/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import useFormatMDX from "../../hooks/useFormatMDX";

function MDXContent({ code }: { code: string }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const CustomComponents = useFormatMDX();

  return (
    <MDXProvider>
      <Component components={CustomComponents} />
    </MDXProvider>
  );
}

export default MDXContent;
