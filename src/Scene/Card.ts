/**
 * Created by feizhugame on 2017/9/22.
 */
module SceneCard {
    import Stage = Uilt.Stage;
    import Tool = Uilt.Tool;
    import Config = Uilt.Config;
    export class Card extends egret.Sprite {
        public static _interval:Card;
        public static get interval(): Card {
            return (this._interval || (this._interval = new Card));
        }
        public speed: number = 0 //速度
        //轮子
        public frontLeftWheel: egret.Sprite
        public frontRightWheel: egret.Sprite
        public backLeftWheel: egret.Sprite
        public backRightWheel: egret.Sprite
        public wheelWidth: number = 30
        public wheelHeight: number = 45
        public wheelColor: number = 0x111111
        public wheelRound: number = 10
        public bodyWidth: number = 200
        public bodyLength: number = 25
        public bodyColor: number = 0xDEE0E2
        public body: egret.Sprite = new egret.Sprite()

        public constructor() {
            super()
            this.init()
        }
        private init(): void {
            this.x = 200
            this.y = 600
            this.width = this.bodyWidth+50
            this.height = this.bodyLength+50
            this.frontLeftWheel = Tool.createRoundRect(0, 0, this.wheelWidth,
                this.wheelHeight, this.wheelRound, this.wheelColor)
            this.frontRightWheel = Tool.createRoundRect(this.bodyWidth-10, 0, this.wheelWidth,
                this.wheelHeight, this.wheelRound, this.wheelColor)

            this.backLeftWheel = Tool.createRoundRect(0, this.bodyLength, this.wheelWidth,
                this.wheelHeight, this.wheelRound, this.wheelColor)
            this.backRightWheel = Tool.createRoundRect(this.bodyWidth, this.bodyLength, this.wheelWidth,
                this.wheelHeight, this.wheelRound, this.wheelColor)

            this.addChild(this.frontLeftWheel)
            this.addChild(this.frontRightWheel)
            this.addChild(this.backLeftWheel)
            this.addChild(this.backRightWheel)

            this.addChild(this.body)
            let body1: egret.Shape = new egret.Shape
            body1.graphics.lineStyle(1, this.bodyColor)
            body1.graphics.beginFill(this.bodyColor)
            body1.graphics.moveTo(20, -20)
            body1.graphics.lineTo(this.bodyWidth, -20)
            body1.graphics.lineTo(this.bodyWidth+20, this.bodyLength)
            body1.graphics.lineTo(0, this.bodyLength)
            body1.graphics.lineTo(0, this.bodyLength)
            body1.graphics.lineTo(20, -20)
            this.body.addChild(body1)

            let body2: egret.Shape = Tool.createRoundRect(0, this.bodyLength, this.bodyWidth+20, 35,
                10, this.bodyColor)
            this.body.addChild(body2)
            let point1: egret.Shape = Tool.createCircle(0+20, this.bodyLength+20, 10, 0xFF9166)
            let point2: egret.Shape = Tool.createCircle(this.bodyWidth, this.bodyLength+20, 10, 0xFF9166)
            this.body.addChild(point1)
            this.body.addChild(point2)

            let tail1: egret.Sprite = Tool.createRoundRect((this.bodyWidth/2-40), this.bodyLength-15,
                80, 15, 20, 0x474747)
            this.body.addChild(tail1)
            let tail2: egret.Sprite = Tool.createRoundRect(0, this.bodyLength-30, this.bodyWidth+20,
                15, 20, 0x474747)
            this.body.addChild(tail2)
        }

        private createWheel(): egret.Sprite {
            let wheel: egret.Sprite = new egret.Sprite()
            wheel.graphics.beginFill(this.wheelColor)
            wheel.graphics.endFill()

            return wheel
        }
    }
    //游戏主菜单
    export class Menu extends egret.Sprite {
        public gameName: egret.TextField = new egret.TextField //游戏名称
        public btnGroup: egret.Sprite //菜单按钮组
        public startBtn: egret.Sprite //开始游戏按钮
        public explainBtn: egret.Sprite //操作介绍按钮
        public settingBtn: egret.Sprite //游戏设置按钮
        public aboutBtn: egret.Sprite //关于游戏按钮
        private btnColor: number = 0xe0690c //按钮默认颜色
        private btnRound: number = 10 //默认圆角大小
        private btnHeight: number = 60 //按钮默认高度
        private btnWidth: number = 200 //按钮默认宽度
        private fontColor: number = 0xffffff //字体颜色
        public constructor() {
            super()
            this.width = Stage.stageW
            this.height = Stage.stageH
            this.gameName.width = 400
            this.gameName.height = 80
            this.gameName.size = 80
            this.gameName.text = Config.gameName
            this.gameName.fontFamily = "楷体"
            this.gameName.textAlign = "center"
            this.gameName.textColor = this.btnColor
            this.gameName.x = (Stage.stageW - this.gameName.width)/2
            this.gameName.y = 300
            this.addChild(this.gameName)


            this.btnGroup = Tool.createRoundRect((Stage.stageW-this.btnWidth)/2, 500, this.btnWidth, (this.btnHeight+20)*4, 10, 0x3bb4f2, true)
            this.addChild(this.btnGroup)

            this.startBtn = Tool.createBtn(0, 0, this.btnWidth, this.btnHeight, this.btnRound, "开始游戏",
                this.btnColor, this.fontColor)
            this.explainBtn = Tool.createBtn(0, (this.btnHeight+20)*1, this.btnWidth, this.btnHeight, this.btnRound, "操作介绍",
                this.btnColor, this.fontColor)
            this.settingBtn = Tool.createBtn(0, (this.btnHeight+20)*2, this.btnWidth, this.btnHeight, this.btnRound, "游戏设置",
                this.btnColor, this.fontColor)
            this.aboutBtn = Tool.createBtn(0, (this.btnHeight+20)*3, this.btnWidth, this.btnHeight, this.btnRound, "关于游戏",
                this.btnColor, this.fontColor)

            this.btnGroup.addChild(this.startBtn)
            this.btnGroup.addChild(this.explainBtn)
            this.btnGroup.addChild(this.settingBtn)
            this.btnGroup.addChild(this.aboutBtn)
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnFunc, this)
            this.explainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.explainBtnFunc, this)
            this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.settingBtnFunc, this)
            this.aboutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aboutBtnFunc, this)
        }
        private startBtnFunc(): void {

        }
        private explainBtnFunc(): void {

        }
        private settingBtnFunc(): void {

        }
        private aboutBtnFunc(): void {

        }
    }
}