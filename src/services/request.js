const BASE_URL = 'https://api-nodejs-todolist.herokuapp.com';

export const request = async ({ path, method = 'GET', headers = {}, data }) => {
  return new Promise((resolve, reject) => {
    // Get token => Đưa nó ào header luôn
    my.request({
      url: `${BASE_URL}/${path}.json`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      method,
      data,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const fakeRequest = (milliseconds, isToken, success, data) => {
  return new Promise((resolve, reject) => {
    const app = getApp();
    const token = app.auth.token;
    if (isToken && !token) {
      reject(new Error('Unauthorized'));
    } else {
      if (!success) {
        reject(new Error('Server Error'));
      } else {
        setTimeout(() => {
          resolve(data);
        }, milliseconds);
      }
    }
  });
};

export default request;
