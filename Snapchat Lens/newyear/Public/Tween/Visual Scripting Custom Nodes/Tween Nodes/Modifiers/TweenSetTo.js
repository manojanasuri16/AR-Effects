// TweenSetTo.js
// Version: 1.0.0
// Event: Lens Initialized
// Description: Tween modifier
//
// @input tweenObj tweenIn
// @input float toValue
// @input float time

// @output tweenObj tweenOut

script.tweenOut = script.tweenIn.to({t:script.toValue}, script.time * 1000);