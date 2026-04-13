"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={{ duration: 1.5, orientation: "vertical", smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};
