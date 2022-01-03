// CountdownWith3DText.js
// Version: 0.0.1
// Event: On Awake
// Description: Creates animated countdown with 3D Text

//@input Component.Text3D text3d {"label": "Text 3D"}
//@input int textScale = 8.0
// @ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":"Countdown Properties"}
//@input int startNumber = 5 
//@input int endNumber = 0
//@ui {"widget":"group_end"}
// @ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":"On Countdown Finished"}
//@input string onFinishedText
//@input int onFinishedScale = 3.0
//@ui {"widget":"group_end"}
// @ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":"Animation"}
//@input bool animateScale {"label": "Enable Animation" }
//@input bool invertScale = true {"label": "Animate Text In", "showIf":"animateScale"}
//@ui {"widget":"group_end"}

var countdown;
var finalCount;
var deltaTime = 0.0;
var fontScale;
var isInit = validateInputs();

function validateInputs() {
    if (!script.text3d) {
        print("ERROR: Make sure Text3D is set.");
        return false;
    }
    return true;
}

function onUpdate() {

    if (!isInit) {
        return;
    }

    if (deltaTime > script.startNumber + 1.0) {
        return;
    } else {
        deltaTime += getDeltaTime();
    }

    var timeDiff = (script.startNumber - deltaTime);

    if (script.animateScale) {
        fontScale = sawtooth(timeDiff, script.invertScale) * script.textScale * 100.0;
    } else {
        fontScale = script.textScale * 100.0;
    }

    countdown = clamp(Math.ceil(timeDiff, false), -1.0, script.startNumber);

    if (countdown <= script.endNumber) {
        finalCount = script.endNumber;
        if (countdown < script.endNumber) {
            script.text3d.text = script.onFinishedText;
            script.text3d.size = script.onFinishedScale * 100.0;
            return;
        } else {
            script.text3d.size = fontScale;
        }
    } else {
        script.text3d.enabled = true;
        finalCount = countdown;
        script.text3d.size = fontScale;
    }

    script.text3d.text = (finalCount.toString());
}


function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function sawtooth(x, inverse) {
    if (inverse) {
        return (1 - x % 1) % 1;
    }
    return (x % 1 + 1) % 1;
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);