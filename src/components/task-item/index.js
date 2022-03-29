import {navigateToTaskDetail} from '../../utils/navigate';

Component({
  props: {
    item: {},
    type: ''
  },
  didMount() {
  },
  methods: {
    _onNavigateTo(e) {
      navigateToTaskDetail();
    }
  }
});