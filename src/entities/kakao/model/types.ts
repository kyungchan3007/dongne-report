export type KakaoPlace = {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string;
  y: string;
  category_group_code?: string;
  category_group_name?: string;
  place_url?: string;
  distance?: string;
};

export type KakaoSearchResponse = {
  documents: KakaoPlace[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
};

export type KakaoRegion = {
  region_type: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
};

export type KakaoCoord2RegionResponse = {
  documents: KakaoRegion[];
};

/** 자동차 길찾기 API 응답 루트 객체 */
export interface KakaoDirectionsResponse {
  /** 트랜잭션 식별자 */
  trans_id: string;
  /** 경로 목록(대안 경로 포함 가능) */
  routes: KakaoRoute[];
}

/** 경로 1건 정보 */
export interface KakaoRoute {
  /** 경로 탐색 결과 코드(0: 성공) */
  result_code: number;
  /** 경로 탐색 결과 메시지 */
  result_msg: string;
  /** 사용자 카드에 바로 쓰기 좋은 요약 정보 */
  summary: KakaoRouteSummary;
  /** 경로 구간 정보(출발지->경유지/목적지) */
  sections: KakaoSection[];
}

/** 사용자 표시용 핵심: 출발/도착/총거리/총시간/요금 */
export interface KakaoRouteSummary {
  /** 출발지(이름, 좌표) */
  origin: KakaoPoint;
  /** 목적지(이름, 좌표) */
  destination: KakaoPoint;
  /** 경유지 목록 */
  waypoints: KakaoPoint[];
  /** 탐색 우선순위 */
  priority: KakaoRoutePriority;
  /** 경로 전체 바운딩 박스(제공되지 않을 수 있음) */
  bound?: KakaoBound;
  /** 예상 요금(원) */
  fare: KakaoFare;
  /** 총 이동 거리(미터) */
  distance: number;
  /** 총 소요 시간(초) */
  duration: number;
}

export type KakaoRoutePriority = "RECOMMEND" | "TIME" | "DISTANCE";

/** 명칭 + 좌표 */
export interface KakaoPoint {
  name: string;
  /** 경도 */
  x: number;
  /** 위도 */
  y: number;
}

/** 지도 표시용 사각형 범위 */
export interface KakaoBound {
  min_x: number;
  min_y: number;
  max_x: number;
  max_y: number;
}

/** 요금(원) */
export interface KakaoFare {
  /** 택시 예상 요금 */
  taxi: number;
  /** 통행 요금 */
  toll: number;
}

/** 구간(경유지 기준으로 여러 개 생성될 수 있음) */
export interface KakaoSection {
  /** 구간 거리(미터) */
  distance: number;
  /** 구간 시간(초) */
  duration: number;
  /**
   * summary=false일 때만 제공
   * (요청에서 summary=true면 아래 상세 필드는 없을 수 있음)
   */
  bound?: KakaoBound;
  roads?: KakaoRoad[];
  guides?: KakaoGuide[];
}

export type KakaoTrafficState = 0 | 1 | 2 | 3 | 4 | 6;

/** 도로 단위 상세 정보 */
export interface KakaoRoad {
  /** 도로명 */
  name: string;
  /** 도로 구간 거리(미터) */
  distance: number;
  /** 도로 구간 시간(초) */
  duration: number;
  /** 현재 교통 속도(km/h) */
  traffic_speed: number;
  /**
   * 교통 상태 코드
   * 0: 정보없음, 1: 정체, 2: 지체, 3: 서행, 4: 원활, 6: 사고(통행불가)
   */
  traffic_state: KakaoTrafficState;
  /** [x1, y1, x2, y2, ...] 형태의 폴리라인 좌표 */
  vertexes: number[];
}

/** 내비 안내 지점 정보 */
export interface KakaoGuide {
  /** 지점 명칭(출발지/목적지/도로명 등) */
  name: string;
  /** 경도 */
  x: number;
  /** 위도 */
  y: number;
  /** 이전 안내 지점부터 현재 지점까지 거리(미터) */
  distance: number;
  /** 이전 안내 지점부터 현재 지점까지 시간(초) */
  duration: number;
  /** 안내 타입 코드(예: 0 직진, 1 좌회전, 2 우회전, 100 출발지, 101 목적지) */
  type: number;
  /** 화면에 표시 가능한 안내 문구 */
  guidance: string;
  /** 연결된 도로 인덱스 */
  road_index: number;
}
