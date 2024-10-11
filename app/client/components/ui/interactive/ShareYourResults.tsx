import { useState } from "react";
import useCaptureHTML from "../../hooks/useCaptureHTML";

interface PropType {
  isGameOver: boolean;
}

function ShareYourResults({ isGameOver }: PropType) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const {
    downloadPuzzle,
    copyImageToClipboard,
    shareImage,
    isWebShareSupported,
    loadingStatus,
  } = useCaptureHTML({ isGameOver, captureAreaId: "capture-area" }); //Use captureAreaId prop to identify the element to be captured when game ends

  return (
    <div className="cursor-pointer py-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex flex-col gap-5 justify-center items-center">
      <span className="flex whitespace-nowrap text-xl text-slate-600">
        Share Your Results!
      </span>
      {/* Loading State */}
      {loadingStatus === "loading" && (
        <div className="flex items-center justify-center h-full">
          <span className="text-lg font-semibold animate-pulse">
            Loading...
          </span>
        </div>
      )}

      {/* Failed State */}
      {loadingStatus === "failed" && <div>Something went wrong</div>}

      {/* Loaded State */}
      {loadingStatus === "loaded" && (
        <ul className="grid sm:grid-cols-3 gap-5 justify-center items-center mb-[2.5em]">
          {isWebShareSupported && (
            <li className="flex justify-center items-center w-full">
              <button
                className="cursor-pointer w-[8em] hover:border-skull-brown hover:text-skull-super-dark-brown h-[3.5em] py-2 gap-2 border-2 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
                onClick={shareImage}
              >
                Share
              </button>
            </li>
          )}
          <li className="flex justify-center items-center w-full">
            <button
              onClick={downloadPuzzle}
              className="cursor-pointer py-2 w-[8em] hover:border-skull-brown hover:text-skull-super-dark-brown h-[3.5em] border-2 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
            >
              Download
            </button>
          </li>
          <li className="flex justify-center items-center w-full">
            <button
              onClick={() => {
                copyImageToClipboard();
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 500);
              }}
              className="cursor-pointer py-2 gap-2 border-2 hover:border-skull-brown hover:text-skull-super-dark-brown w-[8em] h-[3.5em] rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ShareYourResults;
