import React, { useEffect, useRef, useState } from "react";
import useOnlyOnClient from "../../hooks/useOnlyOnClient";
import ConfettiPresets from "../../data/ConfettiPresets";

interface ConfettiProps {
  particleCount?: number; // Starting number of particles
  colors?: string[];
  maxLifetime?: number; // Adjusted for longer confetti presence
  gravity?: number; // Adjusted for falling
  wind?: number; // Random wind effect
}

// Particle Interface
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  accelerationX: number;
  accelerationY: number;
  color: string | null;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "rectangle" | null;
  emoji: string | null;
  lifetime: number; // Lifetime of the particle
}

// Emoji List
const emojis = ["🎉", "🥳", "✨", "🎊", "💖", "🌟", "🎈", "🍾", "🎁", "💫"]; // List of emojis

const presets = ConfettiPresets();

const Confetti: React.FC<ConfettiProps> = ({
  particleCount = 200, // Starting particle count
  maxLifetime = 3000, // Longer lifetime for fading out
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(true); // State to toggle regular confetti
  const [showEmojis, setShowEmojis] = useState(true); // State to toggle emojis
  const [selectedPreset, setSelectedPreset] = useState<string>("classic"); // Default preset

  const isClient = useOnlyOnClient(); // Ensure code runs only on the client side

  useEffect(() => {
    if (!isClient) return;

    // Setup canvas dimensions
    setCanvasDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [isClient]);

  const createParticle = (burstX: number, burstY: number): Particle => {
    const preset = presets[selectedPreset]; // Access the selected preset
    const isEmoji = showEmojis && Math.random() < preset.emojiChance; // Check for emoji inclusion

    // Randomly spread left or right for confetti and emojis
    const spreadFactorX = Math.random() < 0.5 ? -1 : 1; // Randomly assign left/right spread

    const speedX =
      (Math.random() * (preset.speedX.max - preset.speedX.min) +
        preset.speedX.min) *
        spreadFactorX +
      preset.wind;

    // Adjust upward speed for confetti, making it similar to emoji behavior
    const speedY = isEmoji
      ? Math.random() * -15 - 10 // For emojis, a larger upward speed
      : Math.random() * -15 - 10; // For confetti, mimic the upward speed of emojis

    return {
      x: burstX,
      y: burstY,
      size: isEmoji
        ? Math.random() * 20 + 20 // Size adjustment for emojis
        : Math.random() * (preset.size.max - preset.size.min) + preset.size.min, // Size for confetti
      speedX,
      speedY,
      accelerationX: (Math.random() - 0.5) * 0.2, // Slight horizontal acceleration
      accelerationY: preset.gravity, // Use preset gravity
      color:
        isEmoji || !showConfetti
          ? null
          : preset.colors[Math.floor(Math.random() * preset.colors.length)], // Use random color for confetti
      rotation: Math.random() * 360, // Random rotation
      rotationSpeed:
        Math.random() * (preset.rotationSpeed.max - preset.rotationSpeed.min) +
        preset.rotationSpeed.min, // Rotation speed from preset
      shape:
        isEmoji || !showConfetti
          ? null
          : Math.random() > 0.5
          ? "circle"
          : "rectangle", // Randomly assign shape
      emoji: isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : null, // Select random emoji if applicable
      lifetime: 0, // Initialize lifetime
    };
  };

  const animateConfetti = () => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const aliveParticles = [];

    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i];

      // Update particle position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.speedY += particle.accelerationY;
      particle.lifetime++;

      // Draw only particles still within lifetime
      if (particle.lifetime < maxLifetime) {
        drawParticle(ctx, particle);
        aliveParticles.push(particle); // Keep alive particles
      }
    }

    // Update particle array to only keep alive particles
    particlesRef.current = aliveParticles;

    // Continue animation if there are particles left
    if (particlesRef.current.length > 0) {
      animationIdRef.current = requestAnimationFrame(animateConfetti);
    } else {
      stopConfetti();
    }
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);

    const alpha = 1 - particle.lifetime / maxLifetime; // Fading effect
    ctx.globalAlpha = alpha;

    if (particle.emoji) {
      ctx.font = `${particle.size}px Arial`;
      ctx.fillText(particle.emoji, -particle.size / 2, particle.size / 2);
    } else if (particle.shape) {
      if (particle.shape === "circle") {
        ctx.fillStyle = particle.color!;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = particle.color!;
        ctx.fillRect(
          -particle.size / 2,
          -particle.size / 2,
          particle.size,
          particle.size
        );
      }
    }

    ctx.restore();
  };

  const startCannonConfetti = () => {
    stopConfetti(); // Stop any existing confetti before starting a new one
    if (!isClient) return;

    const { width, height } = canvasDimensions;
    const burstX = width / 2;
    const burstY = height / 2;

    const newParticles = new Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      newParticles[i] = createParticle(burstX, burstY);
    }

    particlesRef.current = newParticles;
    animateConfetti();

    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = window.setTimeout(stopConfetti, 10000);
  };

  const startCannonAtFindMe = () => {
    if (!isClient) return;
    stopConfetti(); // Stop any existing confetti before starting a new one

    // Locate the target element once and cache its dimensions
    const targetElement = document.getElementById("find-me");
    if (!targetElement) return;

    const { left, top, width } = targetElement.getBoundingClientRect();
    const burstX = left + width / 2;
    const burstY = top;

    // Preallocate the particle array and fill it with newly created particles
    const newParticles = new Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      newParticles[i] = createParticle(burstX, burstY);
    }

    particlesRef.current = newParticles;
    animateConfetti();

    // Ensure only one timeout is active, clearing any existing one
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = window.setTimeout(stopConfetti, 10000);
  };

  const startFallingConfetti = () => {
    if (!isClient) return;
    stopConfetti(); // Stop any existing confetti before starting a new one

    const { width } = canvasDimensions;

    // Preallocate the particle array and generate particles starting from the top
    const newParticles = new Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      newParticles[i] = createParticle(Math.random() * width, 0);
    }

    particlesRef.current = newParticles;
    animateConfetti();

    // Ensure only one timeout is active by clearing any existing one before setting a new timeout
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = window.setTimeout(stopConfetti, 10000);
  };
  const stopConfetti = () => {
    console.log("Stopping confetti..."); // Check if this logs when expected
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    particlesRef.current.length = 0; // More efficient than reassigning to a new array

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Use canvas properties safely
      }
    }
  };

  const debounce = (func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  };

  // Handle window resizing
  useEffect(() => {
    if (!isClient) return;

    const handleResize = debounce(() => {
      setCanvasDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100); // Adjust the debounce delay as needed

    // Call once on mount to set the initial size
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]); // Only runs when isClient changes

  // Update canvas size whenever dimensions change
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = canvasDimensions.width;
      canvasRef.current.height = canvasDimensions.height;
    }
  }, [canvasDimensions]);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-x-hidden confetti-container flex flex-col justify-center items-center">
      {isClient && (
        <>
          <canvas
            ref={canvasRef}
            width={canvasDimensions.width}
            height={canvasDimensions.height}
            className="absolute top-0 left-0"
          />
          <div className="fixed flex flex-col gap-5 top-1/2 p-20">
            <button
              onClick={startCannonConfetti}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Start Cannon Confetti
            </button>
            <button
              onClick={startFallingConfetti}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Start Falling Confetti
            </button>
            <button
              onClick={startCannonAtFindMe}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Start Cannon at #find-me
            </button>
            <div className="mt-4 flex flex-col">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showConfetti}
                  onChange={() => setShowConfetti(!showConfetti)}
                />
                <span className="ml-2">Show Regular Confetti</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showEmojis}
                  onChange={() => setShowEmojis(!showEmojis)}
                />
                <span className="ml-2">Show Emojis</span>
              </label>
            </div>
            <div className="mt-4 flex flex-col">
              <label htmlFor="preset" className="mb-2">
                Select Preset:
              </label>
              <select
                id="preset"
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                className="mt-1 p-2 border rounded"
              >
                {Object.keys(presets).map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="fixed top-10 left-10 bg-white p-5 rounded shadow">
            <h2 className="text-lg font-bold">Emoji List:</h2>
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji, index) => (
                <span key={index} className="text-3xl">
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Confetti;
