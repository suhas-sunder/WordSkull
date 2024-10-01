/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode } from "react";
import { useMockPersistentState } from "../hooks/useMockPersistentState";
export const MockSettingsContext = createContext({
  showInstructions: true,
  setShowInstructions: (value: (prevState: boolean) => boolean) => {},
  showKeyboard: true,
  setShowKeyboard: (value: (prevState: boolean) => boolean) => {},
});

export default function MockSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showInstructions, setShowInstructions] =
    useMockPersistentState<boolean>("showInstructions", true); //Mock saving to localStorage
  const [showKeyboard, setShowKeyboard] = useMockPersistentState<boolean>(
    "showKeyboard",
    true
  ); //Mock saving to localStorage

  const mockSetShowInstructions = (value: (prevState: boolean) => boolean) => {
    setShowInstructions((prevState: boolean) => value(prevState));
  };

  const mockSetShowKeyboard = (value: (prevState: boolean) => boolean) => {
    setShowKeyboard((prevState: boolean) => value(prevState));
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
