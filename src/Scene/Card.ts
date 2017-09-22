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
        private init(): void {

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
        }
    }
}