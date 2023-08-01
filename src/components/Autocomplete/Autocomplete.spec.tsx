import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Autocomplete, { AutocompleteProps } from './Autocomplete';

const Wrapper = ({ value: initialValue, ...props }: AutocompleteProps) => {
  const [value, setValue] = useState(initialValue);
  return <Autocomplete value={value} onChange={setValue} {...props} />;
};

describe('Autocomplete', () => {
  const value = 'Char';
  const placeholder = 'Search';
  const options = ['Charmander', 'Charmeleon', 'Charizard'];
  let inputElement: HTMLElement;

  beforeEach(() => {
    render(<Wrapper options={options} placeholder={placeholder} />);
    inputElement = screen.getByRole('textbox');
  });

  test('renders correctly', () => {
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveProperty('placeholder', placeholder);
  });

  describe('after typing', () => {
    let suggestionsElements: HTMLElement[];

    beforeEach(() => {
      fireEvent.change(inputElement, { target: { value } });
      suggestionsElements = screen.getAllByRole('listitem');
    });

    test('displays inline suggestion', () => {
      const inlineSuggestionElement = screen.getByTestId('inline-suggestion');
      expect(inlineSuggestionElement).toHaveTextContent(options[0]);
    });

    test('displays suggestions list', () => {
      expect(suggestionsElements.length).toBe(3);
      expect(suggestionsElements[0]).toHaveTextContent(options[0]);
      expect(suggestionsElements[1]).toHaveTextContent(options[1]);
      expect(suggestionsElements[2]).toHaveTextContent(options[2]);
    });

    test('selects suggestion with arrow keys', () => {
      const expectedClassName = 'Autocomplete__item--selected';

      expect(suggestionsElements[0]).toHaveClass(expectedClassName);
      expect(suggestionsElements[1]).not.toHaveClass(expectedClassName);
      expect(suggestionsElements[2]).not.toHaveClass(expectedClassName);

      fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
      fireEvent.keyDown(inputElement, { key: 'ArrowDown' });

      expect(suggestionsElements[0]).not.toHaveClass(expectedClassName);
      expect(suggestionsElements[1]).not.toHaveClass(expectedClassName);
      expect(suggestionsElements[2]).toHaveClass(expectedClassName);
    });

    describe('persist suggestion on', () => {
      beforeEach(() => {
        fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
      });

      test('enter', () => {
        fireEvent.keyDown(inputElement, { key: 'Enter' });
        expect(inputElement).toHaveProperty('value', options[1]);
      });

      test('tab', () => {
        fireEvent.keyDown(inputElement, { key: 'Tab' });
        expect(inputElement).toHaveProperty('value', options[1]);
      });

      test('arrow right', () => {
        fireEvent.keyDown(inputElement, { key: 'ArrowRight' });
        expect(inputElement).toHaveProperty('value', options[1]);
      });
    });
  });
});
