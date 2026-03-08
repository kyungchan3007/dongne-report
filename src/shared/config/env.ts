import "server-only";

import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_KAKAO_MAP_KEY: z.string().min(1),
});

const serverSchema = publicSchema.extend({
  KAKAO_REST_API_KEY: z.string().min(1),
  SCHOOLINFO_API_KEY: z.string().min(1),
  SCHOOLINFO_BASE_URL: z.string().url(),
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_KAKAO_MAP_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY,
});

export const env = serverSchema.parse({
  NEXT_PUBLIC_KAKAO_MAP_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY,
  KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
  SCHOOLINFO_API_KEY: process.env.SCHOOLINFO_API_KEY,
  SCHOOLINFO_BASE_URL: process.env.SCHOOLINFO_BASE_URL,
});
