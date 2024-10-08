import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import SpecificGameStats from "../../ui/interactive/SpecificGameStats";
import MockThemeProvider from "../../../../client/mocks/components/MockThemeContext";
import { MemoryRouter } from "react-router-dom";

interface PropType {
  darkthemeActive: boolean;
  showStats: boolean;
  setShowStats: (value: boolean) => void;
}

const MockSpecificGameStats = (props: PropType) => {
  return render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={props.darkthemeActive}>
        <SpecificGameStats {...props} />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

const props = {
  darkthemeActive: true,
  setShowStats: vi.fn(),
};

describe("renders game over elements to be captured & shared", () => {
  beforeEach(() => {
    MockSpecificGameStats({ ...props, showStats: true });
  });

  it("should render modal with close button'", () => {
    const buttonElement = screen.getByTestId("close-modal");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render modal background'", () => {
    const buttonElement = screen.getByTestId("modal-background");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render a main heading with the correct text'", () => {
    const headingElement = screen.getByRole("heading", { name: /Statistics/i });
    expect(headingElement).toBeInTheDocument();
  });

  it("should render a heading with the correct text for first stats section'", () => {
    const headingElement = screen.getByRole("heading", {
      name: /Least Lives Lost/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("should render one list item by default when no stats are available", () => {
    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  it("should render 6 list items by default when no stats are available", () => {
    const listElements = screen.getAllByRole("listitem");
    expect(listElements).toHaveLength(6);
  });

  it("should render correct text in place of second list when no stats are available", () => {
    const textElement = screen.getByText(/No wins found with perfect score./i);
    expect(textElement).toBeInTheDocument();
  });
});

describe("should not render modal or stats when showStats is false", () => {
  beforeEach(() => {
    MockSpecificGameStats({ ...props, showStats: false });
  });

  it("should not render modal with close button'", () => {
    const buttonElement = screen.queryByTestId("close-modal");
    expect(buttonElement).not.toBeInTheDocument();
  });

  it("should not render modal background'", () => {
    const buttonElement = screen.queryByTestId("modal-background");
    expect(buttonElement).not.toBeInTheDocument();
  });

  it("should not render 6 list items by default when no stats are available", () => {
    const listElements = screen.queryAllByRole("listitem");
    expect(listElements).not.toHaveLength(6);
  });

  it("should not render correct text in place of second list when no stats are available", () => {
    const textElement = screen.queryByText(
      /No wins found with perfect score./i
    );
    expect(textElement).not.toBeInTheDocument();
  });
});
