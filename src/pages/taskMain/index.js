import {SORTTYPE} from '../../utils/constants';
import query from 'query-string';
import {
  getUrlTaskAPI,
  getTaskByPaginationAPI
} from '../../services/index';

 import {CompareKey} from '../../utils/common';

 import {
  getStorage
 } from "../../utils/storage"

Page({
  data: {
    selected: SORTTYPE[0],
    task: [],
    page: 1,
    sortmode: null,
    completed: null,
    sorttype: SORTTYPE
  },
  async onLoad(options) {
    const token = await getStorage('token');
    const parse = query.parse(options);
    const { sortmode, selected, page } = this.data;
    let task = [];
    if (options) {
      task = await getUrlTaskAPI("token", options, page);
    } else {
      const limit = 10 * page == 0 ? 10 : 10*page; 
      task = await getTaskByPaginationAPI("token", limit, 0);
    }

    if (task.length <= parseInt(parse.limit) * page) {
      this.setData({ page: 0 });
    }

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
  },
  handleSort(e) {
    const sortmode = this.data.sortmode === e.target.dataset.sortmode ? null : e.target.dataset.sortmode
    this.setData({ sortmode });
  },
  handleStatus(e) {
    const completed = this.data.completed === e.target.dataset.completed ? null : e.target.dataset.completed
    this.setData({ completed });
  }
});