import {
  fakeRequest, 
  mockDataTask,
  mockUpdateTask,
  mockAddTask
} from './mockdata';

import {
  getStorage,
  setStorage,
  removeStorage
} from '../utils/storage'

import query from 'query-string';

// User API -----------------------------
export const havingToken = async (data = {}) => {
  const token = await getStorage('token');
  if (token === undefined) {
    throw new Error("Unauthorized");
  }
  else return {...data, token};
}

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

export const postLogoutAPI = async () => {
  await fakeRequest(3000);
  return { success: true };
};

export const postUpdateUserProfileAPI = async (data) => {
  await fakeRequest(1000);
  const success = Math.floor(Math.random() * 4);
  if (success) return { message : 'Cập nhật thành công'};
  else return { message : 'Cập nhật thất bại'};
};

export const getLoggedUserAPI = async (data) => {
  await fakeRequest(1000);
  const success = Math.floor(Math.random() * 4);
  const User = {
    name: "Nguyễn Văn A",
    email: "nva@gmail.com",
    age: "20",
    password: "12345678"
  };
  if (success) return { user: User };
  throw new Error("Unauthorized");
};

export const postUploadImageAPI = async (data) => {
  await fakeRequest(3000);
  const success = Math.floor(Math.random() * 3);
  if (success) return { success: true };
  throw new Error("Server Error");
};

export const getImageAPI = async (data) => {
  await fakeRequest(3000);
  const success = Math.floor(Math.random() * 2);
  const url = [
    "../../assets/images/user-avatar.png",
    "../../assets/images/avatar.png"
  ];
  if (success) return { url: url[success] };
  throw new Error("Server Error");
};

export const deleteImageAPI = async (data) => {
  await fakeRequest(3000);
  const success = Math.floor(Math.random() * 3);
  if (success) return { success: true };
  throw new Error("Server Error");
};

export const deleteUserAPI = async (data) => {
  await fakeRequest(3000);
  return { success: true };
};

//Task API ----------------------------------

export const postAddTaskAPI = async (data) => {
  const tasks = await mockDataTask();
  const len = tasks.length;
  const id = tasks[len-1]._id + 1;
  mockAddTask({ _id: id, description: data });
};

export const getAllTaskAPI = async (data) => {
  return await mockDataTask();
};

export const getUrlTaskAPI = async (url) => {
  const parse = query.parse(url);

  let task;
  if (parse.completed !== null) {
    const completed = (parse.completed === "true");
    task = await getTaskbyCompletedAPI(await havingToken({completed}));
  } else task = await getAllTaskAPI(await havingToken());

  if (parse.limit !== null) {
    const skip = parseInt(parse.skip);
    const limit = parseInt(parse.limit);
    task = task.slice(skip, skip + limit);
  }

  return task;
};

export const getTaskByIdAPI = async ({id}) => {
  const tasks = await mockDataTask();
  const task = tasks.find(x => x._id == id);
  return task;
};

export const getTaskByPaginationAPI = async ({limit, skip}) => {
  const tasks = await mockDataTask();
  const task = tasks.slice(skip, skip + limit);
  return task;
};

export const getTaskbyCompletedAPI= async ({completed}) => {
  const tasks = await mockDataTask();
  const task = tasks.filter(x => x.completed == completed);
  return task;
};

export const deleteTaskByIdAPI = async ({id}) => {
  const tasks = await mockDataTask();
  const task = tasks.filter(x => x._id != id);
  await mockUpdateTask(task);
};

export const updateTaskByIdAPI = async ({id, completed}) => {
  const tasks = await mockDataTask();
  const index = tasks.findIndex(x => x._id == id);
  tasks[index].completed = completed;
};
