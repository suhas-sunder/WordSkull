import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MockThemeProvider from "../../../../../client/mocks/components/MockThemeContext";
import ShareYourResults from "../ShareYourResults";

const downloadPuzzle = vi.fn();
const copyImageToClipboard = vi.fn();
const shareImage = vi.fn();

vi.mock("../../../../../client/components/hooks/useCaptureHTML", () => {
  return {
    __esModule: true,
    default: () => ({
      downloadPuzzle,
      copyImageToClipboard,
      shareImage,
      isWebShareSupported: true,
      imgBlob: null,
      loadingStatus: "loaded",
    }),
  };
});

vi.mock("html2canvas", () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return Promise.resolve({
        toDataURL: () => "data:image/png;base64,mockImageData",
        toBlob: (callback: (arg0: Blob) => void) => {
          const mockBlob = new Blob(); // Create a mock Blob object
          callback(mockBlob); // Call the callback with the mock Blob
        },
      });
    }),
  };
});

// Refactored Mock Function
const MockShareYourResults = async ({
  isGameOver,
}: {
  isGameOver: boolean;
}) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={true}>
        <div>
          <ShareYourResults isGameOver={isGameOver} />
          <div id="capture-area">Blob me</div>
        </div>
      </MockThemeProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  global.getComputedStyle = () =>
    ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getPropertyValue: (prop) => "",
    } as CSSStyleDeclaration);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("should render default elements when captured image is loaded", () => {
  it("should render a heading with correct text", () => {
    MockShareYourResults({ isGameOver: true });
    const headingElement = screen.getByRole("heading", {
      name: /Share Your Results/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should not render loading text", async () => {
    MockShareYourResults({ isGameOver: true });
    const textElement = screen.queryByText("Loading...");
    expect(textElement).not.toBeInTheDocument();
  });

  it("should not render failed to capture text", async () => {
    MockShareYourResults({ isGameOver: true });
    const textElement = screen.queryByText("Something went wrong");
    expect(textElement).not.toBeInTheDocument();
  });

  it("should render a heading with correct text", () => {
    MockShareYourResults({ isGameOver: true });
    const headingElement = screen.getByRole("heading", {
      name: /Share Your Results/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should render share button", async () => {
    MockShareYourResults({ isGameOver: true });
    const textElement = screen.getByText("Share");
    expect(textElement).toBeInTheDocument();
  });

  it("should render download button", async () => {
    MockShareYourResults({ isGameOver: true });
    const textElement = screen.getByText("Share");
    expect(textElement).toBeInTheDocument();
  });

  it("should render copy button", async () => {
    MockShareYourResults({ isGameOver: true });
    const textElement = screen.getByText("Share");
    expect(textElement).toBeInTheDocument();
  });
});

describe("handles user events correctly", () => {
  it("should call downloadPuzzle", async () => {
    MockShareYourResults({ isGameOver: true });
    const textElement = screen.getByText("Download");

    fireEvent.click(textElement);

    expect(downloadPuzzle).toHaveBeenCalled();
  });

  it("should call share", async () => {
    MockShareYourResults({ isGameOver: true });
    const textElement = screen.getByText("Share");

    fireEvent.click(textElement);

    expect(shareImage).toHaveBeenCalled();
  });

  it("should call copy", async () => {
    MockShareYourResults({ isGameOver: true });
    const textElement = screen.getByText("Copy");

    fireEvent.click(textElement);

    expect(copyImageToClipboard).toHaveBeenCalled();
  });
});
