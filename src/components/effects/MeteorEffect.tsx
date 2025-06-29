import React, { useRef, useState } from "react";

interface MeteorData {
    left: number;
    top: number;
    delay: string;
    duration: number;
}

interface MeteorSplashState {
    visible: boolean;
    impactLeft: number;
    impactTop: number;
}

interface MeteorEffectProps {
    number?: number;
    className?: string;
}

const METEOR_CONFIG = {
    goldGradient: "linear-gradient(90deg,#f7c873 0%, #fff2b0 40%, #b2852d 100%)",
    shadowColor: "rgba(247,200,115,0.5)",
    splashSize: 35,
    headSize: 7,
};

const generateMeteorData = (): MeteorData => {
    // Ensure meteors start well outside the visible area
    const left = Math.random() * 200 - 250; // -250vw to -50vw
    const top = Math.random() * 200 - 250;  // -250vh to -50vh
    const delay = (Math.random() * 15.0).toFixed(2); // 0 to 15 seconds
    const duration = Math.floor(Math.random() * 25 + 20); // 20 to 45 seconds
    
    return { left, top, delay, duration };
};

const getImpactPosition = (data: MeteorData) => {
    // Calculate impact position based on 45-degree diagonal movement
    // Using the increased translateX distance from the animation (400vw)
    const diagonalDistance = 400; // matches the translateX in meteor-gold animation
    const deltaX = diagonalDistance * Math.cos(Math.PI / 4); // ~282.84vw
    const deltaY = diagonalDistance * Math.sin(Math.PI / 4); // ~282.84vh
    
    return {
        left: data.left + deltaX,
        top: data.top + deltaY
    };
};

export const MeteorEffect: React.FC<MeteorEffectProps> = ({
    number = 15,
    className = "",
}) => {
    const splashRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [meteorsData] = useState(() => Array.from({ length: number }, generateMeteorData));
    const [splashStates, setSplashStates] = useState<MeteorSplashState[]>(
        () => Array(number).fill(0).map(() => ({ visible: false, impactLeft: 0, impactTop: 0 }))
    );

    const handleMeteorAnimationEnd = (idx: number) => {
        const data = meteorsData[idx];
        const { left, top } = getImpactPosition(data);
        
        // Always show splash at calculated impact position
        setSplashStates(states =>
            states.map((s, i) =>
                i === idx ? { visible: true, impactLeft: left, impactTop: top } : s
            )
        );
        
        const splash = splashRefs.current[idx];
        if (splash) {
            splash.classList.remove("animate-meteor-splash");
            void splash.offsetWidth;
            splash.classList.add("animate-meteor-splash");
        }
        
        setTimeout(() => {
            setSplashStates(states =>
                states.map((s, i) => (i === idx ? { ...s, visible: false } : s))
            );
        }, 500);
    };

    return (
        <>
            {meteorsData.map((data, idx) => {
                const { left, top, delay, duration } = data;

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
                    background: METEOR_CONFIG.goldGradient,
                    boxShadow: `0 0 16px 5px ${METEOR_CONFIG.shadowColor}`,
                    opacity: 0.92,
                    filter: "blur(0.6px) drop-shadow(0 0 8px #f7c87399)",
                    position: "absolute",
                };

                const { impactLeft, impactTop, visible } = splashStates[idx] || {};
                const splashStyle: React.CSSProperties = visible
                    ? {
                        position: "absolute",
                        left: `${impactLeft}vw`,
                        top: `${impactTop}vh`,
                        zIndex: 9,
                        width: METEOR_CONFIG.splashSize,
                        height: METEOR_CONFIG.splashSize,
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
                    <React.Fragment key={`meteor-${idx}`}>
                        <span
                            className="absolute block animate-meteor-gold"
                            style={meteorStyle}
                            onAnimationEnd={() => handleMeteorAnimationEnd(idx)}
                        />
                        <span
                            ref={el => (splashRefs.current[idx] = el)}
                            className={`absolute pointer-events-none ${visible ? "animate-meteor-splash" : ""}`}
                            style={splashStyle}
                        />
                    </React.Fragment>
                );
            })}
        </>
    );
};