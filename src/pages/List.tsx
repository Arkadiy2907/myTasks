import { FC, useState } from 'react';
import { useTodos } from '../shared';
import { ListItem } from './ListItem';
import './list.css';

export const List: FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [isGetTodos, setIsGetTodos] = useState(false);

  const {
    todos,
    isLoading,
    getTodosRequest,
    postTodoRequest,
    putTodoRequest,
    deleteTodoRequest,
  } = useTodos();

  const handleGetTodos = async () => {
    setIsGetTodos((prev) => !prev);
    if (!isGetTodos) {
      await getTodosRequest();
    }
  };

  const handleDelete = (id: number) => {
    deleteTodoRequest(id);
  };

  const handleAddTodo = () => {
    if (newTitle.trim()) {
      postTodoRequest({
        id: Math.random() * 10000,
        title: newTitle,
        completed: false,
      });
      setNewTitle('');
    }
  };

  const handleToggleComplete = (id: number) => {
    putTodoRequest(id);
  };

  return (
    <div className="container">
      {isLoading ? <p className={'loading'}>Загрузка...</p> : <p> &emsp;</p>}
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Введите задачу"
        className="input"
        maxLength={20}
      />
      <div className="wrap_button">
        <button className={'button'} onClick={handleAddTodo}>
          Добавить задачу
        </button>
        <button className={'button'} onClick={handleGetTodos}>
          {!isGetTodos ? 'Показать все задачи' : 'Скрыть все задачи'}
        </button>
      </div>
      {isGetTodos && (
        <ul className="list">
          {todos.map((el) => (
            <ListItem
              key={el.id}
              children={el}
              deleteTodo={() => handleDelete(el.id)}
              toggleComplete={() => handleToggleComplete(el.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
