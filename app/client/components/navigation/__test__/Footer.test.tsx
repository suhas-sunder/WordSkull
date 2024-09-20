import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest"; // Ensure this import is present
import Footer from "../Footer";
import { createContext, useState, ReactNode } from "react";

// Create a mock theme context
const ThemeContext = createContext({
  darkThemeActive: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDarkThemeActive: (value: boolean) => {},
});

const MockThemeProvider = ({
  children,
  darkThemeActive = false,
}: {
  children: ReactNode;
  darkThemeActive?: boolean;
}) => {
  const [isDarkTheme, setDarkThemeActive] = useState(darkThemeActive);

  // This function matches the expected type
  const mockSetDarkThemeActive = (value: boolean) => {
    setDarkThemeActive(value);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkThemeActive: isDarkTheme,
        setDarkThemeActive: mockSetDarkThemeActive,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const MockFooter = ({ darkThemeActive }: { darkThemeActive?: boolean }) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <Footer />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

describe("Should render default elements", () => {
  beforeEach(() => {
    MockFooter({ darkThemeActive: false }); // Call the mock footer with light theme before each test
  });

  it("should render the correct copyright text", () => {
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();
  });

  it("should display 'WordSkull' and 'All Rights Reserved'", () => {
    expect(screen.getByText(/WordSkull/i)).toBeInTheDocument();
    expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();
  });

  it("should render a nav element", () => {
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("should render navigation link for sitemap with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /Sitemap/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/sitemap");
  });

  it("should render navigation link for privacy policy with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /privacy/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/privacy-policy");
  });

  it("should render navigation link for terms of service with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /terms of service/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/terms-of-service");
  });
  it("should render navigation link for cookies policy with appropriate redirect", () => {
    const linkElement = screen.getByRole("link", { name: /cookie/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/cookies-policy");
  });
});
