/**
 * Created by feizhugame on 2017/9/27.
 */

module Load {
    import Player = CoolRunScene.Player;

    export class InitGame {
        public start(): void {
            let paramId = Tool.getQueryString('id');//是否为获取网络配置数据方式
            if(paramId === null) { //直接初始化
                this.load()
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
            this.load()
        }

        private load(): void {
            /*SceneManager.interval.loadScence(CoolRunScene.Round.interval);
             SceneManager.interval.loadScence(new Player());*/

            SceneManager.interval.loadScence(new ElsbScene.BackgRound());//加载背景场景
            SceneManager.interval.loadScence(ElsbScene.Grid.interval);//加载游戏格子场景
            SceneManager.interval.loadScence(ElsbScene.NumberData.interval);//加载游戏数据场景
            let storageData: any = egret.localStorage.getItem("Elsb_NumberData");
            if(storageData !== null){
                storageData = JSON.parse(storageData);
                for (let i = 0; i < storageData.length; i++){
                    ElsbScene.NumberData.interval.createOne(storageData[i].value, storageData[i].posX, storageData[i].posY)
                }
            }else{
                ElsbScene.NumberData.interval.createOne();
                ElsbScene.NumberData.interval.createOne();
            }

            //从缓存中读取奖励机制
            let storageRewardArr: string = egret.localStorage.getItem("Elsb_rewardArr");
            if(storageRewardArr !== null) {
                UiltGame.interval.configMap.setting.rewardArr = JSON.parse(storageRewardArr);
                console.log(UiltGame.interval.configMap.setting.rewardArr)
            }
            SceneManager.interval.loadScence(ElsbScene.Panel.interval);//加载分数面板场景

            //从缓存中读取历史最大分数
            let storageBestScore: string = egret.localStorage.getItem("Elsb_Best_score");
            if(storageBestScore !== null){
                ElsbScene.Panel.interval.bestScore = parseInt(storageBestScore)
            }

            //从缓存中读取上一次分数
            let storageNowScore: string = egret.localStorage.getItem("Elsb_NowScore");
            if(storageNowScore !== null){
                ElsbScene.Panel.interval.score = parseInt(storageNowScore)
            }
        }
    }
}