import './App.css';
import Todo from './Todo'

function App() {
  let name = "ChoiSeungHoon";

  let output = <div className='App'>{name}
    <Todo />
    <Todo />
    <Todo />
  </div>;

  return (
    output
  );
}

export default App;
