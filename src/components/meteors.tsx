import React, { useRef, useEffect, useState } from "react";

const GOLD_GRADIENT = "linear-gradient(90deg,#f7c873 0%, #fff2b0 40%, #b2852d 100%)";
const SHADOW_COLOR = "rgba(247,200,115,0.5)";
const SPLASH_SIZE = 22;

// Parámetros visuales ajustados para una cabeza pequeña y bien pegada.
const HEAD_SIZE = 7; // más pequeño y notorio

function randomMeteorData() {
  // Posicionamiento de salida para cubrir bien el área visual
  const left = Math.floor(Math.random() * 50 - 50); // -50 a 0 VW
  const top = Math.floor(Math.random() * 50 - 50);  // -50 a 0 VH
  const delay = (Math.random() * 5.0).toFixed(2);
  const duration = Math.floor(Math.random() * 15 + 20);
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
    const delta = 200 * Math.cos(Math.PI/4); // ~141.42vw (ángulo diagonal)
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
    }, 350);
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
              transform: "translate(-55%, -55%) scale(1.18)",
              background: "radial-gradient(circle, #fffbe7 0%, #ffe4ae99 44%, #f7c87344 100%)",
              borderRadius: "50%",
              boxShadow: `0 0 28px 7px #f7c87388, 0 0 0 1.5px #fff49f8c`,
              filter: "blur(1.5px)",
              pointerEvents: "none",
              transition: "opacity 0.13s",
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
              className={`absolute pointer-events-none transition-opacity duration-150 ${visible ? "animate-meteor-splash" : ""}`}
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
