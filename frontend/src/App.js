import './App.css';

import {
  useQuery,
} from 'react-query'

import { Button, Checkbox, Grid, Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react';


const App = () => {
  const initialData = [{id: 0, title: '15', checked: true}, {id: 2, title: '1222', checked: false}]
  const [todos, setTodos] = useState([])
  useEffect(() => {
    setTodos(initialData)
  },[])

  const addToList = inputRef => {
    if (inputRef.current.value === '') {
      return;
    } else {
      let todo = {id: inputRef.current.value, title: inputRef.current.value, checked: false}
      setTodos([ ...todos, todo ]);
    }
  };

  const onCheck = todo => {
    setTodos(todos.map(el => el.id === todo.id ? {...el, checked:!todo.checked} : el));
  };

  const inputRef = useRef(null);

  const randomNumber = (number) => {
    return Math.floor(Math.random() * number) + 1
  }

  const { isLoading, error, data } = useQuery(
    'repoData',
    () =>
      fetch(
        'https://newsdata.io/api/1/news?apikey=pub_1295468d402aafffe34e8ab15496ad3e5eb9a&q=russia&category=business'
      )
      .then((response) => response.json())
      .then((response)=> response.results)
      .then((res) => {
        const random = randomNumber(res.length)
        return [res[random]]
      })
  );

  if (isLoading) return <p>Загрузка...</p>;

  if (error) return <p>Ошибка: {error.message}</p>;

  return (
        <Grid container spacing={2} className='container'>
          <Grid item md={6} display="flex" justifyContent="center" alignItems="center">
            <div className='test'>Тестовое задание</div>
          </Grid>
          <Grid item md={6} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Input inputRef={inputRef} placeholder="Todo"/>
            <Button onClick={() => addToList(inputRef)}>Add Todo</Button>
          {todos?.map((el) => {
            return (
              <div className='flex' key={el.id}>
                <div className={el.checked ? 'done' : ''}>
                  {el.title}
                </div>
                <Checkbox checked={el.checked} onClick={() => onCheck(el)}/>
              </div>
            )
          })}
          <div>{data.map(el => {
            return (<div> {el.title} </div>)})}
          </div>
        </Grid>
        </Grid>
  );
}

export default App;
