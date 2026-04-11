"use client";

import { useEffect, useRef } from "react";
import {MapMarker} from "@/widgets/apt-summary/ui/AptSummaryCard";

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
  markers: MapMarker[];
};

const createAptMarker = (maps: any, map: any, center: any) => {
  const markerImage = new maps.MarkerImage("/images/appLogo.svg", new maps.Size(40, 40), {
    offset: new maps.Point(20, 40),
  });

  const marker = new maps.Marker({
    position: center,
    title: "아파트 위치",
    image: markerImage,
  });

  marker.setMap(map);
};

const createPoiMarkers = (maps: any, map: any, markers: MapMarker[]) => {
  markers.forEach((item) => {
    const position = new maps.LatLng(Number(item.y), Number(item.x));
    const markerImage = new maps.MarkerImage(item.marker, new maps.Size(40, 40), {
      offset: new maps.Point(position.x, position.y),
    })
    const marker = new maps.Marker({
      position,
      title: item.title,
      image:markerImage
    });

    marker.setMap(map);
  });
};


export function KakaoMiniMap({ x, y, markers = [] }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!key || !mapRef.current) return;

    const setupMap = () => {
      if (!window.kakao?.maps || !mapRef.current) return;

      window.kakao.maps.load(() => {
        if (!window.kakao?.maps || !mapRef.current) return;

        const maps = window.kakao.maps;
        const center = new maps.LatLng(Number(y), Number(x));
        const map = new maps.Map(mapRef.current, {
          center,
          level: 4,
        });

        createAptMarker(maps, map, center);
        createPoiMarkers(maps, map, markers);
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
  }, [x, y,markers]);

  return <div ref={mapRef} className="h-44 md:h-60 lg:h-96  sm:h-64 w-full rounded-md border" />;
}
