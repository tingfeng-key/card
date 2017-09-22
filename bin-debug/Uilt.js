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
        Config.panelLineWidth = 2; //线条宽度
        Config.panelLineColor = 0x00ff00; //线条颜色
        Config.gameName = "极速冒险"; //游戏名称
        Config.StateW = 640; //舞台宽度
        Config.StateH = 1136; //舞台高度
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
         * 画按钮
         * @param x X值
         * @param y Y值
         * @returns {egret.Sprite}
         */
        Tool.drawBtn = function (x, y, w, h, r, textField, btnColor, fontColor, touchEnalb) {
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
                this.stage.width = 640;
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
    //坐标
    var Coordinate;
    (function (Coordinate) {
        Coordinate[Coordinate["x"] = 1] = "x";
        Coordinate[Coordinate["y"] = 2] = "y";
        Coordinate[Coordinate["both"] = 3] = "both";
    })(Coordinate = Uilt.Coordinate || (Uilt.Coordinate = {}));
})(Uilt || (Uilt = {}));
