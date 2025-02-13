import { FC } from 'react';
import { TListItem } from '../types';

export const ListItem: FC<TListItem> = ({
  children,
  deleteTodo,
  toggleComplete,
}) => {
  return (
    <li className="listItem">
      <input
        type="checkbox"
        checked={children.completed}
        onChange={toggleComplete}
      />
      <p className={children.completed ? 'completed' : ''}>{children.title}</p>
      <button className={'button'} onClick={deleteTodo}>
        Удалить
      </button>
    </li>
  );
};
