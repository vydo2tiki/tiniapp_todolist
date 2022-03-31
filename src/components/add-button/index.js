import {
  postAddTaskAPI,
  havingToken
} from '../../services/index';

import {handleError} from '../../utils/error';

import {
  navigateToTaskDetail
} from '../../utils/navigate';

Component({
  props: { 
  },
  methods: {
    _onTapActionButton() {
      my.prompt({
        title: 'Tạo task',
        placeholder: 'Nhập mô tả task',
        okButtonText: 'Tạo',
        cancelButtonText: 'Huỷ',
        success: async (result) => {
          if (result.ok) {
            if (!result.inputValue) {
              my.alert({
                title: 'Chưa nhập mô tả'
              });
            } else {
              try {
                const res = await postAddTaskAPI(await havingToken({ description: result.inputValue}));
                navigateToTaskDetail(res.id);
              } catch (err) {
                handleError(err.message);
              }
            }
          }
        }
      });
    }
  }
});