import { AptSearchBox } from "@/features/search-apt/ui/AptSearchBox";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function MapSearchPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">동네 리포트 검색</h1>
      <Card>
        <CardHeader>
          <CardTitle>아파트/오피스텔 검색</CardTitle>
        </CardHeader>
        <CardContent>
          <AptSearchBox />
          <p className="mt-3 text-xs text-slate-500">
            검색 결과를 선택하면 교통, 보육, 학교, 치안 정보를 종합한 리포트를 확인할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
