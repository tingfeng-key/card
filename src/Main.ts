import SceneManager = Uilt.SceneManager;
import Stage = Uilt.Stage;
import ResourceEvent = RES.ResourceEvent;
import Log = Uilt.Log;
import UiltGame = Uilt.UiltGame;
import Menu = ElsbScene.Menu;
import InitGame = Load.InitGame;
import Tool = Uilt.Tool;
import WeixinShare = Uilt.WeixinShare;
import Http = Uilt.Http;
class Main extends egret.DisplayObjectContainer {
    public loadTextMap: egret.TextField = new egret.TextField()

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);//监听舞台初始化
    }

    /**
     * 舞台初始化完成
     * @param event
     */
    public onAddToStage(event: egret.Event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);//监听加载配置文件完成事件
        RES.loadConfig("resource/default.res.json", "resource/");//加载配置文件
    }

    /**
     * 加载配置文件完成事件处理函数
     * @param e
     */
    private onResCommon(e: ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);//移除监听配置文件完成事件
        //监听资源组加载完成事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameConfigCompleteFunc, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onProress, this);

        this.loadTextMap.text = "正在加载游戏配置数据，请稍等.......";
        this.addChild(this.loadTextMap);
        RES.loadGroup("config");//加载配置组
    }

    private onProress(event: ResourceEvent): void {
        console.log(event.itemsLoaded, event.itemsTotal)
    }

    /**
     * 游戏配置文件加载完成回调函数
     * @param e
     */
    private gameConfigCompleteFunc(e: ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameConfigCompleteFunc, this);//移除监听
        UiltGame.interval.configMap = RES.getRes("gameConfig_json");//赋值到单例class中
        Stage.interval; //使用配置文件对舞台高度宽度初始化
        this.stage.addChild(SceneManager.interval);//添加场景管理类到舞台中

        /*let newGame: InitGame = new InitGame;
        newGame.start();*/
        console.log("完成")
        /*let menu: Menu = new Menu
        SceneManager.interval.loadScence(menu);*/
    }
}