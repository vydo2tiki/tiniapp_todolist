import {
  postLoginAPI,
  postRegisterUserAPI
} from '../../services/index';

import {
  setStorage
} from '../../utils/storage';

Component({
  props: {
    activeLogin: true,
    message: '',
    isSuccess: false
  },
  methods: {
    handleOnChange(e) {
      this.setData({ activeLogin: e.target.dataset.mode });
    },
    async onLogin(email, password) {
      const app = getApp();
      if (email == '' || password == '') {
        this.setData({ message: "Điền thông tin đăng nhập" });
      } else {
        try {
          const res = await postLoginAPI({ email, password });
          this.setData({ message: "" });
          const data =  await setStorage("token", res.token);
          my.reLaunch({ url: 'pages/home/index' });
        } catch (err) {
          this.setData({ message: "Email hoặc mật khẩu không chính xác" });
        }
      }
    },
    async onRegister(email, password) {
      if (email == '' || password == '') {
        this.setData({ message: "Điền thông tin đăng nhập" });
      } else {
        try {
          const res = await postRegisterUserAPI({ email, password });
          const data =  await setStorage("token", res.token);
          this.setData({ isSuccess: true });
        } catch (err) {
          this.setData({ isSuccess: false });
        }
      }
    }
  }
});