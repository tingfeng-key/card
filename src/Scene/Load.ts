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
        public constructor(fileName: string = "default") {
            super()
            this.fileName = fileName
            let paramId = Tool.getQueryString('id')
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
            if(paramId == null) {
                RES.loadConfig("resource/"+this.fileName+".res.json", "resource/");
            }
            let http: Http = new Http(Config.LoadGameConfigUrl+paramId, egret.HttpMethod.GET, egret.HttpResponseType.TEXT)
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


                RES.loadConfig("resource/_skin"+res.setting.color+".res.json", "resource/");
            }, this);
            http.setHeader('Content-Type', 'application/x-www-form-urlencoded')
            http.sendRequest()

        }
        private onResCommon() {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            RES.loadGroup("preload");
        }

        private onGroupComplete(){
            console.log("加载完成");
            SceneManager.interval.loadScence(new SceneCard.Menu)
        }

        private onGroupProgress(event: RES.ResourceEvent) {
            console.log("progress", event.itemsLoaded, event.itemsTotal)
        }
    }
}