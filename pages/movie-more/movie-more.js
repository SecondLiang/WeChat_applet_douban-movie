// pages/movie-more/movie-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIntheater:true,
    showComingsoon:false,
    intheaters:{
      // offset -> 当前已经获取到的电影条数
      // total ->能获取的电影的总计条数
      // movies ->电影对象，里面保存处理之后所需要的数据
    },
    comingSoon:{

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var typeID = options.typeId;
    if(typeID == 'intheaters'){
      this.setData({ showIntheater: true, showComingsoon: false});
    }else{
      this.setData({ showComingsoon: true, showIntheater: false, });
    }

    this.getMovieListData(typeID);
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
  // 请求数据
  getMovieListData(typeID){
    // console.log(666);
    let url;
    if (typeID == 'intheaters'){
      url = app.globalData.doubanBase + app.globalData.intheaters;
    }else{
      url = app.globalData.doubanBase + app.globalData.comingSoon;
    }
    var offset = this.data[typeID].offset || 0;
    console.log(offset);
    var total = this.data[typeID].total || 99;
    // 说明这类数据已经全部取完了
    if(offset >= total){
      return;
    }
      wx.showToast({
        title: '加载中',
        icon : 'loading',
        duration:5000
      })
      wx.request({
        url,
        method:'get',
        header:{
          'content-type':'json'
        },
        // 对于get请求data数据会拼接到url后面
        data:{
          start:offset,
          count:5
        },
        success :res => {
          this.renderDom(res.data,typeID);
        },
        fail : err => {
          console.log(err);
        },
        complete(){
          wx.hideToast();
        }
        
      })
  },
  // 渲染页面
  renderDom(lists,typeID){
    // console.log(777);
    var datas = lists.subjects;
    var total = lists.total;
    // console.log(888);
    var offset = this.data[typeID].offset || 0;
        offset += datas.length;
    var total = lists.total;
    var movies = this.data[typeID].movies || [];
    // console.log(999);
    // console.log(datas);
    datas.forEach(item => {
      var movieData = {};
      movieData.casts = item.casts.map(i =>i.name).join('/');
      movieData.direc = item.directors.map(i => i.name).join('/');
      movieData.genres = item.genres.join('/');
      movieData.wishLook = item.collect_count;
      movieData.rating = item.rating;
      movieData.id = item.id;
      movieData.image = item.images.small;
      movieData.title = item.title;
      movieData.year = item.year;
      movieData.rating = item.rating;
      movieData.typeID = typeID;
      movies.push(movieData);
    })
    
    console.log(offset);
    this.setData({ [typeID]: { offset, total, movies}});
  },
  // tab切换
  tabTo(e){
    // console.log(e);
    var tabID = e.currentTarget.dataset.tabId;
    console.log(tabID);
    if (tabID == 'intheaters') {
      this.setData({ showIntheater: true, showComingsoon: false });
    } else {
      this.setData({ showComingsoon: true, showIntheater: false, });
    }
    if(!this.data[tabID].movies){
      this.getMovieListData(tabID);
    }
  },
  // 滚动视图区域，滚动到底触发事件
  scrollMore(e){
    // console.log(888);
    var typeID = '';
    if(this.data.showIntheater){
      typeID = 'intheaters';
    }else{
      typeID = 'comingSoon';
    }
    // console.log(typeID);
    this.getMovieListData(typeID);

  },
  // 提示框
  ticketPrompt(){
    wx.showModal({
      title: '提示',
      content: '点击确认购票？',
      success:res => {
        if(res.confirm){
          console.log('确定买票')
        }else{
          console.log('取消买票');
        }
        
      },
      fail:err => {
        console.log(err);
      }
    })
  },
  // 提示框
  wishPrompt(){
    wx.showModal({
      title: '提示',
      content: '想看就看^_^',
    })
  },
  // 点击查看电影详情
  bindMovieDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + id,
    })
  }


})