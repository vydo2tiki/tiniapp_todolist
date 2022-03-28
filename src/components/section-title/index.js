Component({
  props: { 
    title: ''
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