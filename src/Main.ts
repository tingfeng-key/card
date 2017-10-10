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
        RES.loadGroup("config");//加载配置组
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

        let paramId = Tool.getQueryString('id');//是否为获取网络配置数据方式
        if(paramId === null) { //直接初始化
            InitGame.start()
        }else {//加载网络配置
            let Config: any = UiltGame.interval.configMap;
            let http: Http = new Http(
                Config.LoadGameConfigUrl + paramId,
                egret.HttpMethod.GET,
                egret.HttpResponseType.TEXT
            );
            http.req().addEventListener(egret.Event.COMPLETE, this.configCompleteFunc, this);
            http.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            http.sendRequest();
        }
        let menu: Menu = new Menu
    }

    /**
     * 加载网络配置完成回调函数
     * @param e
     */
    private configCompleteFunc(e) {
        let request = <egret.HttpRequest>e.currentTarget;
        let res = JSON.parse(request.response),
            setting = res.setting
        UiltGame.interval.configMap.gameName = setting.name || res.game_name

        UiltGame.interval.configMap.setting.skin = setting.color;
        UiltGame.interval.configMap.setting.grade = setting.grade;
        UiltGame.interval.configMap.setting.font = setting.font;
        //根据奖励分数排序
        let rewards: any = setting.reward || JSON.parse(setting.reward);
        for (let i = 1; i < rewards.length; i++){
            for (let j = 0; j < rewards.length-i; j++){
                if(rewards[j].num < rewards[j+1].num){
                    let temp: any = rewards[j];
                    rewards[j] = rewards[j+1];
                    rewards[j+1] = temp;
                }
            }
        }
        UiltGame.interval.configMap.setting.rewardArr = rewards;

        WeixinShare.interval.init()
        WeixinShare.interval.shareCont.title = setting.name || res.game_name
        WeixinShare.interval.shareCont.desc = setting.share_text
        WeixinShare.interval.shareCont.link = window.location.href
        WeixinShare.interval.shareCont.imgLink = setting.logo || res.game_logo
        InitGame.start()
    }
}