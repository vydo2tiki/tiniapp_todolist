import { navigateToTask, navigateToAuth } from '../../utils/navigate';

import {
  getAllTaskAPI,
  getTaskByPaginationAPI,
  getTaskbyCompletedAPI
} from '../../services/index';

import { handleError } from '../../utils/error';

Page({
  data: {
    task: [],
    completed: [],
    inprocess: [],
    banner: [],
    isLoading: true
  },
  async loadData() {
    this.setData({ isLoading: true });
    try {
      // Xử lý chỗ   này đang hơi cồng kềnh. Nó sẽ await x4 lần mới bắt đầu chạy các task
      const [task, banner, completed, inprocess] = await Promise.all([
        getTaskByPaginationAPI({ limit: 10, skip: 0 }),
        getTaskByPaginationAPI({ limit: 6, skip: 0 }),
        getTaskbyCompletedAPI({ completed: true }),
        getTaskbyCompletedAPI({ completed: false })
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
        inprocess: inprocess.slice(0, 10),
      });

      this.setData({ isLoading: false });
    } catch (err) {
      handleError(err.message);
      this.setData({ isLoading: false });
    }
  },
  onReady() {},
  // Nên đưa vào onLoad
  onShow() {
    this.loadData();
  },
  onNavigateCompleted() {
    navigateToTask({ completed: true });
  },
  onNavigateInProcess() {
    navigateToTask({ completed: false });
  },
  onNavigate() {
    navigateToTask();
  },
});
