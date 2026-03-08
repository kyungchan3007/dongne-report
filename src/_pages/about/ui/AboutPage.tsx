import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">About</h1>
      <Card>
        <CardHeader>
          <CardTitle>데이터 출처</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>장소 검색/주변 시설: Kakao Local REST API</p>
          <p>치안 지표: `safety-sigungu-per100k-250.json` (인구 10만명당 범죄율 + 등급)</p>
          <p>학교 코드 매핑: `school-codes-index.json`</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>주의사항</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>치안 등급은 전국 시군구 분포를 기반으로 구간화(tertile)된 정적 지표입니다.</p>
          <p>실시간 사건/사고를 반영하지 않으며, 의사결정 시 추가 검증이 필요합니다.</p>
        </CardContent>
      </Card>
    </section>
  );
}
