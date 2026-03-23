"use client";

import { useEffect } from "react";
import clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;

    if (!projectId) {
      console.warn(
        "Clarity: NEXT_PUBLIC_CLARITY_ID não está configurado no ambiente.",
      );
      return;
    }

    clarity.init(projectId);
  }, []);
  return null;
}
