import {SORTTYPE} from '../../utils/constants';
import query from 'query-string';
import {
  getUrlTaskAPI,
  havingToken
} from '../../services/index';

import {
  CompareKey
} from '../../utils/common';

import {
  handleError
} from "../../utils/error";

Page({
  data: {
    selected: SORTTYPE[0],
    task: [],
    page: 1,
    end: false,
    sortmode: null,
    completed: null,
    sorttype: SORTTYPE
  },
  async onLoad(options) {
    const { completed, page, sortmode, selected } = this.data;
    const parse = {
      completed,
      ...query.parse(options)
    };
    
    const url = query.stringify({ 
      completed: parse.completed, 
      limit: 10 * page,
      skip: 0
    })

    try {
      const task = await getUrlTaskAPI(url);
  
      if (task.length < 10 * page) {
        this.setData({ end: true });
      } else this.setData({ end: false });
  
      if (sortmode !== null) {
        const key = selected.name;
        task.sort(function(a, b) {
          return CompareKey(a, b, key, sortmode);
        });
      } 
  
      this.setData({ 
        task,
        completed: options ? parse.completed === "true" : completed
      });
    } catch (err) {
      handleError(err.message);
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
  onSelect(selected) {
    this.setData({ selected });
    this.onLoad();
  },
  handleView(e) {
    const { page } = this.data;
    if (this.data.end) {
      this.setData({ page: 1 });
    } else {
      this.setData({ page: page + 1 });
    }
    this.onLoad();
  },
  handleSort(e) {
    const sortmode = this.data.sortmode === e.target.dataset.sortmode ? null : e.target.dataset.sortmode
    this.setData({ sortmode });
    this.onLoad();
  },
  handleStatus(e) {
    const completed = this.data.completed === e.target.dataset.completed ? null : e.target.dataset.completed
    this.setData({ completed });
    this.onLoad();
  }
});