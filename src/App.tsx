import { useEffect, useState } from 'react';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Footer from './components/Footer/Footer';

import usePokeApi from './hooks/usePokeApi';
import PokemonLogo from './assets/pokemon_logo.png';

import './styles.css';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const { pokemons, isLoading, hasError, fetchFirstGenerationPokemons } =
    usePokeApi();

  useEffect(() => {
    fetchFirstGenerationPokemons();
  }, []);

  return (
    <div className="App">
      <div className="App__card">
        {hasError && <h1>Somethin bad happened...</h1>}
        {!hasError && isLoading && <h1>Loading...</h1>}
        {!hasError && !isLoading && (
          <>
            <img src={PokemonLogo} alt="" />
            <h1>Autocomplete</h1>
            <Autocomplete
              placeholder="Search for a Pokémon..."
              value={searchValue}
              onChange={setSearchValue}
              options={pokemons}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
