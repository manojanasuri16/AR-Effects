// TweenToText3D.js
// Version: 0.0.1
// Event: On Awake
// Description: Get value from tween value and apply it to 3D Text

// @input Component.Text3D text3D {"label":"Text 3D"}
// @input int mode {"widget":"combobox", "values":[{"label":"Set Extrusion", "value":0}, {"label":"Set Font Size", "value":1}, {"label":"Set Letter Spacing", "value":2}, {"label":"Set Line Spacing", "value":3}]}
// @input SceneObject tween
// @input string tweenName

if (!script.text3D) {
    print("ERROR: Make sure Text3D is set.");
    return;
}

if (!script.tween) {
    print("ERROR: Make sure tween object is set.");
    return;
}

setTextValue(global.tweenManager.getGenericTweenValue(script.tween, script.tweenName));

function setTextValue(tweenVal) {
    switch (script.mode) {
        case 0:
            script.text3D.extrusionDepth = tweenVal;
            break;
        case 1:
            script.text3D.size = tweenVal;
            break;
        case 2:
            script.text3D.letterSpacing = tweenVal;
            break;
        case 3:
            script.text3D.lineSpacing = tweenVal;
            break;
    }
}