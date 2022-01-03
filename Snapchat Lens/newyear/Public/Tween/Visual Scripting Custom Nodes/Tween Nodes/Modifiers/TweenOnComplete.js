// TweenOnComplete.js
// Version: 1.0.0
// Event: Lens Initialized
// Description: Tween modifier
//
// @input tweenObj tweenIn
// @output tweenObj tweenOut
// @output execution onComplete


script.tweenOut = script.tweenIn;
if (script.onComplete) {
    script.tweenIn.onComplete(script.onComplete);
}