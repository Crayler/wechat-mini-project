// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student_id:'',
    name:'立即登录'
  },

  gotoLogin: function(e) {
    if(this.data.student_id !== '') {
        return;
    }
    wx.navigateTo({
        url: '../login/login',
    })
  },

  handleLoss: function () { // 处理挂失操作
    // console.log(this.data.studentInfo.status) // 打印当前学生状态到控制台
    if (this.data.studentInfo.status  === '未登录') { // 如果当前状态为未登录
      wx.showToast({ // 显示消息提示框
        title: '请先登录！', // 提示信息
        icon: 'none', // 图标为无
        duration: 2000 // 持续时间2秒
      });
    } else if (this.data.studentInfo.status  === true) { // 如果当前状态为true
      wx.showToast({ // 显示消息提示框
        title: '挂失成功！', // 提示信息
        icon: 'success', // 图标为成功
        duration: 2000 // 持续时间2秒
      });
      this.setData({ // 更新页面数据
        'studentInfo.status': false // 将状态设置为false
      });
    } else if (this.data.studentInfo.status  === false) { // 如果当前状态为false
      wx.showToast({ // 显示消息提示框
        title: '已处于挂失状态', // 提示信息
        icon: 'none', // 图标为无
        duration: 2000 // 持续时间2秒
      });
    }
  },

  main_click(event) {
    // const aToken = wx.getStorageSync('aToken'); // 获取本地缓存的访问令牌
    // if (!aToken) {
    //   wx.showToast({
    //     title: '请先登录！',
    //     icon: 'none', // 图标为无
    //     duration: 2000 // 持续时间2秒
    //   });
    //   return; // 在未登录时阻止跳转
    // } else {
    //   console.log('登录成功！');
      // 如果已登录，可以继续执行跳转
      const url = event.currentTarget.dataset.url; // 获取点击的链接
      
      wx.navigateTo({
        url: '../change/change',
      })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var page = this;
    wx.getStorage({
        key: page.data.student_id,
     
        success(res) {
          console.log('密码'+res.data.password)
          console.log('姓名'+res.data.name)
          page.setData({name: res.data.name})
        }
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})