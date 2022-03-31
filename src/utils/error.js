export const handleError = (err) => {
  switch (err) {
    case "Unauthorized": {
      my.reLaunch({ url: 'pages/auth/index' });
      break;
    }
    default: {
      break;
    }
  }
}