import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contributions = [
  {
    id: 'SYS.REQ.01',
    title: 'Sounding Rockets',
    subtitle: 'Thumba Equatorial Rocket Launching Station',
    year: '1963',
    description:
      'India\'s space journey began with the launch of the Nike-Apache sounding rocket from Thumba on November 21, 1963. These suborbital experiments in atmospheric science and meteorology built the foundational expertise that would fuel India\'s orbital ambitions. The first rockets were transported on bicycles and assembled in a converted church.',
    stats: [
      { label: 'First Launch', value: 'Nov 21, 1963' },
      { label: 'Location', value: 'Thumba, Kerala' },
      { label: 'Type', value: 'Nike-Apache' },
    ],
  },
  {
    id: 'SYS.REQ.02',
    title: 'SLV-3',
    subtitle: 'Satellite Launch Vehicle',
    year: '1980',
    description:
      'Under the leadership of Dr. APJ Abdul Kalam, the SLV-3 became India\'s first indigenous satellite launch vehicle. On July 18, 1980, it successfully placed the Rohini satellite (RS-1) into orbit, making India the sixth nation capable of launching its own satellites. This achievement proved India\'s self-reliance in space technology.',
    stats: [
      { label: 'Project Director', value: 'Dr. APJ Abdul Kalam' },
      { label: 'Payload', value: 'Rohini RS-1 (35 kg)' },
      { label: 'Orbit', value: '305 × 919 km' },
    ],
  },
  {
    id: 'SYS.REQ.03',
    title: 'Rohini Series',
    subtitle: 'India\'s First Orbital Satellites',
    year: '1980 – 1983',
    description:
      'The Rohini series represented India\'s earliest indigenous satellites, designed primarily for technological experimentation. RS-1 proved basic satellite systems, while subsequent missions like RS-D1 and RS-D2 carried Earth observation payloads, pioneering remote sensing capabilities that would later define India\'s space program.',
    stats: [
      { label: 'Satellites', value: 'RS-1, RS-D1, RS-D2' },
      { label: 'Mass Range', value: '35 – 41.5 kg' },
      { label: 'Mission', value: 'Tech Demo & Earth Obs.' },
    ],
  },
];

export default function Stage3Contributions() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
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

    // Initial setup
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(headerRef.current, { y: 30 });
    cardsRef.current.forEach(c => gsap.set(c, { y: 80 }));
    
    // Set initial text blur state on inner children!
    textElementsRef.current.forEach(el => {
      if (el) {
        gsap.set(gsap.utils.toArray(el.children), { filter: 'blur(12px)', opacity: 0, y: 10 });
      }
    });

    // Enter opacity (0.50 to 0.5375)
    tl.to(containerRef.current, { opacity: 1, duration: 0.0375, ease: "none" }, 0.50);

    // Header Y movement and morph (0.50 to 0.5375)
    tl.to(headerRef.current, { y: 0, duration: 0.0375, ease: "none" }, 0.50);
    tl.to(gsap.utils.toArray(textElementsRef.current[0].children), { 
      filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.01, duration: 0.0375, ease: "none" 
    }, 0.50);

    // Cards Y movement and morph
    // Card 0 (0.5125 to 0.55)
    tl.to(cardsRef.current[0], { y: 0, duration: 0.0375, ease: "none" }, 0.5125);
    tl.to(gsap.utils.toArray(textElementsRef.current[1].children), { 
      filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.006, duration: 0.03, ease: "none" 
    }, 0.5125);
    
    // Card 1 (0.5225 to 0.56)
    tl.to(cardsRef.current[1], { y: -16, duration: 0.0375, ease: "none" }, 0.5225);
    tl.to(gsap.utils.toArray(textElementsRef.current[2].children), { 
      filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.006, duration: 0.03, ease: "none" 
    }, 0.5225);
    
    // Card 2 (0.5325 to 0.57)
    tl.to(cardsRef.current[2], { y: 0, duration: 0.0375, ease: "none" }, 0.5325);
    tl.to(gsap.utils.toArray(textElementsRef.current[3].children), { 
      filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.006, duration: 0.03, ease: "none" 
    }, 0.5325);

    // Exit morph out (0.68 to 0.7125)
    textElementsRef.current.forEach((el) => {
      if (el) {
        tl.to(gsap.utils.toArray(el.children), { 
          filter: 'blur(12px)', opacity: 0, y: -10, stagger: 0.005, duration: 0.0325, ease: "none" 
        }, 0.68);
      }
    });

    // Exit container opacity (0.7125 to 0.75)
    tl.to(containerRef.current, { opacity: 0, duration: 0.0375, ease: "none" }, 0.7125);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none overflow-y-auto"
    >
      <div className="w-full max-w-7xl mx-auto px-5 md:px-16 py-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <div ref={el => textElementsRef.current[0] = el} className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-4 text-morph-item">
              <div className="w-12 h-px bg-accent-red/40" />
              <div className="status-dot" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-launch-smoke uppercase">
                Phase 03 // System Architecture
              </span>
              <div className="status-dot" />
              <div className="w-12 h-px bg-accent-red/40" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white text-morph-item">
              Architects of the{' '}
              <span className="bg-gradient-to-r from-accent-orange to-accent-red bg-clip-text text-transparent">
                Payload
              </span>
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {contributions.map((c, i) => (
            <div
              key={c.id}
              ref={el => cardsRef.current[i] = el}
              className="industrial-card rounded-2xl overflow-hidden pointer-events-auto group shadow-xl"
            >
              <div ref={el => textElementsRef.current[i + 1] = el} className="h-full flex flex-col">
                {/* Card Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-launch-silver/10 bg-launch-black/30 text-morph-item">
                  <span className="font-mono text-[11px] tracking-widest text-launch-smoke uppercase font-semibold">
                    {c.id}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-accent-orange font-bold">
                    {c.year}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  {/* Title */}
                  <div className="mb-4 text-morph-item">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-wide mb-2">
                      {c.title}
                    </h3>
                    <p className="font-mono text-[11px] md:text-[12px] tracking-widest text-accent-red uppercase font-semibold">
                      {c.subtitle}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-accent-red/40 via-launch-silver/20 to-transparent mb-5 text-morph-item" />

                  {/* Description */}
                  <p className="font-body text-[15px] text-launch-pale/90 leading-[1.8] font-light mb-6 flex-1 text-morph-item">
                    {c.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-3 pt-4 border-t border-launch-silver/10 mt-auto text-morph-item">
                    {c.stats.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between py-1.5"
                      >
                        <span className="font-mono text-[10px] tracking-widest text-launch-smoke uppercase font-semibold">
                          {s.label}
                        </span>
                        <span className="font-mono text-xs text-white/90">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center gap-3 pt-5 mt-4 border-t border-launch-silver/5 text-morph-item">
                    <div className="status-dot" />
                    <span className="font-mono text-[11px] tracking-widest text-accent-red/90 uppercase font-bold">
                      Mission Successful
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
