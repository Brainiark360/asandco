"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { mountPageMotion } from "../lib/page-motion";

// Prepare reveal styles before paint, and clean up on route/preference changes.
export default function MotionExperience() {
  const pathname = usePathname();
  useLayoutEffect(() => mountPageMotion(document, window), [pathname]);
  return null;
}
