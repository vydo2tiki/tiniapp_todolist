Component({
  props: { 
    title: "",
    className: "",
    onTapActionButton: () => {}
  },

  didMount() {},
  didUpdate() {},
  didUnmount() {},

  methods: {
    _onTapActionButton() {
      this.props.onTapActionButton();
    }
  }
});