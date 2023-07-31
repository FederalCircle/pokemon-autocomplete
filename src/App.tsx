import { useState } from 'react';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Footer from './components/Footer/Footer';

import PokemonLogo from './assets/pokemon_logo.png';

import './styles.css';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const pokemons = ['Charmander', 'Charmeleon', 'Charizard'];
  return (
    <div className="App">
      <img src={PokemonLogo} alt="" />
      <h1>Autocomplete</h1>
      <Autocomplete
        placeholder="Search for a Pokémon..."
        value={searchValue}
        onChange={setSearchValue}
        options={pokemons}
      />
      <Footer />
    </div>
  );
}
