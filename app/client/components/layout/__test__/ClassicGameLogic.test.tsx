import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MockThemeProvider from "../../../../client/mocks/MockThemeContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import ClassicGameLogic from "../ClassicGameLogic";
import { WordsData } from "../../../../routes/word-skull-game-easy-mode";
interface PropType {
  startPosition: number;
  endPosition: number;
  lettersPerSkull: string;
  wordsData: WordsData;
}

const MockClassicGameplayInstructions = (props: PropType) => {
  return render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={true}>
        <ClassicGameLogic {...props} />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  MockClassicGameplayInstructions({
    startPosition: 0,
    endPosition: 4,
    lettersPerSkull: "3 - 5 letters",
    wordsData: {
      words: {
        1: ["cattlesasdf", "battingasdf", "ratttlerasdf"],
        2: ["deerboyasdf", "spiritbearasdf"],
      },
    },
  });
});

describe("integrates will all required components & renders all game logic correctly", () => {
  it("should render input element", () => {
    const inputElement = screen.getByRole("textbox"); // Adjust if necessary
    expect(inputElement).toBeInTheDocument();
  });

  it("should render a white heart in dark mode", () => {
    const headerElement = screen.getByText(/🤍/i); // Replace with actual header text
    expect(headerElement).toBeInTheDocument();
  });

  it("should render a white heart in dark mode", () => {
    const textElement = screen.getByText(/🤍/i); // Replace with actual header text
    expect(textElement).toBeInTheDocument();
  });

  it("should render a proper heading by integrating with Header component", () => {
    const headingElement = screen.getByRole("heading", {
      name: /W💀RD SKULL/i,
    });

    expect(headingElement).toBeInTheDocument();
  });

  it("should render a proper heading text that matches the difficulty prop", () => {
    const headingElement = screen.getByRole("heading", {
      name: /3 - 5 letters/i,
    });

    expect(headingElement).toBeInTheDocument();
  });

  it("should render a virtual keyboard by properly integrating keyboard component", () => {
    const divElement = screen.getByTestId(/keyboard/i);
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass("md:flex");
  });

  it("should render a hidden virtual keypad by properly integrating keypad component", () => {
    const divElement = screen.getByTestId(/keypad/i);
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass("md:hidden");
  });

  it("should render and display skull by integrating skull component", () => {
    const divElement = screen.getByTestId(/display-skull/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should not render game over menu by default", () => {
    const divElement = screen.queryByTestId(/game-over-menu/i);
    expect(divElement).not.toBeInTheDocument();
  });

  it("should not render game over stats capture by default", () => {
    const divElement = screen.queryByTestId(/game-over-stats-capture/i);
    expect(divElement).not.toBeInTheDocument();
  });

  it("should render word history button by default by properly integrating word history component", () => {
    const divElement = screen.getByTestId(/word-history/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should render an input textbox", () => {
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("should render a label for the input", () => {
    const labelElement = screen.getByLabelText(/W💀RD SKULL/i);
    expect(labelElement).toBeInTheDocument();
  });
});
