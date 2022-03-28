Component({
  props: {
    item: {},
    type: ''
  },
  didMount() {
    console.log('task', this.props.type);
  },
  methods: {
  }
});