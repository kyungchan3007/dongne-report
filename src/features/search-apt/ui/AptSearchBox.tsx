"use client";

import { Combobox } from "@headlessui/react";
import { Building2, Search } from "lucide-react";
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
        {/* Search 아이콘 */}
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#b0b8c1]">
          <Search size={18} strokeWidth={2} />
        </div>

        <Combobox.Input
          as={Input}
          displayValue={(item: KakaoPlace | null) => item?.place_name ?? query}
          placeholder="아파트 / 오피스텔명 또는 도로명 주소"
          onChange={(event) => setQuery(event.target.value)}
          className="pl-11"
        />

        {/* 로딩 스피너 (우측) */}
        {loading && (
          <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
            <div className="toss-spinner-sm" />
          </div>
        )}

        <Combobox.Options className="absolute z-20 mt-2 max-h-[22rem] w-full overflow-auto rounded-2xl border border-[#e5e8eb] bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          {loading && (
            <div className="flex items-center gap-2 px-3 py-3 text-sm text-[#8b95a1]">
              <div className="toss-spinner-sm flex-shrink-0" />
              검색 중...
            </div>
          )}
          {empty && (
            <div className="px-3 py-4 text-center text-sm text-[#b0b8c1]">
              검색 결과가 없습니다.
            </div>
          )}
          {items.map((item) => (
            <Combobox.Option
              key={item.id}
              value={item}
              className={({ active }) =>
                `flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                  active ? "bg-[#f2f4f6]" : ""
                }`
              }
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#e8f3ff]">
                <Building2 size={14} className="text-[#3182f6]" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#191f28]">{item.place_name}</div>
                <div className="mt-0.5 truncate text-xs text-[#8b95a1]">
                  {item.road_address_name || item.address_name}
                </div>
              </div>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}

