import { vi } from "vitest";

const useCaptureHTMLMock = vi.fn(({ isGameOver }) => {
  if (isGameOver) {
    return {
      loadingStatus: "loaded", // Simulate loaded state
      downloadPuzzle: vi.fn(), // Mock function for downloading
      copyImageToClipboard: vi.fn(), // Mock function for copying
      shareImage: vi.fn(), // Mock function for sharing
      isWebShareSupported: true, // Simulate that web share is supported
      imgBlob: new Blob(), // Return a valid Blob for testing
    };
  }

  return {
    loadingStatus: "loading", // Simulate loading state
    downloadPuzzle: vi.fn(),
    copyImageToClipboard: vi.fn(),
    shareImage: vi.fn(),
    isWebShareSupported: true,
    imgBlob: null, // No image blob while loading
  };
});

// Mock the actual useCaptureHTML hook
vi.mock("../../../client/components/hooks/useCaptureHTML", () => ({
  __esModule: true,
  default: useCaptureHTMLMock, // This will use your mock
}));

export default useCaptureHTMLMock;
