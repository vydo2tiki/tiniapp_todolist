import {
  getLoggedUserAPI,
  postUpdateUserProfileAPI,
  deleteUserAPI
} from '../../services/index';

import { handleError } from '../../utils/error';

import { getStorage, removeStorage } from '../../utils/storage';

Page({
  data: {
    isEdit: false,
    editPassword: false,
    editValue: {},
    user: null,
    message: '',
    isLoading: true
  },
  async loadData() {
    this.setData({ isLoading: true });
    try {
      const auth = await getLoggedUserAPI();
      this.setData({ user: auth.user });
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
  handleDeleteAccount() {
    my.confirm({
      title: 'Bạn muốn xoá tài khoản',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
      success: async (result) => {
        if (result.confirm) {
          try {
            await deleteUserAPI();
            await removeStorage('token');
            my.alert({
              title: 'Xoá tài khoản thành công',
              success: () => {
                my.reLaunch({ url: 'pages/auth/index' });
              },
            });
          } catch (err) {
            handleError(err.message);
            my.alert({ title: 'Xoá tài khoản thất bại' });
          }
        }
      },
      fail: (e) => {
        my.alert({ title: 'Xoá tài khoản thất bại' });
      },
    });
  },
  handleEdit(e) {
    const { is } = e.target.dataset;
    if (this.data.isEdit === true) {
      this.setData({
        isEdit: false,
        editPassword: false,
        editValue: {},
      });
    } else {
      this.setData({
        isEdit: true,
        editPassword: is,
        editValue: is
          ? {
              newPass: '',
              confirmPass: '',
              password: '',
            }
          : {
              name: this.data.user.name,
              age: this.data.user.age,
              password: '',
            },
      });
    }
  },
  handleChange(e) {
    const { key } = e.target.dataset;
    const { editValue } = this.data;
    this.setData({
      editValue: {
        ...editValue,
        [key]: e.detail.value,
      },
    });
  },
  async handleUpdateAccount() {
    const { editPassword, user, editValue } = this.data;
    if (editPassword) {
      if (editValue.newPass !== editValue.confirmPass) {
        this.setData({ message: 'Xác nhận mật khẩu thất bại' });
        return;
      }
    }

    const keys = Object.keys(editValue);
    for (let i in keys) {
      if (!editValue[keys[i]]) {
        this.setData({ message: 'Điền thông tin đầy đủ' });
        return;
      }
    }

    const data = editPassword
      ? {
          newPassword: editValue.newPass,
          password: editValue.password,
        }
      : {
          name: editValue.name,
          age: editValue.age,
          password: editValue.password,
        };

    try {
      const res = await postUpdateUserProfileAPI(data);

      my.alert({
        title: 'Cập nhật thông tin',
        content: res.message,
        success: () => {
          this.setData({ isEdit: false });
        },
      });
    } catch (err) {
      handleError(err.message);
    }
  },
});
