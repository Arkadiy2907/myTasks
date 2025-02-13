export type TMockData = {
  id: number;
  title: string;
  completed: boolean;
};

export type TListItem = {
  children: TMockData;
  deleteTodo: () => void;
  toggleComplete: () => void;
};

export type TAction =
  | {
      type: 'GET_TODO';
    }
  | {
      type: 'ADD_TODO';
      payload: { id: number; title: string; completed: boolean };
    }
  | {
      type: 'UPDATE_TODO';
      payload: { id: number; title: string; completed: boolean };
    }
  | { type: 'DELETE_TODO'; payload: number };
