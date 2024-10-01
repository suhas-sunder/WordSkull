import { useStats } from "../context/StatsContext";
import SecondsToTime from "../utils/converters/SecondsToTime";
import Icon from "../utils/other/Icon";

interface PropType {
  showStats: boolean;
  setShowStats: (value: boolean) => void;
}

function SpecificGameStats({ showStats, setShowStats }: PropType) {
  const { stats, difficulty, gameMode } = useStats();

  return (
    <>
      {showStats && (
        <>
          <div className="absolute font-roboto  top-[22em] overflow-auto left-1/2 -translate-x-1/2 z-[50] items-center py-[2em] flex -translate-y-1/2 bg-white max-w-[38em] w-full min-h-[20em] max-h-[80vh] rounded-lg flex-col gap-7">
            <button
              data-testid="close-settings"
              onClick={() => setShowStats(false)}
              className="flex absolute top-[0.8em] right-[0.8em] z-[60]"
            >
              <Icon icon="close" />
            </button>
            <h2 className="text-2xl font-nunito text-skull-super-dark-brown">
              Game Stats
              <span className="flex flex-col font-nunito w-full justify-center items-center gap-3 mt-3 text-xs">
                <span>Difficulty: {difficulty}</span>
                <span>Game Mode: {gameMode}</span>
              </span>
            </h2>

            <ul>
              {stats.map((data) => (
                <li key={data.id}>
                  <ul>
                    <li>
                      {data.correctWords}/{data.totalWords} Words
                    </li>
                    <li>
                      {data.livesLeft}/{data.totalLives} Lives
                    </li>
                    <li>{SecondsToTime(data.timeSpentSec)} seconds</li>
                    <li>{new Date(data.date).toLocaleString()}</li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <button
            data-testid="settings-background"
            onClick={() => setShowStats(false)}
            className="fixed inset-0 h-full w-full flex bg-skull-brown bg-opacity-10 z-30 justify-center"
          ></button>
        </>
      )}
    </>
  );
}

export default SpecificGameStats;
