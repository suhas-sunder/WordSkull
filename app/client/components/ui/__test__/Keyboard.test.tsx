import { render, screen } from "@testing-library/react";
import MockThemeProvider from "../../context/MockThemeContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import Keyboard from "../Keyboard";
import { describe, expect, it } from "vitest";

interface PropType {
  darkThemeActive?: boolean;
  currentlyEnteredWords: string[];
  currentWord: string;
}

// Create a mock ThemeProvider to control the darkThemeActive value
const MockKeyboard = ({
  darkThemeActive,
  currentlyEnteredWords,
  currentWord,
}: PropType) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <Keyboard
          currentlyEnteredWords={currentlyEnteredWords}
          currentWord={currentWord}
        />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

describe("renders defaults correctly", () => {
  it("should render keybaord", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const divElement = screen.getByTestId("keyboard");
    expect(divElement).toBeInTheDocument();
  });

  it("should render a key for every letter of the alphabet", () => {
    MockKeyboard({
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

  it("should render a key for every number", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const numbers = "1234567890";
    numbers.split("").forEach((letter) => {
      const textElement = screen.getByText(letter);
      expect(textElement).toBeInTheDocument();
    });
  });

  it("should render a key for every symbol", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const symbols = "~`!@#$%^&*()_+-=[]\\{}|;':\",./<>?";
    symbols.split("").forEach((letter) => {
      const textElement = screen.getByText(letter);
      expect(textElement).toBeInTheDocument();
    });
  });

  it("should render a spacebar key", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/spacebar/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render a caps key", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/caps/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render a tab key", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/tab/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render a fn key", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/fn/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render a menu key", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/menu/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render a backspace key", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElement = screen.getByText(/backspace/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render two alt keys", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElements = screen.getAllByText(/alt/i);
    expect(textElements).toHaveLength(2);
  });

  it("should render two ctrl keys", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElements = screen.getAllByText(/ctrl/i);
    expect(textElements).toHaveLength(2);
  });

  it("should render two shift keys", () => {
    MockKeyboard({
      darkThemeActive: true,
      currentlyEnteredWords: ["hello", "world"],
      currentWord: "hello",
    });

    const textElements = screen.getAllByText(/shift/i);
    expect(textElements).toHaveLength(2);
  });
});
