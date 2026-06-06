import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    text: 'There are some who question the relevance of space activities in a developing nation. To us, there is no ambiguity of purpose.',
    author: 'Dr. Vikram Sarabhai',
    context: 'On founding ISRO, 1962',
  },
  {
    text: 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.',
    author: 'Dr. APJ Abdul Kalam',
    context: 'Wings of Fire, 1999',
  },
  {
    text: 'We must be second to none in the application of advanced technologies to the real problems of man and society.',
    author: 'Dr. Vikram Sarabhai',
    context: 'Address to the United Nations, 1968',
  },
  {
    text: 'If you want to shine like a sun, first burn like a sun.',
    author: 'Dr. APJ Abdul Kalam',
    context: 'Address to Students, 2005',
  },
];

export default function Stage4WingsOfFire() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const quotesRef = useRef([]);
  const epilogueRef = useRef(null);
  const textElementsRef = useRef([]);

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
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(headerRef.current, { y: 30 });
    quotesRef.current.forEach(q => gsap.set(q, { y: 40 }));
    gsap.set(epilogueRef.current, { y: 50 });
    
    textElementsRef.current.forEach(el => {
      if (el) gsap.set(el, { filter: 'blur(12px)', opacity: 0, scale: 0.98 });
    });

    // Enter container opacity
    tl.to(containerRef.current, { opacity: 1, duration: 0.03, ease: "none" }, 0.75);

    // Physically PAN the entire content wrapper upwards so we can read all quotes and the epilogue!
    // We start panning at 0.75 and finish at 1.0
    // We calculate the pan distance dynamically based on the wrapper's height minus the window height.
    tl.to(scrollWrapperRef.current, {
      y: () => {
        const wrapperHeight = scrollWrapperRef.current?.scrollHeight || 0;
        const windowHeight = window.innerHeight;
        // Scroll up enough to show the bottom of the wrapper, plus some padding
        return -(wrapperHeight - windowHeight + 100);
      },
      duration: 0.25,
      ease: "none"
    }, 0.75);

    // Header Y and morph
    tl.to(headerRef.current, { y: 0, duration: 0.03, ease: "none" }, 0.75);
    tl.to(textElementsRef.current[0], { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.03, ease: "none" }, 0.75);

    // Quotes Fade & Morph sequence as it scrolls up
    // Quote 0
    tl.to(quotesRef.current[0], { y: 0, duration: 0.02, ease: "none" }, 0.77);
    tl.to(textElementsRef.current[1], { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.02, ease: "none" }, 0.77);
    
    // Quote 1
    tl.to(quotesRef.current[1], { y: 0, duration: 0.02, ease: "none" }, 0.80);
    tl.to(textElementsRef.current[2], { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.02, ease: "none" }, 0.80);
    
    // Quote 2
    tl.to(quotesRef.current[2], { y: 0, duration: 0.02, ease: "none" }, 0.83);
    tl.to(textElementsRef.current[3], { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.02, ease: "none" }, 0.83);
    
    // Quote 3
    tl.to(quotesRef.current[3], { y: 0, duration: 0.02, ease: "none" }, 0.87);
    tl.to(textElementsRef.current[4], { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.02, ease: "none" }, 0.87);

    // Epilogue
    tl.to(epilogueRef.current, { y: 0, duration: 0.03, ease: "none" }, 0.92);
    tl.to(textElementsRef.current[5], { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.03, ease: "none" }, 0.92);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 flex justify-center pointer-events-none overflow-hidden"
    >
      <div 
        ref={scrollWrapperRef} 
        className="w-full max-w-6xl mx-auto px-5 md:px-16 py-20 relative"
      >
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <div ref={el => textElementsRef.current[0] = el} className="text-morph inline-block">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-px bg-accent-red/40" />
              <div className="status-dot" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-launch-smoke uppercase">
                Phase 04 // Words of Wisdom
              </span>
              <div className="status-dot" />
              <div className="w-12 h-px bg-accent-red/40" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white">
              Wings of{' '}
              <span className="bg-gradient-to-r from-accent-amber via-accent-orange to-accent-red bg-clip-text text-transparent">
                Fire
              </span>
            </h2>
          </div>
        </div>

        {/* Alternating Quotes */}
        <div className="space-y-24 md:space-y-40 mb-32 md:mb-48">
          {quotes.map((q, i) => (
            <div
              key={i}
              ref={el => quotesRef.current[i] = el}
              className={`flex flex-col ${i % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}
            >
              <div ref={el => textElementsRef.current[i + 1] = el} className="max-w-3xl text-morph">
                {/* Quote Mark */}
                <span className="font-display text-7xl md:text-9xl text-accent-red/20 leading-none select-none block mb-[-30px] md:mb-[-40px]">
                  &ldquo;
                </span>
                <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6 tracking-wide">
                  {q.text}
                </blockquote>
                <div className={`flex items-center gap-4 mt-6 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {i % 2 === 0 && <div className="w-12 h-px bg-accent-orange/50" />}
                  <div>
                    <p className="font-mono text-sm tracking-widest text-accent-orange uppercase font-bold">
                      {q.author}
                    </p>
                    <p className="font-mono text-[11px] tracking-wider text-launch-smoke uppercase mt-1 font-semibold">
                      {q.context}
                    </p>
                  </div>
                  {i % 2 !== 0 && <div className="w-12 h-px bg-accent-orange/50" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Epilogue: Wings of Fire ─── */}
        <div ref={epilogueRef} className="text-center pb-24">
          <div className="industrial-card rounded-2xl p-8 md:p-14 lg:p-16 max-w-5xl mx-auto pointer-events-auto shadow-2xl">
            <div ref={el => textElementsRef.current[5] = el} className="text-morph">
              
              <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide">
                Wings of Fire
              </h3>
              <p className="font-mono text-[11px] md:text-sm tracking-[0.25em] text-accent-orange uppercase mb-10 font-semibold">
                An Autobiography — Dr. APJ Abdul Kalam
              </p>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 text-left">
                {/* Book Image */}
                <div className="w-48 md:w-64 flex-shrink-0 group">
                  <a 
                    href="https://www.amazon.in/Wings-Fire-Autobiography-Digital-Exclusive-ebook/dp/B07F6C99Q7" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block relative rounded-xl overflow-hidden shadow-2xl border border-launch-silver/30 transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(248,49,47,0.3)]"
                  >
                    <img 
                      src="https://m.media-amazon.com/images/I/91a1yz32T3L._SY466_.jpg" 
                      alt="Wings of Fire Book Cover" 
                      className="w-full h-auto object-cover"
                    />
                    {/* Glow overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-red/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <p className="font-body text-[15px] md:text-[17px] text-launch-pale/90 leading-[1.8] font-light mb-6">
                    Published in 1999, <strong className="text-white font-medium">Wings of Fire</strong> chronicles the extraordinary life of
                    Dr. APJ Abdul Kalam — from his childhood in Rameswaram to his pivotal role in India&apos;s
                    space and missile programs. The autobiography is not merely a personal narrative; it is a
                    testament to the power of dreams, perseverance, and the unwavering belief that
                    a nation&apos;s greatest resource is its youth.
                  </p>
                  
                  <blockquote className="font-display text-xl md:text-2xl italic text-white/80 border-l-[3px] border-accent-orange/50 pl-6 mb-10">
                    &ldquo;All of us do not have equal talent. But, all of us have an equal opportunity to
                    develop our talents.&rdquo;
                  </blockquote>

                  {/* Buy Button */}
                  <a 
                    href="https://www.amazon.in/Wings-Fire-Autobiography-Digital-Exclusive-ebook/dp/B07F6C99Q7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-red text-white font-display text-lg font-semibold tracking-wide shadow-[0_0_20px_rgba(248,49,47,0.4)] hover:shadow-[0_0_30px_rgba(248,49,47,0.6)] hover:bg-accent-glow transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span>Acquire the Legacy</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Footer Tag */}
              <div className="flex items-center justify-center gap-4 mt-16">
                <div className="w-12 h-px bg-accent-red/40" />
                <div className="status-dot" />
                <span className="font-mono text-[11px] tracking-[0.25em] text-launch-smoke uppercase font-semibold">
                  Legacy Eternal
                </span>
                <div className="status-dot" />
                <div className="w-12 h-px bg-accent-red/40" />
              </div>
            </div>
          </div>
          
          {/* Footer credits */}
          <div className="text-center mt-20 md:mt-32 pb-10">
            <p className="font-mono text-[11px] tracking-[0.2em] text-launch-smoke/60 uppercase font-semibold">
              A tribute to the visionaries who gave India its wings.
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] text-launch-smoke/30 uppercase mt-3 font-semibold">
              Kinetic Editorial Engine v1.0 — ISRO Legacy Series
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
