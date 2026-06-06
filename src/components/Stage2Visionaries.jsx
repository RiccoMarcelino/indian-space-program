import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const profiles = [
  {
    name: 'Dr. Vikram Sarabhai',
    title: 'Father of the Indian Space Program',
    years: '1919 – 1971',
    image: '/1000075301-removebg-preview.png',
    bio: `Vikram Ambalal Sarabhai was a visionary physicist and industrialist who founded the Indian National Committee for Space Research (INCOSPAR) in 1962, which later became ISRO. He established the Thumba Equatorial Rocket Launching Station and laid the groundwork for India's space infrastructure. His belief that space technology could directly benefit a developing nation's people drove India's unique approach to space exploration — one focused on practical applications like telecommunications, weather forecasting, and resource management.`,
    achievement: 'Founded ISRO & established the Thumba Launch Station',
    quote: '"There are some who question the relevance of space activities in a developing nation. To us, there is no ambiguity of purpose."',
  },
  {
    name: 'Dr. APJ Abdul Kalam',
    title: 'Missile Man of India',
    years: '1931 – 2015',
    image: '/1000075300-removebg-preview.png',
    bio: `Avul Pakir Jainulabdeen Abdul Kalam rose from humble beginnings in Rameswaram to become one of India's most celebrated scientists and its 11th President. As Project Director of SLV-3, he led the team that successfully deployed the Rohini satellite into orbit in 1980. He later spearheaded India's missile development program, creating the Agni and Prithvi missile systems. His autobiography "Wings of Fire" became an inspirational beacon for millions, and his tireless advocacy for youth empowerment earned him the title "People's President."`,
    achievement: 'Led SLV-3 & India\'s Missile Development Program',
    quote: '"Dream is not that which you see while sleeping. It is something that does not let you sleep."',
  },
];

export default function Stage2Visionaries() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
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
    gsap.set(containerRef.current, { opacity: 0, scale: 0.95 });
    gsap.set(headerRef.current, { y: 40 });
    gsap.set(card1Ref.current, { y: 80 });
    gsap.set(card2Ref.current, { y: 80 });
    
    // Set initial text blur state ON EVERY CHILD ELEMENT individually
    textElementsRef.current.forEach(el => {
      if (el) {
        const children = gsap.utils.toArray(el.children);
        gsap.set(children, { filter: 'blur(12px)', opacity: 0, y: 10 });
      }
    });

    // Enter container (0.25 to 0.2875)
    tl.to(containerRef.current, { opacity: 1, scale: 1, duration: 0.0375, ease: "none" }, 0.25);

    // Header Y and Morph (0.25 to 0.3)
    tl.to(headerRef.current, { y: 0, duration: 0.05, ease: "none" }, 0.25);
    tl.to(gsap.utils.toArray(textElementsRef.current[0].children), { 
      filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.01, duration: 0.04, ease: "none" 
    }, 0.25);

    // Card 1 Y movement and staggered Morph on each paragraph (0.2625 to 0.3)
    tl.to(card1Ref.current, { y: 0, duration: 0.0375, ease: "none" }, 0.2625);
    tl.to(gsap.utils.toArray(textElementsRef.current[1].children), { 
      filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.008, duration: 0.03, ease: "none" 
    }, 0.2625);

    // Card 2 Y movement and staggered Morph on each paragraph (0.275 to 0.3125)
    tl.to(card2Ref.current, { y: 0, duration: 0.0375, ease: "none" }, 0.275);
    tl.to(gsap.utils.toArray(textElementsRef.current[2].children), { 
      filter: 'blur(0px)', opacity: 1, y: 0, stagger: 0.008, duration: 0.03, ease: "none" 
    }, 0.275);

    // Exit morph out
    textElementsRef.current.forEach((el) => {
      if (el) {
        tl.to(gsap.utils.toArray(el.children), { 
          filter: 'blur(12px)', opacity: 0, y: -10, stagger: 0.005, duration: 0.04, ease: "none" 
        }, 0.42);
      }
    });

    // Exit container opacity (0.4625 to 0.5)
    tl.to(containerRef.current, { opacity: 0, duration: 0.0375, ease: "none" }, 0.4625);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-5 md:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <div ref={el => textElementsRef.current[0] = el} className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-4 text-morph-item">
              <div className="w-12 h-px bg-accent-red/40" />
              <div className="status-dot" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-launch-smoke uppercase">
                Phase 02 // The Visionaries
              </span>
              <div className="status-dot" />
              <div className="w-12 h-px bg-accent-red/40" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white text-morph-item">
              The Sparks of{' '}
              <span className="bg-gradient-to-r from-accent-orange to-accent-red bg-clip-text text-transparent">
                Ignition
              </span>
            </h2>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div ref={card1Ref} className="industrial-card rounded-2xl p-8 md:p-10 pointer-events-auto">
            <div ref={el => textElementsRef.current[1] = el} className="flex flex-col">
              <div className="flex items-start gap-5 mb-8 text-morph-item">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-launch-silver/30 flex-shrink-0 bg-launch-gray shadow-xl">
                  <img
                    src={profiles[0].image}
                    alt={profiles[0].name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white tracking-wide">
                    {profiles[0].name}
                  </h3>
                  <p className="font-mono text-[11px] md:text-xs tracking-widest text-accent-orange uppercase mt-2">
                    {profiles[0].title}
                  </p>
                  <p className="font-mono text-[10px] text-launch-smoke mt-2 font-semibold">{profiles[0].years}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 text-morph-item">
                <div className="flex-1 h-px bg-launch-silver/10" />
                <div className="status-dot" />
                <div className="flex-1 h-px bg-launch-silver/10" />
              </div>

              <p className="font-body text-[15px] md:text-[17px] text-launch-pale/90 leading-[1.8] font-light mb-8 text-morph-item">
                {profiles[0].bio}
              </p>

              <div className="text-morph-item">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-md border border-accent-red/20 bg-accent-red/5 mb-8 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
                  <span className="font-mono text-[11px] md:text-xs text-accent-red tracking-wider uppercase font-semibold">
                    {profiles[0].achievement}
                  </span>
                </div>
              </div>

              <blockquote className="font-display text-[15px] md:text-lg italic text-white/70 border-l-2 border-accent-orange/40 pl-5 leading-relaxed text-morph-item">
                {profiles[0].quote}
              </blockquote>
            </div>
          </div>

          <div ref={card2Ref} className="industrial-card rounded-2xl p-8 md:p-10 pointer-events-auto">
            <div ref={el => textElementsRef.current[2] = el} className="flex flex-col">
              <div className="flex items-start gap-5 mb-8 text-morph-item">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-launch-silver/30 flex-shrink-0 bg-launch-gray shadow-xl">
                  <img
                    src={profiles[1].image}
                    alt={profiles[1].name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white tracking-wide">
                    {profiles[1].name}
                  </h3>
                  <p className="font-mono text-[11px] md:text-xs tracking-widest text-accent-orange uppercase mt-2">
                    {profiles[1].title}
                  </p>
                  <p className="font-mono text-[10px] text-launch-smoke mt-2 font-semibold">{profiles[1].years}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 text-morph-item">
                <div className="flex-1 h-px bg-launch-silver/10" />
                <div className="status-dot" />
                <div className="flex-1 h-px bg-launch-silver/10" />
              </div>

              <p className="font-body text-[15px] md:text-[17px] text-launch-pale/90 leading-[1.8] font-light mb-8 text-morph-item">
                {profiles[1].bio}
              </p>

              <div className="text-morph-item">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-md border border-accent-red/20 bg-accent-red/5 mb-8 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
                  <span className="font-mono text-[11px] md:text-xs text-accent-red tracking-wider uppercase font-semibold">
                    {profiles[1].achievement}
                  </span>
                </div>
              </div>

              <blockquote className="font-display text-[15px] md:text-lg italic text-white/70 border-l-2 border-accent-orange/40 pl-5 leading-relaxed text-morph-item">
                {profiles[1].quote}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
