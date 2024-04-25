import logo from './logo.svg';
import ItemsTable from './components/ItemsTable.js';
import Menu from './components/Menu.js';
import './App.css';

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <Menu></Menu>
        <ItemsTable></ItemsTable>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn eaf
        </a>
      </header>

    </div>
    </>
  );
}

export default App;
