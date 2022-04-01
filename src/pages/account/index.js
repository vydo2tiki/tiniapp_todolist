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
    // Không nên đặt function này vào trong => Cứ listing bên ngoài txml
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
      // Token có thể add trực tiếp vào header luôn
      const [
        auth,
        image
      ] =  await Promise.all([
        getLoggedUserAPI(await havingToken()),
        getImageAPI(await havingToken())
      ]);

      this.setData({ 
        user: auth.user, 
        avatar: image.url
      });

    } catch (err) {
      handleError(err.message)
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
    my.confirm({
      title: 'Xác nhận xoá ảnh đại diện',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
      success: async (result) => {
        if (result.confirm) {
          try {
            const mess = await deleteImageAPI(await havingToken());
            if (mess.success) {
              this.setData({ avatar: null });
              my.alert({
                title: "Đã xoá",
                success: () => {
                  this.onHide();
                }
              });
            } else throw new Error("Server Error");
          } catch (err) {
            handleError(err.message);
            my.alert({
              title: "Xoá thất bại",
              success: () => {
                this.onHide();
              }
            });
          }
        }
      },
    })
  },
  onChooseImage() {
    my.chooseImage({
      success: async (res) => {
        const img = res.filePaths[0];
        try {
          const data = await postUploadImageAPI(await havingToken({ image: img }));
          if (data.success) {
            try {
              const image = await getImageAPI(await havingToken());
              console.log(image);
              my.alert({ title: 'Cập nhật ảnh thành công' });
              this.setData({ avatar: image.url });
            } catch (err) {
              console.log(err);
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
      }
    });
  },
  async onLogout() {
    try {
      await postLogoutAPI(await havingToken());
      await removeStorage('token');
      my.reLaunch({ url: 'pages/auth/index' });
    } catch (err) {
      handleError(err.message);
    }
  }, 
  onSheetShow() {
    this.setData({ isShow: true });
  },
  onSheetHide() {
    this.setData({ isShow: false });
  }
});