Component({
  props: { 
    title: '',
    onNavigate: () => {}
  },

  didMount() {},
  didUpdate() {},
  didUnmount() {},

  methods: {
    _onNavigate(e) {
      console.log("alo");
      this.props.onNavigate(e);
    }
  }
});