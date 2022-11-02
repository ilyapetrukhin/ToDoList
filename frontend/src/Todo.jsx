import { Checkbox } from '@mui/material';
import { useCallback } from 'react';
import { memo } from 'react';


const Todo = ({todo, onCheck}) => {
    const check = useCallback(
      () => {
        onCheck(todo)
      },
      [onCheck, todo],
    )
    
    return (
        <div className='flex' key={todo.id}>
          <div className={todo.checked ? 'done' : ''}>
            {todo.title}
          </div>
          <div>
            <Checkbox checked={todo.checked} onClick={() => check(todo)}/>
          </div>
        </div>
      )
}
export default memo(Todo);
