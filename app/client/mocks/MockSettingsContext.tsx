/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useState, useEffect } from "react";

// MockSettingsContext with default values matching the expected types
export const MockSettingsContext = createContext({
  showInstructions: true,
  setShowInstructions: (value: (prevState: boolean) => boolean) => {},
  showKeyboard: true,
  setShowKeyboard: (value: (prevState: boolean) => boolean) => {},
});

// MockSettingsProvider component
export default function MockSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // To simulate localStorage loading

  // Mock localStorage for use in tests
  useEffect(() => {
    // Mocking localStorage getItem
    const originalGetItem = window.localStorage.getItem.bind(
      window.localStorage
    );
    window.localStorage.getItem = (key: string) => {
      switch (key) {
        case "showInstructions":
          return JSON.stringify(true); // Mock stored value
        case "showKeyboard":
          return JSON.stringify(false); // Mock stored value
        default:
          return originalGetItem(key); // Fallback to the original
      }
    };

    // Mocking localStorage setItem
    const originalSetItem = window.localStorage.setItem.bind(
      window.localStorage
    );
    window.localStorage.setItem = (key: string, value: string) => {
      // You can handle the mock logic here if needed
      originalSetItem(key, value); // Optional: you can remove this line if not needed
    };

    // Load settings from localStorage
    const keyboardState = JSON.parse(
      window.localStorage.getItem("showKeyboard") || showKeyboard.toString()
    );
    const instructionsState = JSON.parse(
      window.localStorage.getItem("showInstructions") ||
        showInstructions.toString()
    );

    setShowKeyboard(keyboardState);
    setShowInstructions(instructionsState);

    setIsLoaded(true); // Mark as loaded after fetching localStorage data

    // Cleanup function to restore original localStorage methods
    return () => {
      window.localStorage.getItem = originalGetItem;
      window.localStorage.setItem = originalSetItem;
    };
  }, [showInstructions, showKeyboard]);

  // Update localStorage whenever state changes (mocking the real implementation)
  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem("showKeyboard", JSON.stringify(showKeyboard));
      window.localStorage.setItem(
        "showInstructions",
        JSON.stringify(showInstructions)
      );
    }
  }, [showKeyboard, showInstructions, isLoaded]);

  // Mocking the actual setState functions with localStorage behavior
  const mockSetShowInstructions = (value: (prevState: boolean) => boolean) => {
    setShowInstructions((prevState) => value(prevState));
  };

  const mockSetShowKeyboard = (value: (prevState: boolean) => boolean) => {
    setShowKeyboard((prevState) => value(prevState));
  };

  return (
    <MockSettingsContext.Provider
      value={{
        showInstructions,
        setShowInstructions: mockSetShowInstructions,
        showKeyboard,
        setShowKeyboard: mockSetShowKeyboard,
      }}
    >
      {children}
    </MockSettingsContext.Provider>
  );
}
