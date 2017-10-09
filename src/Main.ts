import SceneManager = Uilt.SceneManager;
import Stage = Uilt.Stage;
import ResourceEvent = RES.ResourceEvent;
import Log = Uilt.Log;
import UiltGame = Uilt.UiltGame;
import Menu = ElsbScene.Menu;
import LoadSkinConfig = Load.LoadSkinConfig;
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public onAddToStage(event: egret.Event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onResCommon(e: ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameConfigCompleteFunc, this);
        RES.loadGroup("config")
    }
    private gameConfigCompleteFunc(e: ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.gameConfigCompleteFunc, this);

        UiltGame.interval.configMap = RES.getRes("gameConfig_json")
        Stage.interval
        let sceneManager: SceneManager = SceneManager.interval
        this.stage.addChild(sceneManager);
        let menu: Menu = new Menu
        let load: LoadSkinConfig = new LoadSkinConfig()
        sceneManager.loadScence(load)
    }
}