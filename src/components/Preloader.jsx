import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const ASSETS = [
  '/1000075301-removebg-preview.png',
  '/1000075300-removebg-preview.png',
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    let loadedCount = 0;
    // We wait for 2 images + 1 video
    const totalAssets = ASSETS.length + 1;

    const updateProgress = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / totalAssets) * 100);
      setProgress(pct);
      if (loadedCount === totalAssets) {
        setTimeout(() => {
          // Fade out via GSAP
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setVisible(false);
              onComplete?.();
            }
          });
        }, 800);
      }
    };

    // Load Images
    ASSETS.forEach((src) => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // Proceed even if error
      img.src = src;
    });

    // Load Video
    const video = document.createElement('video');
    video.oncanplaythrough = updateProgress;
    video.onerror = updateProgress;
    video.src = 'https://zccmrecwlvfqsftmsoxa.supabase.co/storage/v1/object/public/Test/Screen_Recording_20260605_164550_YouTube%20ReVanced%20(1).mp4';
    video.load();

  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      {/* HUD Telemetry Rings */}
      <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64">
        {/* Outer Ring */}
        <svg
          className="absolute inset-0 w-full h-full hud-ring"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="rgba(220, 38, 38, 0.15)"
            strokeWidth="1"
          />
          <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke="#dc2626"
            strokeWidth="1.5"
            strokeDasharray={`${progress * 5.65} ${565 - progress * 5.65}`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{ transition: 'stroke-dasharray 0.3s ease-out' }}
          />
          {/* Tick marks */}
          {Array.from({ length: 36 }).map((_, i) => (
            <line
              key={i}
              x1="100" y1="6"
              x2="100" y2={i % 9 === 0 ? '14' : '10'}
              stroke={i % 9 === 0 ? '#dc2626' : 'rgba(220, 38, 38, 0.3)'}
              strokeWidth={i % 9 === 0 ? '1.5' : '0.5'}
              transform={`rotate(${i * 10} 100 100)`}
            />
          ))}
        </svg>

        {/* Inner Ring */}
        <svg
          className="absolute w-3/4 h-3/4 hud-ring-reverse"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100" cy="100" r="80"
            fill="none"
            stroke="rgba(234, 88, 12, 0.1)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
        </svg>

        {/* Center Percentage */}
        <div className="relative z-10 text-center">
          <span className="font-mono text-4xl md:text-5xl font-bold text-accent-orange tabular-nums tracking-tight">
            {progress}
          </span>
          <span className="font-mono text-lg md:text-xl text-accent-red ml-0.5">%</span>
        </div>
      </div>

      {/* Status Text */}
      <div className="mt-10 text-center space-y-3">
        <p className="font-mono text-xs md:text-sm tracking-[0.2em] text-accent-red uppercase">
          Pre-Launch Telemetry Syncing...
        </p>
        <p className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-launch-smoke uppercase">
          Systems Optimized.
        </p>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-accent-red/40" />
        <div className="status-dot" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent-red/40" />
      </div>
    </div>
  );
}
