"use client";

import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { KakaoPlace } from "@/entities/kakao/model/types";
import { Input } from "@/shared/ui/input";

export function AptSearchBox() {
  const router = useRouter();
  const [selected, setSelected] = useState<KakaoPlace | null>(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [items, setItems] = useState<KakaoPlace[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    let mounted = true;

    async function run() {
      if (!debounced) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/kakao/search?query=${encodeURIComponent(debounced)}`);
        const json = (await response.json()) as { documents?: KakaoPlace[] };
        if (mounted) setItems(json.documents ?? []);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [debounced]);

  const empty = useMemo(
    () => debounced.length > 0 && !loading && items.length === 0,
    [debounced, loading, items.length]
  );

  return (
    <Combobox
      value={selected}
      onChange={(value: KakaoPlace | null) => {
        if (!value) return;
        setSelected(value);
        const params = new URLSearchParams({
          x: value.x,
          y: value.y,
          name: value.place_name,
          address: value.road_address_name || value.address_name,
        });
        router.push(`/apt/${value.id}?${params.toString()}`);
      }}
    >
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xs font-semibold text-[#8b95a1]">
          SEARCH
        </div>
        <Combobox.Input
          as={Input}
          displayValue={(item: KakaoPlace | null) => item?.place_name ?? query}
          placeholder="아파트/오피스텔명 또는 도로명 주소"
          onChange={(event) => setQuery(event.target.value)}
          className="pl-[84px]"
        />

        <Combobox.Options className="absolute z-20 mt-2 max-h-[22rem] w-full overflow-auto rounded-2xl border border-[#dce7f5] bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
          {loading ? <div className="px-3 py-2 text-sm text-[#6b7684]">검색 중...</div> : null}
          {empty ? <div className="px-3 py-2 text-sm text-[#6b7684]">검색 결과가 없습니다.</div> : null}
          {items.map((item) => (
            <Combobox.Option
              key={item.id}
              value={item}
              className={({ active }) =>
                `cursor-pointer rounded-xl px-3 py-3 transition ${active ? "bg-[#f2f7ff]" : ""}`
              }
            >
              <div className="text-sm font-semibold text-[#191f28]">{item.place_name}</div>
              <div className="mt-1 text-xs text-[#6b7684]">
                {item.road_address_name || item.address_name}
              </div>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
