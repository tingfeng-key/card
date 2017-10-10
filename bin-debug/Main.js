var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SceneManager = Uilt.SceneManager;
var Stage = Uilt.Stage;
var ResourceEvent = RES.ResourceEvent;
var Log = Uilt.Log;
var UiltGame = Uilt.UiltGame;
var Menu = ElsbScene.Menu;
var InitGame = Load.InitGame;
var Tool = Uilt.Tool;
var WeixinShare = Uilt.WeixinShare;
var Http = Uilt.Http;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this); //监听舞台初始化
        return _this;
    }
    /**
     * 舞台初始化完成
     * @param event
     */
    Main.prototype.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this); //监听加载配置文件完成事件
        RES.loadConfig("resource/default.res.json", "resource/"); //加载配置文件
    };
    /**
     * 加载配置文件完成事件处理函数
     * @param e
     */
    Main.prototype.onResCommon = function (e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this); //移除监听配置文件完成事件
        //监听资源组加载完成事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameConfigCompleteFunc, this);
        RES.loadGroup("config"); //加载配置组
    };
    /**
     * 游戏配置文件加载完成回调函数
     * @param e
     */
    Main.prototype.gameConfigCompleteFunc = function (e) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameConfigCompleteFunc, this); //移除监听
        UiltGame.interval.configMap = RES.getRes("gameConfig_json"); //赋值到单例class中
        Stage.interval; //使用配置文件对舞台高度宽度初始化
        this.stage.addChild(SceneManager.interval); //添加场景管理类到舞台中
        var paramId = Tool.getQueryString('id'); //是否为获取网络配置数据方式
        if (paramId === null) {
            InitGame.start();
        }
        else {
            var Config = UiltGame.interval.configMap;
            var http = new Http(Config.LoadGameConfigUrl + paramId, egret.HttpMethod.GET, egret.HttpResponseType.TEXT);
            http.req().addEventListener(egret.Event.COMPLETE, this.configCompleteFunc, this);
            http.setHeader('Content-Type', 'application/x-www-form-urlencoded');
            http.sendRequest();
        }
        var menu = new Menu;
    };
    /**
     * 加载网络配置完成回调函数
     * @param e
     */
    Main.prototype.configCompleteFunc = function (e) {
        var request = e.currentTarget;
        var res = JSON.parse(request.response), setting = res.setting;
        UiltGame.interval.configMap.gameName = setting.name || res.game_name;
        UiltGame.interval.configMap.setting.skin = setting.color;
        UiltGame.interval.configMap.setting.grade = setting.grade;
        UiltGame.interval.configMap.setting.font = setting.font;
        //根据奖励分数排序
        var rewards = setting.reward || JSON.parse(setting.reward);
        for (var i = 1; i < rewards.length; i++) {
            for (var j = 0; j < rewards.length - i; j++) {
                if (rewards[j].num < rewards[j + 1].num) {
                    var temp = rewards[j];
                    rewards[j] = rewards[j + 1];
                    rewards[j + 1] = temp;
                }
            }
        }
        UiltGame.interval.configMap.setting.rewardArr = rewards;
        WeixinShare.interval.init();
        WeixinShare.interval.shareCont.title = setting.name || res.game_name;
        WeixinShare.interval.shareCont.desc = setting.share_text;
        WeixinShare.interval.shareCont.link = window.location.href;
        WeixinShare.interval.shareCont.imgLink = setting.logo || res.game_logo;
        InitGame.start();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
