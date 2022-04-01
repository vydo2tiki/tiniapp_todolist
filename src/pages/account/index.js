import {
  navigateToUpdateAccount,
  navigateToTrash,
  navigateToTask,
  navigateToNotFound,
} from '../../utils/navigate';

import {
  getLoggedUserAPI,
  getImageAPI,
  postUploadImageAPI,
  postLogoutAPI,
  deleteImageAPI
} from '../../services/index';

import { getStorage, removeStorage } from '../../utils/storage';

import { handleError } from '../../utils/error';

Page({
  data: {
    // Không nên đặt function này vào trong => Cứ listing bên ngoài txml
    pages: [
      {
        icon: '/assets/icon/update-account.png',
        title: 'Cập nhật tài khoản',
        key: 0,
      },
      {
        icon: '/assets/icon/task.png',
        title: 'Task của tôi',
        key: 1,
      },
      {
        icon: '/assets/icon/trash.png',
        title: 'Thùng rác',
        key: 2,
      },
      {
        icon: '/assets/icon/setting.png',
        title: 'Cài đặt',
        key: 3,
      },
    ],
    user: null,
    avatar: null,
    isShow: false,
    isLoading: true
  },
  async loadData() {
    this.setData({ isLoading: true });
    try {
      // Token có thể add trực tiếp vào header luôn
      const [auth, image] = await Promise.all([
        getLoggedUserAPI(),
        getImageAPI(),
      ]);

      this.setData({
        user: auth.user,
        avatar: image.url,
      });

      this.setData({ isLoading: false });
    } catch (err) {
      handleError(err.message);
      this.setData({ isLoading: false });
    }
  },
  onReady() {},
  onShow() {
    this.loadData();
  },
  onHide() {},
  onUnload() {},
  _navigateTo(e) {
    const { index } = e.target.dataset;
    switch (index) {
      case 0: {
        navigateToUpdateAccount();
        break;
      }
      case 1: {
        navigateToTask();
        break;
      }
      case 2: {
        navigateToTrash();
        break;
      }
      default: {
        navigateToNotFound();
        break;
      } 
    }
  },
  async onDeleteImage() {
    my.confirm({
      title: 'Xác nhận xoá ảnh đại diện',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
      success: async (result) => {
        if (result.confirm) {
          try {
            const mess = await deleteImageAPI();
            if (mess.success) {
              this.setData({ avatar: null });
              my.alert({
                title: 'Đã xoá',
                success: () => {
                  this.onHide();
                },
              });
            } else throw new Error('Server Error');
          } catch (err) {
            handleError(err.message);
            my.alert({
              title: 'Xoá thất bại',
              success: () => {
                this.onHide();
              },
            });
          }
        }
      },
    });
  },
  onChooseImage() {
    my.chooseImage({
      success: async (res) => {
        const img = res.filePaths[0];
        try {
          const data = await postUploadImageAPI({ image: img });
          if (data.success) {
            try {
              const image = await getImageAPI();
              my.alert({ title: 'Cập nhật ảnh thành công' });
              this.setData({ avatar: image.url });
            } catch (err) {
              handleError(err.message);
              my.alert({ title: 'Cập nhật ảnh thất bại' });
            }
          } else {
            my.alert({ title: 'Cập nhật ảnh thất bại' });
          }
        } catch (err) {
          handleError(err.message);
          my.alert({ title: 'Cập nhật ảnh thất bại' });
        }
      },
      fail: (e) => {
        my.alert({ title: 'Cập nhật ảnh thất bại' });
      },
    });
  },
  async onLogout() {
    this.setData({ isLoading: true });
    try {
      await postLogoutAPI();
      await removeStorage('token');
      my.reLaunch({ url: 'pages/auth/index' });
      this.setData({ isLoading: false });
    } catch (err) {
      handleError(err.message);
      this.setData({ isLoading: false });
    }
  },
  onSheetShow() {
    this.setData({ isShow: true });
  },
  onSheetHide() {
    this.setData({ isShow: false });
  },
});
