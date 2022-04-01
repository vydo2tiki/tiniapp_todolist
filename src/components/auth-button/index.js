Component({
  props: {
    title: '',
    className: '',
    onTapActionButton: () => {},
  },
  methods: {
    _onTapActionButton() {
      this.props.onTapActionButton();
    },
  },
});
