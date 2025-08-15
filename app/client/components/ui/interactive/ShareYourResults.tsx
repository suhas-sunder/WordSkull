import { useMemo, useState } from "react";
import useCaptureHTML from "../../hooks/useCaptureHTML";

interface PropType {
  isGameOver: boolean;
  seconds: number;
}

function ShareYourResults({ isGameOver, seconds }: PropType) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const {
    downloadPuzzle,
    copyImageToClipboard,
    shareImage,
    isWebShareSupported,
    loadingStatus,
  } = useCaptureHTML({ isGameOver, captureAreaId: "capture-area", seconds });

  // Responsive columns: 3 when share is available, otherwise 2
  const gridCols = useMemo(
    () =>
      isWebShareSupported
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2",
    [isWebShareSupported]
  );

  // Common button classes to keep sizes aligned
  const btn =
    "inline-flex items-center justify-center h-14 w-full max-w-[10rem] border-2 rounded-md transition-colors " +
    "border-stone-300 text-skull-super-dark-brown hover:border-skull-brown hover:text-skull-super-dark-brown " +
    "fill-stone-500 hover:fill-skull-brown";

  return (
    <div className="cursor-pointer font-nunito pt-2 px-4 rounded-md flex flex-col gap-5 justify-center items-center">
      <h3 className="flex whitespace-nowrap text-xl text-stone-600">
        Share Your Results!
      </h3>

      {/* Loading */}
      {loadingStatus === "loading" && (
        <div className="flex items-center justify-center h-full">
          <span className="text-lg mb-10 text-skull-dark-brown font-semibold animate-pulse">
            Loading...
          </span>
        </div>
      )}

      {/* Failed */}
      {loadingStatus === "failed" && (
        <div className="text-sm text-red-600">Something went wrong</div>
      )}

      {/* Loaded */}
      {loadingStatus === "loaded" && (
        <ul
          className={`grid ${gridCols} gap-4 sm:gap-5 justify-items-center items-center mb-[2.5em] w-full`}
        >
          {isWebShareSupported && (
            <li className="w-full flex justify-center">
              <button
                className={btn}
                onClick={shareImage}
                // Web Share API requires a user gesture + HTTPS + supported UA
                // shareImage already handles the actual `navigator.share` call
              >
                Share
              </button>
            </li>
          )}

          <li className="w-full flex justify-center">
            <button className={btn} onClick={downloadPuzzle}>
              Download
            </button>
          </li>

          <li className="w-full flex justify-center">
            <button
              className={btn}
              onClick={() => {
                copyImageToClipboard();
                setIsCopied(true);
                window.setTimeout(() => setIsCopied(false), 500);
              }}
            >
              {/* Keep width stable: reserve space for the longer label */}
              <span className="inline-block w-[4.5ch] text-center">
                {isCopied ? "Copied!" : "Copy"}
              </span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ShareYourResults;
