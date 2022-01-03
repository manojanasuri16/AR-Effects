// MinimalTween.js
// Version: 1.0.0
// Event: Lens Initialized
// Description: Runs tween
//
// @input float startValue = 0.0

// @output tweenObj tween

if (!global.tweenManager) {
    print("Tween Manager not initialized. Try moving the TweenManager script to the top of the Objects Panel or triggering this node in \"TurnOnEvent\".");
    return;
}

var from = script.startValue;

var tween = new global.TWEEN.Tween({t: from});
script.tween = tween;
var st = global.TWEEN.Tween.prototype.start.bind(tween);
tween.start = function(time) {
    this._object.t = from;
    st(time);
};