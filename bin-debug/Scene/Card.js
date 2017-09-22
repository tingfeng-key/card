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
/**
 * Created by feizhugame on 2017/9/22.
 */
var SceneCard;
(function (SceneCard) {
    var Stage = Uilt.Stage;
    var Tool = Uilt.Tool;
    var Config = Uilt.Config;
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            var _this = _super.call(this) || this;
            _this.speed = 0; //速度
            _this.wheelWidth = 30;
            _this.wheelHeight = 45;
            _this.wheelColor = 0x111111;
            _this.wheelRound = 10;
            _this.bodyWidth = 200;
            _this.bodyLength = 25;
            _this.bodyColor = 0xDEE0E2;
            _this.body = new egret.Sprite();
            _this.init();
            return _this;
        }
        Object.defineProperty(Card, "interval", {
            get: function () {
                return (this._interval || (this._interval = new Card));
            },
            enumerable: true,
            configurable: true
        });
        Card.prototype.init = function () {
            this.x = 200;
            this.y = 600;
            this.width = this.bodyWidth + 50;
            this.height = this.bodyLength + 50;
            this.frontLeftWheel = Tool.createRoundRect(0, 0, this.wheelWidth, this.wheelHeight, this.wheelRound, this.wheelColor);
            this.frontRightWheel = Tool.createRoundRect(this.bodyWidth - 10, 0, this.wheelWidth, this.wheelHeight, this.wheelRound, this.wheelColor);
            this.backLeftWheel = Tool.createRoundRect(0, this.bodyLength, this.wheelWidth, this.wheelHeight, this.wheelRound, this.wheelColor);
            this.backRightWheel = Tool.createRoundRect(this.bodyWidth, this.bodyLength, this.wheelWidth, this.wheelHeight, this.wheelRound, this.wheelColor);
            this.addChild(this.frontLeftWheel);
            this.addChild(this.frontRightWheel);
            this.addChild(this.backLeftWheel);
            this.addChild(this.backRightWheel);
            this.addChild(this.body);
            var body1 = new egret.Shape;
            body1.graphics.lineStyle(1, this.bodyColor);
            body1.graphics.beginFill(this.bodyColor);
            body1.graphics.moveTo(20, -20);
            body1.graphics.lineTo(this.bodyWidth, -20);
            body1.graphics.lineTo(this.bodyWidth + 20, this.bodyLength);
            body1.graphics.lineTo(0, this.bodyLength);
            body1.graphics.lineTo(0, this.bodyLength);
            body1.graphics.lineTo(20, -20);
            this.body.addChild(body1);
            var body2 = Tool.createRoundRect(0, this.bodyLength, this.bodyWidth + 20, 35, 10, this.bodyColor);
            this.body.addChild(body2);
            var point1 = Tool.createCircle(0 + 20, this.bodyLength + 20, 10, 0xFF9166);
            var point2 = Tool.createCircle(this.bodyWidth, this.bodyLength + 20, 10, 0xFF9166);
            this.body.addChild(point1);
            this.body.addChild(point2);
            var tail1 = Tool.createRoundRect((this.bodyWidth / 2 - 40), this.bodyLength - 15, 80, 15, 20, 0x474747);
            this.body.addChild(tail1);
            var tail2 = Tool.createRoundRect(0, this.bodyLength - 30, this.bodyWidth + 20, 15, 20, 0x474747);
            this.body.addChild(tail2);
        };
        Card.prototype.createWheel = function () {
            var wheel = new egret.Sprite();
            wheel.graphics.beginFill(this.wheelColor);
            wheel.graphics.endFill();
            return wheel;
        };
        return Card;
    }(egret.Sprite));
    SceneCard.Card = Card;
    __reflect(Card.prototype, "SceneCard.Card");
    //游戏主菜单
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            var _this = _super.call(this) || this;
            _this.gameName = new egret.TextField; //游戏名称
            _this.btnColor = 0xe0690c; //按钮默认颜色
            _this.btnRound = 10; //默认圆角大小
            _this.btnHeight = 60; //按钮默认高度
            _this.btnWidth = 200; //按钮默认宽度
            _this.fontColor = 0xffffff; //字体颜色
            _this.width = Stage.stageW;
            _this.height = Stage.stageH;
            _this.gameName.width = 400;
            _this.gameName.height = 80;
            _this.gameName.size = 80;
            _this.gameName.text = Config.gameName;
            _this.gameName.fontFamily = "楷体";
            _this.gameName.textAlign = "center";
            _this.gameName.textColor = _this.btnColor;
            _this.gameName.x = (Stage.stageW - _this.gameName.width) / 2;
            _this.gameName.y = 300;
            _this.addChild(_this.gameName);
            _this.btnGroup = Tool.createRoundRect((Stage.stageW - _this.btnWidth) / 2, 500, _this.btnWidth, (_this.btnHeight + 20) * 4, 10, 0x3bb4f2, true);
            _this.addChild(_this.btnGroup);
            _this.startBtn = Tool.createBtn(0, 0, _this.btnWidth, _this.btnHeight, _this.btnRound, "开始游戏", _this.btnColor, _this.fontColor);
            _this.explainBtn = Tool.createBtn(0, (_this.btnHeight + 20) * 1, _this.btnWidth, _this.btnHeight, _this.btnRound, "操作介绍", _this.btnColor, _this.fontColor);
            _this.settingBtn = Tool.createBtn(0, (_this.btnHeight + 20) * 2, _this.btnWidth, _this.btnHeight, _this.btnRound, "游戏设置", _this.btnColor, _this.fontColor);
            _this.aboutBtn = Tool.createBtn(0, (_this.btnHeight + 20) * 3, _this.btnWidth, _this.btnHeight, _this.btnRound, "关于游戏", _this.btnColor, _this.fontColor);
            _this.btnGroup.addChild(_this.startBtn);
            _this.btnGroup.addChild(_this.explainBtn);
            _this.btnGroup.addChild(_this.settingBtn);
            _this.btnGroup.addChild(_this.aboutBtn);
            _this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.startBtnFunc, _this);
            _this.explainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.explainBtnFunc, _this);
            _this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.settingBtnFunc, _this);
            _this.aboutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.aboutBtnFunc, _this);
            return _this;
        }
        Menu.prototype.startBtnFunc = function () {
        };
        Menu.prototype.explainBtnFunc = function () {
        };
        Menu.prototype.settingBtnFunc = function () {
        };
        Menu.prototype.aboutBtnFunc = function () {
        };
        return Menu;
    }(egret.Sprite));
    SceneCard.Menu = Menu;
    __reflect(Menu.prototype, "SceneCard.Menu");
})(SceneCard || (SceneCard = {}));
