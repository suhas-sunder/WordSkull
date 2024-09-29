import { render, screen, act } from "@testing-library/react";
import { vi } from "vitest";
import useTotalLives from "../useTotalLives";
import React from "react";
import "@testing-library/jest-dom/vitest";

// Define the props type for the test component
interface TestComponentProps {
  currentSkull: string[][][];
  setIsGameOver: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

// Test component to integrate the hook
const TestComponent: React.FC<TestComponentProps> = ({
  currentSkull,
  setIsGameOver,
}) => {
  const { lives, maxLives } = useTotalLives({ currentSkull, setIsGameOver });

  return (
    <div>
      <div>{`Lives: ${lives}`}</div>
      <div>{`Max Lives: ${maxLives}`}</div>
    </div>
  );
};

describe("manages total lives correctly based on currentSkull pattern", () => {
  let setIsGameOverMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setIsGameOverMock = vi.fn(); // Create a mock function
  });

  it("should initialize with 0 lives", () => {
    render(
      <TestComponent
        currentSkull={[[["@"]]]}
        setIsGameOver={setIsGameOverMock}
      />
    );
    expect(screen.getByText("Lives: 0")).toBeInTheDocument();
    expect(screen.getByText("Max Lives: 0")).toBeInTheDocument();
  });

  it("should calculate lives correctly based on currentSkull", () => {
    render(
      <TestComponent
        currentSkull={[
          [
            ["@", "~", " ", " "],
            [" ", "~", "~", "@"],
            ["~", " ", "@", " "],
          ],
        ]}
        setIsGameOver={setIsGameOverMock}
      />
    );

    // Assert that the total lives are calculated correctly
    expect(screen.getByText("Lives: 5")).toBeInTheDocument();
    expect(screen.getByText("Max Lives: 5")).toBeInTheDocument();
  });

  it("should call setIsGameOver when lives are zero or below", () => {
    render(
      <TestComponent
        currentSkull={[[["@", " "]]]}
        setIsGameOver={setIsGameOverMock}
      />
    );

    // Initially, lives should not be zero
    expect(setIsGameOverMock).not.toHaveBeenCalled();

    // Update lives to zero
    act(() => {
      render(
        <TestComponent
          currentSkull={[[["@", "@", "@", "@"]]]}
          setIsGameOver={setIsGameOverMock}
        />
      );
    });

    // After rendering, it should call setIsGameOver
    expect(setIsGameOverMock).toHaveBeenCalledTimes(1);
  });

  it("should handle updates to lives correctly", () => {
    render(
      <TestComponent
        currentSkull={[[["@", " "]]]}
        setIsGameOver={setIsGameOverMock}
      />
    );

    // Lives should be initialized based on currentSkull
    expect(screen.getByText("Lives: 1")).toBeInTheDocument();

    vi.clearAllMocks();

    // Change the currentSkull to increase lives
    act(() => {
      render(
        <TestComponent
          currentSkull={[[["@", " ", "~", " "]]]}
          setIsGameOver={setIsGameOverMock}
        />
      );
    });

    // Assert that lives are recalculated correctly
    expect(screen.getByText("Lives: 2")).toBeInTheDocument();
  });
});
