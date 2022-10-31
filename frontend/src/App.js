import './App.css';

import {
  useQuery,
  useQueryClient,
} from 'react-query'

import { Grid, Switch } from '@mui/material';
import { useState } from 'react';


const App = () => {
  const data = [{id: 0, title: '15', checked: true}, {id: 2, title: '1222', checked: false}]
  const [todos, setTodos] = useState(data)
  return (
        <Grid container spacing={2} className='container'>
          <Grid md={6} display="flex" justifyContent="center" alignItems="center">
            <div className='test'>Тестовое задание</div>
          </Grid>
          <Grid  md={6} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          {todos.map((el) => {
            return (
              <div className='flex' key={el.id}>
                <div >
                  {el.title}
                </div>
                <Switch checked={el.checked} onChange={(el) => console.log(el.target.checked)}/>
              </div>
            )
          })}
        </Grid>
        </Grid>
  );
}


function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery('todos', "getTodos")



  return (
    <div>
      <ul>
        {query.data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;
