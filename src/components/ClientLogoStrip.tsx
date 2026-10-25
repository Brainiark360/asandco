"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Keep artwork server-rendered. Only the motion control needs client-side state.
export default function ClientLogoStrip({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Without JavaScript the original list remains horizontally scrollable.
    root.current?.setAttribute("data-animated", "true");
  }, []);

  return <div ref={root} className="client-marquee" data-paused={paused}>
    <div className="client-marquee__header">
      <p className="eyebrow eyebrow--muted" id="client-strip-title">SELECTED CLIENT RELATIONSHIPS</p>
      <button
        type="button"
        className="client-marquee__toggle"
        onClick={() => setPaused((value) => !value)}
        aria-controls="client-strip-viewport"
        aria-label={paused ? "Resume client logo scrolling" : "Pause client logo scrolling"}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M4 2.5 13 8l-9 5.5z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
        </svg>
        <span>{paused ? "Resume scrolling" : "Pause scrolling"}</span>
      </button>
    </div>
    <div className="client-marquee__viewport" id="client-strip-viewport" role="region" aria-labelledby="client-strip-title" tabIndex={0}>
      <div className="client-marquee__track">{children}</div>
    </div>
  </div>;
}
