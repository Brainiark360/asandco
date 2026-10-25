"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Content stays visible without JavaScript. Only off-screen groups are prepared for reveals.
export default function MotionExperience() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-reveal-state", "visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08 });
    for (const node of nodes) {
      if (node.getBoundingClientRect().top >= window.innerHeight) {
        node.dataset.revealState = "pending";
        observer.observe(node);
      }
    }
    const revealAll = () => {
      if (preference.matches) {
        observer.disconnect();
        nodes.forEach((node) => node.removeAttribute("data-reveal-state"));
      }
    };
    preference.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", revealAll);
      nodes.forEach((node) => node.removeAttribute("data-reveal-state"));
    };
  }, [pathname]);
  return null;
}
