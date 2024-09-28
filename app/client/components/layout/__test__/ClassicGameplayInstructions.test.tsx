import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MockThemeProvider from "../../../../client/mocks/MockThemeContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import ClassicGameplayInstructions from "../ClassicGameplayInstructions";

const MockClassicGameplayInstructions = () => {
  return render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={true}>
        <ClassicGameplayInstructions />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  MockClassicGameplayInstructions();
});

describe("displays gameplay instructions correctly", () => {
  it("should render an appropriate heading", () => {
    const headingElement = screen.getByRole("heading", {
      name: /How to play/i,
    });

    expect(headingElement).toBeInTheDocument();
  });

  it("should render an unordered list element", () => {
    const listElement = screen.getByRole("list");

    expect(listElement).toBeInTheDocument();
  });

  it("should render list items with instructions or images", () => {
    const listElements = screen.getAllByRole("listitem");

    expect(listElements).toHaveLength(30);
  });

  it("should render an image for each list item with text, except the last", () => {
    const listElements = screen.getAllByRole("img");
    expect(listElements).toHaveLength(15);
  });

  it("should render an email link", () => {
    const linkElement = screen.getByRole("link", {
      name: /admin@wordskull.com/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "mailto:admin@wordskull.com");
  });
});
