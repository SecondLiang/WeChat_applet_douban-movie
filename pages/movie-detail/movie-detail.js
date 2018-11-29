// pages/movie-detail/movie-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rating:{},
    movieDetail:{},
    showText:false,
    showBtnName:'展开',
    animationData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var id = options.id;
    this.getMoviesDetail(id);

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
  getMoviesDetail(id){
    wx.showToast({
      title: '加载中',
      icon:'loading'
    })
    // console.log(id);
    var url = app.globalData.doubanBase + app.globalData.moviesDetail + id;
    // console.log(url);
    wx.request({
      url,
      method:'get',
      header: {
        'content-type': 'json'
      },
      success:res => {
        // console.log(res);
        this.renderDom(res.data);
      },
      fail:err => {
        console.log(err);
      },
      complete(){
        wx.hideToast();
      }
      
    })
  },
  renderDom(lists){
    // console.log(lists);
    // var movieDetail = this.data.movieDetail || {}
    var poster = lists.images.medium;
    var detail = [];

    var title = lists.title;
    var genres = lists.year + '/' + lists.genres.join('/');
    var old_name = lists.original_title;
    var country = lists.countries.join('/');
    detail.push(title, genres, old_name, country);

    var wish_count = lists.wish_count;
    var collect_count = lists.collect_count || 0;
    var rating = lists.rating;
    var summary = lists.summary;
    var casts = lists.casts;
    this.setData({rating});
    this.setData({ movieDetail : {
      poster,
      detail,
      wish_count,
      collect_count,
      summary,
      casts
    }});
  },
  // 点击想看
  wishCount(){
    wx.showModal({
      title: '提示',
      content: '加入想看',
      success:res => {
        if (res.confirm){
          console.log(res + '确实想看');
        }else{
          console.log(res + '取消想看');
        }
      },
      fail:err => {
        console.log(err)
      }
    })
  },
  // 点击看过
  collectCount(){
    wx.showModal({
      title: '提示',
      content: '加入看过',
      success: res => {
        if (res.confirm) {
          console.log(res + '确实看过');
        } else {
          console.log(res + '取消想看');
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  // 点击展开
  showSunmary(){
    console.log(888);
    if (this.data.showText == false){
      this.setData({ showText:true});
      this.setData({ showBtnName: '合并' });
    } else{
      this.setData({ showText: false });
      this.setData({ showBtnName: '展开' });
    }
    //创建动画 
    // var animation = wx.createAnimation({
    //   transformOrigin: "50% 0",
    //   duration: 500,
    //   timingFunction: "linear",
    //   delay: 0
    // })
    // animation.height = '100%';
    // this.setData({
    //   animationData: animation.export()
    // })

  }
})