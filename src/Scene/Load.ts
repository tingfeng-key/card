/**
 * Created by feizhugame on 2017/9/27.
 */
module Load {
    import Http = Uilt.Http;
    import Tool = Uilt.Tool;
    import WeixinShare = Uilt.WeixinShare;
    import ResourceEvent = RES.ResourceEvent;
    import GameStatus = Uilt.GameStatus;
    //加载网络皮肤配置
    export class LoadSkinConfig extends egret.Sprite {

        /**
         * 加载皮肤配置
         * @param fileName 文件名称，支持目录结构
         */
        public constructor() {
            super()
            let paramId = Tool.getQueryString('id')
            if(paramId === null) {
                InitGame.start()
            }else {
                let Config: any = UiltGame.interval.configMap;
                let http: Http = new Http(Config.LoadGameConfigUrl + paramId, egret.HttpMethod.GET, egret.HttpResponseType.TEXT)
                http.req().addEventListener(egret.Event.COMPLETE, (e) => {
                    let request = <egret.HttpRequest>e.currentTarget;
                    let res = JSON.parse(request.response),
                        setting = res.setting
                    Config.gameName = setting.name || res.game_name

                    Config.setting.skin = setting.color;
                    Config.setting.grade = setting.grade;
                    Config.setting.font = setting.font;
                    Config.setting.rewardArr = setting.reward || JSON.parse(setting.reward);

                    WeixinShare.interval.init()
                    WeixinShare.interval.shareCont.title = setting.name || res.game_name
                    WeixinShare.interval.shareCont.desc = setting.share_text
                    WeixinShare.interval.shareCont.link = window.location.href
                    WeixinShare.interval.shareCont.imgLink = setting.logo || res.game_logo
                    InitGame.start()
                }, this);
                http.setHeader('Content-Type', 'application/x-www-form-urlencoded')
                http.sendRequest()
            }
        }
    }
    export class InitGame {
        public static start(): void {
            UiltGame.interval.setGameStatus(GameStatus.Start)
            SceneManager.interval.loadScence(new ElsbScene.BackgRound())
            SceneManager.interval.loadScence(ElsbScene.Panel.interval)
            SceneManager.interval.loadScence(ElsbScene.Grid.interval) //加载游戏格子场景
            SceneManager.interval.loadScence(new ElsbScene.NumberData()) //加载游戏数据场景
        }
    }
}