import { mockDataTask, mockUpdateTask, mockAddTask } from './mockdata';
import query from 'query-string';
import { fakeRequest } from './request';

// User API -----------------------------
// Khi lấy token từ storage sẽ mất 1 thời gian request => Cần tối ưu hơn.
// Dùng biến token => Vừa vào app thì get từ storeage đưa vào | Khi cập nhật thì cập nhật biến này + biến từ storage

export const postRegisterUserAPI = ({ email, password }) => {
  const success = Math.floor(Math.random() * 3);
  return fakeRequest(1000, false, success, { token: 'tokenfake' });
};

export const postLoginAPI = ({ email, password }) => {
  const success = Math.floor(Math.random() * 2);
  return fakeRequest(1000, false, success, { token: 'tokenfake' });
};

export const postLogoutAPI = () => {
  const success = Math.floor(Math.random() * 2);
  return fakeRequest(1000, false, success);
};

export const postUpdateUserProfileAPI = (data) => {
  const success = Math.floor(Math.random() * 4);
  return fakeRequest(1000, true, success);
};

export const getLoggedUserAPI = () => {
  const success = Math.floor(Math.random() * 4);
  const User = {
    name: 'Nguyễn Văn A',
    email: 'nva@gmail.com',
    age: '20',
    password: '12345678',
  };
  if (!success) throw new Error('Unauthorized');
  return fakeRequest(1000, true, success, {user: {...User}});
};

export const postUploadImageAPI = (data) => {
  const success = Math.floor(Math.random() * 3);
  return fakeRequest(1000, true, success, { success: true });
};

export const getImageAPI = (data) => {
  const success = Math.floor(Math.random() * 4);
  const url = [
    '/assets/images/user-avatar.png', 
    '/assets/images/avatar.png'];
  return fakeRequest(1000, true, success, { url: url[success % 2] });
};

export const deleteImageAPI = (data) => {
  const success = Math.floor(Math.random() * 3);
  return fakeRequest(1000, true, success, { success: true });
};

export const deleteUserAPI = (data) => {
  return fakeRequest(1000, true, true, { success: true });
};

//Task API ----------------------------------

export const postAddTaskAPI = (data) => { 
  return fakeRequest(1000, true, true, {id: 9});
};

export const getAllTaskAPI = (data) => {
  return fakeRequest(1000, true, true, mockDataTask());
};

export const getUrlTaskAPI = async (url) => {
  const parse = query.parse(url);

  let task;
  if (parse.completed !== null) {
    const completed = parse.completed === 'true';
    task = await getTaskbyCompletedAPI({ completed });
  } else task = await getAllTaskAPI();

  if (parse.limit !== null) {
    const skip = parseInt(parse.skip);
    const limit = parseInt(parse.limit);
    task = task.slice(skip, skip + limit);
  }

  return task;
};

export const getTaskByIdAPI = ({ id }) => {
  const tasks = mockDataTask();
  const task = tasks.find((x) => x._id == id);
  return fakeRequest(1000, true, true, task);
};

export const getTaskByPaginationAPI = ({ limit, skip }) => {
  const tasks = mockDataTask();
  const task = tasks.slice(skip, skip + limit);
  return fakeRequest(1000, true, true, task);
};

export const getTaskbyCompletedAPI = ({ completed }) => {
  const tasks = mockDataTask();
  const task = tasks.filter((x) => x.completed == completed);
  return fakeRequest(1000, true, true, task);
};

export const deleteTaskByIdAPI = ({ id }) => {
  const tasks = mockDataTask();
  const task = tasks.filter((x) => x._id != id);
  return fakeRequest(1000, true, true);
};

export const updateTaskByIdAPI = ({ id, completed }) => {
  const tasks = mockDataTask();
  const index = tasks.findIndex((x) => x._id == id);
  tasks[index].completed = completed;
  return fakeRequest(1000, true, true);
};
