import {
  navigateToUpdateAccount,
  navigateToTrash,
  navigateToTask,
  navigateToNotFound
} from '../../utils/navigate';

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
    ]
  },
  onLoad(query) {
  },
  onReady() {
  },
  onShow() {
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