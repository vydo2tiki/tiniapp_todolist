import queryString from 'query-string';

export const navigateToUpdateAccount = () => {
  my.navigateTo({ url: 'pages/updateAccount/index' });
};

export const navigateToTrash = () => {
  my.navigateTo({ url: 'pages/trash/index' });
};

export const navigateToTask = (status, sort = 'desc') => {
  my.navigateTo({ url: `pages/taskMain/index?completed=${status}&sort=${sort}` });
};

export const navigateToNotFount = () => {
  my.navigateTo({ url: 'pages/notFound/index' });
};