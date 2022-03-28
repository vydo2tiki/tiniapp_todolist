Component({
  data: {
    activeIndex: 0,
    isSuccess: 1,
    message: "",
    items: [
      { title: "Email" },
      { title: "Thông tin" },
      {}
    ],
    email: '',
    name: '',
    age: '',
    password: '',
    confirmPassword: ''
  },
  props: { 

  },

  didMount() {},
  didUpdate() {},
  didUnmount() {},

  methods: {
    handleNextStep() {
      const currentIntex = this.data.activeIndex;
      this.setData({ activeIndex: currentIntex + 1 });
    },
    handlePrevStep() {
      const currentIntex = this.data.activeIndex;
      this.setData({ activeIndex: currentIntex - 1 });
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