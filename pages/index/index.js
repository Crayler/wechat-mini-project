// index.ts

Page({
    onShareAppMessage() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    },

    data: {
        currentTab:0, //预设当前项的值
        scrollLeft:0, //tab标题的滚动条位置
        

    },
})