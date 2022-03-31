Component({
  data: {
    email: '',
    password: '',   
  },
  props: { 
    onLogin: () => {},
    message: ''
  },
  methods: {
    handleLogin() {
      this.props.onLogin(this.data.email, this.data.password);
    },
    handleChangeInput(e) {
      const key = e.target.dataset.name;
      const value = e.detail.value;
      this.setData({ [key]: value });
    }
  }
});