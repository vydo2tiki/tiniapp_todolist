import {navigateToTaskDetail} from '../../utils/navigate';

Component({
  props: {
    task: [],
  },
  methods: {
    onChange(e) {
      console.log('onChange: ', e);
    },
    onNavigate(e) {
      navigateToTaskDetail(e.target.dataset.id);
    }
  }
});