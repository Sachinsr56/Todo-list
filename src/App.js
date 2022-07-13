import './App.css';
import Header from './MyComponents/Header';
import { Todos } from './MyComponents/Todos';
import { Footer } from './MyComponents/Footer';
import React, {useState,useEffect} from 'react';
import { AddTodo } from './MyComponents/AddTodo';

function App() {
  let initTodo
  if(localStorage.setItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo= JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete=(todo)=>{
    console.log("I am on delete",todo);
    // Deleting this way in react does not Worker
    // let index=todos.indexOf(todo);
    // todos.splice(index,1);

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addTodo = (title,desc)=>{
    let sno;
    if(todos.length===0){
      sno=0;
    }
    else{
      sno=todos[todos.length-1].sno+1;
    }
    const myTodo = {
      sno: sno,
      title:title,
      desc:desc,
    }
    setTodos([...todos,myTodo]);
    
    }


  const [todos, setTodos] = useState([initTodo]);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  return (
    <>
    <Header title="Todos List" searchBar={true} />
    <AddTodo addTodo={addTodo} />
    <Todos todos={todos} onDelete={onDelete} />
    <Footer />
    </>
  );
}

export default App;
