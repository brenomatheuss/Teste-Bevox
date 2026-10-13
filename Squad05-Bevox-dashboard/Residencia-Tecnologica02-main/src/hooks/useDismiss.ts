"use client";

import { useEffect, type RefObject } from "react";

/** Fecha um menu ao clicar fora ou pressionar Escape. */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  aberto: boolean,
  fechar: () => void,
) {
  useEffect(() => {
    if (!aberto) return;
    const aoClicar = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) fechar();
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    document.addEventListener("mousedown", aoClicar);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("mousedown", aoClicar);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [ref, aberto, fechar]);
}
