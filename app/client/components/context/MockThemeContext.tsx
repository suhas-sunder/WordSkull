import { createContext, ReactNode, useState } from "react";

const ThemeContext = createContext({
  darkThemeActive: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDarkThemeActive: (value: boolean) => {},
});

export default function MockThemeProvider({
  children,
  darkThemeActive = false,
}: {
  children: ReactNode;
  darkThemeActive?: boolean;
}) {
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
}
