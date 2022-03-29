import {navigateToTaskDetail} from '../../utils/navigate';

Component({
  props: {
    item: {},
    type: ''
  },
  didMount() {
    console.log('task', this.props.type);
  },
  methods: {
    _onNavigateTo(e) {
      navigateToTaskDetail();
    }
  }
});