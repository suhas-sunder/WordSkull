import { render, screen } from "@testing-library/react";
import MockThemeProvider from "../../context/MockThemeContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Keypad from "../Keypad";
import { describe, expect, it } from "vitest";

interface PropType {
  darkThemeActive?: boolean;
  currentlyEnteredWords: string[];
  currentWord: string;
}

// Create a mock ThemeProvider to control the darkThemeActive value
const MockKeypad = ({
  darkThemeActive,
  currentlyEnteredWords,
  currentWord,
}: PropType) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <Keypad
          currentlyEnteredWords={currentlyEnteredWords}
          currentWord={currentWord}
        />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

describe("renders defaults correctly", () => {
  it("should render keybaord", () => {
    MockKeypad({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const divElement = screen.getByTestId(/Keypad/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should render a key for every letter of the alphabet", () => {
    MockKeypad({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet.split("").forEach((letter) => {
      const textElement = screen.getByText(letter);
      expect(textElement).toBeInTheDocument();
    });
  });

  it("should render a spacebar key", () => {
    MockKeypad({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/space/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render an enter key", () => {
    MockKeypad({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/enter/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render a delete key", () => {
    MockKeypad({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/delete/i);
    expect(textElement).toBeInTheDocument();
  });
});
