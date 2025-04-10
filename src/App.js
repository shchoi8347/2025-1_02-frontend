import './App.css';
import Todo from './Todo';
import React, {useState} from "react";
import { Container, List, Paper } from "@mui/material";
import AddTodo from './AddTodo';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    item.id = "ID-" + items.length;
    item.done = false;

    setItems([...items, item]);
    console.log("items: ", items);
  };

  const deleteItem = (item) => {
    const newItems = items.filter(e => e.id !== item.id);
    setItems([...newItems]);
  }

  const editItem = () => {
    setItems([...items]); // items 상태를 변경함 => App 컴포넌트가 리렌더링 됨
  }

  let todoItems = items.length > 0 && (
   <Paper style={{margin: 16}}>
    <List>
      { items.map((item) => (
          <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem} />
      ))}
    </List>
   </Paper>
   );

  return (
    <div className="App">
      <Container>
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
      
    </div>
  );
}

export default App;
