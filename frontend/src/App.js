import {
  useQuery,
} from 'react-query'

import { Button, Grid, Input, Popover, Switch } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import './App.css';
import Todo from './Todo';

const App = () => {
  const initialData = [{id: 0, title: 'Visit David', checked: false}, 
  {id: 1, title: 'Goceries For Dinner', checked: false},
  {id: 2, title: 'Fix Dad’s iPad', checked: true}]

  const [todos, setTodos] = useState([])
  const [anchorEl, setAnchorEl] = useState(null);
  const [newOpen, setNewOpen] = useState(true);

  useEffect(() => {
    setTodos(initialData)
  },[])

  const addToList = inputRef => {
    if (inputRef.current.value === '') {
      return;
    } else {
      let todo = {id: inputRef.current.value, title: inputRef.current.value, checked: false}
      setTodos([ ...todos, todo ]);
      inputRef.current.value = ''
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


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
        <Grid container spacing={2} className='todo'>
          <Grid item md={6} display="flex" justifyContent="center" alignItems="center">
            <div className='test'>Тестовое задание</div>
          </Grid>
          <Grid item md={6} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <div className='todo-container'>
                <div className='todo__header'>
                  <h2>To Do</h2>
                  <div>
                    <Button aria-describedby={id} onClick={handleClick}>
                      <SettingsRoundedIcon/>
                    </Button>
                    <Popover
                      id={id}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'top',
                      }}
                    >
                      <div className='popover'>
                        <div>
                          Visible news
                        </div>
                      <Switch
                        checked={newOpen} 
                        onClick={() => setNewOpen(!newOpen)}
                        checkedIcon={<CheckCircleIcon/>}
                        icon={<CancelIcon/>}
                       />
                      </div>
                    </Popover>
                  </div>
                </div>
                <Input inputRef={inputRef} placeholder="Todo" className='input'/>
                <Button onClick={() => addToList(inputRef)}>Add Todo</Button>
              {todos?.map((todo) => {
                return (
                  <Todo todo={todo} onCheck={onCheck}/>
                )
              })}
              {newOpen && <div>{data.map(el => {
                  return (<div> {el.title} </div>)})}
                </div>}
              </div>
          </Grid>
        </Grid>
  );
}

export default App;
