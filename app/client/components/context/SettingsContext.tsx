import { createContext, useContext, useEffect, useState } from "react";

export type InstructionsType = {
  showInstructions: boolean;
  setShowInstructions: (value: (prevState: boolean) => boolean) => void;
};

export type KeyboardType = {
  setShowKeyboard: (value: (prevState: boolean) => boolean) => void;
  showKeyboard: boolean;
};

interface SettingsContextProps extends InstructionsType, KeyboardType {}

export const SettingsContext = createContext<SettingsContextProps>({
  showInstructions: false,
  setShowInstructions: () => {},
  showKeyboard: false,
  setShowKeyboard: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);

  //Manage settings in local storage
  useEffect(() => {
    // Run this effect only on the client side
    if (typeof window !== "undefined") {
      // Helper function to parse localStorage safely
      const getParsedLocalStorage = (key: string) => {
        const value = localStorage.getItem(key);
        if (value !== null) {
          try {
            return JSON.parse(value);
          } catch (error) {
            console.error(
              `Error parsing localStorage value for ${key}:`,
              error
            );
          }
        }
        return null;
      };

      // Fetch and parse localStorage values
      const keyboardState = getParsedLocalStorage("showKeyboard");
      const instructionsState = getParsedLocalStorage("showInstructions");

      // Update state if values are found
      if (keyboardState !== null) {
        setShowKeyboard(keyboardState);
      }
      if (instructionsState !== null) {
        setShowInstructions(instructionsState);
      }

      // Set loading to true after checking localStorage
      setIsLoaded(true);
    }
  }, [setShowInstructions, setShowKeyboard]);

  //Update localStorage whenever the state changes
  useEffect(() => {
    // Don't save to localStorage until it's loaded
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("showKeyboard", JSON.stringify(showKeyboard));
      localStorage.setItem(
        "showInstructions",
        JSON.stringify(showInstructions)
      );
    }
  }, [showKeyboard, showInstructions, isLoaded]);

  return (
    <SettingsContext.Provider
      value={{
        showInstructions,
        setShowInstructions,
        showKeyboard,
        setShowKeyboard,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}


export function useSettings() {
  return useContext(SettingsContext);
}