/**
 * Calculates a fuzzy match score for a query string against a text string.
 * Higher score means better match. Returns 0 if no match.
 */
export function fuzzyScore(text: string, query: string): number {
  if (!text || !query) return 0;
  const t = text.toLowerCase();
  const q = query.toLowerCase();

  // 1. Exact match (highest priority)
  if (t === q) return 100;

  // 2. Starts with (strong priority)
  if (t.startsWith(q)) return 80 + (q.length / t.length) * 10;

  // 3. Contains (medium priority)
  if (t.includes(q)) return 60 + (q.length / t.length) * 10;

  // 4. Fuzzy sequence match
  let score = 0;
  let tIdx = 0;
  let matches = 0;
  let consecutive = 0;

  for (let i = 0; i < q.length; i++) {
    const char = q[i];
    const matchIdx = t.indexOf(char, tIdx);

    if (matchIdx === -1) {
      // Allow minor typos? For now, strict sequence.
      return 0;
    }

    matches++;

    // Bonus for match at start/word boundary
    if (matchIdx === 0 || /[\s_-]/.test(t[matchIdx - 1])) {
      score += 10;
    }

    // Bonus for consecutive matches
    if (matchIdx === tIdx) {
      consecutive++;
      score += 5 + consecutive * 2; // Increasing bonus for runs
    } else {
      consecutive = 0;
      score -= (matchIdx - tIdx) * 0.5; // Penalty for gaps
    }

    tIdx = matchIdx + 1;
  }

  // Normalize by length ratio to prefer shorter targets (more specific)
  // But ensure score > 0 if matched
  return Math.max(1, score - (t.length - q.length) * 0.1);
}
