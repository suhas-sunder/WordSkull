import { createContext, useContext } from "react";
import { MockStatsContext } from "../../mocks/components/MockStatsContext";
import { usePersistentState } from "../hooks/usePersistentState";

export type StatsDataType = {
  totalLives: number;
  livesLeft: number;
  totalWords: number;
  correctWords: number;
  timeSpentSec: number;
  difficulty: string;
};

export type StatsType = {
  setStats: (value: (prevState: StatsDataType) => StatsDataType) => void;
  stats: StatsDataType;
};

interface StatsContextProps extends StatsType {}

export const StatsContext = createContext<StatsContextProps>({
  stats: {
    totalLives: 0,
    livesLeft: 0,
    totalWords: 0,
    correctWords: 0,
    timeSpentSec: 0,
    difficulty: "",
  },
  setStats: () => {},
});

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = usePersistentState<StatsDataType>("stats", {
    totalLives: 0,
    livesLeft: 0,
    totalWords: 0,
    correctWords: 0,
    timeSpentSec: 0,
    difficulty: "",
  });

  return (
    <StatsContext.Provider
      value={{
        stats,
        setStats,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

// Setup actual context to run during testing so I can test this without the mock instance
export function useTestStats() {
  return useContext(StatsContext);
}

const isTestEnvironment = process.env.NODE_ENV === "test";

// Mock context if running tests otherwise use real context
export function useStats() {
  const context = useContext(
    isTestEnvironment ? MockStatsContext : StatsContext
  );
  if (!context) {
    throw new Error("StatsContext has not been initialized");
  }
  return context;
}
