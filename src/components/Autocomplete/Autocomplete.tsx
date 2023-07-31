import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

import './Autocomplete.css';

interface AutocompleteProps {
  placeholder?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  options?: string[];
}

/**
 * Find suggestions for the value completion in the options array.
 * The max suggestions count is defined by the limit parameter.
 * @example
 *  const suggestions = await findSuggestions(
 *    'char',
 *    ['charmander', 'charizard', 'bulbasaur'],
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

const Autocomplete = ({
  placeholder = '',
  value = '',
  onChange = () => {},
  options = [],
}: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [primarySuggestion, setPrimarySuggestion] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectionIndex, setSelectionIndex] = useState<number>();

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(value);

    const newSuggestions = await findSuggestions(value, options);
    setPrimarySuggestion(newSuggestions[0]);
    setSuggestions(newSuggestions);
  };

  const handleInputKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.currentTarget;

    switch (e.key) {
      case 'ArrowRight':
        const isCaretAtEnd = selectionStart !== value.length;
        if (isCaretAtEnd) {
          break;
        }
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        const [suggestion] = await findSuggestions(value, options, 1);
        onChange(value + suggestion);
        setPrimarySuggestion('');
        setSuggestions([]);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectionIndex((prevState) =>
          prevState !== undefined ? prevState + 1 : 0,
        );
        // TODO stop selection index at the end of the array
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (selectionIndex) {
          setSelectionIndex((prevState) =>
            prevState !== undefined ? prevState - 1 : undefined,
          );
          // TODO stop selection index at the end of the array
        }
        break;
    }
  };

  return (
    <div className="Autocomplete__container">
      <div
        className="Autocomplete__input-container"
        onClick={() => inputRef.current?.focus()}
      >
        {primarySuggestion && (
          <div className="Autocomplete__suggestion">
            {value + primarySuggestion}
          </div>
        )}
        <input
          type="text"
          className="Autocomplete__input"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
      </div>
      {suggestions.length ? (
        <ul className="Autocomplete__list">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`Autocomplete__item ${
                selectionIndex === index ? 'Autocomplete__item--selected' : ''
              }`}
            >
              {value}
              <strong>{suggestion}</strong>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Autocomplete;
