import Autocomplete from './components/Autocomplete/Autocomplete';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <h1>Pokemon Autocomplete</h1>
      <Autocomplete placeholder="Type something..." />
    </div>
  );
}
