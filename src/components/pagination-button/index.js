Component({
  props: {
    className: '',
    type: '',
    onTapActionButton: () => {},
  },

  methods: {
    _onTapActionButton() {
      this.props.onTapActionButton();
    },
  },
});
