/**
 * Created by feizhugame on 2017/9/22.
 */
module SceneCard {
    import Stage = Uilt.Stage;
    import Tool = Uilt.Tool;
    import AnchorUtils = Uilt.AnchorUtils;
    import UniltGame = Uilt.UiltGame;
    export class Road extends egret.Sprite {
        public constructor() {
            super()
            let road1: egret.Sprite = new egret.Sprite
            road1.x = 100
            road1.y = 640
            let x: number = 200,
                y: number = 200
            road1.graphics.beginFill(0xff0000)
            road1.graphics.moveTo(x, y)
            road1.graphics.lineTo(x+20, y)
            road1.graphics.curveTo(x+100, y+100, x-20, y+300)
            road1.graphics.lineTo(x-120, y+300)
            road1.graphics.curveTo(x+100, y+100, x, y)
            road1.graphics.endFill()
            this.addChild(road1)
        }
    }
    //车子
    export class Card extends egret.Sprite {
        public static _interval:Card;
        public static get interval(): Card {
            return (this._interval || (this._interval = new Card));
        }
        public speed: number = 0 //速度
        //轮子
        public frontLeftWheel: egret.Sprite //左前轮
        public frontRightWheel: egret.Sprite //右前轮
        public backLeftWheel: egret.Sprite //左后轮
        public backRightWheel: egret.Sprite //右后轮
        public wheelWidth: number = 30 //轮胎宽度
        public wheelHeight: number = 60 //轮胎高度
        public wheelColor: number = 0x222222 //轮胎颜色
        public wheelRound: number = 10 //轮胎圆角像素
        public bodyWidth: number = 200 //车身宽度
        public bodyLength: number = 10 //车身高度
        public bodyColor: number = 0xDEE0E2 //车身颜色
        public body: egret.Sprite = new egret.Sprite() //车身容器

        public constructor() {
            super()
            this.init()
        }
        private init(): void {
            this.x = 200
            this.y = 600
            this.width = this.bodyWidth+50
            this.height = this.bodyLength+50
            this.wheels()
            this.bodys()
            this.tail()
        }

        /**
         * 轮胎
         */
        private wheels(): void {
            this.frontLeftWheel = Tool.createRoundRect(30, 0, this.wheelWidth,
                this.wheelHeight, this.wheelRound, this.wheelColor)
            this.frontRightWheel = Tool.createRoundRect(this.bodyWidth-40, 0, this.wheelWidth,
                this.wheelHeight, this.wheelRound, this.wheelColor)

            this.backLeftWheel = Tool.createRoundRect(0, this.bodyLength, this.wheelWidth,
                this.wheelHeight, this.wheelRound, this.wheelColor)
            this.backRightWheel = Tool.createRoundRect(this.bodyWidth-10, this.bodyLength, this.wheelWidth,
                this.wheelHeight, this.wheelRound, this.wheelColor)

            this.addChild(this.frontLeftWheel)
            this.addChild(this.frontRightWheel)
            this.addChild(this.backLeftWheel)
            this.addChild(this.backRightWheel)
        }

        /**
         * 车身
         */
        private bodys(): void {
            this.addChild(this.body)
            //车板
            let body1: egret.Sprite = Tool.createTrapezoid(this.bodyWidth/2+10, this.bodyLength, this.bodyWidth-140, this.bodyWidth, this.bodyLength+20, this.bodyColor)
            this.body.addChild(body1)

            //后面遮挡板
            let body2: egret.Shape = Tool.createRoundRect(-9, this.bodyLength, this.bodyWidth+38, 45,
                25, this.bodyColor)
            this.body.addChild(body2)
            //四个后灯
            let point1: egret.Shape = Tool.createCircle(0+20, this.bodyLength+20, 10, 0xFF9166),
                point2: egret.Shape = Tool.createCircle(0+50, this.bodyLength+20, 10, 0xFF9166),
                point3: egret.Shape = Tool.createCircle(this.bodyWidth-30, this.bodyLength+20, 10, 0xFF9166),
                point4: egret.Shape = Tool.createCircle(this.bodyWidth, this.bodyLength+20, 10, 0xFF9166)
            this.body.addChild(point1)
            this.body.addChild(point2)
            this.body.addChild(point3)
            this.body.addChild(point4)

            //玻璃
            let body3: egret.Sprite = Tool.createTrapezoid(this.bodyWidth/2+10, this.bodyLength-5, this.bodyWidth-120,
                this.bodyWidth-20, this.bodyLength+10, 0xffffff)
            this.body.addChild(body3)

            let body4: egret.Sprite = Tool.createRoundRect((this.bodyWidth-20)/2, this.bodyLength+10, 40, 20, 10, 0xffffff)
            this.body.addChild(body4)
        }

        /**
         * 尾翼
         */
        private tail(): void {
            let tail1: egret.Sprite = Tool.createRoundRect(20, this.bodyLength-15,
                5, 20, 5, 0x474747)
            this.body.addChild(tail1)
            let tail2: egret.Sprite = Tool.createRoundRect(this.bodyWidth-20, this.bodyLength-15,
                5, 20, 5, 0x474747)
            this.body.addChild(tail2)


            let tail3: egret.Sprite = Tool.createRoundRect(0, this.bodyLength-15, this.bodyWidth+20,
                3, 20, 0x474747)
            this.body.addChild(tail3)
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
            this.gameName.text = UniltGame.interval.configMap.gameName
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