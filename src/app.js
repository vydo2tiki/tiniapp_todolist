import EventEmitter from './utils/event';
import {
  getLoggedUserAPI
} from './services/index';

import {
  getStorage
} from './utils/storage';

App({
  authEvent: new EventEmitter(),
  auth: {
    isLogin: false,
    name: "",
    email: "",
    age: "",
    password: "",
  },
  task: [],
  async loadUser() {
    this.auth.isLogin = false;
    const token = await getStorage('token');
    console.log(token);
    try {
      if (token) {
        const auth = await getLoggedUserAPI(token);
        this.auth = { isLogin: true ,...auth.user};
      } else {
        my.reLaunch({ url: 'pages/auth/index' });
      }
    } catch (err) {
      my.reLaunch({ url: 'pages/auth/index' });
    }
  },
  onShow(options) {
    this.loadUser();
  }
});