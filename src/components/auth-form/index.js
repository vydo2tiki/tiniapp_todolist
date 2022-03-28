Component({
  props: {
    activeLogin: true
  },
  methods: {
    handleOnChange(e) {
      this.setData({ activeLogin: e.target.dataset.mode });
    }
  }
});