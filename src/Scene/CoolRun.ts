/**
 * Created by feizhugame on 2017/9/22.
 */

module CoolRunScene {
    import Animation = Uilt.Animation;

    export class Round extends egret.Sprite {
        public roundArr: Array<egret.Sprite> = [];
        private timerMap: egret.Timer;
        public static _interval: Round;
        public static get interval(): Round {
            return this._interval || (this._interval = new Round)
        }
        public constructor() {
            super()
            this.x = 0;
            this.y = 800;
            this.width = Stage.stageW;
            this.height = Stage.stageH-this.y;
            let round1: egret.Sprite = Tool.createRoundRect(0,0, this.width+2, 100,
                    0, 0xff0000),
                round2: egret.Sprite = Tool.createRoundRect(Stage.stageW+2,0, this.width+2, 100,
                    0, 0xff0000)
            this.roundArr.push(round1);
            this.roundArr.push(round2);
            this.addChild(round1);
            this.addChild(round2);

            this.timerMap = new egret.Timer(100);
            this.timerMap.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timerMap.start();
        }

        public timerFunc(): void {
            for (let i = 0; i < this.roundArr.length; i++){
                this.roundArr[i].x -= 2;
                if(this.roundArr[i].x <= -this.width){
                    this.roundArr[i].x = this.width;
                }
            }
        }
    }
    export class Player extends egret.Sprite {
        private keyMap: KeyBoard;//按键对象
        private isKeyDown: boolean = false; //是否按下
        private isGo: boolean = false; //是否按下
        private upSpeed: number = 0; //向上的速度
        private downSpeed: number = 0; //向下的速度
        private goSpeed: number = 0; //向前的速度
        private startY: number = 715; //地面位置
        private timerMap: egret.Timer; //定时器对象
        public static _interval: Player;
        public static get interval(): Player {
            return this._interval || (this._interval = new Player)
        }
        public constructor() {
            super();
            RES.addEventListener(ResourceEvent.GROUP_COMPLETE, this.groupComplete, this);
            RES.loadGroup("CoolRun");
            this.y = this.startY;

            this.keyMap = new KeyBoard();
            //监听键盘事件
            this.keyMap.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);
            this.keyMap.addEventListener(KeyBoard.onkeyup,this.onkeyup,this);

            this.timerMap = new egret.Timer(100);
            this.timerMap.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timerMap.start();
        }

        private timerFunc(): void {
            if(this.upSpeed > 0){
                this.y -= this.upSpeed;
                this.upSpeed--;
            }else if(this.downSpeed > 0){
                let nextY: number = this.y+this.downSpeed;
                if(nextY < this.startY){
                    this.y += this.downSpeed;
                    this.downSpeed--;
                }else if(nextY >= this.startY){
                    this.y = this.startY;
                    this.downSpeed = 0;
                }
            }
            /*if(this.goSpeed > 0){
                this.x += this.goSpeed;
                this.goSpeed--;
            }*/
        }

        /**
         * 键盘按下事件
         * @param event
         */
        private onkeydown(event) {
            if(!this.isKeyDown && this.keyMap.isContain(event.data, KeyBoard.SPACE)){
                this.isKeyDown = true;
                this.downSpeed  += 5;
                this.upSpeed += 5;
            }
            if(this.keyMap.isContain(event.data, KeyBoard.D)){
                this.x += 5;
            }
        }

        private onkeyup(event) {
            if(this.isKeyDown && this.keyMap.isContain(event.data, KeyBoard.SPACE)){
                this.isKeyDown = false;
            }
            if(this.keyMap.isContain(event.data, KeyBoard.D)){
                //console.log(4556)
                this.isGo = false;
            }
        }

        private groupComplete(e): void {
            let am: Animation = new Animation("CoolRun_json.spearrun", 3, 100);
            this.addChild(am);
            am.setNextexture("CoolRun_json.spearrun");
            //am.play()
        }
    }
}