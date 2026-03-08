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
