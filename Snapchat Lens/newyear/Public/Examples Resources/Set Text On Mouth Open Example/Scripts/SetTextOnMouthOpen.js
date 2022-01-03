// SetTextOnMouthOpen.js
// Version: 0.0.1
// Event: On Awake
// Description: Set texts on mouth opened event

// @input string[] messages

// @input Component.Text3D text
// @input SceneObject tweenObj
// @input string tweenName = "scale_up"

if (!script.text) {
    print("ERROR: Please set the Text 3D component to the script.");
    return;
}

var messageIndex = -1;
var messageList = script.messages;

function setMessage(message) {
    script.text.text = message;
    if (script.tweenObj) {
        global.tweenManager.startTween(script.tweenObj, script.tweenName);
    }
}


function setNextWord() {
    messageIndex = (messageIndex + 1) % messageList.length;
    var message = messageList[messageIndex];
    setMessage(message);
}


script.createEvent("MouthOpenedEvent").bind(setNextWord);
script.text.text = "";