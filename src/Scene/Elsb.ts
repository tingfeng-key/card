/**
 * Created by feizhugame on 2017/9/28.
 */
module ElsbScene {
    import Tool = Uilt.Tool;
    import UniltGame = Uilt.UiltGame;
    import Pos = Uilt.Pos;
    import AnchorUtils = Uilt.AnchorUtils;
    import GameStatus = Uilt.GameStatus;
    import LayerConfirm = Uilt.LayerConfirm;

    //背景
    export class BackgRound extends egret.Sprite {
        public constructor() {
            super()
            let bgr: egret.Sprite = Tool.createRoundRect(0, 0, Stage.stageW, Stage.stageH, 0, 0xffffff)
            this.addChild(bgr)
        }
    }

    //游戏主菜单
    export class Menu extends egret.Sprite {
        public gameName: egret.TextField = new egret.TextField; //游戏名称
        public btnGroup: egret.Sprite; //菜单按钮组
        public startBtn: egret.Sprite; //开始游戏按钮
        public explainBtn: egret.Sprite; //操作介绍按钮
        public settingBtn: egret.Sprite; //游戏设置按钮
        public aboutBtn: egret.Sprite; //关于游戏按钮
        private btnColor: number = 0xe0690c; //按钮默认颜色
        private btnRound: number = 10; //默认圆角大小
        private btnHeight: number = 60; //按钮默认高度
        private btnWidth: number = 200; //按钮默认宽度
        private fontColor: number = 0xffffff; //字体颜色
        public constructor() {
            super()
            this.width = Stage.stageW;
            this.height = Stage.stageH;
            this.gameName.width = 400;
            this.gameName.height = 80;
            this.gameName.size = 80;
            this.gameName.text = UniltGame.interval.configMap.gameName;
            this.gameName.fontFamily = "楷体";
            this.gameName.textAlign = "center";
            this.gameName.textColor = this.btnColor;
            this.gameName.x = (Stage.stageW - this.gameName.width)/2;
            this.gameName.y = 300;
            this.addChild(this.gameName);

            this.btnGroup = Tool.createRoundRect((Stage.stageW-this.btnWidth)/2, 500, this.btnWidth,
                (this.btnHeight+20)*4, 10, 0x3bb4f2, true)
            this.addChild(this.btnGroup)

            this.startBtn = Tool.createBtn(0, 0, this.btnWidth, this.btnHeight, this.btnRound, "开始游戏",
                this.btnColor, this.fontColor);
            this.explainBtn = Tool.createBtn(0, (this.btnHeight+20)*1, this.btnWidth, this.btnHeight, this.btnRound,
                "操作介绍", this.btnColor, this.fontColor);
            this.settingBtn = Tool.createBtn(0, (this.btnHeight+20)*2, this.btnWidth, this.btnHeight, this.btnRound,
                "游戏设置", this.btnColor, this.fontColor);
            this.aboutBtn = Tool.createBtn(0, (this.btnHeight+20)*3, this.btnWidth, this.btnHeight, this.btnRound,
                "关于游戏", this.btnColor, this.fontColor);

            this.btnGroup.addChild(this.startBtn)
            this.btnGroup.addChild(this.explainBtn)
            this.btnGroup.addChild(this.settingBtn)
            this.btnGroup.addChild(this.aboutBtn)
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startBtnFunc, this)
            this.explainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.explainBtnFunc, this)
            this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.settingBtnFunc, this)
            this.aboutBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aboutBtnFunc, this)
        }
        public startBtnFunc(): void {
            SceneManager.interval.removeScence(this)
            InitGame.start()
        }
        private explainBtnFunc(): void {

        }
        private settingBtnFunc(): void {

        }
        private aboutBtnFunc(): void {

        }
    }
    //格子容器对象
    export class Grid extends egret.Sprite {

        public static _interval:Grid;
        public static get interval(): Grid{
            return (this._interval || (this._interval = new Grid));
        }

        public constructor() {
            super()
            this.width = Grid.gridItemCols * Grid.gridSize
            this.height = Grid.gridItemRows * Grid.gridSize
            this.x = (Stage.stageW - Grid.gridItemCols * Grid.gridSize) / 2

            let bgr: egret.Sprite = Tool.createRoundRect(0, 0, this.width, this.height, 20, 0xbaac9f)
            this.addChild(bgr)

            this.initGrid()
        }
        /**
         * 获取格子大小
         */
        public static get gridSize(): number {
            let value: number;
            switch (parseInt(UniltGame.interval.configMap.setting.grade)) {
                case 3:
                    value = 210;
                    break;
                case 4:
                    value = 156;
                    break;
                case 5:
                    value = 125;
                    break;
                case 6:
                    value = 105;
                    break
                default:
                    value = 156;
                    break;
            }
            return value;
        }

        //格子总列数
        public static get gridItemCols(): number {
            return UniltGame.interval.configMap.setting.grade;
        }
        //格子总行数
        public static get gridItemRows(): number {
            return UniltGame.interval.configMap.setting.grade
        }
        public static get gridItemSpace(): number {
            return 6
        }
        //距离顶部
        public static get topRow(): number {
            if(parseInt(UniltGame.interval.configMap.setting.grade)>5) return 3;
            return 2;
        }
        //画格子
        public initGrid(): void {
            this.y = Grid.gridSize * Grid.topRow
            for(let x = 0; x < Grid.gridItemCols; x++){
                for (let y = 0; y < Grid.gridItemRows; y++) {
                    let gridItem = Tool.createRoundRect((x * Grid.gridSize), (y * Grid.gridSize),
                        Grid.gridSize-Grid.gridItemSpace, Grid.gridSize-Grid.gridItemSpace, 10, 0xCCC0B1)
                    this.addChild(gridItem)
                }
            }
        }
    }
    //面板
    export class Panel extends egret.Sprite {
        private BestTitleText: egret.TextField = new egret.TextField; //时间标题
        private BestText: egret.TextField = new egret.TextField; //时间
        private scoreTitleText: egret.TextField = new egret.TextField; //分数标题
        private scoreText: egret.TextField = new egret.TextField; //分数
        private BestGroup: egret.Sprite = new egret.Sprite; //时间组
        private scoreGroup: egret.Sprite = new egret.Sprite; //分数组
        public constructor(){
            super()
            this.init()
        }
        public static _interval:Panel;
        public static get interval(): Panel{
            return (this._interval || (this._interval = new Panel))
        }
        //初始化面板
        private init(): void {
            this.width = Stage.stageW
            this.height = Grid.topRow * Grid.gridSize

            this.BestGroup = Tool.createRoundRect(Stage.stageW*3/4, 10, this.width / 4.1, 110, 20,0x739999)

            this.scoreGroup = Tool.createRoundRect(this.width/2, 10, this.width / 4.1, 110, 20,0x739999)

            this.addChild(this.BestGroup)
            this.addChild(this.scoreGroup)

            this.BestTitleText.y = 20
            this.BestTitleText.width = this.BestGroup.width
            this.BestTitleText.text = "Best"
            this.BestTitleText.textAlign = "center"
            this.BestTitleText.fontFamily = UniltGame.interval.configMap.setting.font
            this.BestGroup.addChild(this.BestTitleText)

            this.BestText.y = this.BestTitleText.height + 40
            this.BestText.text = egret.localStorage.getItem("Elsb_Best_score") || "0"
            this.BestText.width = this.BestTitleText.width
            this.BestText.textAlign = "center"
            this.BestText.fontFamily = UniltGame.interval.configMap.setting.font
            this.BestGroup.addChild(this.BestText)

            this.scoreTitleText.y = 20
            this.scoreTitleText.text = "Score "
            this.scoreTitleText.width = this.scoreGroup.width
            this.scoreTitleText.textAlign = "center"
            this.scoreTitleText.fontFamily = UniltGame.interval.configMap.setting.font
            this.scoreGroup.addChild(this.scoreTitleText)

            this.scoreText.y = this.scoreTitleText.height + 40
            this.scoreText.text = "0"
            this.scoreText.width = this.scoreTitleText.width
            this.scoreText.textAlign = "center"
            this.scoreText.fontFamily = UniltGame.interval.configMap.setting.font
            this.scoreGroup.addChild(this.scoreText)

            let gameName: egret.TextField = new egret.TextField
            gameName.textAlign = "center"
            gameName.text = UniltGame.interval.configMap.gameName
            gameName.fontFamily = UniltGame.interval.configMap.setting.font
            gameName.textColor = 0x000000
            gameName.width = this.width/2
            gameName.size = 60
            gameName.height = 110-25
            gameName.y = 10+25
            gameName.lineSpacing = 30
            this.addChild(gameName)

            let desc: egret.TextField = new egret.TextField()
            desc.text = "将相同的数字融合相加，争取获得更高的分数！"
            desc.textColor = 0x000000
            desc.textAlign = "center"
            desc.fontFamily = UniltGame.interval.configMap.setting.font
            desc.width = this.width/2
            desc.size = 30
            desc.y = 120+20
            desc.lineSpacing = 20
            this.addChild(desc)
        }
        //设置分数
        public set score(val: number) {
            UniltGame.interval.incScore(val)
            this.scoreText.text = String(UniltGame.interval.getScore());
            this.setBestScore();
            this.rewardFunc();
        }

        /**
         * 是否达到奖励分数
         */
        private rewardFunc(): void {
            let rewards: any = UiltGame.interval.configMap.setting.rewardArr;
            for (let i = 0; i < rewards.length; i++){
                if(UiltGame.interval.getScore() >= rewards[i].num){
                    let confirm: LayerConfirm = new LayerConfirm,
                        confirmHash = confirm.hashCode;
                    SceneManager.interval.loadScence(confirm)
                    confirm.textMap = Tool.createTextField("您有一份奖励，是否领取？");
                    confirm.btn1Func = () => {
                        egret.localStorage.setItem("Elsb_NumberData", this.numberDataToString());
                        egret.localStorage.setItem("Elsb_NowScore", String(UiltGame.interval.getScore()));
                        if(Tool.isUrl(rewards[i].url)){
                            window.location.href = rewards[i].url
                        }else{
                            SceneManager.interval.removeScenceByHash(confirmHash)
                        }
                    };
                    confirm.btn2Func = () => {
                        SceneManager.interval.removeScenceByHash(confirmHash)
                    };
                    confirm.init();
                    confirm.textMap.y = 100;
                }
            }
        }

        /**
         * 数据转JSON字符串
         * @returns {string}
         */
        private numberDataToString(): string {
            let data: Array<NumberMap> = NumberData.interval.data,
                dataSrting: string = '['
            for (let i = 0; i < data.length; i++){
                dataSrting += '{"value":'+data[i].value+',"posX":'+data[i].posX+',"posY":'+data[i].posY+'},';
            }
            dataSrting = dataSrting.substring(0, dataSrting.length-1)+']';
            return dataSrting;
        }
        //设置时间
        public time() {
            UniltGame.interval.incNowTimeer()
            this.BestText.text = String(UniltGame.interval.getNowTime())
        }

        //重置数据
        public restart(): void {
            this.BestText.text = "0"
            this.scoreText.text = "0"
        }

        /**
         * 设置历史最大分数
         */
        private setBestScore(): void {
            let nowScore: number = UniltGame.interval.getScore();
            if(egret.localStorage.getItem("Elsb_Best_score")){
                let bestScore: number = parseInt(egret.localStorage.getItem("Elsb_Best_score"))
                if(bestScore < nowScore){
                    this.BestText.text = String(nowScore)
                    egret.localStorage.setItem("Elsb_Best_score", String(nowScore))
                }
            }else{
                this.BestText.text = String(nowScore)
                egret.localStorage.setItem("Elsb_Best_score", String(nowScore))
            }
        }
    }
    //游戏结束面板
    export class GameOver extends egret.Sprite {
        public maskMap: egret.Shape = new egret.Shape() //遮罩
        public group: egret.Sprite = new egret.Sprite() //组件
        public restartBtn: egret.Sprite //重新开始按钮
        public constructor(){
            super()
            this.width = Stage.stageW
            this.height = Stage.stageH
            this.init()
        }

        //初始化
        private init(): void {
            this.x = 0
            this.y = 0
            this.maskMap.graphics.beginFill( 0x000 )
            this.maskMap.graphics.drawRect( 0,0,this.width,this.height)
            this.maskMap.graphics.endFill()
            this.maskMap.alpha = 0.6
            this.addChild( this.maskMap )

            //面板
            this.group.width = 400
            this.group.height = 300
            this.group.alpha = 0
            this.group.x = (Stage.stageW-this.group.width)/2
            this.group.y = (Stage.stageH-this.group.height)/2
            this.group.graphics.beginFill(0x3bb4f2)
            this.group.graphics.drawRoundRect( 0, 0, this.group.width, this.group.height, 10, 10)
            this.group.graphics.endFill()
            this.addChild(this.group)

            //重新开始按钮
            this.restartBtn = Tool.createBtn(
                100, this.group.height-90, 200, 60, 10,
                "重新开始", 0xe0690c, 0xffffff)
            this.group.addChild(this.restartBtn)
            this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartFunc, this)

            //分数
            let scoreTitleText: egret.TextField = new egret.TextField()
            scoreTitleText.y = 60
            scoreTitleText.width = this.group.width
            scoreTitleText.text = "分数"
            scoreTitleText.textAlign = "center"
            let scoreText: egret.TextField = new egret.TextField()
            scoreText.width = scoreTitleText.width
            scoreText.y = scoreTitleText.y+60
            scoreText.textAlign = "center"
            scoreText.text = String(UniltGame.interval.getScore())
            this.group.addChild(scoreTitleText)
            this.group.addChild(scoreText)

            //显示、抖动效果
            egret.Tween.get(this.group).to({
                alpha: 1
            }, 1000, egret.Ease.circOut).wait(300).to({
                x: this.group.x-10
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x+10
            }, 50, egret.Ease.backInOut).to({
                x: this.group.x
            }, 50, egret.Ease.backInOut).call((group)=>{
                egret.Tween.removeTweens(group)
            }, this, [this.group])
        }

        //重新开始按钮点击事件
        private restartFunc(e: egret.Event){
            this.restartBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restartFunc, this)
            //重置数据
            UniltGame.interval.restart()
            SceneManager.interval.removeAllScence()
            Panel._interval = null
            Grid._interval = null
            NumberData._interval = null;
            SceneManager.interval.loadScence(new BackgRound())
            SceneManager.interval.loadScence(Panel.interval)
            SceneManager.interval.loadScence(Grid.interval) //加载游戏格子场景
            SceneManager.interval.loadScence(NumberData.interval) //加载游戏数据场景
        }
    }
    //数字数据操作
    export class NumberData extends egret.Sprite {
        public data: Array<NumberMap> = [] //数组
        private keyMap: KeyBoard;
        public static _interval: NumberData;
        public static get interval(): NumberData {
            return this._interval || (this._interval = new NumberData);
        }
        public constructor() {
            super()
            this.x = Grid.interval.x
            this.y = Grid.interval.y
            this.width = Grid.interval.width
            this.height = Grid.interval.height
            /*let sprite: NumberMap = new NumberMap(0, 0, 16)
            this.data.push(sprite)
            this.addChild(sprite)*/
            /*this.createOne()
            this.createOne()*/

            this.keyMap = new KeyBoard();
            //添加监听事件
            this.keyMap.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);
        }

        /**
         * 键盘按下事件
         * @param event
         */
        private onkeydown(event) {
            if(this.gameStatusIsRun() && this.keyMap.isContain(event.data, KeyBoard.DownArrow)){
                this.down()
            } else if(this.gameStatusIsRun() && this.keyMap.isContain(event.data, KeyBoard.UpArrow)){
                this.up()
            } else if(this.gameStatusIsRun() && this.keyMap.isContain(event.data, KeyBoard.RightArrow)){
                this.right()
            } else if(this.gameStatusIsRun() && this.keyMap.isContain(event.data, KeyBoard.keyArrow)){
                this.left()
            }
        }

        /**
         * 检测游戏状态是否为运行时状态
         * @returns {boolean}
         */
        private gameStatusIsRun(): boolean {
            return UniltGame.interval.getGameStatus() === GameStatus.Start
        }

        /**
         * 下移
         */
        private down(): void {
            let data: Array<NumberMap> = this.dataYSortAsc(),
                removeArr: Array<NumberMap> = [],
                moveArr: Array<NumberMap> = []
            for(let i = (data.length-1); i >= 0; i--){
                let length: number = this.moveLength(data[i], data, KeyBoard.DownArrow),
                    newPosY: number = data[i].posY+length,
                    nextGrid: NumberMap = this.getNumberMap(data[i].posX, newPosY+1)
                if(nextGrid !== null && nextGrid.value === data[i].value && !nextGrid.isRemove && !nextGrid.isInc) {
                    data[i].posY += length+1
                    removeArr.push(nextGrid)
                    data[i].isInc = true
                    nextGrid.isRemove = true
                }else{
                    data[i].posY += length
                }
                moveArr.push(data[i])
            }
            this.moveAndRemove(moveArr, removeArr);
        }

        /**
         * 上移
         */
        private up(): void {
            let data: Array<NumberMap> = this.dataYSortDesc(),
                removeArr: Array<NumberMap> = [],
                moveArr: Array<NumberMap> = []
            for(let i = (data.length-1); i >= 0; i--){
                let length: number = this.moveLength(data[i], data, KeyBoard.UpArrow),
                    newPosY: number = data[i].posY-length,
                    nextGrid: NumberMap = this.getNumberMap(data[i].posX, newPosY-1)
                if(nextGrid !== null && nextGrid.value === data[i].value && !nextGrid.isRemove && !nextGrid.isInc) {
                    data[i].posY -= length+1
                    removeArr.push(nextGrid)
                    data[i].isInc = true
                    nextGrid.isRemove = true
                }else{
                    data[i].posY -= length
                }
                moveArr.push(data[i])
            }
            this.moveAndRemove(moveArr, removeArr);
        }

        /**
         * 左移
         */
        private left(): void {
            let data: Array<NumberMap> = this.dataXSortDesc(),
                removeArr: Array<NumberMap> = [],
                moveArr: Array<NumberMap> = []
            for (let i = (data.length-1); i >= 0; i--){
                let length: number = this.moveLength(data[i], data, KeyBoard.keyArrow),
                    newPosX: number = data[i].posX-length,
                    nextGrid: NumberMap = this.getNumberMap(newPosX-1, data[i].posY)
                if(nextGrid !== null && nextGrid.value === data[i].value && !nextGrid.isRemove && !nextGrid.isInc) {
                    data[i].posX -= length+1
                    removeArr.push(nextGrid)
                    data[i].isInc = true
                    nextGrid.isRemove = true
                }else{
                    data[i].posX -= length
                }
                moveArr.push(data[i])
            }
            this.moveAndRemove(moveArr, removeArr);
        }

        /**
         * 右移
         */
        private right(): void {
            let data: Array<NumberMap> = this.dataXSortAsc(),
                removeArr: Array<NumberMap> = [],
                moveArr: Array<NumberMap> = []
            for (let i = (data.length-1); i >= 0; i--){
                let length: number = this.moveLength(data[i], data, KeyBoard.RightArrow),
                    newPosX: number = data[i].posX+length,
                    nextGrid: NumberMap = this.getNumberMap(newPosX+1, data[i].posY)
                if(nextGrid !== null && nextGrid.value === data[i].value && !nextGrid.isRemove && !nextGrid.isInc) {
                    data[i].posX += length+1
                    removeArr.push(nextGrid)
                    data[i].isInc = true
                    nextGrid.isRemove = true
                }else{
                    data[i].posX += length
                }
                moveArr.push(data[i])
            }
            this.moveAndRemove(moveArr, removeArr);
        }

        /**
         * 移动和消除方块
         * @param moveArr 移动的方块组
         * @param removeArr 消除的方块组
         */
        private moveAndRemove(moveArr: Array<NumberMap>, removeArr: Array<NumberMap>): void {
            let createOneMap: boolean = false;
            for(let i = 0; i < moveArr.length; i++){
                if(
                    moveArr[i].x !== NumberMap.pos(moveArr[i].posX) ||
                    moveArr[i].y !== NumberMap.pos(moveArr[i].posY)
                ) createOneMap = true;
                let tw: egret.Tween = egret.Tween.get(moveArr[i])
                if(moveArr[i].isInc){
                    moveArr[i].timeVal *= 2
                    tw.to({
                        x: NumberMap.pos(moveArr[i].posX),
                        y: NumberMap.pos(moveArr[i].posY),
                        scaleX: 0.5,
                        scaleY: 0.5,
                    }, 200, egret.Ease.circInOut);
                    tw.call((target)=>{
                        target.intValue()
                    }, this, [moveArr[i]]);
                    tw.to({
                        scaleX: 1,
                        scaleY: 1
                    }, 400, egret.Ease.circInOut);
                }else{
                    tw.to({
                        x: NumberMap.pos(moveArr[i].posX),
                        y: NumberMap.pos(moveArr[i].posY)
                    }, 100, egret.Ease.circInOut)
                }
                moveArr[i].isInc = false
            }
            for(let i = 0; i < removeArr.length; i++){
                let tws: egret.Tween = egret.Tween.get(removeArr[i])
                tws.to({
                    scaleX: 0,
                    scaleY: 0
                }, 300);
                tws.call((map) => {
                    this.removeChild(map)
                }, this, [removeArr[i]]);
                this.removeMap(removeArr[i]);
            }
            if(!this.gameOver() && createOneMap){
                this.createOne()
            }
            if(this.gameOver()){
                UniltGame.interval.setGameStatus(GameStatus.Died)
                SceneManager.interval.loadScence(new GameOver)
            }
        }

        /**
         * 是否可以移动
         * @param data 数据组合
         * @param PosX 位置X
         * @param PosY 位置Y
         * @returns {number}
         */
        private isCanIncY(data: Array<NumberMap>, PosX: number, PosY: number) {
            for(let i = 0; i < data.length; i++){
                if(PosX === data[i].posX && PosY > data[i].posY){
                    return data[i].value
                }
            }
        }

        /**
         * 游戏是否结束
         * @returns {boolean}
         */
        private gameOver(): boolean {
            if(this.getEmptyGrids().length > 0) return false;
            let data: Array<NumberMap> = this.data;
            for(let i = 0; i < data.length; i++){
                if(this.isCanMerge(data[i])) return false;
            }
            return true;
        }

        /**
         * 检测是否可以合并
         * @param map
         * @returns {boolean}
         */
        private isCanMerge(map: NumberMap): boolean {
            let maps: Array<NumberMap> = [
                this.getNumberMap(map.posX, map.posY-1),
                this.getNumberMap(map.posX, map.posY+1),
                this.getNumberMap(map.posX-1, map.posY),
                this.getNumberMap(map.posX+1, map.posY)
            ];
            for(let i = 0; i < maps.length; i++){
                if(maps[i]!==null && maps[i].timeVal === map.timeVal){
                    return true;
                }
            }
            return false;
        }

        /**
         * 移动的数值
         * @param map 当前对象
         * @param data 排序后的对象组
         * @param type 操作类型
         * @returns {number}
         */
        private moveLength(map: NumberMap, data: Array<NumberMap>, type: string){
            switch (type){
                case KeyBoard.keyArrow: //左移
                    for (let i = 0; i < data.length; i++){
                        if(map.posY===data[i].posY && map.posX > data[i].posX){
                            return Math.abs(data[i].posX-map.posX)-1
                        }
                    }
                    return map.posX
                case KeyBoard.RightArrow: //右移
                    for (let i = 0; i < data.length; i++){
                        if(map.posY===data[i].posY && map.posX < data[i].posX){
                            return Math.abs(data[i].posX-map.posX)-1
                        }
                    }
                    return Grid.gridItemCols-map.posX-1
                case KeyBoard.UpArrow: //上移
                    for (let i = 0; i < data.length; i++){
                        if(map.posX===data[i].posX && map.posY > data[i].posY){
                            return Math.abs(data[i].posY-map.posY)-1
                        }
                    }
                    return map.posY
                case KeyBoard.DownArrow: //下移
                    for (let i = 0; i < data.length; i++){
                        if(map.posX===data[i].posX && map.posY < data[i].posY){
                            return Math.abs(data[i].posY-map.posY)-1
                        }
                    }
                    return Grid.gridItemRows-map.posY-1
            }
        }

        /**
         * 根据posX和posY值获取对象
         * @param posX
         * @param posY
         * @returns {any}
         */
        private getNumberMap(posX: number, posY: number): NumberMap {
            for(let i = 0; i < this.data.length; i++){
                if(this.data[i].posX === posX && this.data[i].posY === posY){
                    return this.data[i]
                }
            }
            return null
        }
        /**
         * 从数组中移除对象
         * @param map
         */
        private removeMap(map: NumberMap): void {
            for(let i = 0; i < this.data.length; i++){
                if(this.data[i].hashCode === map.hashCode){
                    this.data.splice(i, 1)
                    return
                }
            }
        }

        /**
         * X轴排序--升序
         * @returns {Array<NumberMap>}
         */
        private dataXSortAsc(): Array<NumberMap> {
            let ascArr: Array<NumberMap> = this.data
            for(let i = 1; i < ascArr.length; i++){
                for(let j = 0; j < ascArr.length-i; j++){
                    if(ascArr[j].posX > ascArr[j+1].posX){
                        let temp: NumberMap = ascArr[j]
                        ascArr[j] = ascArr[j+1]
                        ascArr[j+1] = temp
                    }
                }
            }
            return ascArr;
        }

        /**
         * X轴排序--倒叙
         * @returns {Array<NumberMap>}
         */
        private dataXSortDesc(): Array<NumberMap> {
            let ascArr: Array<NumberMap> = this.data
            for(let i = 1; i < ascArr.length; i++){
                for(let j = 0; j < ascArr.length-i; j++){
                    if(ascArr[j].posX < ascArr[j+1].posX){
                        let temp: NumberMap = ascArr[j]
                        ascArr[j] = ascArr[j+1]
                        ascArr[j+1] = temp
                    }
                }
            }
            return ascArr;
        }

        /**
         * Y轴排序--升序
         * @returns {Array<NumberMap>}
         */
        private dataYSortAsc(): Array<NumberMap> {
            let ascArr: Array<NumberMap> = this.data
            for(let i = 1; i < ascArr.length; i++){
                for(let j = 0; j < ascArr.length-i; j++){
                    if(ascArr[j].posY > ascArr[j+1].posY){
                        let temp: NumberMap = ascArr[j]
                        ascArr[j] = ascArr[j+1]
                        ascArr[j+1] = temp
                    }
                }
            }
            return ascArr;
        }

        /**
         * Y轴排序--倒叙
         * @returns {Array<NumberMap>}
         */
        private dataYSortDesc(): Array<NumberMap> {
            let ascArr: Array<NumberMap> = this.data
            for(let i = 1; i < ascArr.length; i++){
                for(let j = 0; j < ascArr.length-i; j++){
                    if(ascArr[j].posY < ascArr[j+1].posY){
                        let temp = ascArr[j]
                        ascArr[j] = ascArr[j+1]
                        ascArr[j+1] = temp
                    }
                }
            }
            return ascArr;
        }

        /**
         * 随机生成一个数字元素
         * @returns {number}
         */
        private randCreateOneNumber(): number {
            return (Math.random() > 0.5)?4:2;
        }

        /**
         * 随机返回一个空格子对象
         * @returns {Pos}
         */
        private randGetOneEmptyGrid(): Pos {
            let emptyGird: Array<Pos> = this.getEmptyGrids(),
                length: number = emptyGird.length,
                index = Math.floor(Math.random()*length)
            return emptyGird[index];
        }

        /**
         * 创建单数据
         * @returns {NumberMap}
         */
        public createOne(value: number = null, posX: number = null, posY: number = null): NumberMap {
            let sprite: NumberMap;
            if(value !== null && posX !== null && posY !== null){
                sprite = new NumberMap(posX, posY, value)
            }else{
                let emptyGrid1: Pos = this.randGetOneEmptyGrid()
                sprite = new NumberMap(emptyGrid1.posX, emptyGrid1.posY, this.randCreateOneNumber())
            }
            this.data.push(sprite)
            //sprite.alpha = 0
            sprite.scaleX = 0
            sprite.scaleY = 0
            this.addChild(sprite)
            let tw: egret.Tween = egret.Tween.get(sprite)
            tw.to({
                scaleX: 1,
                scaleY: 1
            }, 400)
            return sprite
        }

        /**
         * 获取所有空格子
         * @returns {Array<Pos>}
         */
        public getEmptyGrids(): Array<Pos> {
            let arr: Array<Pos> = []
            for(let x = 0; x < Grid.gridItemCols; x++){
                for (let y = 0; y < Grid.gridItemRows; y++) {
                    if(!this.isPos(x,y)){
                        arr.push(new Pos(x, y))
                    }
                }
            }
            return arr;
        }

        /**
         * 格子是否被占用
         * @param x
         * @param y
         * @returns {boolean}
         */
        public isPos(x, y): boolean {
            for(let i = 0; i < this.data.length; i++){
                if(this.data[i].posX === x && this.data[i].posY === y) return true;
            }
            return false;
        }
    }

    /**
     * 数字单对象
     */
    export class NumberMap extends egret.Sprite {
        public posX: number = 0;        //数字位置X值
        public posY: number = 0;        //数字位置Y值
        public timeVal: number;         //处理时间差值
        public value: number;           //数字值
        public isInc: boolean = false;  //是否倍增数字
        public isRemove: boolean = false; //是否移除
        public backgroundMap: egret.Sprite = new egret.Sprite; //数字背景对象
        public numberMap: egret.TextField = new egret.TextField; //数字内容对象
        public constructor(posX: number, posY: number, value: number) {
            super()
            this.posX = posX
            this.posY = posY
            this.value = value
            this.timeVal = value
            this.width = Grid.gridSize-Grid.gridItemSpace
            this.height = Grid.gridSize-Grid.gridItemSpace
            this.x = NumberMap.pos(this.posX)
            this.y = NumberMap.pos(this.posY)
            this.anchorOffsetX = this.width*0.5
            this.anchorOffsetY = this.height*0.5
            this.backgroundMap.addChild(this.numberMap)
            this.addChild(this.backgroundMap)
            this.setBackgroundMap = this.value
            this.setColor = this.value
        }

        /**
         * 位置转换
         * @param value
         * @returns {number}
         */
        public static pos(value: number): number {
            return value*Grid.gridSize+(Grid.gridSize-Grid.gridItemSpace)*0.5
        }

        /**
         * 设置数字背景颜色
         * @param value
         */
        public set setBackgroundMap(value: number) {
            this.backgroundMap.x = this.$getWidth()*0.5
            this.backgroundMap.y = this.$getHeight()*0.5
            this.backgroundMap.anchorOffsetY = this.$getHeight()*0.5
            this.backgroundMap.anchorOffsetX = this.$getWidth()*0.5
            this.backgroundMap.graphics.beginFill(Skin.backgroundColor(value))
            this.backgroundMap.graphics.drawRoundRect(0, 0, this.width, this.height, 10)
            this.backgroundMap.graphics.endFill()
        }

        /**
         * 设置数字颜色
         * @param value
         */
        public set setColor(value: number) {
            this.numberMap.text = String(value)
            this.numberMap.bold = true
            this.numberMap.textColor = Skin.numberColor(value)
            this.numberMap.width = this.width
            this.numberMap.textAlign = "center"
            this.numberMap.size = Skin.numberSize(value)
            this.numberMap.fontFamily = UniltGame.interval.configMap.setting.font
            this.numberMap.y = (this.backgroundMap.height-this.numberMap.size)*0.5
        }

        /**
         * 数值翻倍
         */
        public intValue(): void {
            this.value *= 2
            Panel.interval.score = this.value
            this.setColor = this.value
            this.setBackgroundMap = this.value
        }
    }

    //皮肤处理方式
    export class Skin {
        /**
         * 数字背景颜色
         * @param value
         * @returns {number}
         */
        public static backgroundColor(value: number): number {
            switch (UniltGame.interval.configMap.setting.skin){
                case 1:
                    return this.bgrc1(value)
                case 2:
                    return this.bgrc2(value)
                case 3:
                    return this.bgrc3(value)
                case 4:
                    return this.bgrc4(value)
                default:
                    return this.bgrc1(value)
            }
        }
        //数字背景皮肤
        private static bgrc1(value: number): number {
            switch (value) {
                case 2:return 0xefe5db;
                case 4:return 0xecdfc8;
                case 8:return 0xff9661;
                case 16:return 0xf39764;
                case 32:return 0xf3804f;
                case 64:return 0xfa5738;
                case 128:return 0xf0cd77;
                case 256:return 0xf0d062;
                case 512:return 0xeec74e;
                case 1024:return 0xe6b20d;
                case 2048:return 0xc0950b;
                case 4096:return 0x9b7e22;
                case 8192:return 0x9b7e22;
                default:return 0xa76909;
            }
        }
        private static bgrc2(value: number): number {
            switch (value) {
                case 2:return 0xfdfbf3;
                case 4:return 0xfff9e7;
                case 8:return 0xffffd9;
                case 16:return 0xffffcc;
                case 32:return 0xffffbf;
                case 64:return 0xe6fabe;
                case 128:return 0xccffcc;
                case 256:return 0xccf7bc;
                case 512:return 0xd9ffb2;
                case 1024:return 0xc9e5ac;
                case 2048:return 0xace5ac;
                case 4096:return 0x96e1bc;
                case 8192:return 0x99cccc;
                case 16384:return 0x739999;
            }
        }
        private static bgrc3(value: number): number {
            switch (value) {
                case 2:return 0xffffcc;
                case 4:return 0xffff99;
                case 8:return 0xffcc99;
                case 16:return 0xf3c190;
                case 32:return 0xe8e874;
                case 64:return 0xcccc33;
                case 128:return 0x99cc00;
                case 256:return 0x99cc99;
                case 512:return 0x94c494;
                case 1024:return 0x7eb57e;
                case 2048:return 0x71aa85;
                case 4096:return 0x71aa9d;
                case 8192:return 0x5e9387;
                default:return 0x283739;
            }
        }
        private static bgrc4(value: number): number {
            switch (value) {
                case 2:return 0xe9e3d3;
                case 4:return 0xf2e4c7;
                case 8:return 0xffffd9;
                case 16:return 0xf5f5cf;
                case 32:return 0xfae6bd;
                case 64:return 0xf2d69d;
                case 128:return 0xf4d088;
                case 256:return 0xe1be77;
                case 512:return 0xcca962;
                case 1024:return 0xba8941;
                case 2048:return 0xa87d3e;
                case 4096:return 0x946f38;
                case 8192:return 0x755a32;
                default:return 0x4c3a1f;
            }
        }

        /**
         * 数字颜色
         * @param value
         * @returns {number}
         */
        public static numberColor(value: number): number {
            switch (UniltGame.interval.configMap.setting.skin){
                case 1:
                    return this.color1(value)
                case 2:
                    return this.color2(value)
                case 3:
                    return this.color3(value)
                case 4:
                    return this.color4(value)
                default:
                    return this.color1(value)
            }
        }
        //数字颜色皮肤
        private static color1(value: number): number {
            if( value > 0 && value <= 4 ){
                return 0x7a7067;
            }else if( value > 4 && value <= 512 ){
                return 0xfef1e1;
            }else if( value > 512){
                return 0xfaffff;
            }
        }
        private static color2(value: number): number {
            if( value > 0 && value <= 8 ){
                return 0xfa3232;
            }else if( value > 8 && value <= 64 ){
                return 0xd57371;
            }else if( value > 64 && value <= 512 ){
                return 0xfa9c38;
            }else if( value > 512 && value <= 4096 ){
                return 0x8d5f9e;
            }else if( value >= 8192 ){
                return 0xffffff;
            }
        }
        private static color3(value: number): number {
            if( value > 0 && value <= 8 ){
                return 0xf67c60;
            }else if( value > 8 && value <= 32 ){
                return 0xa3af28;
            }
            else if( value >= 64 && value <= 512 ){
                return 0x1d9fbe;
            }else if( value > 512 ){
                return 0xfaffff;
            }
        }
        private static color4(value: number): number {
            if( value > 0 && value <= 4 ){
                return 0x7a7067;
            }else if( value > 4 && value <= 512 ){
                return 0xfef1e1;
            }else if( value > 512){
                return 0xfaffff;
            }
        }

        /**
         * 数字大小皮肤
         * @param value
         * @returns {number}
         */
        public static numberSize(value: number): number {
            switch (UniltGame.interval.configMap.setting.grade){
                case 3:
                    return this.font3(value)
                case 4:
                    return this.font4(value)
                case 5:
                    return this.font5(value)
                case 6:
                    return this.font6(value)
                default:
                    return this.font3(value)
            }
        }
        //等级数字大小
        private static font3(value: number): number{
            if( value > 0 && value <= 8 ){
                return 130;
            }else if( value > 8 && value <= 64 ){
                return 110;
            }else if( value > 64 && value <= 512 ){
                return 90;
            }else if( value > 512 && value <= 8192 ){
                return 60;
            }else if( value >= 8192 && value <= 65536 ){
                return 50;
            }else if( value > 65536 ){
                return 50;
            }
        }
        private static font4(value: number): number{
            if( value > 0 && value <= 8 ){
                return 90;
            }else if( value > 8 && value <= 64 ){
                return 90;
            }else if( value > 64 && value <= 512 ){
                return 55;
            }else if( value > 512 && value <= 8192 ){
                return 40;
            }else if( value >= 8192 && value <= 65536 ){
                return 30;
            }else if( value > 65536 ){
                return 25;
            }
        }
        private static font5(value: number): number{
            if( value > 0 && value <= 8 ){
                return 90;
            }else if( value > 8 && value <= 64 ){
                return 70;
            }else if( value > 64 && value <= 512 ){
                return 50;
            }else if( value > 512 && value <= 8192 ){
                return 40;
            }else if( value >= 8192 && value <= 65536 ){
                return 30;
            }else if( value > 65536 ){
                return 30;
            }
        }
        private static font6(value: number): number{
            if( value > 0 && value <= 8 ){
                return 80;
            }else if( value > 8 && value <= 64 ){
                return 60;
            }else if( value > 64 && value <= 512 ){
                return 40;
            }else if( value > 512 && value <= 8192 ){
                return 30;
            }else if( value >= 8192 && value <= 65536 ){
                return 20;
            }else if( value > 65536 ){
                return 20;
            }
        }
    }
}