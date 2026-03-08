import { unstable_cache } from "next/cache";

export const SIX_HOURS = 60 * 60 * 6;

export async function withSixHourCache<T>(
  key: Array<string | number>,
  fn: () => Promise<T>,
): Promise<T> {
  const cached = unstable_cache(fn, key.map(String), { revalidate: SIX_HOURS });
  return cached();
}
