import { SchoolInfoApiPayload, SchoolInfoListItem } from "@/app/api/schoolinfo/type/type";
import { normalizeText } from "@/app/api/schoolinfo/utils/utils";

export function filterSchoolList(
  list: SchoolInfoListItem[],
  schoolCode: string,
  schoolName: string,
  address: string
): SchoolInfoListItem[] {
  const normalizedCode = normalizeText(schoolCode);
  const normalizedName = normalizeText(schoolName);
  const normalizedAddress = normalizeText(address);

  const byCode = list.filter((item) => normalizeText(item.SCHUL_CODE) === normalizedCode);
  if (byCode.length > 0) return byCode;

  const byName = list.filter((item) => normalizeText(item.SCHUL_NM) === normalizedName);
  if (byName.length <= 1) return byName;

  if (!normalizedAddress) return byName;

  const byAddress = byName.filter((item) => {
    const roadAddress = normalizeText(item.SCHUL_RDNMA);
    const extraAddress = normalizeText(item.ADRES_BRKDN);
    return normalizedAddress.includes(roadAddress) || normalizedAddress.includes(extraAddress);
  });

  return byAddress.length > 0 ? byAddress : byName;
}

export function maybeFilterRawResponse(
  raw: string,
  schoolCode: string,
  schoolName: string,
  address: string
): string {
  try {
    const parsed = JSON.parse(raw) as SchoolInfoApiPayload;

    if (!Array.isArray(parsed.list)) {
      return raw;
    }

    return JSON.stringify({
      ...parsed,
      list: filterSchoolList(parsed.list, schoolCode, schoolName, address),
    });
  } catch {
    return raw;
  }
}
