import { navigateToTaskDetail } from '../../utils/navigate';

Component({
  props: {
    item: {},
    type: '',
  },
  didMount() {},
  methods: {
    _onNavigateTo(e) {
      navigateToTaskDetail(this.props.item._id);
    },
  },
});
