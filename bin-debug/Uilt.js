var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Uilt;
(function (Uilt) {
    //配置类
    var Config = (function () {
        function Config() {
        }
        Config.debug = true; //调试模式
        Config.gameName = "极速冒险"; //游戏名称
        Config.StateW = 640; //舞台宽度
        Config.StateH = 1136; //舞台高度
        Config.panelLineWidth = 2; //线条宽度
        Config.panelLineColor = 0x00ff00; //线条颜色
        Config.LoadGameConfigUrl = '/diyGame/getConfig'; //加载游戏配置URL
        Config.weixinSignUrl = ''; //后端微信签名地址
        Config.weixinShareDebug = false; //微信分享调试模式
        Config.weixinShareAppId = ''; //微信分享AppID
        return Config;
    }());
    Uilt.Config = Config;
    __reflect(Config.prototype, "Uilt.Config");
    //游戏基本属性类
    var Game = (function () {
        function Game() {
            this.NowTimer = 0; //游戏时间
            this.Timeer = 10; // 倒计时
            this.Score = 0; //分数
        }
        /**
         * 获取游戏状态
         * @returns {GameStatus}
         */
        Game.prototype.getGameStatus = function () {
            return this.Status;
        };
        /**
         * 设置游戏状态
         * @param status
         * @returns {GameStatus}
         */
        Game.prototype.setGameStatus = function (status) {
            return this.Status = status;
        };
        /**
         * 获取当前时间
         * @returns {number}
         */
        Game.prototype.getNowTime = function () {
            return this.NowTimer;
        };
        /**
         * 当前游戏时间递增
         * @param num
         */
        Game.prototype.incNowTimeer = function (num) {
            if (num === void 0) { num = 1; }
            this.NowTimer += num;
        };
        /**
         * 获取当前倒计时
         * @returns {number}
         */
        Game.prototype.getTime = function () {
            return this.Timeer;
        };
        /**
         * 倒计时自减
         * @param num
         */
        Game.prototype.decTimeer = function (num) {
            if (num === void 0) { num = 1; }
            this.Timeer -= num;
        };
        /**
         * 获取当前分数
         * @returns {number}
         */
        Game.prototype.getScore = function () {
            return this.Score;
        };
        /**
         * 当前分数自减
         * @param num
         */
        Game.prototype.decScore = function (num) {
            if (num === void 0) { num = 1; }
            this.Score -= num;
        };
        /**
         * 当前分数自增
         * @param num
         */
        Game.prototype.incScore = function (num) {
            if (num === void 0) { num = 1; }
            this.Score += num;
        };
        Game.prototype.restart = function () {
            this.Score = 0;
            this.Status = GameStatus.Start;
            this.NowTimer = 0;
        };
        Object.defineProperty(Game, "interval", {
            get: function () {
                return (this._interval || (this._interval = new Game));
            },
            enumerable: true,
            configurable: true
        });
        return Game;
    }());
    Uilt.Game = Game;
    __reflect(Game.prototype, "Uilt.Game");
    //场景管理类
    var SceneManager = (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager() {
            var _this = _super.call(this) || this;
            _this.x = 0;
            _this.y = 0;
            _this.width = Stage.stageW;
            _this.height = Stage.stageH;
            return _this;
        }
        Object.defineProperty(SceneManager, "interval", {
            get: function () {
                return (this._interval || (this._interval = new SceneManager));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 加载场景
         * @param target
         */
        SceneManager.prototype.loadScence = function (target) {
            this.addChild(target);
        };
        /**
         * 移除场景
         * @param target
         */
        SceneManager.prototype.removeScence = function (target) {
            this.removeChild(target);
        };
        return SceneManager;
    }(egret.Sprite));
    Uilt.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "Uilt.SceneManager");
    //工具 类
    var Tool = (function () {
        function Tool() {
        }
        /**
         * 获取当前链接参数
         * @param name 参数名
         */
        Tool.getQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return decodeURI(r[2]);
            return null;
        };
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        Tool.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        /**
         * 绘制直线
         * @param x X坐标
         * @param y Y坐标
         * @param w 宽度
         * @param h 高度
         * @param lineW
         * @param lineC
         * @returns {egret.Shape}
         */
        Tool.createLineTo = function (x, y, w, h, lineW, lineC) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (lineW === void 0) { lineW = Config.panelLineWidth; }
            if (lineC === void 0) { lineC = Config.panelLineColor; }
            var shp = new egret.Shape();
            shp.graphics.lineStyle(lineW, lineC);
            shp.graphics.moveTo(x, y);
            shp.graphics.lineTo(w, h);
            shp.graphics.endFill();
            return shp;
        };
        /**
         * 绘制曲线
         * @param x
         * @param y
         * @param x1
         * @param y1
         * @param w
         * @param h
         * @param lineW
         * @param lineC
         * @returns {egret.Shape}
         */
        Tool.createCurveTo = function (x, y, x1, y1, w, h, lineW, lineC) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (lineW === void 0) { lineW = Config.panelLineWidth; }
            if (lineC === void 0) { lineC = Config.panelLineColor; }
            var shp = new egret.Shape();
            shp.graphics.lineStyle(lineW, lineC);
            shp.graphics.moveTo(x, y);
            shp.graphics.curveTo(x1, y1, w, h);
            shp.graphics.endFill();
            return shp;
        };
        /**
         * 绘制圆角矩形
         * @param x 起点X坐标
         * @param y 起点Y坐标
         * @param width 宽度
         * @param height 高度
         * @param round 圆角像素
         * @param color 背景颜色
         * @param isAphla 是否透明
         * @returns {egret.Sprite}
         */
        Tool.createRoundRect = function (x, y, width, height, round, color, isAphla) {
            if (isAphla === void 0) { isAphla = false; }
            var roundRect = new egret.Sprite();
            roundRect.x = x;
            roundRect.y = y;
            roundRect.graphics.beginFill(color, (isAphla) ? 0 : 1);
            roundRect.graphics.drawRoundRect(0, 0, width, height, round, round);
            roundRect.graphics.endFill();
            return roundRect;
        };
        /**
         * 画按钮
         * @param x X值
         * @param y Y值
         * @returns {egret.Sprite}
         */
        Tool.createBtn = function (x, y, w, h, r, textField, btnColor, fontColor, touchEnalb) {
            if (touchEnalb === void 0) { touchEnalb = true; }
            var btn = new egret.Sprite(), text = new egret.TextField();
            btn.addChild(text);
            btn.x = x;
            btn.y = y;
            btn.graphics.beginFill(btnColor);
            btn.graphics.drawRoundRect(0, 0, w, h, r, r);
            btn.graphics.endFill();
            btn.touchEnabled = true;
            text.y = 15;
            text.width = w;
            text.height = h;
            text.text = textField;
            text.textAlign = "center";
            text.textColor = fontColor;
            return btn;
        };
        /**
         * 绘制圆
         * @param x 原点X值
         * @param y 原点Y值
         * @param raduis 圆半径
         * @param color 填充颜色
         * @returns {egret.Sprite}
         */
        Tool.createCircle = function (x, y, raduis, color) {
            var circle = new egret.Sprite;
            circle.graphics.beginFill(color);
            circle.graphics.drawCircle(x, y, raduis);
            circle.graphics.endFill();
            return circle;
        };
        /**
         * 绘制梯形
         * @param x 下底中点X值
         * @param y 下底中点Y值
         * @param upWidth 上底1/2宽度
         * @param downWidth 下底1/2宽度
         * @param height 高度
         * @param color 填充颜色
         * @returns {egret.Sprite}
         */
        Tool.createTrapezoid = function (x, y, upWidth, downWidth, height, color) {
            var trapezoid = new egret.Sprite;
            trapezoid.graphics.lineStyle(1, color);
            trapezoid.graphics.beginFill(color);
            trapezoid.graphics.moveTo(x - upWidth / 2, y - height);
            trapezoid.graphics.lineTo(x + upWidth / 2, y - height);
            trapezoid.graphics.lineTo(x + downWidth / 2, y);
            trapezoid.graphics.lineTo(x - downWidth / 2, y);
            trapezoid.graphics.lineTo(x - upWidth / 2, y - height);
            return trapezoid;
        };
        Tool.createTextField = function () {
            var text = new egret.TextField;
            return text;
        };
        return Tool;
    }());
    Uilt.Tool = Tool;
    __reflect(Tool.prototype, "Uilt.Tool");
    //舞台类
    var Stage = (function () {
        function Stage() {
        }
        Object.defineProperty(Stage, "interval", {
            get: function () {
                this.stage.width = Config.StateW;
                this.stage.height = Config.StateH;
                return (this._interval || (this._interval = new Stage));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage, "stage", {
            /**
             * 获取舞台
             */
            get: function () {
                return egret.MainContext.instance.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage, "stageW", {
            /**
             * 舞台宽度
             */
            get: function () {
                return egret.MainContext.instance.stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage, "stageH", {
            /**
             * 舞台高度
             */
            get: function () {
                return egret.MainContext.instance.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        return Stage;
    }());
    Uilt.Stage = Stage;
    __reflect(Stage.prototype, "Uilt.Stage");
    //锚点工具类（需要初始化）
    var AnchorUtils = (function () {
        function AnchorUtils() {
        }
        AnchorUtils.init = function () {
            this._propertyChange = Object.create(null);
            this._anchorChange = Object.create(null);
            this.injectAnchor();
        };
        AnchorUtils.setAnchorX = function (target, value) {
            target["anchorX"] = value;
        };
        AnchorUtils.setAnchorY = function (target, value) {
            target["anchorY"] = value;
        };
        AnchorUtils.setAnchor = function (target, value) {
            target["anchorX"] = target["anchorY"] = value;
        };
        AnchorUtils.getAnchor = function (target) {
            if (target["anchorX"] != target["anchorY"]) {
                console.log("target's anchorX != anchorY");
            }
            return target["anchorX"] || 0;
        };
        AnchorUtils.getAnchorY = function (target) {
            return target["anchorY"] || 0;
        };
        AnchorUtils.getAnchorX = function (target) {
            return target["anchorX"] || 0;
        };
        AnchorUtils.injectAnchor = function () {
            Object.defineProperty(egret.DisplayObject.prototype, "width", {
                get: function () {
                    return this.$getWidth();
                },
                set: function (value) {
                    var _this = this;
                    this.$setWidth(value);
                    AnchorUtils._propertyChange[this.hashCode] = true;
                    egret.callLater(function () {
                        AnchorUtils.changeAnchor(_this);
                    }, this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(egret.DisplayObject.prototype, "height", {
                get: function () {
                    return this.$getHeight();
                },
                set: function (value) {
                    var _this = this;
                    this.$setHeight(value);
                    AnchorUtils._propertyChange[this.hashCode] = true;
                    egret.callLater(function () {
                        AnchorUtils.changeAnchor(_this);
                    }, this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(egret.DisplayObject.prototype, "anchorX", {
                get: function () {
                    return this._anchorX;
                },
                set: function (value) {
                    var _this = this;
                    this._anchorX = value;
                    AnchorUtils._propertyChange[this.hashCode] = true;
                    AnchorUtils._anchorChange[this.hashCode] = true;
                    egret.callLater(function () {
                        AnchorUtils.changeAnchor(_this);
                    }, this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(egret.DisplayObject.prototype, "anchorY", {
                get: function () {
                    return this._anchorY;
                },
                set: function (value) {
                    var _this = this;
                    this._anchorY = value;
                    AnchorUtils._propertyChange[this.hashCode] = true;
                    AnchorUtils._anchorChange[this.hashCode] = true;
                    egret.callLater(function () {
                        AnchorUtils.changeAnchor(_this);
                    }, this);
                },
                enumerable: true,
                configurable: true
            });
        };
        AnchorUtils.changeAnchor = function (tar) {
            if (this._propertyChange[tar.hashCode] && this._anchorChange[tar.hashCode]) {
                tar.anchorOffsetX = tar._anchorX * tar.width;
                tar.anchorOffsetY = tar._anchorY * tar.height;
                delete this._propertyChange[tar.hashCode];
            }
        };
        return AnchorUtils;
    }());
    Uilt.AnchorUtils = AnchorUtils;
    __reflect(AnchorUtils.prototype, "Uilt.AnchorUtils");
    //微信分享
    var WeixinShare = (function () {
        function WeixinShare() {
        }
        Object.defineProperty(WeixinShare, "interval", {
            get: function () {
                return this._interval || (this._interval = new WeixinShare);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化
         */
        WeixinShare.prototype.init = function () {
            var _this = this;
            var urlloader = new egret.URLLoader(), req = new egret.URLRequest(Config.weixinSignUrl);
            urlloader.load(req);
            req.method = egret.URLRequestMethod.GET;
            urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
                _this.signPackage = JSON.parse(e.target.data);
                _this.getWeiXinConfig();
            }, this);
        };
        /**
         * 配置参数
         */
        WeixinShare.prototype.getWeiXinConfig = function () {
            var bodyConfig = new BodyConfig();
            bodyConfig.debug = this.signPackage.debug;
            bodyConfig.appId = this.signPackage.appId;
            bodyConfig.timestamp = this.signPackage.timestamp;
            bodyConfig.nonceStr = this.signPackage.nonceStr;
            bodyConfig.signature = this.signPackage.signature;
            bodyConfig.jsApiList = [
                // 所有要调用的 API 都要加到这个列表中
                'checkJsApi',
                'chooseImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'showMenuItems',
                'hideMenuItems',
            ];
            wx.config(bodyConfig);
            wx.ready(function () {
                //需要隐藏的菜单选项
                wx.hideMenuItems({
                    menuList: [
                        "menuItem:share:timeline",
                        "menuItem:editTag",
                        "menuItem:readMode"
                    ]
                });
                //检测的jsApi接口
                wx.checkJsApi({
                    jsApiList: [
                        'getNetworkType',
                        'previewImage',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo'
                    ],
                    success: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });
            });
        };
        /**
         * 分享给朋友
         */
        WeixinShare.prototype.onShareAPPMessage = function () {
            var shareAppMessage = new BodyMenuShareAppMessage();
            shareAppMessage.title = this.shareCont.title;
            shareAppMessage.desc = this.shareCont.desc;
            shareAppMessage.link = this.shareCont.link;
            shareAppMessage.imgUrl = this.shareCont.imgLink;
            shareAppMessage.trigger = function (res) {
                console.log('用户点击发送给朋友');
            };
            shareAppMessage.success = function (res) {
                console.log('已分享');
            };
            shareAppMessage.fail = function (res) {
                console.log('已取消');
            };
            shareAppMessage.cancel = function (res) {
                console.log(JSON.stringify(res));
            };
        };
        /**
         * 分享到QQ
         */
        WeixinShare.prototype.onShareQQ = function () {
            var shareqq = new BodyMenuShareQQ();
            shareqq.title = this.shareCont.title;
            shareqq.desc = this.shareCont.desc;
            shareqq.link = this.shareCont.link;
            shareqq.imgUrl = this.shareCont.imgLink;
            shareqq.complete = function (res) {
                console.log(JSON.stringify(res));
            };
            shareqq.trigger = function (res) {
                console.log('用户点击分享到QQ');
            };
            shareqq.success = function (res) {
                console.log('已分享');
            };
            shareqq.cancel = function (res) {
                console.log('已取消');
            };
            shareqq.fail = function (res) {
                console.log(JSON.stringify(res));
            };
        };
        /**
         * 分享到微博
         * @param e
         */
        WeixinShare.prototype.onshareWeibo = function (e) {
            var shareweibo = new BodyMenuShareWeibo();
            shareweibo.title = this.shareCont.title;
            shareweibo.desc = this.shareCont.desc;
            shareweibo.link = this.shareCont.link;
            shareweibo.imgUrl = this.shareCont.imgLink;
            shareweibo.complete = function (res) {
                console.log(JSON.stringify(res));
            };
            shareweibo.trigger = function (res) {
                console.log('用户点击分享到微博');
            };
            shareweibo.cancel = function (res) {
                console.log('已取消');
            };
            shareweibo.fail = function (res) {
                console.log(JSON.stringify(res));
            };
        };
        /**
         * 分享到朋友圈
         * @param e
         */
        WeixinShare.prototype.onTimeline = function (e) {
            var sharet = new BodyMenuShareTimeline();
            sharet.title = this.shareCont.title;
            sharet.link = this.shareCont.link;
            sharet.imgUrl = this.shareCont.imgLink;
            sharet.trigger = function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，
                // 因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                console.log('用户点击分享到朋友圈');
            };
            sharet.success = function (res) {
                console.log('已分享');
            };
            sharet.cancel = function (res) {
                console.log('已取消');
            };
            sharet.fail = function (res) {
                console.log(JSON.stringify(res));
            };
        };
        return WeixinShare;
    }());
    Uilt.WeixinShare = WeixinShare;
    __reflect(WeixinShare.prototype, "Uilt.WeixinShare");
    //网络请求
    var Http = (function () {
        /**
         * 构造传参
         * @param url 请求地址
         * @param method 请求方式
         * @param responseType 请求类型
         * @param headers 请求头信息
         */
        function Http(url, method, responseType, headers) {
            if (headers === void 0) { headers = []; }
            this.request = new egret.HttpRequest; //实例化请求
            this.request.responseType = responseType;
            this.request.open(url, method);
            if (headers.length > 0) {
                for (var i = 0; i < headers.length; i++) {
                    this.request.setRequestHeader(headers[i].key, headers[i].value);
                }
            }
        }
        /**
         * 返回请求实例
         * @returns {egret.HttpRequest}
         */
        Http.prototype.req = function () {
            return this.request;
        };
        /**
         * 设置请求头
         * @param key
         * @param value
         */
        Http.prototype.setHeader = function (key, value) {
            this.request.setRequestHeader(key, value);
        };
        /**
         * 发送请求
         * @param data
         */
        Http.prototype.sendRequest = function (data) {
            if (data === void 0) { data = ''; }
            this.request.send(data);
        };
        return Http;
    }());
    Uilt.Http = Http;
    __reflect(Http.prototype, "Uilt.Http");
    //游戏状态
    var GameStatus;
    (function (GameStatus) {
        GameStatus[GameStatus["Load"] = 0] = "Load";
        GameStatus[GameStatus["Start"] = 1] = "Start";
        GameStatus[GameStatus["Stop"] = 2] = "Stop";
        GameStatus[GameStatus["Died"] = 3] = "Died";
        GameStatus[GameStatus["Finash"] = 4] = "Finash";
        GameStatus[GameStatus["OneFinash"] = 5] = "OneFinash";
    })(GameStatus = Uilt.GameStatus || (Uilt.GameStatus = {}));
})(Uilt || (Uilt = {}));
//# sourceMappingURL=Uilt.js.map