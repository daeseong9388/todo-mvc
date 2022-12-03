import { useState } from 'react';
import { TodoList, FilterType } from '../core/todoList';
import { TodoItem } from './TodoItem';

export function Todos() {
  const [todos, setTodos] = useState<TodoList>(new TodoList([]));
  const [type, setType] = useState<FilterType>('ALL');
  const [value, setValue] = useState<string>('');

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };

  const filteredTodos = todos.filter(type);

  return (
    <section className='todoapp' data-state={type}>
      <header className='header'>
        <h1>todos</h1>
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          autoFocus
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setTodos(todos.add(value));
              setValue('');
            }
          }}
          onChange={handleOnChange}
          value={value}
        />
      </header>
      <section className='main'>
        <input
          id='toggle-all'
          className='toggle-all'
          type='checkbox'
          checked={todos.isAllCompleted}
          onChange={() =>
            todos.isAllCompleted
              ? setTodos(todos.markAllReady())
              : setTodos(todos.markAllDone())
          }
        />
        <label htmlFor='toggle-all' />
        <ul className='todo-list'>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              type={type}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
        </ul>
      </section>
      {!!todos.length && (
        <footer className='footer'>
          <span className='todo-count'>
            <strong>{todos.numReadyTodos}</strong> item
            {todos.numReadyTodos === 1 ? '' : 's'} left
          </span>
          <ul className='filters'>
            <li>
              <button
                className={type === 'ALL' ? 'selected' : ''}
                onClick={() => setType('ALL')}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={type === 'READY' ? 'selected' : ''}
                onClick={() => setType('READY')}
              >
                Active
              </button>
            </li>
            <li>
              <button
                className={type === 'DONE' ? 'selected' : ''}
                onClick={() => setType('DONE')}
              >
                Completed
              </button>
            </li>
          </ul>
          {todos.numReadyTodos < todos.length && (
            <button
              className='clear-completed'
              onClick={() => setTodos(todos.clearDone())}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
}
