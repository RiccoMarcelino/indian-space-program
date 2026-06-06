import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const splitText = (text) => text.split('').map((char, i) => (
  <span key={i} className="hero-char inline-block" style={{ opacity: 0 }}>
    {char === ' ' ? '\u00A0' : char}
  </span>
));

export default function Stage1Hero() {
  const containerRef = useRef(null);
  const leftPortraitRef = useRef(null);
  const rightPortraitRef = useRef(null);
  const leftHaloRef = useRef(null);
  const rightHaloRef = useRef(null);
  const titleContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollHintRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    tl.to({}, { duration: 1 });

    // Initial setups
    gsap.set(subtitleRef.current, { opacity: 0 });
    gsap.set(titleContainerRef.current, { opacity: 0 });
    gsap.set([leftHaloRef.current, rightHaloRef.current], { opacity: 0.35 });
    
    // NOTE: scrollHintRef is NOT set to opacity 0! It starts visible to tell the user to scroll.

    // Subtitle fade in (0 to 0.02)
    tl.to(subtitleRef.current, { opacity: 1, duration: 0.02, ease: "none" }, 0);
    
    // Title container opacity (0 to 0.0125)
    tl.to(titleContainerRef.current, { opacity: 1, duration: 0.0125, ease: "none" }, 0);
    
    // Typewriter effect on characters (0 to 0.13)
    // There are 33 characters. Staggering them over 0.13 duration.
    tl.to('.hero-char', { 
      opacity: 1, 
      stagger: 0.003, 
      duration: 0.01, 
      ease: "none" 
    }, 0);
    
    // Cursor hide (at 0.135)
    tl.to(cursorRef.current, { opacity: 0, duration: 0.01, ease: "none" }, 0.135);

    // Scroll hint fade OUT! (As soon as they start scrolling)
    tl.to(scrollHintRef.current, { opacity: 0, duration: 0.05, ease: "none" }, 0.02);

    // Portraits lateral movement (0.15 to 0.25)
    tl.to(leftPortraitRef.current, { xPercent: -120, duration: 0.1, ease: "none" }, 0.15);
    tl.to(rightPortraitRef.current, { xPercent: 120, duration: 0.1, ease: "none" }, 0.15);

    // Portraits opacity fade (0.125 to 0.25)
    tl.to([leftPortraitRef.current, rightPortraitRef.current], { opacity: 0, duration: 0.125, ease: "none" }, 0.125);

    // Halo fade (0.1 to 0.2)
    tl.to([leftHaloRef.current, rightHaloRef.current], { opacity: 0, duration: 0.1, ease: "none" }, 0.1);

    // Stage fade out (0.2125 to 0.25)
    tl.to(containerRef.current, { opacity: 0, duration: 0.0375, ease: "none" }, 0.2125);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
      {/* ─── Left Portrait (Vikram Sarabhai) ─── */}
      <div
        ref={leftPortraitRef}
        className="absolute left-[4%] md:left-[8%] bottom-0 flex items-end"
      >
        <div
          ref={leftHaloRef}
          className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full glow-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(234,88,12,0.4) 0%, rgba(220,38,38,0.15) 40%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        <img
          src="/1000075301-removebg-preview.png"
          alt="Dr. Vikram Sarabhai"
          className="relative z-10 h-[55vh] md:h-[75vh] max-h-[750px] object-contain drop-shadow-2xl"
        />
      </div>

      {/* ─── Right Portrait (APJ Abdul Kalam) ─── */}
      <div
        ref={rightPortraitRef}
        className="absolute right-[4%] md:right-[8%] bottom-0 flex items-end"
      >
        <div
          ref={rightHaloRef}
          className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full glow-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(234,88,12,0.4) 0%, rgba(220,38,38,0.15) 40%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        <img
          src="/1000075300-removebg-preview.png"
          alt="Dr. APJ Abdul Kalam"
          className="relative z-10 h-[55vh] md:h-[75vh] max-h-[750px] object-contain drop-shadow-2xl"
        />
      </div>

      {/* ─── Center Title ─── */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-screen pt-20">
        <p
          ref={subtitleRef}
          className="font-mono text-xs md:text-sm tracking-[0.25em] text-accent-red uppercase mb-4 md:mb-6"
        >
          Phase 01 // Initiation
        </p>

        <div ref={titleContainerRef} className="mb-12">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight whitespace-nowrap">
            {splitText("FATHERS OF THE")}
            <br />
            <span className="bg-gradient-to-r from-accent-orange via-accent-red to-accent-orange bg-clip-text text-transparent">
              {splitText("INDIAN SPACE")}
            </span>
            <br />
            {splitText("PROGRAM")}
            <span
              ref={cursorRef}
              className="typewriter-cursor inline-block ml-1"
            />
          </h1>
        </div>

        {/* ─── Scroll Hint Widget ─── */}
        <div
          ref={scrollHintRef}
          className="mt-8 md:mt-16 flex flex-col items-center gap-3"
        >
          {/* Animated Mouse Icon */}
          <div className="w-[28px] h-[46px] rounded-full border-2 border-launch-smoke/60 flex justify-center p-[3px] bg-launch-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(248,49,47,0.15)]">
            <div 
              className="w-1.5 h-3 bg-accent-orange rounded-full animate-bounce shadow-[0_0_8px_#ea580c]" 
              style={{ animationDuration: '1.5s' }} 
            />
          </div>
          <p className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-launch-pale uppercase font-semibold glow-pulse">
            Scroll to Ignite
          </p>
        </div>
      </div>
    </div>
  );
}
