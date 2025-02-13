import { FC } from 'react';
import ErrorBoundary from './shared/ErrorBoundary';
import { List } from './pages';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <List />
    </ErrorBoundary>
  );
};

export default App;
