import {
  getLoggedUserAPI,
  postUpdateUserProfileAPI,
  deleteUserAPI
} from '../../services/index';

import {
  getStorage,
  removeStorage
} from '../../utils/storage';

Page({
  data: {
    isEdit: false,
    editPassword: false,
    editValue: {},
    user: null,
    messega: ''
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
  },
  onHide() {
  },
  onUnload() {
  },
  handleDeleteAccount() {
    my.confirm({
      title: 'Bạn muốn xoá tài khoản',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
      success: async (result) => {
        const token = await getStorage('token');
        if (result.confirm) {
          try {
            await deleteUserAPI(token);
            await removeStorage('token');
            my.alert({ 
              title: 'Xoá tài khoản thành công',
              success: () => {
                my.reLaunch({ url: 'pages/auth/index' });
              }
            });
          } catch (err) {
            my.alert({ title: 'Xoá tài khoản thất bại' });
          }
        }
      },
      fail: (e) => {
        my.alert({ title: 'Xoá tài khoản thất bại' });
      }
    });
  },
  handleEdit(e) {
    const { is } = e.target.dataset;
    if (this.data.isEdit === true) {
      this.setData({
        isEdit: false,
        editPassword: false,
        editValue: {}
      });
    } else {
      this.setData({ 
        isEdit: true,
        editPassword: is,
        editValue: is ? { 
          newPass: '', 
          confirmPass: '', 
          password: ''
        } : { 
          name: this.data.user.name, 
          age: this.data.user.age, 
          password: ''
        }
      });
    }
  },
  handleChange(e) {
    console.log(e);
    const { key } = e.target.dataset;
    const { editValue } = this.data;
    this.setData({ 
      editValue: {
        ...editValue, 
        [key]: e.detail.value 
      }
    });
  },
  async handleUpdateAccount() {
    const { editPassword, user, editValue } = this.data;
    console.log(editValue);
    if (editPassword) {
      if (editValue.newPass !== editValue.confirmPass) {
        this.setData({ messega: "Xác nhận mật khẩu thất bại" });
        return;
      }
    } 

    const keys = Object.keys(editValue);
    console.log(keys);
    for (let i in keys) {
      if (!editValue[keys[i]]) {
        this.setData({ messega: "Điền thông tin đầy đủ" });
        return;
      }
    }


    try {
      const token = await getStorage('token');
      const data = editPassword ? {
        newPassword: editValue.newPass,
        password: editValue.password,
      } : {
        name: editValue.name,
        age: editValue.age,
        password: editValue.password,
      }
     
      const res = await postUpdateUserProfileAPI(token, data);
    
      my.alert({
        title: 'Cập nhật thông tin',
        content: res.messega,
        success: () => {
          this.setData({ isEdit: false });
        }
      });

    } catch (err) {
      const app = getApp();
      app.loadUser();
    }
  }
});