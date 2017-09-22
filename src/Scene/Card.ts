/**
 * Created by feizhugame on 2017/9/22.
 */
module SceneCard {
    import Stage = Uilt.Stage;
    import Tool = Uilt.Tool;
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
        public btnGroup: egret.Stage //菜单按钮组
        public startBtn: egret.Sprite //开始游戏按钮
        public explainBtn: egret.Sprite //操作介绍按钮
        public settingBtn: egret.Sprite //游戏设置按钮
        public aboutBtn: egret.Sprite //关于游戏按钮
        public constructor() {
            super()
            this.width = Stage.stageW
            this.height = Stage.stageH
            this.btnGroup = Tool.createRoundRect(110, 400, 400, 500, 10, )
        }
    }
}