import { useStats } from "../context/StatsContext";
import ModalWrapper from "../ui/ModalWrapper";
import SecondsToTime from "../utils/converters/SecondsToTime";

interface PropType {
  showStats: boolean;
  setShowStats: (value: boolean) => void;
}

function SpecificGameStats({ showStats, setShowStats }: PropType) {
  const { stats, difficulty, gameMode } = useStats();

  return (
    <>
      {showStats && (
        <ModalWrapper setShowModal={setShowStats} customClass="top-[25em] sm:top-[28em] py-[2em] overflow-auto max-h-[80vh]">
          <>
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
          </>
        </ModalWrapper>
      )}
    </>
  );
}

export default SpecificGameStats;
