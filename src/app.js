import EventEmitter from './utils/event';

App({
  authEvent: new EventEmitter(),
  taskEvent: new EventEmitter(),
  auth: {
    isLogin: true,
    token: 'tokenfake'
  },
  task: [],
  onLaunch(options) {
  
  },
  onShow(options) {
    const isLogin = this.isAuthorization();
    if (!isLogin) {
      my.reLaunch({ url: 'pages/auth/index' });
    } 
  },
  async fetchData() {

  },
  isAuthorization() {
    return this.auth.isLogin;
  }
});