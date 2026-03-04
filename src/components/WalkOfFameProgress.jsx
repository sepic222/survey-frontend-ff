import React, { useEffect, useRef, useCallback } from 'react';
import { useSurvey } from '../context/SurveyContext';

// ── Cinematic section labels & sassy console copy ────────────────────────────
const SECTIONS = [
  { tag: 'Opening Night',       text: "The envelope trembles in the presenter's hands." },
  { tag: 'Venus Is Watching',   text: "She's been following your taste for years. Tonight she confirms it." },
  { tag: 'Best Cinematography', text: 'Your eye for beauty has been noted. The Academy is taking notes.' },
  { tag: 'Your Cinema Soul',    text: 'The films that made you — now making your chart.' },
  { tag: 'Mercury Is Talking',  text: "Can't stop, won't stop. Your narrative preferences are being gossiped about." },
  { tag: 'Best Original Craving', text: 'What you want on screen says everything. The jury has decided.' },
  { tag: 'Mars Has Opinions',   text: 'Conflict, tension, and your villain era. Mars filed a full report.' },
  { tag: 'Your Cosmic Identity', text: 'Birth chart unlocked. The stars are arguing over who gets credit.' },
  { tag: 'Best Performance',    text: 'The category you were born for. The card has your name on it.' },
  { tag: 'The Envelope Is Open', text: "The card is out. It's you. It was always going to be you." },
];

const SASSY = [
  "The lights dim. Someone in the front row is stress-eating popcorn. That's you.",
  "Venus has been gossiping about your taste for months. Tonight she finally gets to say it out loud.",
  "The presenter squints at the card. Takes a sip of water they didn't need. The audacity. The theatre.",
  "The camera cuts to you. You look incredible. Suspiciously calm. The internet will have opinions by morning.",
  "Mercury retrograde tried to delay this. The stars said absolutely not. Your chart pushed through.",
  "The flap is nearly open. Three new streaming services launched while you waited. You deserve this.",
  "Mars filed a 40-page report on your conflict preferences. The Academy read every page. Impressed.",
  "Your birth chart entered the room twenty minutes before you did. It's been working the crowd.",
  "One corner of the card is visible. It's your initial. Or an extremely dramatic font. Hard to say.",
  "The card is out. The room holds its breath. Venus leans in from the third row. She already knew.",
];

const DOTS_EMOJI = { done: '🏆', curr: '✦', empty: '·' };

// ── SVG Envelope (reconstructed from animation code) ─────────────────────────
const EnvelopeSVG = ({ flapRef, sealRef, cardBgRef, cardContentRef, svgNameRef, userName }) => (
  <svg
    className="env-svg w-full h-full overflow-visible"
    viewBox="0 0 230 148"
    style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(232,98,10,0.1))' }}
  >
    <defs>
      <linearGradient id="envG" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#c49a00" />
        <stop offset="100%" stopColor="#7a5800" />
      </linearGradient>
      <linearGradient id="fG" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e8c050" />
        <stop offset="100%" stopColor="#b48800" />
      </linearGradient>
      <linearGradient id="cardG" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fffaf0" />
        <stop offset="100%" stopColor="#f5e8c8" />
      </linearGradient>
      <linearGradient id="rG" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d4a800" />
        <stop offset="45%" stopColor="#fff0a0" />
        <stop offset="100%" stopColor="#E8620A" />
      </linearGradient>
      <linearGradient id="eG" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7a5200" />
        <stop offset="100%" stopColor="#3a2800" />
      </linearGradient>
      <filter id="envGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="sealGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* ── Card (peeks up from inside) ── */}
    <g ref={cardBgRef} opacity="0" style={{ willChange: 'transform' }}>
      <rect x="38" y="18" width="154" height="108" rx="6" fill="url(#cardG)" />
    </g>
    <g ref={cardContentRef} opacity="0" style={{ willChange: 'transform' }}>
      <rect x="46" y="26" width="138" height="92" rx="4" fill="none" stroke="rgba(200,160,80,0.3)" strokeWidth="1" />
      <line x1="62" y1="52" x2="168" y2="52" stroke="rgba(180,140,60,0.25)" strokeWidth="0.8" />
      <line x1="62" y1="62" x2="168" y2="62" stroke="rgba(180,140,60,0.18)" strokeWidth="0.8" />
      <line x1="62" y1="72" x2="168" y2="72" stroke="rgba(180,140,60,0.18)" strokeWidth="0.8" />
      <line x1="62" y1="82" x2="168" y2="82" stroke="rgba(180,140,60,0.18)" strokeWidth="0.8" />
    </g>
    <g ref={svgNameRef} opacity="0" style={{ willChange: 'transform' }}>
      <text
        x="115" y="44"
        textAnchor="middle"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="9"
        fill="url(#rG)"
        letterSpacing="2"
      >
        FATEFLIX AWARDS 2026
      </text>
      <text
        x="115" y="80"
        textAnchor="middle"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="15"
        fill="url(#rG)"
        letterSpacing="3"
        style={{ opacity: 0.9 }}
      >
        {(userName || '').substring(0, 12)}
      </text>
    </g>

    {/* ── Envelope body ── */}
    <rect x="8" y="48" width="214" height="96" rx="7" fill="url(#envG)" filter="url(#envGlow)" />
    {/* Fold lines */}
    <line x1="8" y1="144" x2="115" y2="96" stroke="#c49200" strokeWidth="0.9" opacity="0.45" />
    <line x1="222" y1="144" x2="115" y2="96" stroke="#c49200" strokeWidth="0.9" opacity="0.45" />
    <line x1="8" y1="48" x2="115" y2="96" stroke="#b88a00" strokeWidth="0.8" opacity="0.35" />
    <line x1="222" y1="48" x2="115" y2="96" stroke="#b88a00" strokeWidth="0.8" opacity="0.35" />

    {/* ── Wax seal ── */}
    <g ref={sealRef} filter="url(#sealGlow)">
      <circle cx="115" cy="96" r="15" fill="#9a6e00" opacity="0.95" />
      <circle cx="115" cy="96" r="12" fill="none" stroke="#e8c050" strokeWidth="1.2" opacity="0.8" />
      <text
        x="115" y="101"
        textAnchor="middle"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="9"
        fill="#fff0a0"
        letterSpacing="1"
      >FF</text>
    </g>

    {/* ── Flap (folds open on progress) ── */}
    <g ref={flapRef} style={{ transformOrigin: '115px 48px', willChange: 'transform' }}>
      <path d="M8,48 L115,96 L222,48 Z" fill="url(#fG)" />
      <path d="M8,48 L115,96 L222,48" fill="none" stroke="#c49200" strokeWidth="0.8" opacity="0.6" />
    </g>
  </svg>
);

// ── Main component ────────────────────────────────────────────────────────────
const WalkOfFameProgress = () => {
  const { currentStep, totalSteps, currentSection, answers } = useSurvey();

  // Hide on intro hero
  if (currentSection?.id === 'intro-hero') return null;

  const flapRef       = useRef(null);
  const sealRef       = useRef(null);
  const cardBgRef     = useRef(null);
  const cardContentRef = useRef(null);
  const svgNameRef    = useRef(null);

  const userName = ((answers?.username) || '').toUpperCase();
  const MAX = totalSteps || 10;
  const progress = currentStep / MAX;
  const pct = Math.round(progress * 100);
  const sectionIdx = Math.min(currentStep, SECTIONS.length - 1);
  const section = SECTIONS[sectionIdx];
  const sassy = SASSY[Math.min(currentStep, SASSY.length - 1)];

  // ── Envelope animation ────────────────────────────────────────────────────
  const updateEnvelope = useCallback((p) => {
    if (!flapRef.current) return;

    const fo = Math.min(1, p * 1.7);
    const scY = 1 - fo * 2;

    const flap = flapRef.current;
    flap.style.transition = 'transform 0.65s cubic-bezier(0.4,0,0.2,1)';
    if (Math.abs(scY) < 0.06) {
      flap.style.transform = 'scaleY(0.04) translateY(-50px)';
    } else if (scY > 0) {
      flap.style.transform = `scaleY(${scY})`;
    } else {
      flap.style.transform = `scaleY(${Math.abs(scY) * 0.28}) translateY(-65px)`;
    }

    if (sealRef.current) {
      sealRef.current.style.opacity = Math.max(0, 1 - p * 5.5);
      sealRef.current.style.transition = 'opacity 0.4s ease';
    }

    const peek = Math.max(0, Math.min(1, (p - 0.08) / 0.82));
    const ty = -peek * 42;
    const trans = `translateY(${ty}px)`;

    if (cardBgRef.current) {
      cardBgRef.current.style.transform = trans;
      cardBgRef.current.setAttribute('opacity', peek * 0.95);
    }
    if (cardContentRef.current) {
      cardContentRef.current.style.transform = trans;
      cardContentRef.current.setAttribute('opacity', Math.max(0, (peek - 0.28) / 0.72));
    }
    if (svgNameRef.current) {
      svgNameRef.current.style.transform = trans;
      svgNameRef.current.setAttribute('opacity', Math.max(0, (peek - 0.52) / 0.48));
    }
  }, []);

  useEffect(() => {
    updateEnvelope(progress);
  }, [currentStep, updateEnvelope]);

  return (
    <div className="w-full mb-8 select-none">
      {/* ── Award eyebrow ── */}
      <div className="text-center mb-3">
        <span
          className="block text-[7px] font-bold tracking-[3px] uppercase mb-1"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          THE 97TH FATEFLIX AWARDS · MARCH 2026
        </span>
        <span
          className="block font-bold text-[9px] tracking-[4px] uppercase"
          style={{ color: '#e8e0d8', textShadow: '1px 1px 0 #555, 2px 2px 0 #333' }}
        >
          BEST PERFORMANCE
        </span>
        <span
          className="block font-bold tracking-[2px] uppercase"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '32px',
            color: '#ff5c3a',
            textShadow: '0 0 8px #ff5c3a, 0 0 20px #ff3d1a, 0 0 40px rgba(255,60,20,0.4)',
            lineHeight: 1.05,
          }}
        >
          AS YOURSELF
        </span>
        <span
          className="block font-bold text-[8px] tracking-[5px] uppercase mt-0.5"
          style={{ color: 'rgba(220,210,200,0.5)' }}
        >
          GOES TO...
        </span>
      </div>

      {/* ── Envelope ── */}
      <div className="relative mx-auto mb-3" style={{ width: 200, height: 130 }}>
        <EnvelopeSVG
          flapRef={flapRef}
          sealRef={sealRef}
          cardBgRef={cardBgRef}
          cardContentRef={cardContentRef}
          svgNameRef={svgNameRef}
          userName={userName}
        />
        {/* Name overlay on card */}
        {pct > 52 && userName && (
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px] text-[13px] tracking-[3px] transition-opacity duration-700"
            style={{
              bottom: `${20 + ((pct / 100) * 0.3) * 22}%`,
              fontFamily: "'Bebas Neue', sans-serif",
              background: 'linear-gradient(90deg, #d4a800, #fff0a0, #E8620A, #ffd580)',
              backgroundSize: '200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: pct > 55 ? 1 : 0,
            }}
          >
            {userName}
          </div>
        )}
      </div>

      {/* ── Section tag + progress bar ── */}
      <div className="w-full mb-2 text-center">
        <span
          className="inline-block text-[8px] font-bold tracking-[2px] uppercase px-2.5 py-1 rounded-full mb-1.5"
          style={{
            background: 'rgba(232,98,10,0.12)',
            border: '1px solid rgba(232,98,10,0.25)',
            color: '#ff8c3a',
          }}
        >
          {section.tag}
        </span>
        <span
          className="block text-[10px] italic"
          style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}
        >
          {section.text}
        </span>
      </div>

      <div className="w-full mb-2">
        <div className="flex justify-between mb-1">
          <span className="text-[7px] font-bold tracking-[2px] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
            ENVELOPE OPENING
          </span>
          <span
            className="text-[7px] font-bold"
            style={{
              background: 'linear-gradient(90deg, #E8620A, #ffd580)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {pct}%
          </span>
        </div>
        <div className="w-full h-[5px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #E8620A, #ff9de2, #ffd580, #a8ff78, #78d4ff, #E8620A)',
              backgroundSize: '300% 100%',
              animation: 'barFlow 4s linear infinite',
            }}
          />
        </div>
      </div>

      {/* ── Step dots ── */}
      <div className="flex justify-center gap-1.5 mb-2">
        {Array.from({ length: MAX }, (_, i) => {
          const isDone = i < currentStep;
          const isCurr = i === currentStep;
          return (
            <div
              key={i}
              className="w-[18px] h-[18px] text-[11px] flex items-center justify-center transition-all duration-300"
              style={{
                opacity: isDone || isCurr ? 1 : 0.18,
                filter: isDone ? 'none' : isCurr ? 'none' : 'grayscale(1)',
                animation: isDone
                  ? 'dotGlow 2s ease-in-out infinite alternate'
                  : isCurr
                  ? 'dotPulse 0.9s ease-in-out infinite alternate'
                  : 'none',
                transform: isCurr ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              {isDone ? DOTS_EMOJI.done : isCurr ? DOTS_EMOJI.curr : DOTS_EMOJI.empty}
            </div>
          );
        })}
      </div>

      {/* ── Sassy "planets are saying" box ── */}
      <div
        className="w-full rounded-2xl px-3 py-2.5 mb-1"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="flex items-center gap-1.5 text-[7px] font-bold tracking-[2px] uppercase mb-1"
          style={{ color: 'rgba(232,98,10,0.7)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: '#E8620A',
              boxShadow: '0 0 6px #E8620A',
              animation: 'liveDot 1.5s ease-in-out infinite',
            }}
          />
          THE PLANETS ARE SAYING
        </div>
        <p
          className="text-[11px] leading-[1.55] italic"
          style={{ color: 'rgba(255,255,255,0.65)', fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}
        >
          {sassy}
        </p>
      </div>

      {/* ── Keyframe injections ── */}
      <style>{`
        @keyframes barFlow {
          0%   { background-position: 0% 0%; }
          100% { background-position: 300% 0%; }
        }
        @keyframes dotGlow {
          from { filter: drop-shadow(0 0 3px rgba(232,98,10,0.4)); }
          to   { filter: drop-shadow(0 0 9px rgba(232,98,10,0.9)); }
        }
        @keyframes dotPulse {
          from { transform: scale(1);   filter: drop-shadow(0 0 4px rgba(255,150,80,0.5)); }
          to   { transform: scale(1.4); filter: drop-shadow(0 0 12px rgba(255,150,80,1)); }
        }
        @keyframes liveDot {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.3; }
        }
        @keyframes pinkFlicker {
          0%,88%,92%,100% { text-shadow: 0 0 8px #ff5c3a, 0 0 20px #ff3d1a, 0 0 40px rgba(255,60,20,0.4); }
          90%             { text-shadow: 0 0 3px #ff5c3a, 0 0 6px #ff3d1a; }
        }
      `}</style>
    </div>
  );
};

export default WalkOfFameProgress;
