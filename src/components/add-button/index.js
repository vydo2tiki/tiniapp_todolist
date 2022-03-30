import {
  postAddTaskAPI
} from '../../services/index';

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
              await postAddTaskAPI("token", result.inputValue);
            }
          }
        }
      });
    }
  }
});