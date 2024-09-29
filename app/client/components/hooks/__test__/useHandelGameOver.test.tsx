import { render, screen } from "@testing-library/react";
import useHandleGameOver from "../useHandleGameOver";
import "@testing-library/jest-dom/vitest";

interface PropType {
  currentRow: number;
  currentSkull: string[][][];
}

// Test Component using the hook
const TestComponent = ({ currentRow, currentSkull }: PropType) => {
  const { isGameOver } = useHandleGameOver({ currentRow, currentSkull });
  return <div>{isGameOver ? "Game Over" : "Game Ongoing"}</div>;
};

describe("handles game over logic correctly", () => {
  it("should set isGameOver to true when currentRow exceeds currentSkull length", () => {
    const currentSkull = [
      [
        ["skull1", "skull2"],
        ["skull3", "skull4"],
      ],
    ];
    const { rerender } = render(
      <TestComponent currentRow={1} currentSkull={currentSkull} />
    );

    // Initially, it should not be game over
    expect(screen.getByText("Game Ongoing")).toBeInTheDocument();

    // Rerender with a currentRow that exceeds currentSkull length
    rerender(<TestComponent currentRow={3} currentSkull={currentSkull} />);

    // Check if isGameOver is set correctly
    expect(screen.getByText("Game Over")).toBeInTheDocument();
  });

  it("should not set isGameOver if currentRow is within currentSkull length", () => {
    const currentSkull = [
      [
        ["skull1", "skull2"],
        ["skull3", "skull4"],
      ],
    ];

    render(<TestComponent currentRow={0} currentSkull={currentSkull} />);

    // When currentRow is 0 and currentSkull is empty, it should still be ongoing
    expect(screen.getByText("Game Ongoing")).toBeInTheDocument();
  });

  it("should not set isGameOver if currentRow is equal to currentSkull length", () => {
    const currentSkull = [
      [
        ["skull1", "skull2"],
        ["skull3", "skull4"],
      ],
    ];

    render(<TestComponent currentRow={1} currentSkull={currentSkull} />);

    // Check that the game is ongoing
    expect(screen.getByText("Game Ongoing")).toBeInTheDocument();
  });

  it("should handle empty currentSkull correctly", () => {
    const currentSkull: string[][][] = [];

    render(<TestComponent currentRow={0} currentSkull={currentSkull} />);

    // When currentRow is 0 and currentSkull is empty, it should still be ongoing
    expect(screen.getByText("Game Ongoing")).toBeInTheDocument();
  });
});
