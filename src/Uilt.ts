module Uilt {
	export class Animation extends egret.Sprite {
		private texttureName: string; //纹理名称
		private totalFrameNumber: number; //总数
		private frameRate: number; //频率
		private nowFrameIndex: number; //当前帧索引
		private startFrameIndex: number; //开始帧索引
		public texttureMap: egret.Bitmap; //纹理对象
		public loopTotalNumber: number = 0; //循环次数
		private nowLoopNumber: number = 0; //当前循环次数
		private timerMap: egret.Timer; //定时器对象
		public constructor(textureName: string, totalFrameNumber: number, frameRate: number, startFrameIndex: number = 1) {
			super();
			this.texttureName = textureName;
			this.totalFrameNumber = totalFrameNumber;
			this.frameRate = frameRate;
			this.texttureMap = new egret.Bitmap;
            this.startFrameIndex = this.nowFrameIndex = startFrameIndex;
			this.settexture(this.nowFrameIndex);
			this.addChild(this.texttureMap);

			this.timerMap = new egret.Timer(this.frameRate);
			this.texttureMap.x = this.texttureMap.y = 0;
			this.timerMap.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		}

		public setPos(x: number, y: number, width: number, height: number){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}

        /**
		 * 定时器回调函数
         */
		private timerFunc(): void {
			if(this.loopTotalNumber !== 0 && this.nowLoopNumber === this.loopTotalNumber){
				this.stop();
				return ;
			}
			let nextIndex: number = this.nowFrameIndex+1;
			if(nextIndex > this.totalFrameNumber){
				nextIndex = this.startFrameIndex;
				this.nowLoopNumber++;
			}
			this.nowFrameIndex = nextIndex;
			this.settexture(this.nowFrameIndex);
		}

        /**
		 * 设置动画帧纹理
         * @param {number} frameIndex
         */
		private settexture(frameIndex: number): void {
            this.texttureMap.texture = RES.getRes(this.texttureName+frameIndex);//+"_png"
		}

        /**
		 * 设置纹理
         * @param {string} texttureName
         */
		public setNextexture(texttureName: string): void {
            this.texttureMap.texture = RES.getRes(texttureName);
		}

        /**
		 * 播放
         */
		public play(): void {
			this.timerMap.start();
		}

        /**
		 * 暂停
         */
		public stop(): void {
			this.timerMap.stop();
		}
	}
    //日志类
	export class Log {
		public static info(msg: string): void {
			console.info(msg)
		}
		public static log(msg: string): void {
			console.log(msg)
		}
		public static error(msg: string): void {
			console.error(msg)
		}
		public static warn(msg: string): void {
			console.warn(msg)
		}
		public static debug(msg: string): void {
			console.info(msg)
		}
	}
	//游戏基本属性类
	export class UiltGame {
		private Status:GameStatus;//当前的游戏状态
		private NowTimer:number = 0;//游戏时间
		private Timeer:number = 10;// 倒计时
		private Score:number = 0;//分数
		public configMap: any; //配置对象
		public constructor() {
		}

		/**
		 * 获取游戏状态
		 * @returns {GameStatus}
		 */
		public getGameStatus(): GameStatus{
			return this.Status;
		}

		/**
		 * 设置游戏状态
		 * @param status
		 * @returns {GameStatus}
		 */
		public setGameStatus(status:GameStatus){
			return this.Status = status;
		}

		/**
		 * 获取当前时间
		 * @returns {number}
		 */
		public getNowTime():number {
			return this.NowTimer;
		}
		/**
		 * 当前游戏时间递增
		 * @param num
		 */
		public incNowTimeer(num: number = 1){
			this.NowTimer += num;
		}

		/**
		 * 获取当前倒计时
		 * @returns {number}
		 */
		public getTime():number {
			return this.Timeer;
		}
		/**
		 * 倒计时自减
		 * @param num
		 */
		public decTimeer(num: number = 1){
			this.Timeer -= num;
		}

		/**
		 * 获取当前分数
		 * @returns {number}
		 */
		public getScore():number {
			return this.Score;
		}
		/**
		 * 当前分数自减
		 * @param num
		 */
		public decScore(num: number = 1){
			this.Score -= num;
		}

		/**
		 * 当前分数自增
		 * @param num
		 */
		public incScore(num: number = 1){
			this.Score += num;
		}

		public restart(): void{
			this.Score = 0;
			this.Status = GameStatus.Start;
			this.NowTimer = 0;
		}

		public static _interval:UiltGame;
		public static get interval(): UiltGame{
			return (this._interval || (this._interval = new UiltGame));
		}
	}
	//场景管理类
	export class SceneManager extends egret.Sprite  {
		private targets: Array<egret.Sprite> = []; //显示对象
		public static _interval:SceneManager;
		public static get interval(): SceneManager {
			return (this._interval || (this._interval = new SceneManager));
		}
		public constructor() {
			super();
			this.x = 0;
			this.y = 0;
			this.width = Stage.stageW;
			this.height = Stage.stageH
		}
		/**
		 * 加载场景
		 * @param target
		 */
		public loadScence(target: egret.Sprite): void {
			this.addChild(target);
			this.targets.push(target);
		}

		/**
		 * 移除场景
		 * @param target
		 */
		public removeScence(target: egret.Sprite): void {
			this.removeChild(target)
			for (let i = 0; i < this.targets.length; i++){
				this.removeChild(this.targets[i]);
				if(this.targets[i].hashCode === target.hashCode){
					this.targets.splice(i, 1)
				}
			}
		}

		/**
		 * 根据哈希值移除场景
		 * @param hash
		 */
		public removeScenceByHash(hash: number): void {
			for (let i = 0; i < this.targets.length; i++){
				if(this.targets[i].hashCode === hash){
					this.removeChild(this.targets[i]);
					this.targets.splice(i,1);
				}
			}
		}

		/**
		 * 清空场景
		 */
		public removeAllScence(): void {
			for (let i = 0; i < this.targets.length; i++){
				this.removeChild(this.targets[i]);
			}
			this.targets = []
		}
	}
	//工具 类
	export class Tool {

		/**
		 * 获取当前链接参数
		 * @param name 参数名
		 */
		public static getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURI(r[2]); return null;
		}
		/**
		 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
		 * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
		 */
		public static createBitmapByName(name: string) {
			let result = new egret.Bitmap();
			let texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}

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
		public static createLineTo(
			x:number = 0, y: number = 0, x2:number, y2: number,
			lineW:number = UiltGame.interval.configMap.panelLineWidth, lineC: number = UiltGame.interval.configMap.panelLineColor
		){
			var shp:egret.Shape = new egret.Shape();
			shp.x = x
			shp.y = y
			shp.graphics.lineStyle( lineW, lineC );
			shp.graphics.moveTo( 0, 0 );
			shp.graphics.lineTo( x2, y2 );
			shp.graphics.endFill();
			return shp;
		}

		/**
		 * 绘制曲线
		 * @param x
		 * @param y
		 * @param x1
		 * @param y1
		 * @param w
		 * @param h
		 * @param lineW
		 * @param lineC
		 * @returns {egret.Shape}
		 */
		public static createCurveTo(
			x:number = 0, y: number = 0, x1:number, y1: number, w:number, h: number,
			lineW:number = UiltGame.interval.configMap.panelLineWidth, lineC: number = UiltGame.interval.configMap.panelLineColor
		){
			var shp:egret.Shape = new egret.Shape();
			shp.graphics.lineStyle( lineW, lineC );
			shp.graphics.moveTo( x, y );
			shp.graphics.curveTo( x1, y1, w, h );
			shp.graphics.endFill();
			return shp;
		}

		/**
		 * 绘制圆角矩形
		 * @param x 起点X坐标
		 * @param y 起点Y坐标
		 * @param width 宽度
		 * @param height 高度
		 * @param round 圆角像素
		 * @param color 背景颜色
		 * @param isAphla 是否透明
		 * @returns {egret.Sprite}
		 */
		public static createRoundRect(
			x: number, y: number, width: number, height: number,
			round: number,color: number, isAphla: boolean = false
		): egret.Sprite {
			let roundRect: egret.Sprite = new egret.Sprite()
			roundRect.x = x
			roundRect.y = y
			roundRect.graphics.beginFill(color, (isAphla)?0:1)
			roundRect.graphics.drawRoundRect(0, 0, width, height, round, round)
			roundRect.graphics.endFill()
			return roundRect
		}

		/**
		 * 画按钮
		 * @param x X值
		 * @param y Y值
		 * @returns {egret.Sprite}
		 */
		public static createBtn(
			x:number, y: number, w:number, h: number, r:number, textField: string,
			btnColor: number, fontColor: number, touchEnalb: boolean = true
		): egret.Sprite {
			let btn: egret.Sprite = new egret.Sprite(),
				text: egret.TextField = new egret.TextField()
			btn.addChild(text)
			btn.x = x
			btn.y = y
			btn.graphics.beginFill(btnColor)
			btn.graphics.drawRoundRect( 0, 0, w, h, r, r);
			btn.graphics.endFill();
			btn.touchEnabled = true

			text.y = 15
			text.width = w
			text.height = h
			text.text = textField
			text.textAlign = "center"
			text.textColor = fontColor
			return btn
		}

		/**
		 * 绘制圆
		 * @param x 原点X值
		 * @param y 原点Y值
		 * @param raduis 圆半径
		 * @param color 填充颜色
		 * @returns {egret.Sprite}
		 */
		public static createCircle(x: number, y: number, raduis: number, color: number): egret.Sprite {
			let circle: egret.Sprite = new egret.Sprite
			circle.graphics.beginFill(color)
			circle.graphics.drawCircle(x, y, raduis)
			circle.graphics.endFill()
			return circle
		}

		/**
		 * 绘制梯形
		 * @param x 下底中点X值
		 * @param y 下底中点Y值
		 * @param upWidth 上底1/2宽度
		 * @param downWidth 下底1/2宽度
		 * @param height 高度
		 * @param color 填充颜色
		 * @returns {egret.Sprite}
		 */
		public static createTrapezoid(x: number, y: number, upWidth: number, downWidth: number, height: number, color: number){
			let trapezoid: egret.Sprite = new egret.Sprite
			trapezoid.graphics.lineStyle(1, color)
			trapezoid.graphics.beginFill(color)
			trapezoid.graphics.moveTo(x-upWidth/2, y-height)
			trapezoid.graphics.lineTo(x+upWidth/2, y-height)
			trapezoid.graphics.lineTo(x+downWidth/2, y)
			trapezoid.graphics.lineTo(x-downWidth/2, y)
			trapezoid.graphics.lineTo(x-upWidth/2, y-height)
			return trapezoid
		}

		/**
		 * 创建文字显示
		 * @param message 文本内容
		 * @returns {egret.TextField}
		 */
		public static createTextField(message: string): egret.TextField {
			let text: egret.TextField = new egret.TextField;
			text.textAlign = "center";
			text.text = message;
			text.fontFamily = "微软雅黑";
			text.textColor = 0x000000;
			text.size = 30;
			return text
		}

		/**
		 * 检测是否是URL
		 * @param urlString 待检测的URL字符串
		 * @returns {boolean}
		 */
		public static isUrl(urlString: string): boolean {
			let regexp = /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;
			return regexp.test(urlString);
		}
	}
	//询问框
	export class LayerConfirm extends egret.Sprite {
		public textMap: egret.TextField; //文本对象
		public maskMap: egret.Shape = new egret.Shape();//遮罩
		public group: egret.Sprite = new egret.Sprite(); //组件
		public btn1: egret.Sprite;//按钮
		public btn2: egret.Sprite;//按钮
		public btn1Func: any; //确定回调函数
		public btn2Func: any; //取消回调函数
		public constructor() {
			super();
			this.x = this.y = 0;
			this.width = Stage.stageW;
			this.height = Stage.stageH;
			this.btn1Func = ()=>{};
			this.btn2Func = ()=>{};
		}

		/**
		 * 初始化
		 */
		public init(): void {
			this.maskMap.graphics.beginFill( 0x000 );
			this.maskMap.graphics.drawRect( 0,0,this.width,this.height);
			this.maskMap.graphics.endFill();
			this.maskMap.alpha = 0.6;
			this.addChild(this.maskMap);

			this.group.width = 400;
			this.group.height = 300;
			this.group.x = (this.width-this.group.width)/2;
			this.group.y = (this.height-this.group.height)/2;
			this.group.graphics.beginFill(0x3bb4f2);
			this.group.graphics.drawRoundRect( 0, 0, this.group.width, this.group.height, 10, 10);
			this.group.graphics.endFill();
			this.addChild(this.group);
			this.group.addChild(this.textMap);
			this.textMap.width = this.group.width
			this.textMap.y = 30

			this.btn1 = Tool.createBtn(60, this.group.height-90, 110, 60, 10, "确定", 0xe0690c, 0xffffff);
			this.btn2 = Tool.createBtn(this.group.width-170, this.group.height-90, 110, 60, 10, "取消", 0xe0690c, 0xffffff);
			this.group.addChild(this.btn1);
			this.group.addChild(this.btn2);
			this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1Funcs, this);
			this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn2Funcs, this);
		}

		private btn1Funcs(): void {
			this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn1Funcs, this);
			this.btn1Func()
		}
		private btn2Funcs(): void {
			this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn2Funcs, this);
			this.btn2Func()
		}
	}
	//舞台类
	export class Stage {
		public static _interval:Stage;
		public static get interval(): Stage{
			this.stage.width = UiltGame.interval.configMap.StateWithd;
			this.stage.height = UiltGame.interval.configMap.StateHeight;
			return (this._interval || (this._interval = new Stage));
		}
		/**
		 * 获取舞台
		 */
		public static get stage(){
			return egret.MainContext.instance.stage;
		}

		/**
		 * 舞台宽度
		 */
		public static get stageW(){
			return egret.MainContext.instance.stage.stageWidth;
		}

		/**
		 * 舞台高度
		 */
		public static get stageH() {
			return egret.MainContext.instance.stage.stageHeight;
		}
	}

	//锚点工具类（需要初始化）
	export class AnchorUtils {
		private static _propertyChange: any;
		private static _anchorChange: any;

		public static init(): void {
			this._propertyChange = Object.create(null);
			this._anchorChange = Object.create(null);
			this.injectAnchor();
		}

		public static setAnchorX(target: egret.DisplayObject,value: number): void {
			target["anchorX"] = value;
		}

		public static setAnchorY(target: egret.DisplayObject,value: number): void {
			target["anchorY"] = value;
		}

		public static setAnchor(target: egret.DisplayObject,value: number): void {
			target["anchorX"] = target["anchorY"] = value;
		}

		public static getAnchor(target: egret.DisplayObject): number {
			if(target["anchorX"] != target["anchorY"]) {
				console.log("target's anchorX != anchorY");
			}
			return target["anchorX"] || 0;
		}

		public static getAnchorY(target: egret.DisplayObject): number {
			return target["anchorY"] || 0;
		}

		public static getAnchorX(target: egret.DisplayObject): number {
			return target["anchorX"] || 0;
		}

		private static injectAnchor(): void {
			Object.defineProperty(egret.DisplayObject.prototype,"width",{
				get: function() {
					return this.$getWidth();
				},
				set: function(value) {
					this.$setWidth(value);
					AnchorUtils._propertyChange[this.hashCode] = true;
					egret.callLater(() => {
						AnchorUtils.changeAnchor(this);
					},this);
				},
				enumerable: true,
				configurable: true
			});

			Object.defineProperty(egret.DisplayObject.prototype,"height",{
				get: function() {
					return this.$getHeight();
				},
				set: function(value) {
					this.$setHeight(value);
					AnchorUtils._propertyChange[this.hashCode] = true;
					egret.callLater(() => {
						AnchorUtils.changeAnchor(this);
					},this);
				},
				enumerable: true,
				configurable: true
			});

			Object.defineProperty(egret.DisplayObject.prototype,"anchorX",{
				get: function() {
					return this._anchorX;
				},
				set: function(value) {
					this._anchorX = value;
					AnchorUtils._propertyChange[this.hashCode] = true;
					AnchorUtils._anchorChange[this.hashCode] = true;
					egret.callLater(() => {
						AnchorUtils.changeAnchor(this);
					},this);
				},
				enumerable: true,
				configurable: true
			});

			Object.defineProperty(egret.DisplayObject.prototype,"anchorY",{
				get: function() {
					return this._anchorY;
				},
				set: function(value) {
					this._anchorY = value;
					AnchorUtils._propertyChange[this.hashCode] = true;
					AnchorUtils._anchorChange[this.hashCode] = true;
					egret.callLater(() => {
						AnchorUtils.changeAnchor(this);
					},this);
				},
				enumerable: true,
				configurable: true
			});
		}

		private static changeAnchor(tar: any): void {
			if(this._propertyChange[tar.hashCode] && this._anchorChange[tar.hashCode]) {
				tar.anchorOffsetX = tar._anchorX * tar.width;
				tar.anchorOffsetY = tar._anchorY * tar.height;
				delete this._propertyChange[tar.hashCode];
			}
		}
	}

	//微信分享接口
	interface SignPackage {
		debug: boolean; //调试模式
		appId:string; //分享的微信平台AppID
		nonceStr:string; 随机数
		timestamp:number; 时间戳
		signature:string; 签名
		//url:string; //地址
	}
	//分享的内容
	interface ShareContent {
		title: string; //标题
		desc: string; //描述
		link: string; //游戏地址
		imgLink: string; //游戏图片、LOGO
	}

	//微信分享
	export class WeixinShare {
		private signPackage:SignPackage; //签名包
		public shareCont: ShareContent = <ShareContent>{};//分享内容对象
		private static _interval: WeixinShare;
		public static get interval(): WeixinShare {
			return this._interval || (this._interval = new WeixinShare)
		}
		/**
		 * 初始化
		 */
		public init(): void {
			let urlloader = new egret.URLLoader(),
				req = new egret.URLRequest(UiltGame.interval.configMap.weixinSignUrl);
			urlloader.data = {url: window.location.href}
			urlloader.load(req);
			req.method = egret.URLRequestMethod.GET;
			urlloader.addEventListener(egret.Event.COMPLETE, (e)=> {
				this.signPackage = <SignPackage>JSON.parse(e.target.data);
				this.getWeiXinConfig();
			}, this);
		}

		/**
		 * 配置参数
		 */
		private getWeiXinConfig(): void {
			let bodyConfig = new BodyConfig();
			bodyConfig.debug = this.signPackage.debug;
			bodyConfig.appId = this.signPackage.appId;
			bodyConfig.timestamp = this.signPackage.timestamp;
			bodyConfig.nonceStr = this.signPackage.nonceStr;
			bodyConfig.signature = this.signPackage.signature;
			bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表
				// 所有要调用的 API 都要加到这个列表中
				'checkJsApi',//判断当前客户端是否支持指定JS接口
				'chooseImage',//拍照或从手机相册中选图接口
				'onMenuShareTimeline', //分享到朋友圈
				'onMenuShareAppMessage', //分享给朋友
				'showMenuItems',
				'hideMenuItems',
			];
			wx.config(bodyConfig);
			wx.ready(function() {
				//需要隐藏的菜单选项
				wx.hideMenuItems({
					menuList: [
						"menuItem:share:timeline",
						"menuItem:editTag",
						"menuItem:readMode"
					]
				});
				//检测的jsApi接口
				wx.checkJsApi({
					jsApiList: [
						'getNetworkType',
						'previewImage',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo'
					],
					success: function (res) {
						//alert(JSON.stringify(res));
					}
				});
			});
		}

		/**
		 * 分享给朋友
		 */
		private onShareAPPMessage() {
			let shareAppMessage = new BodyMenuShareAppMessage();
			shareAppMessage.title = this.shareCont.title;
			shareAppMessage.desc = this.shareCont.desc;
			shareAppMessage.link = this.shareCont.link;
			shareAppMessage.imgUrl = this.shareCont.imgLink;
			shareAppMessage.trigger = function (res) {
				console.log('用户点击发送给朋友');
			}
			shareAppMessage.success = function (res) {
				console.log('已分享');
			};
			shareAppMessage.fail = function (res) {
				console.log('已取消');
			};
			shareAppMessage.cancel = function (res) {
				console.log(JSON.stringify(res));
			};
		}

		/**
		 * 分享到QQ
		 */
		private onShareQQ() {
			let shareqq = new BodyMenuShareQQ();
			shareqq.title = this.shareCont.title;
			shareqq.desc = this.shareCont.desc;
			shareqq.link = this.shareCont.link;
			shareqq.imgUrl = this.shareCont.imgLink;
			shareqq.complete = function (res) {
				console.log(JSON.stringify(res));
			};
			shareqq.trigger = function (res) {
				console.log('用户点击分享到QQ');
			};
			shareqq.success = function (res) {
				console.log('已分享');
			};
			shareqq.cancel = function (res) {
				console.log('已取消');
			};
			shareqq.fail = function (res) {
				console.log(JSON.stringify(res));
			};
		}

		/**
		 * 分享到微博
		 * @param e
		 */
		private onshareWeibo(e:egret.TouchEvent) {
			let shareweibo = new BodyMenuShareWeibo();
			shareweibo.title = this.shareCont.title;
			shareweibo.desc = this.shareCont.desc;
			shareweibo.link = this.shareCont.link;
			shareweibo.imgUrl = this.shareCont.imgLink;
			shareweibo.complete = function (res) {
				console.log(JSON.stringify(res));
			};
			shareweibo.trigger = function (res) {
				console.log('用户点击分享到微博');
			};
			shareweibo.cancel = function (res) {
				console.log('已取消');
			};
			shareweibo.fail = function (res) {
				console.log(JSON.stringify(res));
			};
		}

		/**
		 * 分享到朋友圈
		 * @param e
		 */
		private onTimeline(e:egret.TouchEvent): void {
			let sharet = new BodyMenuShareTimeline();
			sharet.title = this.shareCont.title;
			sharet.link = this.shareCont.link;
			sharet.imgUrl = this.shareCont.imgLink;
			sharet.trigger = function (res) {
				// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，
				// 因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
				console.log('用户点击分享到朋友圈');
			};
			sharet.success = function (res) {
				console.log('已分享');
			};
			sharet.cancel = function (res) {
				console.log('已取消');
			};
			sharet.fail = function (res) {
				console.log(JSON.stringify(res));
			};
		}
	}

	interface keyValue {
		key: string,
		value: string
	}

	//网络请求
	export class Http {
		private request: egret.HttpRequest = new egret.HttpRequest //实例化请求
		/**
		 * 构造传参
		 * @param url 请求地址
		 * @param method 请求方式
		 * @param responseType 请求类型
		 * @param headers 请求头信息
		 */
		public constructor(url: string, method: string, responseType: string, headers: Array<keyValue> = []) {
			this.request.responseType = responseType;
			this.request.open(url, method);
			if(headers.length > 0){
				for(let i = 0; i < headers.length; i++){
					this.request.setRequestHeader(headers[i].key, headers[i].value);
				}
			}
		}

		/**
		 * 返回请求实例
		 * @returns {egret.HttpRequest}
		 */
		public req() {
			return this.request
		}

		/**
		 * 设置请求头
		 * @param key
		 * @param value
		 */
		public setHeader(key: string, value: string) {
			this.request.setRequestHeader(key, value);
		}

		/**
		 * 发送请求
		 * @param data
		 */
		public sendRequest(data: any = '') {
			this.request.send(data)
		}
	}

	//游戏状态
	export enum GameStatus{
		Load = 0,//加载资源
		Start = 1,//开始游戏
		Stop = 2,//暂停游戏
		Died = 3,//游戏结束
		Finash = 4,//通过游戏
		OneFinash = 5, //方块下落完成
	}

	/**
	 *
	 * 设备工具类
	 *
	 */
	export class DeviceUtils {
		/**
		 * 当前是否Html5版本
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsHtml5(): boolean {
			return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
		}

		/**
		 * 当前是否是Native版本
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsNative(): boolean {
			return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
		}

		/**
		 * 是否是在手机上
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsMobile(): boolean {
			return egret.Capabilities.isMobile;
		}

		/**
		 * 是否是在PC上
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsPC(): boolean {
			return !egret.Capabilities.isMobile;
		}

		/**
		 * 是否是QQ浏览器
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsQQBrowser(): boolean {
			return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
		}

		/**
		 * 是否是IE浏览器
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsIEBrowser(): boolean {
			return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
		}

		/**
		 * 是否是Firefox浏览器
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsFirefoxBrowser(): boolean {
			return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
		}

		/**
		 * 是否是Chrome浏览器
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsChromeBrowser(): boolean {
			return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
		}

		/**
		 * 是否是Safari浏览器
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsSafariBrowser(): boolean {
			return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
		}

		/**
		 * 是否是Opera浏览器
		 * @returns {boolean}
		 * @constructor
		 */
		public static get IsOperaBrowser(): boolean {
			return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
		}
	}

	//格子坐标
	export class Pos {
		public posX: number; //坐标X值
		public posY: number; // 坐标Y值
		public constructor(x: number, y: number){
			this.posX = x;
			this.posY = y;
		}
	}
}