import { tasks } from '../utils/constants';

export const mockDataTask = () => {
  return tasks;
};

export const mockUpdateTask = (data) => {};

export const mockAddTask = (data) => {
  tasks.push(data);
  return tasks;
};
