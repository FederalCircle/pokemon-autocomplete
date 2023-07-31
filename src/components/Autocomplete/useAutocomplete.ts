import { useEffect, useState } from 'react';
import { findSuggestions } from './Autocomplete.utils';

const useAutocomplete = (initialValue: string, options: string[]) => {
  const [primarySuggestion, setPrimarySuggestion] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const resetSuggestions = () => {
    setPrimarySuggestion('');
    setSuggestions([]);
    setSelectedIndex(0);
  };

  const updateSuggestions = (newValue: string) => {
    const newSuggestions = findSuggestions(newValue, options);
    if (newSuggestions[0]) {
      setPrimarySuggestion(newSuggestions[0]);
      setSuggestions(newSuggestions);
      setSelectedIndex(0);
    } else {
      resetSuggestions();
    }
  };

  const incrementSelectedIndex = () => {
    setSelectedIndex((prevState) => {
      const maxValue = suggestions.length - 1;
      const newSelectedIndex = prevState >= maxValue ? maxValue : prevState + 1;
      setPrimarySuggestion(suggestions[newSelectedIndex]);
      return newSelectedIndex;
    });
  };

  const decrementSelectedIndex = () => {
    setSelectedIndex((prevState) => {
      const newSelectedIndex = prevState <= 0 ? 0 : prevState - 1;
      setPrimarySuggestion(suggestions[newSelectedIndex]);
      return newSelectedIndex;
    });
  };

  useEffect(() => {
    if (initialValue) {
      updateSuggestions(initialValue);
    }
  }, []);

  return {
    primarySuggestion,
    suggestions,
    selectedIndex,
    updateSuggestions,
    resetSuggestions,
    incrementSelectedIndex,
    decrementSelectedIndex,
  };
};

export default useAutocomplete;
