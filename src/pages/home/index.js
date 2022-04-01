import {
  navigateToTask,
  navigateToAuth,
} from '../../utils/navigate';

import {
  getAllTaskAPI,
  getTaskByPaginationAPI,
  getTaskbyCompletedAPI,
  havingToken
} from '../../services/index';

import {
  handleError
} from '../../utils/error';

Page({
  data: {
    task: [],
    completed: [],
    inprocess: [],
    banner: [],
  },
  async loadData() {
    try {
      // Xử lý chỗ havingToken này đang hơi cồng kềnh. Nó sẽ await x4 lần mới bắt đầu chạy các task
      const [
        task,
        banner,
        completed,
        inprocess
      ] =  await Promise.all([
        getTaskByPaginationAPI(await havingToken({ limit: 10, skip: 0 })),
        getTaskByPaginationAPI(await havingToken({ limit: 6, skip: 0 })),
        getTaskbyCompletedAPI(await havingToken({ completed: true })),
        getTaskbyCompletedAPI(await havingToken({ completed: false }))
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
      })
    } catch (err) {
      handleError(err.message);
    }
  },
  onReady() {
  },
  // Nên đưa vào onLoad
  onShow() {
    this.loadData();  
  },
  onNavigateCompleted() {
    navigateToTask({completed: true});
  },
  onNavigateInProcess() {
    navigateToTask({completed: false});
  },
  onNavigate() {
    navigateToTask();
  }
});