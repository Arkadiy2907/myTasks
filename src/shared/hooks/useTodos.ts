import { useReducer, useState } from 'react';
import { mockData } from '../const';
import { addedPause } from '../utils';
import { TMockData, TAction } from '../../types';

const todosReducer = (state: TMockData[], action: TAction) => {
  switch (action.type) {
    case 'GET_TODO':
      return [...state];
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'UPDATE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todosReducer, mockData);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const withLoading = async (callback: () => Promise<void>) => {
    toggleLoading(true);
    try {
      await callback();
    } catch (error) {
      console.error('Произошла ошибка:', error);
    } finally {
      toggleLoading(false);
    }
  };

  const getTodosRequest = async () => {
    await withLoading(async () => {
      await addedPause();
      dispatch({ type: 'GET_TODO' });
    });
  };

  const postTodoRequest = async (newTodo: TMockData) => {
    await withLoading(async () => {
      await addedPause();
      dispatch({ type: 'ADD_TODO', payload: newTodo });
    });
  };

  const putTodoRequest = async (id: number) => {
    await withLoading(async () => {
      await addedPause();
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        dispatch({
          type: 'UPDATE_TODO',
          payload: {
            id,
            title: todoToUpdate.title,
            completed: todoToUpdate.completed,
          },
        });
      }
    });
  };

  const deleteTodoRequest = async (id: number) => {
    await withLoading(async () => {
      await addedPause();
      dispatch({ type: 'DELETE_TODO', payload: id });
    });
  };

  return {
    todos,
    isLoading,
    getTodosRequest,
    postTodoRequest,
    putTodoRequest,
    deleteTodoRequest,
  };
};
