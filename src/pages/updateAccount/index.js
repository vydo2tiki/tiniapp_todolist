import {
  getLoggedUserAPI,
  postUpdateUserProfileAPI,
  deleteUserAPI,
  havingToken
} from '../../services/index';

import {
  handleError
} from '../../utils/error';

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
    message: ''
  },
  async loadData() {
    try {
      const auth = await getLoggedUserAPI(await havingToken());
      this.setData({ user: auth.user });
    } catch (err) {
      handleError(err.messega);
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
  handleDeleteAccount() {
    my.confirm({
      title: 'Bạn muốn xoá tài khoản',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
      success: async (result) => {
        if (result.confirm) {
          try {
            await deleteUserAPI(await havingToken());
            await removeStorage('token');
            my.alert({ 
              title: 'Xoá tài khoản thành công',
              success: () => {
                my.reLaunch({ url: 'pages/auth/index' });
              }
            });
          } catch (err) {
            handleError(err.messega);
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
        this.setData({ message: "Xác nhận mật khẩu thất bại" });
        return;
      }
    } 

    const keys = Object.keys(editValue);
    console.log(keys);
    for (let i in keys) {
      if (!editValue[keys[i]]) {
        this.setData({ message: "Điền thông tin đầy đủ" });
        return;
      }
    }

    const data = editPassword ? {
      newPassword: editValue.newPass,
      password: editValue.password,
    } : {
      name: editValue.name,
      age: editValue.age,
      password: editValue.password,
    }

    try {
      const res = await postUpdateUserProfileAPI(await havingToken(data));
    
      my.alert({
        title: 'Cập nhật thông tin',
        content: res.message,
        success: () => {
          this.setData({ isEdit: false });
        }
      });

    } catch (err) {
      handleError(err.messega);
    }
  }
});