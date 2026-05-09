import { act, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import useClassicGameplayLogic from "./useClassicGameplayLogic";

function ClassicGameplayHarness({ guess }: { guess: string }) {
  const [currentSkull, setCurrentSkull] = useState<string[][][]>([
    [["", "", "", "", ""]],
  ]);

  const { enteredWords } = useClassicGameplayLogic({
    currentSkull,
    setCurrentSkull,
    wordsList: {
      5: ["house"],
    },
    setDispWordHistory: () => {},
    wordsForSkull: ["apple"],
    startOffscreenTimer: false,
    setStartOffscreenTimer: () => {},
  });

  return (
    <>
      <output data-testid="current-word">
        {currentSkull[0][0].join("")}
      </output>
      <output data-testid="entered-words">
        {JSON.stringify(enteredWords)}
      </output>
      <output data-testid="guess">{guess}</output>
    </>
  );
}

async function pressKey(key: string) {
  await act(async () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key }));
  });
}

describe("useClassicGameplayLogic word validation", () => {
  it("accepts a common non-target guess from the validation list", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<ClassicGameplayHarness guess="house" />);

    for (const key of "house") {
      await pressKey(key);
    }
    await pressKey("Enter");

    expect(screen.getByTestId("current-word").textContent).toBe("house");
    expect(screen.getByTestId("entered-words").textContent).toContain("house");
    expect(alertSpy).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it("still rejects a filled unsupported guess", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<ClassicGameplayHarness guess="zzzzz" />);

    for (const key of "zzzzz") {
      await pressKey(key);
    }
    await pressKey("Enter");

    expect(screen.getByTestId("current-word").textContent).toBe("zzzzz");
    expect(screen.getByTestId("entered-words").textContent).toBe("[]");
    expect(alertSpy).toHaveBeenCalledWith("Not in word list!");

    alertSpy.mockRestore();
  });
});
