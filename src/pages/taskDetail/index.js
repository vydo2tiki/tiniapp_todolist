import query from 'query-string';
import {
  getTaskByIdAPI,
  updateTaskByIdAPI,
  deleteTaskByIdAPI
} from '../../services/index';

import {
  navigateToTask
} from '../../utils/navigate';

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
    this.handleIconsToNavigationBar();
    const parse = query.parse(options);
    const id = options === undefined ? this.data.id : parse.id;
    const task = await getTaskByIdAPI("token", id);
    const { description, completed, createdAt, updatedAt } = task;

    this.setData({
      id,
      description,
      completed,
      status: completed ? 'Đã hoàn thành' : 'Đang tiến hành',
      createdAt,
      updatedAt,
    });
  },
  onReady() {
  },
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  },
  onCustomIconEvent() {
    my.confirm({
      title: 'Xác nhận xoá task',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
      success: async (result) => {
        if (result.confirm) {
          await deleteTaskByIdAPI("token", this.data.id);
          my.alert({ 
            title: 'Xoá thành công',
            success: () => {
              navigateToTask();
            }
          });
        }
      },
      fail: (e) => {
        my.alert({ title: `${e}` });
      }
    });
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
      success: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },
  async handleInprocess() {
    await updateTaskByIdAPI("token", this.data.id, false);
    this.onLoad();
  },
  async handleCompleted() {
    await updateTaskByIdAPI("token", this.data.id, true);
    this.onLoad();
  }
});