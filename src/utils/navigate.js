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

export const navigateToNotFount = () => {
  my.navigateTo({ url: 'pages/notFound/index' });
};