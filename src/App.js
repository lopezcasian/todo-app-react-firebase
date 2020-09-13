import React, { useState, useEffect } from 'react';
import { FormControl, Button, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Todo from './components/Todo/Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [ todos, setTodos ] = useState([]);
  const [ input, setInput ] = useState('');

  useEffect( () => {
    // this code here... fires when the app.js loads
    db.collection(  process.env.REACT_APP_FIREBASE_COLLECTION_NAME ).orderBy('timestamp', 'desc').onSnapshot( snapshot => {
      setTodos( snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo })) )
    });
  }, []);

  const addTodo = ( event ) => {
    event.preventDefault();
    
    db.collection( process.env.REACT_APP_FIREBASE_COLLECTION_NAME ).add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Write a Todo</InputLabel>
          <Input value={input} onChange={ event => setInput( event.target.value ) }/>
        </FormControl>
        <Button disabled={!input} type="submit" onClick={ addTodo } variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      
      <ul>
        { todos.map( todo => (
          <Todo key={todo.id} todo={todo} />
        )) }
      </ul>
    </div>
  );
}

export default App;
