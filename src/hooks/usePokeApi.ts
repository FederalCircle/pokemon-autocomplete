import { useState } from 'react';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

const usePokeApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<string[]>([]);

  const fetchFirstGenerationPokemons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setPokemons(data.results.map((pokemon: any) => pokemon.name));
    } catch (error: unknown) {
      console.error('Error fetching Pokémon data:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { pokemons, isLoading, hasError, fetchFirstGenerationPokemons };
};

export default usePokeApi;
