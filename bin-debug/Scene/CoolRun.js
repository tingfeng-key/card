/**
 * Created by feizhugame on 2017/9/22.
 */
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
var CoolRunScene;
(function (CoolRunScene) {
    var Animation = Uilt.Animation;
    var Round = (function (_super) {
        __extends(Round, _super);
        function Round() {
            var _this = _super.call(this) || this;
            _this.roundArr = [];
            _this.x = 0;
            _this.y = 800;
            _this.width = Stage.stageW;
            _this.height = Stage.stageH - _this.y;
            var round1 = Tool.createRoundRect(0, 0, _this.width + 2, 100, 0, 0xff0000), round2 = Tool.createRoundRect(Stage.stageW + 2, 0, _this.width + 2, 100, 0, 0xff0000);
            _this.roundArr.push(round1);
            _this.roundArr.push(round2);
            _this.addChild(round1);
            _this.addChild(round2);
            _this.timerMap = new egret.Timer(100);
            _this.timerMap.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
            _this.timerMap.start();
            return _this;
        }
        Object.defineProperty(Round, "interval", {
            get: function () {
                return this._interval || (this._interval = new Round);
            },
            enumerable: true,
            configurable: true
        });
        Round.prototype.timerFunc = function () {
            for (var i = 0; i < this.roundArr.length; i++) {
                this.roundArr[i].x -= 2;
                if (this.roundArr[i].x <= -this.width) {
                    this.roundArr[i].x = this.width;
                }
            }
        };
        return Round;
    }(egret.Sprite));
    CoolRunScene.Round = Round;
    __reflect(Round.prototype, "CoolRunScene.Round");
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this) || this;
            _this.isKeyDown = false; //是否按下
            _this.isGo = false; //是否按下
            _this.upSpeed = 0; //向上的速度
            _this.downSpeed = 0; //向下的速度
            _this.goSpeed = 0; //向前的速度
            _this.startY = 715; //地面位置
            RES.addEventListener(ResourceEvent.GROUP_COMPLETE, _this.groupComplete, _this);
            RES.loadGroup("CoolRun");
            _this.y = _this.startY;
            _this.keyMap = new KeyBoard();
            //监听键盘事件
            _this.keyMap.addEventListener(KeyBoard.onkeydown, _this.onkeydown, _this);
            _this.keyMap.addEventListener(KeyBoard.onkeyup, _this.onkeyup, _this);
            _this.timerMap = new egret.Timer(100);
            _this.timerMap.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
            _this.timerMap.start();
            return _this;
        }
        Object.defineProperty(Player, "interval", {
            get: function () {
                return this._interval || (this._interval = new Player);
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.timerFunc = function () {
            if (this.upSpeed > 0) {
                this.y -= this.upSpeed;
                this.upSpeed--;
            }
            else if (this.downSpeed > 0) {
                var nextY = this.y + this.downSpeed;
                if (nextY < this.startY) {
                    this.y += this.downSpeed;
                    this.downSpeed--;
                }
                else if (nextY >= this.startY) {
                    this.y = this.startY;
                    this.downSpeed = 0;
                }
            }
            /*if(this.goSpeed > 0){
                this.x += this.goSpeed;
                this.goSpeed--;
            }*/
        };
        /**
         * 键盘按下事件
         * @param event
         */
        Player.prototype.onkeydown = function (event) {
            if (!this.isKeyDown && this.keyMap.isContain(event.data, KeyBoard.SPACE)) {
                this.isKeyDown = true;
                this.downSpeed += 5;
                this.upSpeed += 5;
            }
            if (this.keyMap.isContain(event.data, KeyBoard.D)) {
                this.x += 5;
            }
        };
        Player.prototype.onkeyup = function (event) {
            if (this.isKeyDown && this.keyMap.isContain(event.data, KeyBoard.SPACE)) {
                this.isKeyDown = false;
            }
            if (this.keyMap.isContain(event.data, KeyBoard.D)) {
                //console.log(4556)
                this.isGo = false;
            }
        };
        Player.prototype.groupComplete = function (e) {
            var am = new Animation("CoolRun_json.spearrun", 3, 100);
            this.addChild(am);
            am.setNextexture("CoolRun_json.spearrun");
            //am.play()
        };
        return Player;
    }(egret.Sprite));
    CoolRunScene.Player = Player;
    __reflect(Player.prototype, "CoolRunScene.Player");
})(CoolRunScene || (CoolRunScene = {}));
