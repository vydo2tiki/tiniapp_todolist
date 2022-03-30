import {
  navigateToUpdateAccount,
  navigateToTrash,
  navigateToTask,
  navigateToNotFound
} from '../../utils/navigate';

import {
  getLoggedUserAPI,
  getImageAPI,
  postUploadImageAPI,
  postLogoutAPI
} from '../../services/index';

import {
  getStorage,
  removeStorage
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
    isLoading: true,
    avatar: null,
  },
  async onLoad() {
    this.setData({ isLoading: true });
    try {
      const token = await getStorage('token');
      const [
        auth,
        image
      ] =  await Promise.all([
        getLoggedUserAPI(token),
        getImageAPI(token)
      ]);

      this.setData({ 
        user: auth.user, 
        avatar: image
      });

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
  onChooseImage() {
    my.chooseImage({
      success: async (res) => {
        const token = await getStorage('token');
        const img = res.filePaths[0];
        const data = await postUploadImageAPI(token, img);
        if (data.success) {
          try {
            const image = await getImageAPI(token);
          
            my.alert({ title: 'Cập nhật ảnh thành công' });
            this.setData({ avatar: image.url });
          } catch (error) {
            my.alert({ title: 'Cập nhật ảnh thất bại' });
          }
         
        } else {
          my.alert({ title: 'Cập nhật ảnh thất bại' });
        }
      },
      fail: (e) => {
        my.alert({ title: 'Cập nhật ảnh thất bại' });
      }
    });
  },
  async onLogout() {
    const token = await getStorage('token');
    await postLogoutAPI(token);
    await removeStorage('token');
    my.reLaunch({ url: 'pages/auth/index' });
  }
});