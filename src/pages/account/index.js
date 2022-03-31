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
  postLogoutAPI,
  deleteImageAPI,
  havingToken
} from '../../services/index';

import {
  getStorage,
  removeStorage
} from '../../utils/storage';

import {
  handleError
} from '../../utils/error';

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
    avatar: null,
    isShow: false
  },
  async loadData() {
    try {
      const [
        auth,
        image
      ] =  await Promise.all([
        getLoggedUserAPI(await havingToken()),
        getImageAPI(await havingToken())
      ]);

      this.setData({ 
        user: auth.user, 
        avatar: image
      });

    } catch (err) {
      handleError(err.messega)
    }
  },
  onReady() {
  },
  onShow() {
    this.loadData();
  },
  onHide() {
  },
  onUnload() {
  },
  _navigateTo(e) {
    const { index } = e.target.dataset;
    this.data.pages[index].func();
  },
  async onDeleteImage() {
    try {
      const mess = await deleteImageAPI(await havingToken());
      if (mess.success) {
        this.setData({ avatar: null });
        this.onHide();
      } else throw new Error("Server Error");
    } catch (err) {
      handleError(err.messega);
      my.alert({
        title: "Xoá thất bại",
        success: () => {
          this.onHide();
        }
      });
    }
  },
  onChooseImage() {
    my.chooseImage({
      success: async (res) => {
        const img = res.filePaths[0];
        try {
          const data = await postUploadImageAPI(await havingToken({ token, img }));
          if (data.success) {
            try {
              const image = await getImageAPI(await havingToken());
            
              my.alert({ title: 'Cập nhật ảnh thành công' });
              this.setData({ avatar: image.url });
            } catch (error) {
              handleError(err.messega);
              my.alert({ title: 'Cập nhật ảnh thất bại' });
            }
           
          } else {
            my.alert({ title: 'Cập nhật ảnh thất bại' });
          } 
        } catch (err) {
          handleError(err.messega);
        }
      },
      fail: (e) => {
        my.alert({ title: 'Cập nhật ảnh thất bại' });
      }
    });
  },
  async onLogout() {
    try {
      await postLogoutAPI(await havingToken());
      await removeStorage('token');
      my.reLaunch({ url: 'pages/auth/index' });
    } catch (err) {
      handleError(err.messega);
    }
  }, 
  onSheetShow() {
    this.setData({ isShow: true });
  },
  onSheetHide() {
    this.setData({ isShow: false });
  }
});