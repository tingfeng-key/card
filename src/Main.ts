import SceneManager = Uilt.SceneManager;
import Menu = SceneCard.Menu;
import Stage = Uilt.Stage;
import Card = SceneCard.Card;
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public onAddToStage(event: egret.Event) {
        Stage.interval
        let sceneManager: SceneManager = SceneManager.interval
        this.stage.addChild(sceneManager);
        let menu: Menu = new Menu
        let card: Card = new Card
        sceneManager.loadScence(card)
    }
}