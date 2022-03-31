import query from 'query-string';
import {
  havingToken,
  getTaskByIdAPI,
  updateTaskByIdAPI,
  deleteTaskByIdAPI,
} from '../../services/index';

import {
  handleError
} from '../../utils/error';

Page({
  data: {
    id: '',
    description: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    completed: null
  },
  async onLoad(options) {
    try {
      this.handleIconsToNavigationBar();

      const parse = query.parse(options);
      const id = options === undefined ? this.data.id : parse.id;
      
      const task = await getTaskByIdAPI(await havingToken({ id } ));
      const { description, completed, createdAt, updatedAt } = task;
  
      this.setData({
        id,
        description,
        completed,
        status: completed ? 'Đã hoàn thành' : 'Đang tiến hành',
        createdAt,
        updatedAt
      });
    } catch (err) {
      handleError(err.message);
    }
  
  },
  onReady() {
  },
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  },
  async onCustomIconEvent() {
    try {
      my.confirm({
        title: 'Xác nhận xoá task',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
        success: async (result) => {
          if (result.confirm) {
            await deleteTaskByIdAPI(await havingToken({ id: this.data.id}));
            my.alert({ 
              title: 'Xoá thành công',
              success: () => {
                my.navigateBack();
              }
            });
          }
        },
        fail: (e) => {
          my.alert({ title: `${e}` });
        }
      });
    } catch (err) {
      handleError(err);
    }
  },
  handleIconsToNavigationBar() {
    my.addIconsToNavigationBar({
      icons: [
        {
          image: '../../assets/icon/trash-icon.jpeg',
          width: 25,
          height: 25
        }
      ],
      padding: 10,
      success: (res) => {},
      fail: (res) => {}
    });
  },
  async handleInprocess() {
    try {
      await updateTaskByIdAPI(await havingToken({ id: this.data.id, completed: false }));
      this.onLoad();
    } catch (err) {
      handleError(err.messega);
    }
  },
  async handleCompleted() {
    try {
      await updateTaskByIdAPI(await havingToken({ id: this.data.id, completed: true }));
      this.onLoad();
    } catch (err) {
      handleError(err.messega);
    }
  }
});