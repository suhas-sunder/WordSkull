import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ErrorBoundary from "../ErrorBoundary";

// Dummy component to simulate error
const ProblematicComponent = () => {
  throw new Error("Test error");
};

describe("handles errors correctly", () => {
  it("should render children when there is no error", () => {
    render(
      <ErrorBoundary>
        <h1>No errors here!</h1>
      </ErrorBoundary>
    );

    expect(screen.getByText("No errors here!")).toBeInTheDocument();
  });

  it("should log error details to console", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error caught by ErrorBoundary:",
      expect.any(Error),
      expect.any(Object)
    );

    consoleSpy.mockRestore();
  });
});
