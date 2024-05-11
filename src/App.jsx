/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'

import './App.css'
import Input from './Input'

function useTodos() {
  let [todo, setTodo] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/todos").then((response) => {
        response.json().then((data) => {
          setTodo(data)
        })
    })

    setInterval(() => {
      fetch("http://localhost:3000/todos").then((response) => {
          response.json().then((data) => {
            console.log(data);
            setTodo(data)
            
          })
      })
    }, 5000)
  }, [])

  return todo;
}

function App() {
  
  let todo = useTodos();

  return (
    <>
    <div>
      <Input></Input>
    </div>
      <div>

        {todo.map((item) => {
          return <div>
          {item.title}
          <br/>
          {item.description}
          
          </div>
        })}
      </div>
    </>
  )
}

export default App
