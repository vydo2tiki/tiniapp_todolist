import queryString from 'query-string';

export const navigateToUpdateAccount = () => {
  my.navigateTo({ url: 'pages/updateAccount/index' });
};

export const navigateToTrash = () => {
  my.navigateTo({ url: 'pages/trash/index' });
};

export const navigateToTask = (search, status, sort = 'desc') => {
  my.navigateTo({ url: `pages/taskMain/index?completed=${status}&sort=${sort}&search=${search}` });
};

export const navigateToNotFound = () => {
  my.navigateTo({ url: 'pages/notFound/index' });
};

export const navigateToTaskDetail = (task_id) => {
  my.navigateTo({ url: 'pages/taskDetail/index' });
};

export const navigateToAuth = () => {
  my.navigateTo({ url: 'pages/auth/index' })
};