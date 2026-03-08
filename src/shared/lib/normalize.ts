const PUNCTUATION_REGEX = /[\s()·\-.,]/g;

export function normalizeName(value: string) {
  return value.replace(PUNCTUATION_REGEX, "").toLowerCase();
}

export function tokenizeAddress(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

export function scoreAddressSimilarity(a: string, b: string) {
  if (!a || !b) return 0;
  const aTokens = new Set(tokenizeAddress(a));
  const bTokens = tokenizeAddress(b);
  return bTokens.reduce((acc, token) => (aTokens.has(token) ? acc + 1 : acc), 0);
}
