Page({
  data: {
    selected: {
      key: 0, 
      label: "Tên",
      name: "name"
    },
    task: [
      {name: "A", completed: true},
      {name: "B", completed: false},
      {name: "C", completed: true},      
      {name: "D", completed: false},      
      {name: "E", completed: true}      
    ],
    sorttype: [
      {
        key: 0,
        label: "Tên",
        name: "name"
      },
      {
        key: 1,
        label: "Ngày đăng",
        name: "createdAt"
      },
      {
        key: 2,
        label: "Ngày cập nhật",
        name: "updatedAt"
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
  onSelect(selected) {
    this.setData({ selected });
  },
});