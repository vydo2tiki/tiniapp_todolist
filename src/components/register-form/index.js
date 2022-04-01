Component({
  data: {
    activeIndex: 0,
    items: [{ title: 'Email' }, { title: 'Thông tin' }, {}],
    email: '',
    name: '',
    age: '',
    password: '',
    confirmPassword: '',
    message: '',
  },
  props: {
    onRegister: () => {},
    isSuccess: false,
  },
  methods: {
    handleRegister(step) {
      const { email, password, confirmPassword, age, name, activeIndex } = this.data;
      if (!password || !confirmPassword || !name || !age) {
        this.setData({ message: 'Điền đầy đủ thông tin' });
        return 0;
      }
      if (password != confirmPassword) {
        this.setData({ message: 'Mật khẩu xác nhận không trùng khớp' });
        return 0;
      }

      this.props.onRegister({
        email,
        password,
        name,
        age,
      });

      this.setData({ activeIndex: activeIndex + 1 });
    },
    handleNextStep() {
      const currentIntex = this.data.activeIndex;
      if (!this.data.email) {
        this.setData({ message: 'Điền đầy đủ thông tin' });
      } else {
        this.setData({ message: '' });
        this.setData({ activeIndex: currentIntex + 1 });
      }
    },
    handlePrevStep() {
      const currentIntex = this.data.activeIndex;
      this.setData({ activeIndex: currentIntex - 1 });
      this.setData({ message: '' });
    },
    handleLogIn() {
      my.reLaunch({ url: 'pages/home/index' });
    },
    handleChangeInput(e) {
      const key = e.target.dataset.name;
      const value = e.detail.value;
      this.setData({ [key]: value });
    },
  },
});
