import CrsClient from '../libs/crs-client';

Component({
    data: {
        height: 500,
        isSearching: false,
        runingCrs: false,
    },
    lifetimes: {
        attached() {
            const sys = wx.getSystemInfoSync();
            this.setData({ width: sys.windowWidth, height: sys.windowHeight, dpi: sys.pixelRatio });

            this.crsClient = new CrsClient(getApp().globalData.config);
            console.info(this.crsClient);
        },
        detached() {
            if (this.listener) {
                this.listener.stop();
            }
        }
    },
    methods: {
        cameraInitDone() {
            if (this.isCameraInitDone) {
                return;
            }

            this.isCameraInitDone = true;

            // 打开相机
            this.listener = wx.createCameraContext().onCameraFrame((frame) => {
                if (!this.data.runingCrs || this.data.isSearching) {
                    return;
                }

                this.showSearching(true);
                // 识别
                this.crsClient.searchByBase64(this.capture(frame)).then(res => {
                    this.showSearching(false);
                    console.info(res);

                    // res.statusCode = 0 表示识别到目标
                    // 识别成功后，处理你的业务逻辑
                    // 可以展示图片，播放视频，渲染模型等

                    // 这里仅简单提示                    
                    if (res && res.result) {
                        const title = res.statusCode == 0 ? `识别到 ${res.result.target.name}` : `未识别到目标`;
                        wx.showToast({ title, icon: 'none' });
                    }
                }).catch(err => {
                    console.error(err);
                    this.showSearching(false);
                });
            });
            this.listener.start();
        },

        // 获取 Camera 实时帧数据，并转换为base64数据格式
        capture(frame) {
            if (!frame || !frame.data) {
                return '';
            }

            const width = frame.width;
            const height = frame.height;

            const canvas = wx.createOffscreenCanvas({ width, height, type: '2d' });
            const imgData = canvas.createImageData(new Uint8ClampedArray(frame.data), width, height);
            canvas.getContext('2d').putImageData(imgData, 0, 0);

            return canvas.toDataURL("image/jpeg", 0.7).split(',').pop();
        },
        cameraError(e) {
            console.error(e);
        },
        scan() {
            this.setData({
                runingCrs: true
            });
        },
        showSearching(bl) {
            this.setData({
                isSearching: bl,
            });
            if (!bl) {
                this.setData({
                    runingCrs: false
                });
            }
        }
    },
})