/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'

import './App.css'

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
    }, 10000)
  }, [])

  



  return todo;
}

function App() {
  
  let todo = useTodos();

  return (
    <>
      <div>
        {todo.map((item) => {
          return <div>
          {item.title}
          {item.description}
          </div>
        })}
      </div>
    </>
  )
}

export default App
