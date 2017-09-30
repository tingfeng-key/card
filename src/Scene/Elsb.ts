/**
 * Created by feizhugame on 2017/9/28.
 */
module ElsbScene {
    import Tool = Uilt.Tool;
    import Config = Uilt.Config;
    //菜单
    import UniltGame = Uilt.Game;
    import Pos = Uilt.Pos;
    import AnchorUtils = Uilt.AnchorUtils;
    import GameStatus = Uilt.GameStatus;

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
            SceneManager.interval.removeScence(this)
            SceneManager.interval.loadScence(Grid.interval)
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
            return 156;
        }

        //格子总列数
        public static get gridItemCols(): number {
            return 4;
        }
        //格子总行数
        public static get gridItemRows(): number {
            return 4
        }
        public static get gridItemSpace(): number {
            return 6
        }
        //距离顶部
        public static get topRow(): number {
            return 2
        }
        //画格子
        //public gridMaps: Array<gridMap> = [];
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
        private BestTitleText: egret.TextField = new egret.TextField //时间标题
        private BestText: egret.TextField = new egret.TextField //时间
        private scoreTitleText: egret.TextField = new egret.TextField //分数标题
        private scoreText: egret.TextField = new egret.TextField //分数
        private BestGroup: egret.Sprite = new egret.Sprite //时间组
        private scoreGroup: egret.Sprite = new egret.Sprite //分数组
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
            this.BestTitleText.fontFamily = Config.setting_font
            this.BestGroup.addChild(this.BestTitleText)

            this.BestText.y = this.BestTitleText.height + 40
            this.BestText.text = "0"
            this.BestText.width = this.BestTitleText.width
            this.BestText.textAlign = "center"
            this.BestText.fontFamily = Config.setting_font
            this.BestGroup.addChild(this.BestText)

            this.scoreTitleText.y = 20
            this.scoreTitleText.text = "Score "
            this.scoreTitleText.width = this.scoreGroup.width
            this.scoreTitleText.textAlign = "center"
            this.scoreTitleText.fontFamily = Config.setting_font
            this.scoreGroup.addChild(this.scoreTitleText)

            this.scoreText.y = this.scoreTitleText.height + 40
            this.scoreText.text = "0"
            this.scoreText.width = this.scoreTitleText.width
            this.scoreText.textAlign = "center"
            this.scoreText.fontFamily = Config.setting_font
            this.scoreGroup.addChild(this.scoreText)

            let gameName: egret.TextField = new egret.TextField
            gameName.textAlign = "center"
            gameName.text = Config.gameName
            gameName.fontFamily = Config.setting_font
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
            desc.fontFamily = Config.setting_font
            desc.width = this.width/2
            desc.size = 30
            desc.y = 120+20
            desc.lineSpacing = 20
            this.addChild(desc)
        }
        //设置分数
        public set score(val: number) {
            UniltGame.interval.incScore(val)
            this.scoreText.text = String(UniltGame.interval.getScore())
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
    }
    //数字数据操作
    export class NumberData extends egret.Sprite {
        public data: Array<NumberMap> = [] //数组
        private keyMap: KeyBoard;
        public constructor() {
            super()
            this.x = Grid.interval.x
            this.y = Grid.interval.y
            this.width = Grid.interval.width
            this.height = Grid.interval.height
            this.createOne()
            this.createOne()
            /*let sprite: NumberMap = new NumberMap(3, 0, 8)
            this.data.push(sprite)
            this.addChild(sprite)

            let sprite1: NumberMap = new NumberMap(1, 0, 4)
            this.data.push(sprite1)
            this.addChild(sprite1)
            let sprite2: NumberMap = new NumberMap(0, 0, 4)
            this.data.push(sprite2)
            this.addChild(sprite2)*/

            this.keyMap = new KeyBoard();
            //添加监听事件
            this.keyMap.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);
        }

        /**
         * 键盘按下事件
         * @param event
         */
        private onkeydown(event) {
            if(this.keyMap.isContain(event.data, KeyBoard.DownArrow)){
                this.down()
            } else if(this.keyMap.isContain(event.data, KeyBoard.UpArrow)){
                this.up()
            } else if(this.keyMap.isContain(event.data, KeyBoard.RightArrow)){
                this.right()
            } else if(this.keyMap.isContain(event.data, KeyBoard.keyArrow)){
                this.left()
            }

            if(!this.gameOver()){
                this.createOne()
            }
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
                    nextGrid: NumberMap = this.getNumberMap(data[i].posX, newPosY+1, data[i])
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
                    nextGrid: NumberMap = this.getNumberMap(data[i].posX, newPosY-1, data[i])
                if(nextGrid !== null && nextGrid.value === data[i].value && !nextGrid.isRemove && !nextGrid.isInc) {
                    data[i].posY -= length+1
                    removeArr.push(nextGrid)
                    data[i].isInc = true
                    nextGrid.isRemove = true
                    console.log("me", data[i].posY,data[i].hashCode, nextGrid.hashCode)
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
                    nextGrid: NumberMap = this.getNumberMap(newPosX-1, data[i].posY, data[i])
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
                    nextGrid: NumberMap = this.getNumberMap(newPosX+1, data[i].posY, data[i])
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
            for(let i = 0; i < moveArr.length; i++){
                let tw: egret.Tween = egret.Tween.get(moveArr[i])
                if(moveArr[i].isInc){
                    tw.to({
                        x: NumberMap.pos(moveArr[i].posX),
                        y: NumberMap.pos(moveArr[i].posY),
                        scaleX: 0.5,
                        scaleY: 0.5,
                    }, 200, egret.Ease.circInOut)
                    tw.call((target)=>{
                        target.intValue()
                    }, this, [moveArr[i]])
                    tw.to({
                        scaleX: 1,
                        scaleY: 1
                    }, 400, egret.Ease.circInOut)

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
                }, 300).call((map) => {
                    this.removeChild(map)
                }, this, [removeArr[i]])
                this.removeMap(removeArr[i])
            }
        }

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
            UniltGame.interval.setGameStatus(GameStatus.Died)
            return true;
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
        private getNumberMap(posX: number, posY: number, target: NumberMap): NumberMap {
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
        public createOne(): NumberMap {
            let emptyGrid1: Pos = this.randGetOneEmptyGrid()
            let sprite: NumberMap = new NumberMap(emptyGrid1.posX, emptyGrid1.posY, this.randCreateOneNumber())
            this.data.push(sprite)
            //sprite.alpha = 0
            sprite.scaleX = 0
            sprite.scaleY = 0
            this.addChild(sprite)
            let tw: egret.Tween = egret.Tween.get(sprite)
            tw.to({
                scaleX: 1,
                scaleY: 1
            }, 300)
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
            this.numberMap.fontFamily = Config.setting_font
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
            switch (Config.setting_skin){
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
            switch (Config.setting_skin){
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
            switch (Config.setting_grade){
                case 3:
                    return this.font1(value)
                case 4:
                    return this.font2(value)
                case 5:
                    return this.font3(value)
                case 6:
                    return this.font4(value)
                default:
                    return this.font1(value)
            }
        }
        //等级数字大小
        private static font1(value: number): number{
            if( value > 0 && value <= 8 ){
                return 0;
            }else if( value > 8 && value <= 64 ){
                return 0;
            }else if( value > 64 && value <= 512 ){
                return 0;
            }else if( value > 512 && value <= 8192 ){
                return 0;
            }else if( value >= 8192 && value <= 65536 ){
                return 0;
            }else if( value > 65536 ){
                return 0;
            }
        }
        private static font2(value: number): number{
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
        private static font3(value: number): number{
            if( value > 0 && value <= 8 ){
                return 0;
            }else if( value > 8 && value <= 64 ){
                return 0;
            }else if( value > 64 && value <= 512 ){
                return 0;
            }else if( value > 512 && value <= 8192 ){
                return 0;
            }else if( value >= 8192 && value <= 65536 ){
                return 0;
            }else if( value > 65536 ){
                return 0;
            }
        }
        private static font4(value: number): number{
            if( value > 0 && value <= 8 ){
                return 0;
            }else if( value > 8 && value <= 64 ){
                return 0;
            }else if( value > 64 && value <= 512 ){
                return 0;
            }else if( value > 512 && value <= 8192 ){
                return 0;
            }else if( value >= 8192 && value <= 65536 ){
                return 0;
            }else if( value > 65536 ){
                return 0;
            }
        }
    }
}