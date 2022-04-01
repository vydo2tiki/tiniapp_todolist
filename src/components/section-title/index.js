Component({
  props: {
    title: '',
    data: null,
    onNavigate: () => {},
  },

  didMount() {},
  didUpdate() {},
  didUnmount() {},

  methods: {
    _onNavigate() {
      this.props.onNavigate();
    },
  },
});
