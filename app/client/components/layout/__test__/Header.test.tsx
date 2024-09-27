import { fireEvent, screen, waitFor } from "@testing-library/react";
import MockHeader from "../../../mocks/MockHeader";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

const setShowGameOverMenuMock = vi.fn();
const setShowKeyboardMock = vi.fn();



describe("should display the correct number of lives", () => {
  it("should display white heart when dark theme is active", async () => {
    // Render the MockHeader with necessary props
    MockHeader({
      darkThemeActive: true,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenuMock,
      setShowKeyboard: setShowKeyboardMock,
    });
  
    // Query the life icon element and assert its content
    const lifeIcon = await waitFor(() => screen.getByTestId("life-icon"));
    expect(lifeIcon).toHaveTextContent("🤍"); // Expect white heart icon to be displayed
  });

  it("should render the header with the correct number of lives and icons", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenuMock,
      setShowKeyboard: setShowKeyboardMock,
    });

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(screen.getByText("🖤")).toBeInTheDocument();
  });

  it("should not display lives and icons when the game is over", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true, 
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenuMock,
      setShowKeyboard: setShowKeyboardMock,
    });

    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("x")).not.toBeInTheDocument();
    expect(screen.queryByText("🖤")).not.toBeInTheDocument();
  });

  it("should display black heart when light theme is active", async () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenuMock,
      setShowKeyboard: setShowKeyboardMock,
    });

    // Use findByTestId to wait for the element to appear
    const lifeIcon = await screen.findByTestId("life-icon");
    expect(lifeIcon).toHaveTextContent("🖤");
  });


  it("should display correct lives count", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 5,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenuMock,
      setShowKeyboard: setShowKeyboardMock,
    });

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should load showKeyboard from localStorage on initial render", () => {
    localStorage.setItem("showKeyboard", "true");

    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboardMock,
    });

    expect(setShowKeyboardMock).toHaveBeenCalledWith(true);
    localStorage.removeItem("showKeyboard");
  });

  
});
