/**
 * Created by feizhugame on 2017/9/27.
 */
module Load {
    import Http = Uilt.Http;
    import Config = Uilt.Config;
    import Tool = Uilt.Tool;
    import WeixinShare = Uilt.WeixinShare;
    import ResourceEvent = RES.ResourceEvent;
    export class LoadConfig extends egret.Sprite {
        public constructor(fileName: string = "default") {
            super()
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
            RES.loadConfig("resource/"+fileName+".res.json", "resource/");
        }

        private onResCommon() {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
        }
    }
    //加载网络皮肤配置
    export class LoadSkinConfig extends egret.Sprite {
        private fileName: string

        /**
         * 加载皮肤配置
         * @param fileName 文件名称，支持目录结构
         */
        public constructor(fileName: string = "default") {
            super()
            this.fileName = fileName
            let paramId = Tool.getQueryString('id')
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
            if(paramId == null) {
                RES.loadConfig("resource/"+this.fileName+".res.json", "resource/");
            }else {
                let http: Http = new Http(Config.LoadGameConfigUrl + paramId, egret.HttpMethod.GET, egret.HttpResponseType.TEXT)
                http.req().addEventListener(egret.Event.COMPLETE, (e) => {
                    let request = <egret.HttpRequest>e.currentTarget;
                    let res = JSON.parse(request.response),
                        setting = res.setting
                    Config.gameName = setting.name || res.game_name

                    Config.setting_skin = setting.color;
                    Config.setting_grade = setting.grade;
                    Config.setting_font = setting.font;
                    Config.setting_rewardArr = setting.reward;

                    WeixinShare.interval.init()
                    WeixinShare.interval.shareCont.title = setting.name || res.game_name
                    WeixinShare.interval.shareCont.desc = setting.share_text
                    WeixinShare.interval.shareCont.link = window.location.href
                    WeixinShare.interval.shareCont.imgLink = setting.logo || res.game_logo


                    RES.loadConfig("resource/_skin" + res.setting.color + ".res.json", "resource/");
                }, this);
                http.setHeader('Content-Type', 'application/x-www-form-urlencoded')
                http.sendRequest()
            }
        }

        /**
         * 配置文件加载完成
         * @param e
         */
        private onResCommon(e: RES.ResourceEvent) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
            if(e.itemsTotal === 0){ //如果资源组为空，则直接进入菜单
                SceneManager.interval.loadScence(new ElsbScene.BackgRound())
                SceneManager.interval.loadScence(ElsbScene.Panel.interval)
                SceneManager.interval.loadScence(ElsbScene.Grid.interval) //加载游戏格子场景
                SceneManager.interval.loadScence(new ElsbScene.NumberData()) //加载游戏数据场景
            }else{
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
                RES.loadGroup("preload");
            }
        }

        /**
         * 资源组加载完成事件
         */
        private onGroupComplete(){
            console.log("加载完成");
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            SceneManager.interval.loadScence(new ElsbScene.Menu) //加载游戏菜单场景
        }

        /**
         * 资源组加载进度事件
         * @param event
         */
        private onGroupProgress(event: RES.ResourceEvent) {
            console.log("progress", event.itemsLoaded, event.itemsTotal)
        }
    }
}