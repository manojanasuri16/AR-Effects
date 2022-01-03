// AudioAttachedSequence.js
// Allows to toggle scene objects, start/stop tweens or call script api functions in certain moment of time of the audio track
// Event : Initialize
// Version : 0.0.1

// @input int actionType {"widget" : "combobox", "values" : [{"label" : "Enable/Disable Object", "value" : "0"}, {"label" : "Start/Stop Tweens", "value" : "1"}, {"label" : "Call Api Function", "value" : "2"}]}
// @input string tweenName {"showIf" : "actionType", "showIfValue" : 1,  "label" : "   Tween name"}
// @input string startActionName = "start" {"showIf" : "actionType", "showIfValue" : 2, "label" : "   Start function name"}
// @input string endActionName = "stop" {"showIf" : "actionType", "showIfValue" : 2, "label" : "   Stop function name"}

// @ui {"widget":"separator"}
// @input SceneObject[] sceneObjects {"label":"SceneObjects"}
// @input float[] timestamps {"label":"Timestamps (sec)"}
// @input Component.AudioComponent audio 

var prevPos;
var current = -1;
var next = 0;

var count = script.timestamps.length;

function onUpdate() {

    var pos = script.audio.position;
    if (next < count) {
        if (pos > script.timestamps[next]) {
            resetByIndex(current);
            startByIndex(next);
            current = next;
            next++;
        }
    }
    if (prevPos > pos) {
        next = 0;
    }
    prevPos = pos;
}

function startByIndex(idx) {
    if (script.sceneObjects[idx] == null) {
        print("WARNING, element " + idx + " is not set in SceneObjects array");
        return;
    }
    switch (script.actionType) {
        case (0):
            script.sceneObjects[idx].enabled = true;
            break;
        case (1):
            global.tweenManager.startTween(script.sceneObjects[idx], script.tweenName);
            break;
        case (2):
            var sc = script.sceneObjects[idx].getComponent("Component.ScriptComponent");
            if (sc && sc.api[script.startActionName]) {
                sc.api[script.startActionName]();
            } 
            break;
    }
}

function resetByIndex(idx) {
    if (idx < 0) {
        return;
    }
    if (script.sceneObjects[idx] == null) {
        print("WARNING, element " + idx + " is not set in SceneObjects array");
        return;
    }
    switch (script.actionType) {
        case (0):
            script.sceneObjects[idx].enabled = false;
            break;
        case (1):
            if (global.tweenManager.isPlaying(script.sceneObjects[idx], script.tweenName)) {
                global.tweenManager.stopTween(script.sceneObjects[idx], script.tweenName);
            }
            break;
        case (2):
            var sc = script.sceneObjects[idx].getComponent("Component.ScriptComponent");
            if (sc && sc.api[script.endActionName]) {
                sc.api[script.endActionName]();
            }
            break;
    }
}

function initialize() {
    if (script.sceneObjects.length != script.timestamps.length) {
        print("WARNING, please set both SceneObjects and Timestamps inputs, they should have same length");
    }
    for (var i = 0; i < count; i++) {
        resetByIndex(i);
    }
    
    var event = script.createEvent("UpdateEvent");
    event.bind(onUpdate);
}

initialize();
