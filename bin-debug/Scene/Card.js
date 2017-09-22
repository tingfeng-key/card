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
/**
 * Created by feizhugame on 2017/9/22.
 */
var Scene;
(function (Scene) {
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Card, "interval", {
            get: function () {
                return (this._interval || (this._interval = new Card));
            },
            enumerable: true,
            configurable: true
        });
        return Card;
    }(egret.Sprite));
    Scene.Card = Card;
    __reflect(Card.prototype, "Scene.Card");
})(Scene || (Scene = {}));
