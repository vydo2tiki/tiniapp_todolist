import EventEmitter from './utils/event';
import {
  getLoggedUserAPI,
  havingToken
} from './services/index';

import {
  handleError
} from './utils/error';

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
    try {
      const auth = await getLoggedUserAPI(havingToken());
      this.auth = { isLogin: true ,...auth.user};
    } catch (err) {
      handleError(err.message);
    }
  },
  onShow(options) {
    this.loadUser();
  }
});