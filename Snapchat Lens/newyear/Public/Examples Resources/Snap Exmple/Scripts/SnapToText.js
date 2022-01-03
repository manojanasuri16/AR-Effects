// SnapToText.js
// Version: 0.0.1
// Event: On Awake
// Description: Capture and apply a screenshot from cameras perspective and apply to 3D Text

// @input Component.Text3D text3D
// @input Component.Camera camera

var isInit = validateInputs();
var frameDelay = 2;

function onUpdate() {
    if (!isInit) {
        return;
    }

    if (frameDelay > 0) {
        frameDelay--;
        if (frameDelay == 1) {
            script.text3D.snap(script.camera);
        }
        return;
    } else {
        script.camera.enabled = false;
        frameDelay = -1;
    }
}

function validateInputs() {
    if (!script.text3D) {
        print("ERROR: Make sure Text3D is set.");
        return false;
    }

    if (!script.camera) {
        print("ERROR: Make sure Camera is set.");
        return false;
    }

    return true;
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);