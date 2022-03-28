Component({
  props: { 
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