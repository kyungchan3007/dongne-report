# dongne-report

아파트/오피스텔 검색 결과를 기준으로 교통, 보육, 학교, 치안 데이터를 모아 보여주는 Next.js 리포트 웹앱입니다.

## 1) 프로젝트 목적

- 사용자가 아파트/오피스텔을 검색한다.
- 검색 결과를 선택하면 해당 위치 기준으로 동네 리포트를 본다.
- 리포트는 교통/보육/학교/치안 정보를 한 화면에서 요약한다.
- 외부 API 호출은 서버 라우트에서만 수행하고, 클라이언트는 `/api/*`만 호출한다.

## 2) 기술 스택

- Next.js App Router + TypeScript
- TailwindCSS
- Headless UI (Combobox)
- TanStack Query
- Zod (환경변수 검증)
- FSD 스타일 폴더 구조 (`app`, `_pages`, `widgets`, `features`, `entities`, `shared`)

## 3) 주요 기능

### 검색

- 메인 페이지(`/`)에서 Headless UI Combobox로 검색
- 입력 디바운스 300ms 적용
- 클라이언트는 `/api/kakao/search?query=...` 호출

### 상세 리포트

- 상세 페이지(`/apt/[placeId]`)에서 `/api/report/[placeId]` 호출
- 표시 항목:
- 지하철역(1km) Top3
- 버스정류장(1km) 개수 + Top5
- 어린이집/유치원(1km) 개수 + Top5
- 학교(1.5km) 개수 + Top10 + `schoolCode` 매핑 여부
- 치안(시도+시군구 기준 `crimePer100k`, `grade`)

### SchoolInfo 다중 apiType 조회 엔드포인트

- `/api/schoolinfo?schoolCode=...&all=1` 호출 시 아래 `apiType` 병렬 조회:
- `0` 학교 기본정보
- `08` 수업일수 및 수업시수
- `62` 학교 현황
- `63` 성별 학생수
- `09` 학년별 학급별 학생수
- `94` 대상별 학교폭력 예방교육 실적
- `51` 입학생 현황

참고: 현재 UI는 학교 클릭 상태(`selectedSchool`)까지만 연결되어 있고, SchoolInfo 팝업 렌더는 아직 주석/미연결 상태입니다.

## 4) 캐싱 정책

- `next/cache`의 `unstable_cache` 사용
- TTL: 6시간 (`21600`초)
- 캐시 대상:
- Kakao 키워드 검색
- Kakao 카테고리 검색
- Kakao 좌표->행정구역
- 종합 리포트(`/api/report/[placeId]`)
- 로컬 JSON 로딩(치안/학교코드 인덱스)

## 5) 데이터 소스

- Kakao Local REST API
- `public/data/safety-sigungu-per100k-250.json`
- `public/data/school-codes-index.json`
- SchoolInfo OpenAPI (`SCHOOLINFO_BASE_URL`)

## 6) 보안/SSR 경계

- 클라이언트에서 사용하는 공개 키: `NEXT_PUBLIC_KAKAO_MAP_KEY`만 허용
- 서버 전용 키: `KAKAO_REST_API_KEY`, `SCHOOLINFO_API_KEY`
- 외부 REST 호출은 서버 라우트에서만 수행
- 카카오 지도 SDK는 `use client` 컴포넌트에서만 로드

## 7) 폴더 구조 요약

```txt
src/
  app/
    page.tsx
    apt/[placeId]/page.tsx
    about/page.tsx
    api/
      kakao/search/route.ts
      kakao/category/route.ts
      kakao/coord2region/route.ts
      report/[placeId]/route.ts
      schoolinfo/route.ts
  _pages/
    map/ui/MapSearchPage.tsx
    apt/ui/AptDetailPage.tsx
    apt/ui/AptDetailContent.tsx
    apt/ui/AptDetailLoading.tsx
    apt/ui/AptDetailError.tsx
    apt/model/useNeighborhoodReport.ts
  features/
    search-apt/ui/AptSearchBox.tsx
    school-details/hooks/useSchoolClickHooks.ts
  widgets/
    report-sections/ui/*.tsx
    kakao-map/ui/KakaoMiniMap.tsx
  shared/
    config/env.ts
    lib/kakao.ts
    lib/cache.ts
    lib/report-data.ts
```

## 8) 실행 방법

### 사전 준비

- Node.js 18+ 권장
- pnpm 사용

### 환경변수

`.env.local.example`를 복사해 `.env.local` 생성:

```bash
cp .env.local.example .env.local
```

필수 값:

- `NEXT_PUBLIC_KAKAO_MAP_KEY`
- `KAKAO_REST_API_KEY`
- `SCHOOLINFO_API_KEY`
- `SCHOOLINFO_BASE_URL`

### 데이터 파일 위치

아래 2개 파일은 반드시 존재해야 함:

- `public/data/safety-sigungu-per100k-250.json`
- `public/data/school-codes-index.json`

### 실행

```bash
pnpm install
pnpm dev
```

## 9) 핵심 API 요약

- `GET /api/kakao/search?query=...`
- `GET /api/kakao/category?category_group_code=...&x=...&y=...&radius=...`
- `GET /api/kakao/coord2region?x=...&y=...`
- `GET /api/report/[placeId]?x=...&y=...&name=...&address=...`
- `GET /api/schoolinfo?schoolCode=...&apiType=...`
- `GET /api/schoolinfo?schoolCode=...&all=1`

## 10) 현재 상태 메모

- `AptDetailPage`는 책임 분리됨:
- 데이터 조회 훅: `useNeighborhoodReport`
- 상태 뷰: `AptDetailLoading`, `AptDetailError`
- 콘텐츠 렌더: `AptDetailContent`
- 학교 상세 팝업 UI는 다음 단계에서 연결 예정
