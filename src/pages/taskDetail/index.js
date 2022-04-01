import query from 'query-string';
import {
  getTaskByIdAPI,
  updateTaskByIdAPI,
  deleteTaskByIdAPI,
} from '../../services/index';

import { handleError } from '../../utils/error';

Page({
  data: {
    id: '',
    description: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    completed: null,
    isLoading: true
  },
  async onLoad(options) {
    this.setData({ isLoading: true });
    try {
      this.handleIconsToNavigationBar();

      const parse = query.parse(options);
      const id = options === undefined ? this.data.id : parse.id;

      const task = await getTaskByIdAPI({id});
      const { description, completed, createdAt, updatedAt } = task;

      this.setData({
        id,
        description,
        completed,
        createdAt,
        updatedAt,
      });

      this.setData({ isLoading: false });
    } catch (err) {
      handleError(err.message);
      this.setData({ isLoading: false });
    }
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  async onCustomIconEvent() {
    try {
      my.confirm({
        title: 'Xác nhận xoá task',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
        success: async (result) => {
          if (result.confirm) {
            await deleteTaskByIdAPI({ id: this.data.id });
            my.alert({
              title: 'Xoá thành công',
              success: () => {
                my.navigateBack();
              },
            });
          }
        },
        fail: (e) => {
          my.alert({ title: `${e}` });
        },
      });
    } catch (err) {
      handleError(err);
    }
  },
  handleIconsToNavigationBar() {
    my.addIconsToNavigationBar({
      icons: [
        {
          image: '/assets/icon/trash-icon.jpeg',
          width: 25,
          height: 25,
        },
      ],
      padding: 10,
      success: (res) => {},
      fail: (res) => {},
    });
  },
  async handleInprocess() {
    try {
      await updateTaskByIdAPI({ id: this.data.id, completed: false });
      this.onLoad();
    } catch (err) {
      handleError(err.message);
    }
  },
  async handleCompleted() {
    try {
      await updateTaskByIdAPI({ id: this.data.id, completed: true });
      this.onLoad();
    } catch (err) {
      handleError(err.message);
    }
  },
});
