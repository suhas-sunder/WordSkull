import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

interface PropType {
  isGameOver: boolean;
}

function useCaptureHTML({ isGameOver }: PropType) {
  async function captureElementAsBlob(elementId: string) {
    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error(`Element with id ${elementId} not found`);
    }

    const canvas = await html2canvas(element);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  }

  const captureAreaRef = useRef<HTMLDivElement>(null);

  const [imgBlob, setImgBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const handleCapture = async () => {
      const captureArea = captureAreaRef.current;
      if (!captureArea) return;
      // Temporarily remove the fade-in animation
      captureArea.classList.remove("animate-fadeIn");

      try {
        // Capture the element as a blob
        setImgBlob((await captureElementAsBlob("capture-area")) as Blob);
      } catch (error) {
        console.error("Error capturing element:", error);
      }
    };

    if (isGameOver && imgBlob === null) {
      handleCapture();
    }
  }, [imgBlob, isGameOver]);

  const downloadPuzzle = () => {
    if (imgBlob) {
      // Create a download link
      const url = URL.createObjectURL(imgBlob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "screenshot.png";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return { downloadPuzzle, imgBlob, captureAreaRef };
}

export default useCaptureHTML;
