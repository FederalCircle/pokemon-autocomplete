import { forwardRef } from 'react';

import './Autocomplete.css';

interface AutocompleteProps {
  placeholder: string;
}

const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ placeholder }, ref) => {
    return (
      <div className="Autocomplete__container">
        <div className="Autocomplete__input-container">
          <div className="Autocomplete__suggestion" />
          <input
            className="Autocomplete__input"
            type="text"
            placeholder={placeholder}
            ref={ref}
          />
        </div>
        <ol className="Autocomplete__list" />
      </div>
    );
  },
);

export default Autocomplete;
