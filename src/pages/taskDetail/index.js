import query from 'query-string';
import {
  getTaskByIdAPI,
  updateTaskByIdAPI,
  deleteTaskByIdAPI,
} from '../../services/index';

import {
  navigateToTask
} from '../../utils/navigate';

import {
  getStorage
} from '../../utils/storage';

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
      const token = await getStorage('token');
      this.handleIconsToNavigationBar();

      const parse = query.parse(options);
      const id = options === undefined ? this.data.id : parse.id;
      
      const task = await getTaskByIdAPI(token, id);
      const { description, completed, createdAt, updatedAt } = task;
  
      this.setData({
        id,
        description,
        completed,
        status: completed ? 'Đã hoàn thành' : 'Đang tiến hành',
        createdAt,
        updatedAt,
        isLoading: false
      });
    } catch (err) {
      const app = getApp();
      app.loadUser();
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
      const token = await getStorage('token');
      my.confirm({
        title: 'Xác nhận xoá task',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ',
        success: async (result) => {
          if (result.confirm) {
            await deleteTaskByIdAPI(token, this.data.id);
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
      const app = getApp();
      app.loadUser();   
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
    this.setData({ isLoading: true });
    try {
      const token = await getStorage('token');
      await updateTaskByIdAPI(token, this.data.id, false);
      this.onLoad();
    } catch (err) {
      const app = getApp();
      app.loadUser(); 
    }
  },
  async handleCompleted() {
    this.setData({ isLoading: true });
    try {
      const token = await getStorage('token');
      await updateTaskByIdAPI(token, this.data.id, true);
      this.onLoad();
    } catch (err) {
      const app = getApp();
      app.loadUser(); 
    }
  }
});