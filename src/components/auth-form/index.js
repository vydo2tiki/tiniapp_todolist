Component({
  props: {
    activeLogin: true
  },
  methods: {
    handleOnChange(e) {
      this.setData({ activeLogin: e.target.dataset.mode });
    },
    onLogin(email, password) {
      console.log(email, password);
      // const res = postLoginAPI({ email, password });
      // console.log(res);
    }
  }
});