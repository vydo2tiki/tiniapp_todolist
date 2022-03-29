App({
  onLaunch(options) {
    my.addIconsToNavigationBar({
      icons: [
        {
          image: './assets/icon/search.png',
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
  onShow(options) {
  },
});