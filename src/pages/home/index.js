import {
  navigateToTask,
  navigateToAuth,
} from '../../utils/navigate';

import {
  getAllTaskAPI,
  getTaskByPaginationAPI,
  getTaskbyCompletedAPI
} from '../../services/index';

import {
  getStorage
} from '../../utils/storage'

Page({
  data: {
    isLoading: true,
    task: [],
    completed: [],
    inprocess: [],
    banner: [],
  },
  async onLoad(query) {
    this.setData({ isLoading: true });
    const token = await getStorage('token');
    try {
      const [
        task,
        banner,
        completed,
        inprocess
      ] =  await Promise.all([
        getTaskByPaginationAPI(token, 10, 0),
        getTaskByPaginationAPI(token, 6, 0),
        getTaskbyCompletedAPI(token, true),
        getTaskbyCompletedAPI(token, false)
      ]);

      const group = banner.reduce((acc, item, index) => {
        if (index % 2 == 0) {
          acc.push(banner.slice(index, index + 2));
        }
        return acc;
      }, []);
      
      this.setData({
        task,
        banner: group,
        completed: completed.slice(0, 10),
        inprocess: inprocess.slice(0, 10)
      })
    } catch {
      this.setData({
        isLoading: false,
      });
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
    console.log(this.data);
  },
  onNavigate() {
    navigateToTask();
  },
});