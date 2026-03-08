"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao?: {
      maps?: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: Record<string, unknown>) => unknown;
        Marker: new (options: Record<string, unknown>) => { setMap: (map: unknown) => void };
      };
    };
  }
}

type Props = {
  x: string;
  y: string;
};

export function KakaoMiniMap({ x, y }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!key || !mapRef.current) return;

    const setupMap = () => {
      if (!window.kakao?.maps || !mapRef.current) return;
      window.kakao.maps.load(() => {
        if (!window.kakao?.maps || !mapRef.current) return;
        const center = new window.kakao.maps.LatLng(Number(y), Number(x));
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 4,
        });
        const marker = new window.kakao.maps.Marker({ position: center });
        marker.setMap(map);
      });
    };

    const onScriptLoad = () => setupMap();

    const existing = document.querySelector<HTMLScriptElement>("script[data-kakao-map='true']");
    if (existing) {
      if (window.kakao?.maps) {
        setupMap();
        return;
      }

      existing.addEventListener("load", onScriptLoad);
      return () => existing.removeEventListener("load", onScriptLoad);
    }

    const script = document.createElement("script");
    script.async = true;
    script.dataset.kakaoMap = "true";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    script.addEventListener("load", onScriptLoad);
    document.head.appendChild(script);

    return () => script.removeEventListener("load", onScriptLoad);
  }, [x, y]);
  console.log(mapRef)
  return <div ref={mapRef} className="h-48 w-full rounded-md border" />;
}
