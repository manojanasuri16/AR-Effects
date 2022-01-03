// LinearFunc.js
// Version: 1.0.0
// Event: Lens Initialized
// Description: Easing function
//
// @output function float(float t) None

if (!global.tweenManager) {
    print("Tween Manager not initialized. Try moving the TweenManager script to the top of the Objects Panel or triggering this node in \"TurnOnEvent\".");
    return;
}

var p = global.TWEEN.Easing.Linear;
script.None = p.None;
