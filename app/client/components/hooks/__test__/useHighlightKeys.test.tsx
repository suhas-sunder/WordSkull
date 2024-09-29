import { render, act } from "@testing-library/react";
import useHighlightKeys from "../useHighlightKeys"; // Adjust the path to your hook file
import { vi } from "vitest";

// Test component to integrate the hook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TestComponent = ({ setKeyStyles }: { setKeyStyles: any }) => {
  useHighlightKeys({ setKeyStyles });
  return <div>Test Component</div>;
};

describe("highlights keys correctly", () => {
  beforeEach(() => {
    // Use fake timers to control setTimeout timing in the hook
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Restore timers after each test
    vi.clearAllTimers();
    vi.useRealTimers();
  });
  it("should highlight the 'Enter' key correctly", () => {
    const setKeyStylesMock = vi.fn();

    render(<TestComponent setKeyStyles={setKeyStylesMock} />);

    // Simulate pressing "Enter"
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Enter" });
      window.dispatchEvent(event);
    });

    expect(setKeyStylesMock).toHaveBeenCalledTimes(1);
    expect(setKeyStylesMock.mock.calls[0][0]({})).toEqual({
      Enter: "bg-slate-600 text-white !brightness-[1.2]",
    });

    // Fast forward time by 300ms to simulate key style reset
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // After 300ms, the Enter key should be reset to "bg-white"
    expect(setKeyStylesMock.mock.calls[1][0]({})).toEqual({
      Enter: "bg-white",
    });
  });

  it("should call setKeyStyles to highlight the key and reset after 300ms", () => {
    const setKeyStylesMock = vi.fn(); // Mock for setKeyStyles

    render(<TestComponent setKeyStyles={setKeyStylesMock} />);

    // Simulate a keydown event (e.g., for the key "a")
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    // Assert that the key was highlighted with the correct style
    expect(setKeyStylesMock).toHaveBeenCalledWith(
      expect.any(Function) // It's a function that updates the key styles
    );

    // Call the updater function to check the exact style change
    setKeyStylesMock.mock.calls[0][0]((prevState: unknown) => {
      expect(prevState).toEqual({}); // Initially, prevState should be empty
      return prevState;
    });

    expect(setKeyStylesMock.mock.calls[0][0]({})).toEqual({
      a: "bg-slate-600 text-white !brightness-[1.2]",
    });

    // Fast forward time by 300ms to trigger the timeout
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // After 300ms, the style should be reset to "bg-white"
    expect(setKeyStylesMock.mock.calls[1][0]({})).toEqual({
      a: "bg-white",
    });
  });

  it("should not highlight tab, backspace, or space keys", () => {
    const setKeyStylesMock = vi.fn();

    render(<TestComponent setKeyStyles={setKeyStylesMock} />);

    // Simulate "tab" keydown event
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Tab" });
      window.dispatchEvent(event);
    });

    // Ensure that setKeyStyles is not called for the "Tab" key
    expect(setKeyStylesMock).not.toHaveBeenCalled();

    // Simulate "Backspace" keydown event
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Backspace" });
      window.dispatchEvent(event);
    });

    // Ensure that setKeyStyles is not called for the "Backspace" key
    expect(setKeyStylesMock).not.toHaveBeenCalled();

    // Simulate "Space" keydown event
    act(() => {
      const event = new KeyboardEvent("keydown", { key: " " });
      window.dispatchEvent(event);
    });

    // Ensure that setKeyStyles is not called for the "Space" key
    expect(setKeyStylesMock).not.toHaveBeenCalled();
  });

  it("should prevent default behavior for all keys except Tab", () => {
    const preventDefaultMock = vi.fn();
    const setKeyStylesMock = vi.fn();

    render(<TestComponent setKeyStyles={setKeyStylesMock} />);

    // Simulate a keydown event for "a" and ensure preventDefault is called
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      Object.defineProperty(event, "preventDefault", {
        value: preventDefaultMock,
      });
      window.dispatchEvent(event);
    });

    expect(preventDefaultMock).toHaveBeenCalledTimes(1);

    // Simulate a keydown event for "Tab" and ensure preventDefault is not called
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Tab" });
      Object.defineProperty(event, "preventDefault", {
        value: preventDefaultMock,
      });
      window.dispatchEvent(event);
    });

    expect(preventDefaultMock).toHaveBeenCalledTimes(1); // Still 1, meaning Tab did not call preventDefault
  });

  it("should not highlight keys after unmounting", () => {
    const setKeyStylesMock = vi.fn();

    const { unmount } = render(
      <TestComponent setKeyStyles={setKeyStylesMock} />
    );

    // Simulate keydown before unmounting
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    expect(setKeyStylesMock).toHaveBeenCalledWith(expect.any(Function));

    // Unmount component and try dispatching another event
    unmount();

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    // Assert that setKeyStyles was not called after unmount
    expect(setKeyStylesMock).toHaveBeenCalledTimes(1);
  });

  it("should handle consecutive key presses correctly", () => {
    const setKeyStylesMock = vi.fn();

    render(<TestComponent setKeyStyles={setKeyStylesMock} />);

    // Simulate pressing "a" followed by "Enter"
    act(() => {
      const eventA = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(eventA);

      const eventEnter = new KeyboardEvent("keydown", { key: "Enter" });
      window.dispatchEvent(eventEnter);
    });

    // Assert that both keys were highlighted
    expect(setKeyStylesMock).toHaveBeenCalledTimes(2);

    expect(setKeyStylesMock.mock.calls[0][0]({})).toEqual({
      a: "bg-slate-600 text-white !brightness-[1.2]",
    });

    expect(setKeyStylesMock.mock.calls[1][0]({})).toEqual({
      Enter: "bg-slate-600 text-white !brightness-[1.2]",
    });

    // Fast forward time by 300ms to simulate key style reset
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // After 300ms, both keys should be reset to "bg-white"
    expect(setKeyStylesMock.mock.calls[2][0]({})).toEqual({
      a: "bg-white",
    });

    expect(setKeyStylesMock.mock.calls[3][0]({})).toEqual({
      Enter: "bg-white",
    });
  });
});
