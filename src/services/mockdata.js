import {tasks} from '../utils/constants';

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

export const mockUpdateTask = (data) => {
  // let rawdata = JSON.stringify(data);
  // fs.writeFileSync('./mock/task.json', rawdata);
}

export const mockAddTask = (data) => {
  // let rawdata = JSON.stringify(data);
  // fs.appendFileSync('./mock/task.json', rawdata);
}