import { useState } from 'react';

const useAutocomplete = (value: string) => {
  const [primarySuggestion, setPrimarySuggestion] = useState('');
  const [otherSuggestions, setOtherSuggestions] = useState<string[]>([]);

  /**
   * Find suggestions for the value completion in the options array.
   * The max suggestions count is defined by the limit parameter.
   * @example
   *  const suggestions = await findSuggestions(
   *    'char',
   *    ['charmander', 'charizard'],
   *  )
   *  console.log(suggestions) // ['mander', 'izard']
   */
  async function findSuggestions(
    value: string,
    options: string[],
    limit?: number,
  ): Promise<string[]> {
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
};
