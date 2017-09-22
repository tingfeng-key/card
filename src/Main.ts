import SceneManager = Uilt.SceneManager;
import Card = SceneCard.Card;
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public onAddToStage(event: egret.Event) {
        let sceneManager: SceneManager = SceneManager.interval
        this.stage.addChild(sceneManager);
        sceneManager.loadScence(Card.interval)
    }
}