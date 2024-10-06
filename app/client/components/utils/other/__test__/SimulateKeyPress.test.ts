import { describe, it, expect, vi } from "vitest";
import SimulateKeyPress from "../SimulateKeyPress"; 

describe("simulates key presses correctly", () => {
  it("should dispatch the correct key event for 'a'", () => {
    const spy = vi.spyOn(document, "dispatchEvent");

    SimulateKeyPress("a");

    expect(spy).toHaveBeenCalled();
    const event = spy.mock.calls[0][0] as KeyboardEvent;
    expect(event.key).toBe("a");
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(true);

    spy.mockRestore();
  });

  it("should dispatch 'shift' event for 'space'", () => {
    const spy = vi.spyOn(document, "dispatchEvent");

    SimulateKeyPress("space");

    expect(spy).toHaveBeenCalled();
    const event = spy.mock.calls[0][0] as KeyboardEvent;
    expect(event.key).toBe("shift");
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(true);

    spy.mockRestore();
  });

  it("should dispatch 'backspace' event for 'delete'", () => {
    const spy = vi.spyOn(document, "dispatchEvent");

    SimulateKeyPress("delete");

    expect(spy).toHaveBeenCalled();
    const event = spy.mock.calls[0][0] as KeyboardEvent;
    expect(event.key).toBe("backspace");
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(true);

    spy.mockRestore();
  });
});
