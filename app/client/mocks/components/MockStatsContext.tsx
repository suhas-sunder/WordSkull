/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode } from "react";
import { useMockPersistentState } from "../hooks/useMockPersistentState";
import { StatsDataType } from "../../../client/components/context/StatsContext";

export const MockStatsContext = createContext({
  stats: {
    totalLives: 0,
    livesLeft: 0,
    totalWords: 0,
    correctWords: 0,
    timeSpentSec: 0,
    difficulty: "",
  },
  setStats: (value: (prevState: StatsDataType) => StatsDataType) => {},
});

export default function MockStatsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [stats, setStats] = useMockPersistentState<StatsDataType>("stats", {
    totalLives: 0,
    livesLeft: 0,
    totalWords: 0,
    correctWords: 0,
    timeSpentSec: 0,
    difficulty: "",
  });

  const mockSetStats = (value: (prevState: StatsDataType) => StatsDataType) => {
    setStats((prevState: StatsDataType) => value(prevState));
  };

  return (
    <MockStatsContext.Provider
      value={{
        stats,
        setStats: mockSetStats,
      }}
    >
      {children}
    </MockStatsContext.Provider>
  );
}
