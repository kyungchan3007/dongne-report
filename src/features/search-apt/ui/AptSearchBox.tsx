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

  const empty = useMemo(() => debounced && !loading && items.length === 0, [debounced, loading, items.length]);

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
        <Combobox.Input
          as={Input}
          displayValue={(item: KakaoPlace | null) => item?.place_name ?? query}
          placeholder="아파트/오피스텔 이름 또는 주소를 입력하세요"
          onChange={(event) => setQuery(event.target.value)}
        />

        <Combobox.Options className="absolute z-20 mt-2 max-h-80 w-full overflow-auto rounded-md border bg-white p-1 shadow-lg">
          {loading ? <div className="px-3 py-2 text-sm text-slate-500">검색 중...</div> : null}
          {empty ? <div className="px-3 py-2 text-sm text-slate-500">검색 결과가 없습니다.</div> : null}
          {items.map((item) => (
            <Combobox.Option
              key={item.id}
              value={item}
              className={({ active }) =>
                `cursor-pointer rounded px-3 py-2 ${active ? "bg-slate-100" : ""}`
              }
            >
              <div className="text-sm font-medium text-slate-900">{item.place_name}</div>
              <div className="text-xs text-slate-600">{item.road_address_name || item.address_name}</div>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
