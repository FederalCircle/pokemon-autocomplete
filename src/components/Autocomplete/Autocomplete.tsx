import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import useAutocomplete from './useAutocomplete';

import Icon from '../../assets/magnifying-glass-solid.svg';
import './Autocomplete.css';

interface AutocompleteProps {
  placeholder?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  options?: string[];
}

const Autocomplete = ({
  placeholder = '',
  value = '',
  onChange = () => {},
  options = [],
}: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    primarySuggestion,
    suggestions,
    selectedIndex,
    updateSuggestions,
    resetSuggestions,
    incrementSelectedIndex,
    decrementSelectedIndex,
  } = useAutocomplete(value, options);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
    updateSuggestions(value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value, selectionStart } = e.currentTarget;
    switch (e.key) {
      case 'ArrowRight':
        // Caret is at the end
        if (selectionStart !== value.length) break;
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        onChange(value + primarySuggestion);
        resetSuggestions();
        break;
      case 'ArrowDown':
        e.preventDefault();
        incrementSelectedIndex();
        break;
      case 'ArrowUp':
        e.preventDefault();
        decrementSelectedIndex();
        break;
    }
  };

  const handleItemClick = (suggestion: string) => {
    onChange(value + suggestion);
    resetSuggestions();
  };

  return (
    <div className="Autocomplete__container">
      <div
        className="Autocomplete__search-container"
        onClick={() => inputRef.current?.focus()}
      >
        <img src={Icon} className="Autocomplete__icon" />
        <div className="Autocomplete__input-container">
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
      </div>
      {suggestions.length ? (
        <ul className="Autocomplete__list">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={classNames('Autocomplete__item', {
                'Autocomplete__item--selected': selectedIndex === index,
              })}
              onClick={() => handleItemClick(suggestion)}
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
