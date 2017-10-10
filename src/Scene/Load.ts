/**
 * Created by feizhugame on 2017/9/27.
 */
module Load {
    export class InitGame {
        public static start(): void {
            UiltGame.interval.setGameStatus(Uilt.GameStatus.Start);
            SceneManager.interval.loadScence(new ElsbScene.BackgRound());//加载背景场景
            SceneManager.interval.loadScence(ElsbScene.Grid.interval);//加载游戏格子场景
            SceneManager.interval.loadScence(ElsbScene.NumberData.interval);//加载游戏数据场景
            let storageData: any = egret.localStorage.getItem("Elsb_NumberData");
            let storageNowScore: string = egret.localStorage.getItem("Elsb_NowScore");
            if(storageData !== null){
                storageData = JSON.parse(storageData);
                for (let i = 0; i < storageData.length; i++){
                    ElsbScene.NumberData.interval.createOne(storageData[i].value, storageData[i].posX, storageData[i].posY)
                }
            }else{
                ElsbScene.NumberData.interval.createOne();
                ElsbScene.NumberData.interval.createOne();
            }
            if(storageNowScore !== null){
                UiltGame.interval.incScore(parseInt(storageNowScore));
                console.log(UiltGame.interval.getScore())
            }
            SceneManager.interval.loadScence(ElsbScene.Panel.interval);//加载分数面板场景
        }
    }
}