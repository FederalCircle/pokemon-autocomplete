/**
 * Find suggestions for the value completion in the options array.
 * The max suggestions count is defined by the limit parameter.
 * @example
 *  const suggestions = findSuggestions(
 *    'char',
 *    ['charmander', 'charizard'],
 *  )
 *  console.log(suggestions) // ['mander', 'izard']
 */
export function findSuggestions(
  value: string,
  options: string[],
  limit?: number,
): string[] {
  const suggestions: string[] = [];
  for (let option of options) {
    if (limit && suggestions.length >= limit) break;

    const match = option.match(new RegExp(`^${value}`, 'i'));
    if (match && match[0]) {
      suggestions.push(option.slice(value.length));
    }
  }
  return suggestions;
}
