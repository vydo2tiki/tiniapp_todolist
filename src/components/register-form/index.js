Component({
  data: {
    activeIndex: 0,
    items: [
      { title: "Email" },
      { title: "Thông tin" },
      {}
    ],
    email: '',
    name: '',
    age: '',
    password: '',
    confirmPassword: '',
    messega: ''
  },
  props: {
    onRegister: () => {},
    isSuccess: false,
  },
  methods: {
    handleRegister(step) {
      const {email, password, confirmPassword, age, name, activeIndex} = this.data;
      if (!password || !confirmPassword || !name || !age) {
        this.setData({ messega: 'Điền đầy đủ thông tin' })
        return 0;
      }
      if (password != confirmPassword) {
        this.setData({ messega: 'Mật khẩu xác nhận không trùng khớp' })
        return 0;
      }

      this.props.onRegister({
        email, password, name, age
      });

      this.setData({ activeIndex: activeIndex + 1 });
    },
    handleNextStep() {
      const currentIntex = this.data.activeIndex;
      this.setData({ activeIndex: currentIntex + 1 });
      if (!this.data.email) {
        this.setData({ messega: 'Điền đầy đủ thông tin' });
      } else this.setData({ messega: '' });
    },
    handlePrevStep() {
      const currentIntex = this.data.activeIndex;
      this.setData({ activeIndex: currentIntex - 1 });
      this.setData({ messega: '' });
    },
    handleLogIn() {
      console.log("Log in");
    },
    handleChangeInput(e) {
      const key = e.target.dataset.name;
      const value = e.detail.value;
      this.setData({ [key]: value });
    }
  }
});