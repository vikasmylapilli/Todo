import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import './App.css';
import { db } from './firebase';
import firebase from 'firebase';


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(()=>{
    db.collection("Todos").orderBy("timestamp", "desc").onSnapshot(snapshot=>{
      // console.log(snapshot.docs.map(doc=>doc.data()))
      setTodos(snapshot.docs.map(doc=>({id: doc.id, 
                                      todo : doc.data().todo})))
    })
  },[])

  console.log(todos)

  const addTodo = (event)=>{
    event.preventDefault()
    
    db.collection("Todos").add({
      todo: input,
      timestamp:  firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input])
    setInput('')
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <form action="">
      <FormControl>
          <InputLabel>Write Todo</InputLabel>
          <Input type="text" 
          value = {input}
          onChange = {event=>setInput(event.target.value)}/>
      </FormControl>
      <Button disabled={!input} type='submit' onClick={addTodo} variant="contained">Add todo</Button>
      {/* <button type='submit' onClick={addTodo}>Todo</button> */}
      </form>
      <ul>
        {todos.map((todo, index)=>(
            <Todo key={index} todo = {todo}/>
          ))}

      </ul>
    
    </div>
  );
}

export default App;
