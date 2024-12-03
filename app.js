//app.js
App({
    globalData: {
        config: {
            apiKey: 'ffbe3068ffa2c83e31d3c44dd7b96f4a',
            apiSecret: '57ccabc7da34c61bd045ae18b9d34fb07555060b94048119f385a00ec22a2244',
            crsAppId: 'a90f299675264817eb96455319d563f3',
            clientEndUrl: 'https://5f1525052d955342a04222fa31c55004.cn1.crs.easyar.com:8443',
            jpegQuality: 0.7, //JPEG压缩质量，建议不低于70%
            minInterval: 1000, //最短的两次CRS请求间隔(ms)
        },        
    }
})