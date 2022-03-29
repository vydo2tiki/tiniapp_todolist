const BASE_URL =
  'https://api-nodejs-todolist.herokuapp.com';

  export const request = async ({ path, method = 'GET', headers = {}, data }) => {
  return new Promise((resolve, reject) => {
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

export default request;