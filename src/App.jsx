import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Stage1Hero from './components/Stage1Hero';
import Stage2Visionaries from './components/Stage2Visionaries';
import Stage3Contributions from './components/Stage3Contributions';
import Stage4WingsOfFire from './components/Stage4WingsOfFire';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaded, setPreloaded] = useState(false);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const navTitleRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Navigation Click Handler
  const handleNavClick = (e, index) => {
    e.preventDefault();
    if (lenisRef.current) {
      // Scroll height minus viewport height equals max scroll distance
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // Phases are mapped strictly at 0%, 25%, 50%, 75%
      const targetY = maxScroll * (index * 0.25);
      lenisRef.current.scrollTo(targetY, { duration: 2.0, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  };

  useGSAP(() => {
    // 1. Setup Video Scrubbing
    const setupVideoScrub = () => {
      const video = videoRef.current;
      if (!video || isNaN(video.duration)) return;

      gsap.fromTo(video, 
        { currentTime: 0 },
        {
          currentTime: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: "#scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );
    };

    if (videoRef.current) {
      if (videoRef.current.readyState >= 1) {
        setupVideoScrub();
      } else {
        videoRef.current.addEventListener('loadedmetadata', setupVideoScrub);
      }
    }

    // 2. Setup Background Overlay Dimming & Nav Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    // Master timeline total duration = 1 (represents 0% to 100% scroll)
    tl.to({}, { duration: 1 });

    // Overlay starts at 0.3, ends at 0.75
    // Dimming happens gradually
    tl.fromTo(overlayRef.current, { opacity: 0.3 }, { opacity: 0.5, duration: 0.3, ease: "none" }, 0);
    tl.to(overlayRef.current, { opacity: 0.65, duration: 0.4, ease: "none" }, 0.3);
    tl.to(overlayRef.current, { opacity: 0.75, duration: 0.3, ease: "none" }, 0.7);

    // Nav title reveal (0.2 to 0.28)
    gsap.set(navTitleRef.current, { opacity: 0 });
    tl.to(navTitleRef.current, { opacity: 1, duration: 0.08, ease: "none" }, 0.2);

  });

  return (
    <>
      {/* ─── Preloader ─── */}
      <Preloader onComplete={() => setPreloaded(true)} />

      {/* ─── 500vh Scroll Container ─── */}
      <div id="scroll-container" style={{ height: '500vh' }}>
        
        {/* ═══ FIXED BACKGROUND (z-0) ═══ */}
        <div className="fixed inset-0 z-0">
          <video
            ref={videoRef}
            src="https://zccmrecwlvfqsftmsoxa.supabase.co/storage/v1/object/public/Test/Screen_Recording_20260605_164550_YouTube%20ReVanced%20(1).mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          {/* Darkening overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black opacity-30"
          />
        </div>

        {/* ═══ WIREFRAME GRID OVERLAY (z-1) ═══ */}
        <div className="wireframe-grid" />

        {/* ═══ SCROLL-DRIVEN STAGES (z-20) ═══ */}
        {preloaded && (
          <>
            <Stage1Hero />
            <Stage2Visionaries />
            <Stage3Contributions />
            <Stage4WingsOfFire />
          </>
        )}

        {/* ═══ CINEMATIC EDGE BLUR & VIGNETTE (z-25) ═══ 
            Placed above the stages to blur their edges, 
            but below the Nav bars (z-30, z-40) so UI remains crisp! */}
        <div 
          className="fixed inset-0 pointer-events-none z-25"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maskImage: 'radial-gradient(ellipse at center, transparent 60%, black 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 60%, black 100%)',
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)'
          }}
        />

        {/* ═══ SIDE NAV BAR (z-30) ═══ */}
        <nav className="hidden lg:flex fixed left-0 top-0 h-full w-16 hover:w-56 transition-all duration-500 z-30 bg-launch-coal/60 backdrop-blur-xl border-r border-launch-silver/10 flex-col py-8 group">
          <div className="px-4 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="font-mono text-[10px] tracking-widest text-accent-orange uppercase">
              Astro-Engine
            </div>
            <div className="font-mono text-[9px] text-launch-smoke mt-0.5">
              v2.0.4-Alpha
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 px-2">
            {[
              { icon: '◆', label: 'Phase 01 — Hero' },
              { icon: '◇', label: 'Phase 02 — Ignition' },
              { icon: '◇', label: 'Phase 03 — Payload' },
              { icon: '◇', label: 'Phase 04 — Fire' },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => handleNavClick(e, i)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-launch-smoke hover:bg-launch-gray/30 hover:text-white border border-transparent"
              >
                <span className="text-xs flex-shrink-0 w-4 text-center">{item.icon}</span>
                <span className="font-mono text-[10px] tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          <div className="px-3 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="w-full py-2 border border-launch-silver/20 rounded text-center font-mono text-[9px] tracking-widest text-launch-smoke uppercase hover:border-accent-orange/40 hover:text-accent-orange transition-colors cursor-pointer">
              System Arch.
            </div>
          </div>
        </nav>

        {/* ═══ TOP NAV BAR (z-40) ═══ */}
        <nav className="fixed top-0 w-full z-40 bg-black/20 backdrop-blur-md border-b border-launch-silver/5">
          <div className="flex items-center justify-between px-5 md:px-16 py-3">
            <div
              ref={navTitleRef}
              className="font-display text-lg md:text-xl font-semibold text-white tracking-tight"
            >
              Fathers of the Indian Space Program
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['Launchpad', 'Ignition', 'Contributions', 'Wings of Fire'].map(
                (label, i) => (
                  <a
                    key={label}
                    href="#"
                    onClick={(e) => handleNavClick(e, i)}
                    className="font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 text-launch-smoke hover:text-accent-orange"
                  >
                    {label}
                  </a>
                )
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="font-mono text-[10px] tracking-wider text-launch-smoke uppercase hidden md:inline">
                SYS.ONLINE
              </span>
            </div>
          </div>
        </nav>

      </div>
    </>
  );
}
