import React, { useRef, useEffect, useState } from "react";

const GOLD_GRADIENT = "linear-gradient(90deg,#f7c873 0%, #fff2b0 40%, #b2852d 100%)";
const SHADOW_COLOR = "rgba(247,200,115,0.5)";
const SPLASH_SIZE = 35; // Increased from 22 for better visibility

// Parámetros visuales ajustados para una cabeza pequeña y bien pegada.
const HEAD_SIZE = 7; // más pequeño y notorio

function randomMeteorData() {
  // Adjusted positioning to make splashes appear at the bottom
  // We need meteors to start from positions that will result in bottom impacts
  // Since meteors move diagonally (45 degrees), we calculate backwards from desired impact points
  
  // Desired impact area: bottom 20% of screen (80vh to 100vh) and full width spread
  const impactLeft = Math.random() * 120 - 10; // -10vw to 110vw for full width coverage
  const impactTop = 80 + Math.random() * 20; // 80vh to 100vh (bottom area)
  
  // Calculate starting position by moving backwards along the diagonal
  // Since meteors move at 45 degrees, we subtract equal amounts from both axes
  const diagonalOffset = 200; // The distance meteors travel
  const left = impactLeft - diagonalOffset;
  const top = impactTop - diagonalOffset;
  
  const delay = (Math.random() * 8.0).toFixed(2); // Increased delay range for more variation
  const duration = Math.floor(Math.random() * 20 + 15); // Adjusted duration range
  return { left, top, delay, duration };
}

type MeteorSplashState = {
  visible: boolean;
  impactLeft: number;
  impactTop: number;
};

export const Meteors = ({
  number = 20,
  className = "",
}: {
  number?: number;
  className?: string;
}) => {
  const splashRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [meteorsData] = useState(() => Array.from({length: number}, randomMeteorData));
  const [splashStates, setSplashStates] = useState<MeteorSplashState[]>(
    () => Array(number).fill(0).map(() => ({ visible: false, impactLeft: 0, impactTop: 0 }))
  );

  // Calcula la posición final de impacto (desplazamiento 200vw a la derecha y mismo top)
  function getImpactPosition(data: { left: number; top: number }) {
    const delta = 200; // Diagonal movement distance
    const finalLeft = data.left + delta;
    const finalTop = data.top + delta;
    return { left: finalLeft, top: finalTop };
  }

  function handleMeteorAnimationEnd(idx: number) {
    // Splash breve al impactar
    const data = meteorsData[idx];
    const { left, top } = getImpactPosition(data);
    setSplashStates(states =>
      states.map((s, i) =>
        i === idx ? { visible: true, impactLeft: left, impactTop: top } : s
      )
    );
    // Reiniciar splash animation
    const splash = splashRefs.current[idx];
    if (splash) {
      splash.classList.remove("animate-meteor-splash");
      void splash.offsetWidth;
      splash.classList.add("animate-meteor-splash");
    }
    // Ocultar splash después de la animación
    setTimeout(() => {
      setSplashStates(states =>
        states.map((s, i) => (i === idx ? { ...s, visible: false } : s))
      );
    }, 500); // Increased timeout for better visibility
  }

  return (
    <>
      {meteorsData.map((data, idx) => {
        const { left, top, delay, duration } = data;

        // --- ESTELA del meteorito (primero para que la cabeza esté encima) ---
        const meteorStyle: React.CSSProperties = {
          left: `${left}vw`,
          top: `${top}vh`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          zIndex: 1,
          pointerEvents: "none",
          width: 75,
          height: 2.3,
          borderRadius: 9999,
          background: GOLD_GRADIENT,
          boxShadow: `0 0 16px 5px ${SHADOW_COLOR}`,
          opacity: 0.92,
          filter: "blur(0.6px) drop-shadow(0 0 8px #f7c87399)",
          position: "absolute",
        };

        // --- CABEZA del meteorito (pequeña, pegada a la estela, siempre arriba) ---
        const headStyle: React.CSSProperties = {
          position: "absolute",
          left: `${left}vw`,
          top: `${top}vh`,
          width: HEAD_SIZE,
          height: HEAD_SIZE,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 60%, #fffbe6 70%, #ffd058 92%, #f7c873 100%)",
          boxShadow: "0 0 9px 2px #ffd059a0, 0 0 18px 0px #ffd05933",
          opacity: 0.98,
          pointerEvents: "none",
          animationName: "meteor-head-move",
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
          zIndex: 2,
          filter: "drop-shadow(0 0 6px #ffd05888)",
        };

        // --- Animación splash final ---
        const { impactLeft, impactTop, visible } = splashStates[idx] || {};
        const splashStyle: React.CSSProperties = visible
          ? {
              position: "absolute",
              left: `${impactLeft}vw`,
              top: `${impactTop}vh`,
              zIndex: 9,
              width: SPLASH_SIZE,
              height: SPLASH_SIZE,
              opacity: 1,
              transform: "translate(-50%, -50%) scale(1)",
              background: "radial-gradient(circle, #fffbe7 0%, #ffe4ae99 44%, #f7c87344 100%)",
              borderRadius: "50%",
              boxShadow: `0 0 35px 10px #f7c87388, 0 0 0 2px #fff49f8c`,
              filter: "blur(1px)",
              pointerEvents: "none",
            }
          : { opacity: 0, pointerEvents: "none" };

        return (
          <React.Fragment key={"meteor" + idx}>
            {/* Estela del meteorito */}
            <span
              className="absolute block animate-meteor-gold"
              style={meteorStyle}
              onAnimationEnd={() => handleMeteorAnimationEnd(idx)}
            />
            {/* Head del meteorito (puntito pequeño y muy brillante) */}
            {/*
            <span
              className="absolute"
              style={headStyle}
            />
            */}
            {/* Splash al impactar */}
            <span
              ref={el => (splashRefs.current[idx] = el)}
              className={`absolute pointer-events-none ${visible ? "animate-meteor-splash" : ""}`}
              style={splashStyle}
            />
          </React.Fragment>
        );
      })}
      {/* Animación custom para el "head" moviéndose igual que la estela */}
      <style>
        {`
        @keyframes meteor-head-move {
          0%   { opacity:1;  transform: rotate(45deg) translateX(0);}
          80%  { opacity:1; }
          100% { opacity:0;  transform: rotate(45deg) translateX(200vw);}
        }
        `}
      </style>
    </>
  );
};