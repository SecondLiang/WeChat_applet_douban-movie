var app = getApp();
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultLists:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  searchBack() {
    wx.navigateBack({
      url: '../index/index'
    })
  },
  searchList(e) {
    var text = e.detail.value;
    //clearTimeout(timer); //防抖没起作用
    // var timer = setTimeout(() => {
      var url = app.globalData.doubanBase + app.globalData.searchURL + text;
      // 因为是箭头函数，所以this可以直接使用，如果是es5函数，则需要一个变量接收this
      this.getLists(url, this.renderData);

    // },2000)

  },
  getLists(url,callback){
    wx.request({
      url,
      method: 'get',
      header: { 'content-type': 'json' },
      success: res => {
        console.log(res);
        // 因为是箭头函数，所以this可以直接使用，如果是es5函数，则需要一个变量接收this
        callback(res.data.subjects);
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  renderData(lists){
    // console.log(lists);
    var resultLists = [];
    lists.forEach(item =>{
      //获取导演name，因为导演可能不止一个，所以之间用/
      var dirs = item.directors.map(i => i.name).join('/');
      var desc = item.rating.average + '分/' + item.year + '年/' + dirs;
      var movieName = item.title;
      resultLists.push({
        id:item.id,
        images :item.images.small,
        movieName,
        desc
      })
    })
    this.setData({ resultLists});
    
  }



})