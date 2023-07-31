import { useState } from 'react';
import Autocomplete from './components/Autocomplete/Autocomplete';
import './styles.css';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const pokemons = ['Charmander', 'Charmeleon', 'Charizard'];
  return (
    <div className="App">
      <h1>Pokemon Autocomplete</h1>
      <Autocomplete
        placeholder="Search for a pokemon"
        value={searchValue}
        onChange={setSearchValue}
        options={pokemons}
      />
    </div>
  );
}
