"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(() => import("react-particles").then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0" />
});

const ParticleBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particlesInit = useCallback(async (engine: any) => {
    if (typeof window !== "undefined") {
      const { loadSlim } = await import("tsparticles-slim");
      await loadSlim(engine);
    }
  }, []);

  const particlesLoaded = useCallback(async () => {
    // Particles loaded callback
  }, []);

  if (!isClient) {
    return <div className="absolute inset-0 z-0" />;
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#00b171", // Primary color
          },
          links: {
            color: "#00ed8a", // Secondary color
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticleBackground;