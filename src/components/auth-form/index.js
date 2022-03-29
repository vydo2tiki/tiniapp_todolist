import {
  postLoginAPI,
  postRegisterUserAPI
} from '../../services/index';

Component({
  props: {
    activeLogin: true,
    messega: '',
    isSuccess: false
  },
  methods: {
    handleOnChange(e) {
      this.setData({ activeLogin: e.target.dataset.mode });
    },
    async onLogin(email, password) {
      if (email == '' || password == '') {
        this.setData({ messega: "Điền thông tin đăng nhập" });
      } else {
        try {
          const res = await postLoginAPI({ email, password });
          this.setData({ messega: "" });
          console.log(res);
        } catch (err) {
          this.setData({ messega: "Email hoặc mật khẩu không chính xác" });
        }
      }
    },
    async onRegister(email, password) {
      if (email == '' || password == '') {
        this.setData({ messega: "Điền thông tin đăng nhập" });
      } else {
        try {
          const res = await postRegisterUserAPI({ email, password });
          console.log(res);
          this.setData({ isSuccess: true });
        } catch (err) {
          this.setData({ isSuccess: false });
        }
      }
    }
  }
});