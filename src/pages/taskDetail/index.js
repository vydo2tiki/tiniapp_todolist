Page({
  onLoad(query) {
    my.addIconsToNavigationBar({
      icons: [
        {
          image: '../../assets/icon/trash-icon.jpeg',
          width: 25,
          height: 25
        }
      ],
      padding: 10,
      success: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log(res);
      }
    });
  },
  onReady() {
  },
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  }
});