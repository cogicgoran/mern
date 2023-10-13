import { useEffect, useRef, useState } from 'react'
import './App.css'
import Todo from './components/Todo';
import { ITodo } from './types';
import axios from 'axios';



function App() {
  const [todos, setTodos] = useState<Array<ITodo>>([]);

  const newMessageRef = useRef<HTMLTextAreaElement>(null);

  async function addNewTodo() {
    // TODO: validate message
    const message = newMessageRef.current!.value!;

    const todo = await axios.post('/api', { message }) as ITodo;
    setTodos((prev) => {
      return [todo, ...prev]
    })
    // TODO: handle error
  }

  useEffect(() => {
    async function get() {
      const res = await axios.get('/api');
      const todos = res.data as Array<ITodo>;
      setTodos(todos);
    }
    get();
  }, [])

  return (
    <>
      <div>
        <div>
          <textarea ref={newMessageRef} />
          <button onClick={addNewTodo}>Add</button>
        </div>
        <div>
          list of todos
          {
            todos.map((todo) => {
              return <Todo {...todo} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
