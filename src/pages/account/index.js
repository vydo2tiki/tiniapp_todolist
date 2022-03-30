import {
  navigateToUpdateAccount,
  navigateToTrash,
  navigateToTask,
  navigateToNotFound
} from '../../utils/navigate';

import {
  getLoggedUserAPI
} from '../../services/index';

import {
  getStorage
} from '../../utils/storage';

Page({
  data: {
    pages: [
      { 
        icon: "../../assets/icon/update-account.png",
        title: "Cập nhật tài khoản",
        func: navigateToUpdateAccount,
      },
      { 
        icon: "../../assets/icon/task.png",
        title: "Task của tôi",
        func: navigateToTask,
      },
      { 
        icon: "../../assets/icon/trash.png",
        title: "Thùng rác",
        func: navigateToTrash,
      },
      { 
        icon: "../../assets/icon/setting.png",
        title: "Cài đặt",
        func: navigateToNotFound,
      }
    ],
    user: null,
    isLoading: true
  },
  async onLoad() {
    this.setData({ isLoading: true });
    try {
      const token = await getStorage('token');
      const auth = await getLoggedUserAPI(token);
      this.setData({ user: auth.user });
    } catch (err) {
      const app = getApp();
      app.loadUser();
    }
  },
  onReady() {
  },
  onShow() {
    this.onLoad();
  },
  onHide() {
  },
  onUnload() {
  },
  _navigateTo(e) {
    const { index } = e.target.dataset;
    this.data.pages[index].func();
  },

});