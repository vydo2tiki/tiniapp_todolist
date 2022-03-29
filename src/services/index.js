import {
  fakeRequest, 
  mockDataTask,
  mockUpdateTask,
  mockAddTask
} from './mockdata';

// User API -----------------------------

export const postRegisterUserAPI = async ({email, password}) => {
  await fakeRequest(1000);
  const success = Math.random() % 2 == 1;
  if (success) return { token: 'tokenfake'};
  else return { message: 'Email đã tồn tại' };
};

export const postLoginAPI = async ({email, password}) => {
  await fakeRequest(1000);
  const success = Math.random() % 2 == 1;
  if (success) return { token: 'tokenfake'};
  else return { message: 'Tài khoản hoặc mật khẩu không chính xác' };
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

export const getAllTaskAPI = (token) => {
  return mockDataTask();
};

export const getTaskByIdAPI = (id) => {
  const tasks = mockDataTask();
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

export const deleteTaskByIdAPI = (id) => {
  const tasks = mockDataTask();
  const task = tasks.filter(x => x._id != id);
  mockUpdateTask(task);
};

export const updateTaskByIdAPI = ({id, completed}) => {
  const tasks = mockDataTask();
  const index = tasks.findIndex(x => x._id == id);
  tasks[index].completed = completed;
  mockUpdateTask(task);
};
