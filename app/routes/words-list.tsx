import { Outlet } from "@remix-run/react";

// Groups /words-list and any children
export default function WordsListLayout() {
  return <Outlet />;
}
