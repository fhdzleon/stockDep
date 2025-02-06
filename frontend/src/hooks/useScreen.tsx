"use client";

import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | undefined;

function useScreen() {
  const [screen, setScreen] = useState<Breakpoint>(undefined);

  const getBreakpoint = (width: number): Breakpoint => {
    if (width >= 1536) return "2xl";
    if (width >= 1280) return "xl";
    if (width >= 1024) return "lg";
    if (width >= 768) return "md";
    if (width >= 640) return "sm";
    return undefined;
  };

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setScreen(getBreakpoint(width));
    };

    // Ejecutar al montar y en cada cambio de ruta
    updateBreakpoint();

    // Listener para resize
    window.addEventListener("resize", updateBreakpoint);

    // Limpiar listeners
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return {
    screen,
    isSm: screen === "sm",
    isMd: screen === "md",
    isLg: screen === "lg",
    isXl: screen === "xl",
    is2Xl: screen === "2xl"
  };
}

export default useScreen;