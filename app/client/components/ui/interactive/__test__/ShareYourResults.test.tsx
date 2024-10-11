import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MockThemeProvider from "../../../../../client/mocks/components/MockThemeContext";
import ShareYourResults from "../ShareYourResults";
import useCaptureHTMLMock from "../../../../mocks/hooks/useCaptureHTMLMock";

// Mock the actual useCaptureHTML hook
vi.mock("../../hooks/useCaptureHTML", () => ({
  __esModule: true,
  default: useCaptureHTMLMock,
}));

const MockShareYourResults = ({ isGameOver }: { isGameOver: boolean }) => {
  return render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={true}>
        <div>
          <ShareYourResults isGameOver={isGameOver} />
          <div id="capture-area"></div>
        </div>
      </MockThemeProvider>
    </MemoryRouter>
  );
};

describe("should render default elements", () => {
  beforeEach(() => {
    MockShareYourResults({ isGameOver: true });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render a heading with correct text", () => {
    const headingElement = screen.getByRole("heading", {
      name: /Share Your Results/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should render loading text by default", async () => {
    const textElement = screen.getByText("Loading...");
    expect(textElement).toBeInTheDocument();
  });
});
