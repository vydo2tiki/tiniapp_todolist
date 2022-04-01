import {tasks} from '../utils/constants';

// Này không phải promise
export const fakeRequest = (milliseconds) => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

export const mockDataTask = async () => {
  await fakeRequest(2000);
  return tasks;
}

export const mockUpdateTask = async (data) => {
  await fakeRequest(5000);
}

export const mockAddTask = async (data) => {
  await fakeRequest(5000);
}