/**
 * Advanced fuzzy search scoring algorithm.
 * Scoring Criteria:
 * - Exact Match: Highest score.
 * - Starts With: High score for matching the beginning of the string.
 * - Substring Match: Good score for contiguous matches.
 * - Acronym Match: Bonus for matching first letters of words.
 * - Word Boundary Match: Bonus for matches following separators (space, underscore, camelCase).
 * - Levenshtein Distance: Penalty for typos/mismatches (optional/implicit in some flows, but here we focus on extensive pattern matching).
 *
 * The score is a number, higher is better. > 0 means a match.
 */

interface FuzzyOptions {
  /**
   * Whether the search is case-sensitive.
   * @default false
   */
  caseSensitive?: boolean;
  /**
   * Minimum score to consider a match.
   * @default 1
   */
  threshold?: number;
  /**
   * Boost factor for matches that start with the query.
   * @default 2
   */
  startBonus?: number;
  /**
   * Boost factor for matches on word boundaries.
   * @default 1.5
   */
  wordBonus?: number;
  /**
   * Boost factor for acronym matches (e.g. "ua" -> "User Account").
   * @default 2
   */
  acronymBonus?: number;
}

/**
 * Calculates a match score for a query against a target string.
 * Returns a score > 0 if it's a match, or 0 if no match.
 * Higher score = better match.
 */
export function fuzzyScore(
  text: string,
  query: string,
  options: FuzzyOptions = {}
): number {
  const {
    caseSensitive = false,
    startBonus = 2,
    wordBonus = 1.5,
    acronymBonus = 2,
  } = options;

  if (!text || !query) return 0;

  let t = text;
  let q = query;

  if (!caseSensitive) {
    t = t.toLowerCase();
    q = q.toLowerCase();
  }

  // 1. Exact Match
  if (t === q) return 100;

  // 2. Contains Match (Contiguous)
  const exactIndex = t.indexOf(q);
  if (exactIndex > -1) {
    let score = 50 + (1 / (exactIndex + 1)) * 10; // Favor earlier occurrences
    if (exactIndex === 0) score += 20 * startBonus; // Starts with bonus
    return score;
  }

  // 3. Sequential Character Match (Fuzzy)
  let score = 0;
  let tIdx = 0;
  let qIdx = 0;
  let consecutiveCount = 0;
  let firstMatchIdx = -1;

  // Pre-compute word boundaries for bonus
  // Boundaries: Start of string, Space, Underscore, Hyphen, or Capital letter (if we had original case, but assuming lower for search)
  // For simple acronyms with spaces: "User Account" -> ' ' is boundary
  const isBoundary = (index: number) => {
    if (index === 0) return true;
    const char = t[index - 1];
    return [" ", "_", "-", ".", "/"].includes(char);
  };

  while (tIdx < t.length && qIdx < q.length) {
    if (t[tIdx] === q[qIdx]) {
      if (firstMatchIdx === -1) firstMatchIdx = tIdx;

      let charScore = 1;

      // Bonus: Word boundary
      if (isBoundary(tIdx)) {
        charScore *= wordBonus;

        // Bonus: Acronym - if previous query char was also a boundary match
        // This is a simplified heuristic
        if (qIdx > 0 && isBoundary(firstMatchIdx)) {
          // Check logical flow for acronyms could be complex, keeping simple
          // If we just matched a boundary, and we are matching query sequentially
          charScore += acronymBonus;
        }
      }

      // Bonus: Consecutive match
      if (consecutiveCount > 0) {
        charScore += consecutiveCount * 0.5; // Growing bonus for runs
      }

      score += charScore;
      consecutiveCount++;
      qIdx++;
    } else {
      consecutiveCount = 0;
      // Minor penalty for gaps, but don't go negative on score accumulation purely
      score -= 0.1;
    }
    tIdx++;
  }

  // Match failed if we didn't consume the whole query
  if (qIdx < q.length) return 0;

  // Adjust score based on compactness (shorter spread is better)
  const matchLength = tIdx - firstMatchIdx;
  const compactness = q.length / matchLength; // 1.0 is perfect compactness
  score *= compactness;

  // Penalty for length difference (prefer shorter exact targets vs long ones containing the query)
  const lengthRatio = q.length / t.length;
  score *= 0.8 + 0.2 * lengthRatio;

  return Math.max(0, score);
}

/**
 * Sorts an array of objects based on a fuzzy search of a specific key.
 */
export function fuzzySort<T>(
  items: T[],
  query: string,
  keySelector: (item: T) => string
): T[] {
  if (!query) return items;

  return items
    .map((item) => ({
      item,
      score: fuzzyScore(keySelector(item), query),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);
}
