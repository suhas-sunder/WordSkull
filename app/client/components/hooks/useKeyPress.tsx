import { useEffect, useRef, useState } from "react";

function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState<string>("");
  const downRef = useRef<string | null>(null);
  const clearRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (downRef.current !== e.key) {
        downRef.current = e.key;
        setKeyPressed(e.key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === downRef.current) {
        downRef.current = null;
        if (clearRef.current) window.clearTimeout(clearRef.current);
        clearRef.current = window.setTimeout(() => setKeyPressed(""), 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (clearRef.current) window.clearTimeout(clearRef.current);
    };
  }, []);

  return { keyPressed };
}

export default useKeyPress;
