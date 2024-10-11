import html2canvas from "html2canvas";
import { useEffect, useState } from "react";

interface PropType {
  isGameOver: boolean;
  captureAreaId: string;
}

//Use captureAreaId prop to identify the element to be captured when game ends
function useCaptureHTML({ isGameOver, captureAreaId }: PropType) {
  const [isWebShareSupported, setIsWebShareSupported] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>("loading");
  const [imgBlob, setImgBlob] = useState<Blob | null>(null);

  // Check if Web Share API is supported
  useEffect(() => {
    setIsWebShareSupported(!!navigator.share);
  }, []);

  useEffect(() => {
    const handleCapture = async () => {
      const element = document.getElementById(captureAreaId);
      if (!element) return;

      // Temporarily remove the fade-in animation
      element.classList.remove("animate-fadeIn");

      try {
        const capturedBlob = await captureElementAsBlob(captureAreaId);

        if (capturedBlob) {
          setImgBlob(capturedBlob);
          console.log("Image captured successfully:", capturedBlob);
          setLoadingStatus("loaded");
        } else {
          console.log("Image capture failed, blob is null.");
          setLoadingStatus("failed");
        }
      } catch (error) {
        console.error("Error capturing element:", error);
        setLoadingStatus("failed");
      }
    };

    // Start capturing the image when the game is over
    if (isGameOver) {
      handleCapture();
    }
  }, [captureAreaId, isGameOver]);

  async function captureElementAsBlob(
    captureAreaId: string
  ): Promise<Blob | null> {
    const element = document.getElementById(captureAreaId);

    if (!element) {
      console.error(`Element with id ${captureAreaId} not found.`);
      throw new Error(`Element with id ${captureAreaId} not found`);
    }

    const canvas = await html2canvas(element);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  }

  const downloadPuzzle = () => {
    if (imgBlob) {
      const url = URL.createObjectURL(imgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "screenshot.png";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      console.log("No image available to download.");
    }
  };

  const copyImageToClipboard = async () => {
    try {
      if (!navigator.clipboard || !window.ClipboardItem) {
        console.error(
          "Clipboard API not supported. Please manually download the image."
        );
        return;
      }

      if (imgBlob) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": imgBlob }),
        ]);
      } else {
        console.log("No image available, capturing image before copying...");
        const blob = await captureElementAsBlob(captureAreaId);
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setImgBlob(blob);
          console.log("Image captured and copied to clipboard.");
        }
      }
    } catch (error) {
      console.error("Failed to copy image to clipboard:", error);
    }
  };

  const shareImage = async () => {
    if (isWebShareSupported) {
      try {
        if (imgBlob) {
          const file = new File([imgBlob], "screenshot.png", {
            type: "image/png",
          });
          await navigator.share({
            title: "Check this out!",
            text: "I captured this image.",
            files: [file],
          });
        } else {
          console.log("No image available, capturing image before sharing...");
          const blob = await captureElementAsBlob(captureAreaId);
          if (blob) {
            const file = new File([blob], "screenshot.png", {
              type: "image/png",
            });
            await navigator.share({
              title: "Check this out!",
              text: "I captured this image.",
              files: [file],
            });
            setImgBlob(blob);
            console.log("Image captured and shared successfully!");
          }
        }
      } catch (error) {
        console.error("Error sharing image:", error);
      }
    } else {
      console.error("Web Share API not supported. Copying image to clipboard.");
      copyImageToClipboard();
    }
  };

  return {
    downloadPuzzle,
    copyImageToClipboard,
    shareImage,
    isWebShareSupported,
    imgBlob,
    loadingStatus,
  };
}

export default useCaptureHTML;
