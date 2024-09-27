import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  darkThemeActive: boolean;
  setDarkThemeActive: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  darkThemeActive: false,
  setDarkThemeActive: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with null to handle client-side initialization
  const [darkThemeActive, setDarkThemeActive] = useState<boolean | null>(null);

  useEffect(() => {
    // This effect runs only on the client-side
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("darkThemeActive");
      // Set the theme based on localStorage value or default to false
      setDarkThemeActive(savedTheme ? JSON.parse(savedTheme) : false);
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever the darkThemeActive state changes
    if (darkThemeActive !== null) {
      localStorage.setItem("darkThemeActive", JSON.stringify(darkThemeActive));
    }
  }, [darkThemeActive]);

  return (
    <ThemeContext.Provider value={{ darkThemeActive: darkThemeActive ?? false, setDarkThemeActive }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}