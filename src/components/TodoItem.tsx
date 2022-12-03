import { useState, useEffect, useRef } from 'react';
import { PlainTodo } from '../core/todo';
import { FilterType, TodoList } from '../core/todoList';

export const TodoItem = ({
  todo,
  type,
  todos,
  setTodos,
}: {
  todo: PlainTodo;
  type: FilterType;
  todos: TodoList;
  setTodos: React.Dispatch<React.SetStateAction<TodoList>>;
}) => {
  const completed =
    (todo.done && type === 'READY') || (!todo.done && type === 'DONE');

  const handleToggle = () => setTodos(todos.toggleDone(todo.id));
  const handleDestroy = () => setTodos(todos.delete(todo.id));
  const handleChange = (event: any) =>
    setTodos(todos.edit(todo.id, event.target.value));

  const [editing, setEditing] = useState(false);

  const handleEditEnd = () => {
    setEditing(false);
    setTodos(todos.edit(todo.id, todo.label.trim()));
  };

  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDocumentClick = ({ target }: MouseEvent) => {
    console.log(target);
    if (target === null) {
      return;
    }

    if (labelRef?.current?.contains(target as Node) || inputRef?.current?.contains(target as Node) ) {
      return;
    }

    handleEditEnd();
  };


  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  return (
    <li
      className={`${editing ? 'editing' : ''} ${completed ? 'completed' : ''}`}
      data-todo-state={completed ? 'completed' : 'active'}
      key={todo.id}
      onClick={() => setEditing(true)}
    >
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          onChange={handleToggle}
          checked={todo.done}
        />
        <label ref={labelRef}>{todo.label}</label>{' '}
        <button className='destroy' onClick={handleDestroy} />
      </div>
      <input
        className='edit'
        value={todo.label}
        onBlur={handleEditEnd}
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleEditEnd();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleEditEnd();
          }
        }}
        ref={inputRef}
      />
    </li>
  );
};
