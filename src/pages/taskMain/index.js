import {SORTTYPE} from '../../utils/constants';
import query from 'query-string';
import {
  getUrlTaskAPI,
  getTaskByPaginationAPI
} from '../../services/index';
 import {CompareKey} from '../../utils/common';

Page({
  data: {
    selected: SORTTYPE[0],
    task: [],
    page: 1,
    sortmode: 'desc',
    sorttype: SORTTYPE
  },
  async onLoad(options) {
    const parse = query.parse(options);
    const { sortmode, selected, page } = this.data;
    let task;
    if (options) {
      task = await getUrlTaskAPI("token", options, page);
    } else {
      const limit = 10 * page == 0 ? 10 : 10*page; 
      task = await getTaskByPaginationAPI("token", limit, 0);
    }

    if (task.length <= parseInt(parse.limit) * page) {
      this.setData({ page: 0 });
    }

    task.sort(function (a, b) {
      const key = selected.name;
      if (sortmode === 'desc') {
        return (a[key] > b[key]);
      }
      return a[key] <= b[key];
    });
   
    this.setData({ task });
  },
  onReady() {

  },
  onShow() {
 
  },
  onHide() {
  },
  onUnload() {

  },
  onSelect(selected) {
    this.setData({ selected });
    this.onLoad();
  },
  handleViewMore() {
    const { page } = this.data;
    this.setData({ page: page + 1 });
    this.onLoad();
  }
});