import { render } from "@testing-library/react";
import { vi, Mock } from "vitest";
import OffScreenTimer from "../OffScreenTimer";

const mockSetSeconds: Mock = vi.fn();
const mockSetStartTimer: Mock = vi.fn();

vi.mock("../../../../../client/components/hooks/useSecondsTimer", () => ({
  default: () => ({
    seconds: 10,
    setStartTimer: mockSetStartTimer,
  }),
}));

describe("OffScreenTimer", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should call setSeconds with the current seconds when isGameOver is true", () => {
    render(<OffScreenTimer isGameOver={true} setSeconds={mockSetSeconds} />);

    expect(mockSetSeconds).toHaveBeenCalledWith(10);
    expect(mockSetStartTimer).toHaveBeenCalledWith(false);
  });

  it("should set the timer to start when isGameOver is fals unless the timer is already started", () => {
    render(<OffScreenTimer isGameOver={false} setSeconds={mockSetSeconds} />);

    expect(mockSetSeconds).not.toHaveBeenCalled();
  });

  it("should call setSeconds only once when isGameOver is true", () => {
    render(<OffScreenTimer isGameOver={true} setSeconds={mockSetSeconds} />);

    expect(mockSetSeconds).toHaveBeenCalledTimes(1);
  });

  it("should not stop the timer when isGameOver is false", () => {
    render(<OffScreenTimer isGameOver={false} setSeconds={mockSetSeconds} />);

    expect(mockSetStartTimer).not.toHaveBeenCalledWith(false);
  });

  it("should stop the timer when isGameOver is true", () => {
    render(<OffScreenTimer isGameOver={true} setSeconds={mockSetSeconds} />);

    expect(mockSetStartTimer).toHaveBeenCalledWith(false);
  });
});
