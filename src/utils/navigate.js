import queryString from 'query-string';

export const navigateToUpdateAccount = () => {
  my.navigateTo({ url: 'pages/updateAccount/index' });
};

export const navigateToTrash = () => {
  my.navigateTo({ url: 'pages/trash/index' });
};

export const navigateToTask = (completed = '', limit = 10, skip = 0) => {
  my.navigateTo({ url: `pages/taskMain/index?completed=${completed}&limit=${limit}&skip=${skip}` });
};

export const navigateToNotFound = () => {
  my.navigateTo({ url: 'pages/notFound/index' });
};

export const navigateToTaskDetail = (task_id) => {
  my.navigateTo({ url: `pages/taskDetail/index?id=${task_id}` });
};

export const navigateToAuth = () => {
  my.navigateTo({ url: 'pages/auth/index' })
};