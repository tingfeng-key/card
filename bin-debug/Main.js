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
var Menu = SceneCard.Menu;
var Stage = Uilt.Stage;
var Card = SceneCard.Card;
var Road = SceneCard.Road;
var LoadSkinConfig = Load.LoadSkinConfig;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        Stage.interval;
        var sceneManager = SceneManager.interval;
        this.stage.addChild(sceneManager);
        var menu = new Menu;
        var card = new Card;
        var road = new Road;
        var load = new LoadSkinConfig("default");
        sceneManager.loadScence(load);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
