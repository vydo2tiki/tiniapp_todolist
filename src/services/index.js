import {
  fakeRequest, 
  mockDataTask,
  mockUpdateTask,
  mockAddTask
} from './mockdata';

import query from 'query-string';

// User API -----------------------------

export const postRegisterUserAPI = async ({email, password}) => {
  await fakeRequest(1000);
  const success = Math.floor(Math.random() * 2);
  if (success) return { token: 'tokenfake'};
  throw new Error("Exists Users"); 
};

export const postLoginAPI = async ({email, password}) => {
  await fakeRequest(1000);
  const success = Math.floor(Math.random() * 2);
  if (success) return { token: 'tokenfake'};
  throw new Error("Isvalid User");
};

export const postLogoutAPI = async (token) => {
  await fakeRequest(1000);
};

export const getLoggedUserAPI = async (token) => {
  await fakeRequest(1000);
  if (token === 'tokenfake') return { name: "Nguyễn Văn A"}
};

export const postUploadImageAPI = (data) => {
  
};

export const getImageAPI = (data) => {
  
};

export const deleteImageAPI = (data) => {
  
};

export const deleteUserAPI = (data) => {
  
};

//Task API ----------------------------------

export const postAddTaskAPI = (token, data) => {
  const tasks = mockDataTask();
  const len = tasks.lenght;
  const id = tasks[len-1]._id + 1;
  mockAddTask({ _id: id, ...data});
};

export const getAllTaskAPI = async (token) => {
  return await mockDataTask();
};

export const getUrlTaskAPI = async (token, url, page) => {
  const parse = query.parse(url);
  
  let task;
  if (parse.completed !== '') {
    const completed = (parse.completed === "true");
    task = await getTaskbyCompletedAPI(token, completed);
  } else task = await getAllTaskAPI(token);

  if (parse.limit !== '') {
    const skip = parseInt(parse.skip);
    const limit = parseInt(parse.limit);
    task.slice(skip, skip + limit * page);
  }

  return task;
};

export const getTaskByIdAPI = async (token, id) => {
  const tasks = await mockDataTask();
  console.log(id);
  const task = tasks.find(x => x._id == id);
  return task;
};

export const getTaskByPaginationAPI = async (token, limit, skip) => {
  const tasks = await mockDataTask();
  const task = tasks.slice(skip, skip + limit);
  return task;
};

export const getTaskbyCompletedAPI= async (token, completed) => {
  const tasks = await mockDataTask();
  const task = tasks.filter(x => x.completed == completed);
  return task;
};

export const deleteTaskByIdAPI = async (token, id) => {
  const tasks = await mockDataTask();
  const task = tasks.filter(x => x._id != id);
  await mockUpdateTask(task);
};

export const updateTaskByIdAPI = async (token, id, completed) => {
  const tasks = await mockDataTask();
  const index = tasks.findIndex(x => x._id == id);
  tasks[index].completed = completed;
};
