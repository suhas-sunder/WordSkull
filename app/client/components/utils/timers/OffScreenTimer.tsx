import { useEffect } from "react";
import useSecondsTimer from "../../hooks/useSecondsTimer";

interface PropType {
  isGameOver: boolean;
  setSeconds: (value: number) => void;
}

//This util fcn is a workaround to manage the timer without causing unnecessary re-renders in the parent component. So the timer is only updated when game ends since it doesn't need to be displayed when the game is ongoing.
export default function OffScreenTimer({ isGameOver, setSeconds }: PropType) {
  const { seconds, setStartTimer } = useSecondsTimer();

  useEffect(() => {
    if (isGameOver) {
      setSeconds(seconds);
      setStartTimer(false);
    } else {
      setStartTimer(true);
    }
  }, [isGameOver, seconds, setSeconds, setStartTimer]);

  return <></>;
}
