import { useEffect, useRef } from "react";

interface PropType {
  setKeyStyles: (
    updater: (prev: { [key: string]: string }) => { [key: string]: string }
  ) => void;
  baseStyles: { [key: string]: string }; // seeded from GenerateDefaultStylingForKeys
  lingerMs?: number;
}

function isTypingTarget(el: EventTarget | null) {
  const t = el as HTMLElement | null;
  if (!t) return false;
  const tag = t.tagName?.toLowerCase();
  const editable =
    t.isContentEditable ||
    tag === "input" ||
    tag === "textarea" ||
    tag === "select";
  return editable;
}

function normalizeKey(key: string) {
  if (key === "Enter") return "Enter";
  if (key === " ") return " ";
  if (
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown"
  ) {
    return key;
  }
  return key; // keep case, we will match both below
}

// Find all ids for this key that exist in baseStyles
function matchingIdsForKey(k: string, baseStyles: { [key: string]: string }) {
  const ids = new Set<string>();
  if (k in baseStyles) ids.add(k);
  if (k.length === 1) {
    const lo = k.toLowerCase();
    const up = k.toUpperCase();
    if (lo in baseStyles) ids.add(lo);
    if (up in baseStyles) ids.add(up);
  }
  return Array.from(ids);
}

export default function useHighlightKeys({
  setKeyStyles,
  baseStyles,
  lingerMs = 300,
}: PropType) {
  const timersRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Only set bg + text for highlight; do not set border here
    const highlightClass = "bg-pumpkin-orange/60 text-white !brightness-[1.2]";

    const highlightMany = (ids: string[]) =>
      setKeyStyles((prev) => {
        const next = { ...prev };
        ids.forEach((id) => {
          const base = baseStyles[id] ?? prev[id] ?? "";
          next[id] = `${base} ${highlightClass}`;
        });
        return next;
      });

    const clearMany = (ids: string[]) =>
      setKeyStyles((prev) => {
        const next = { ...prev };
        ids.forEach((id) => {
          next[id] = baseStyles[id] ?? "bg-white";
        });
        return next;
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "tab") return;

      const notTyping = !isTypingTarget(e.target);
      const shouldPrevent =
        notTyping &&
        (e.key === " " ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "PageUp" ||
          e.key === "PageDown");
      if (shouldPrevent) e.preventDefault();

      // you chose not to highlight Backspace here
      if (e.key === "Backspace") return;
      if (e.repeat) return;

      const k = normalizeKey(e.key);
      const ids = matchingIdsForKey(k, baseStyles);
      if (!ids.length) return;

      ids.forEach((id) => {
        const t = timersRef.current.get(id);
        if (t) {
          window.clearTimeout(t);
          timersRef.current.delete(id);
        }
      });

      highlightMany(ids);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = normalizeKey(e.key);
      const ids = matchingIdsForKey(k, baseStyles);
      if (!ids.length) return;

      ids.forEach((id) => {
        const tid = window.setTimeout(() => {
          clearMany([id]);
          timersRef.current.delete(id);
        }, lingerMs);
        timersRef.current.set(id, tid);
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current.clear();
    };
  }, [setKeyStyles, baseStyles, lingerMs]);
}
