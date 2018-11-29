// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intheaters : [],
    comingSoon :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var intheatersURL = app.globalData.doubanBase + app.globalData.intheaters + '?start=0&&count=10';
    var comingSoonURl = app.globalData.doubanBase + app.globalData.comingSoon + '?start=0&&count=10';

    this.getMovieData(intheatersURL,'intheaters');
    this.getMovieData(comingSoonURl, 'comingSoon');
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
  // ES6语法
  bindSearch(e){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  getMovieData(url,_type){
    // 网络请求得到返回的数据之前，所展示的正在加载状态
    wx.showToast({
      title: '正在加载',
      icon:'loading',
      duration:5000
    })
    wx.request({
      url,
      method:'get',
      header: {
        'content-type': 'json'
        },
        success: res => this.setData({[_type]:res.data.subjects}),
        fail:err => console.log(err),
        complete(){
          // 网络请求得到返回的数据之后，取消正在加载状态
          wx.hideToast();
        }
    })
    
  },
  bindToMore(e){
    var typeId = e.currentTarget.dataset.typeId;
    wx.navigateTo({
      url: '/pages/movie-more/movie-more?typeId='+ typeId,
    })
  },
  movieDetail(e){
    // console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + id,
    })
  }
})