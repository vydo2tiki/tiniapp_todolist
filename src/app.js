import EventEmitter from './utils/event';
import { getLoggedUserAPI } from './services/index';
import { getStorage } from './utils/storage';
import { handleError } from './utils/error';

App({
  authEvent: new EventEmitter(),
  auth: {
    token: '',
    name: '',
    email: '',
    age: '',
    password: '',
  },
  task: [],
  async loadUser() {
    if (!this.auth.token) {
      this.auth.token = await getStorage('token');
    }
    try {
      const auth = await getLoggedUserAPI();
      this.auth = { token, ...auth.user };
    } catch (err) {
      handleError(err.message);
    }
  },
  onShow(options) {
    this.loadUser();
  },
});
