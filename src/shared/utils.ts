import { DELAY } from './const';

export const addedPause = () => {
  return new Promise((resolve) => setTimeout(resolve, DELAY));
};
