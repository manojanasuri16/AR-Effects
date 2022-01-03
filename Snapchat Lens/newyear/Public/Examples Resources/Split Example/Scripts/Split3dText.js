// Split3dText.js
// Version: 0.0.1
// Event: On Awake
// Description: Split a text 3d component to a component for each word and apply different value to each word

//@input Component.Text3D text3D {"label":"Text 3D"}
//@ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":"Color"}
//@input Asset.Material mat {"label":"Material"}
//@ui {"widget":"label", "label":"Color added will be assigned to each text, text with no assignment will use the first color value." }
//@input vec4[] textColor {"widget":"color"}
//@ui {"widget":"group_end"}

//@ui {"widget":"group_start", "label":"Transform"}
//@input bool enableRotation
//@input float speed = 1 {"showIf":"enableRotation"}
//@ui {"widget":"separator"}
//@input bool enableCircle {"label":"Arrange In Circle"}
//@input float radius = 5 {"label":"Circle Radius", "showIf":"enableCircle"}
//@input float circleOffset = 1.0 {"widget":"slider", "min":0.0, "max":1.0, "step":0.01, "showIf":"enableCircle"}
//@input int faceDirection = 0 {"widget":"combobox", "values":[{"label":"XY", "value":0}, {"label":"ZY", "value":1}, {"label":"XZ", "value":2}], "showIf":"enableCircle"}
//@ui {"widget":"group_end"}

function validateInputs() {
    if (!script.text3D) {
        print("ERROR: Make sure Text3D is set.");
        return false;
    }

    if (!script.mat) {
        print("ERROR: Make sure Material is set.");
        return false;
    }

    if (script.text3D.length > script.textColor.length) {
        print("Text without color will be set to white as default");
    }
    
    return true;
}

var textObj = script.text3D.getSceneObject();
// Creates new SceneObjects under this one and a RenderMeshVisual on each, Text3D will be destroyed//
var visuals = script.text3D.split();
var mat = [];

if (!validateInputs()) {
    return;
}

function onUpdate() {
    textArray(script.radius, visuals.length);
}

function textArray(radius, steps) {
    var textPos = textObj.getTransform().getWorldPosition();
    for (var i = 0; i < steps; i++) {

        if (script.enableCircle) {
            var xPos = [];
            var yPos = [];
            var offset = script.circleOffset * 6;
            var angle = Math.PI * 2.0 * i / steps + offset;
            xPos[i] = radius * -Math.cos(angle);
            yPos[i] = radius * Math.sin(angle);
            var finalPos = getFaceDirection(xPos[i], yPos[i], textPos.z);
            visuals[i].getTransform().setLocalPosition(finalPos);
        }

        if (script.enableRotation) {
            var rotateBy = quat.angleAxis(Math.PI * getDeltaTime() * script.speed, vec3.up());
            visuals[i].getTransform().setLocalRotation(visuals[i].getTransform().getLocalRotation().multiply(rotateBy));
        }

        // Clone and assign materials to each object.
        mat[i] = script.mat.clone();
        visuals[i].clearMaterials();
        visuals[i].addMaterial(mat[i]);
        // Ignore if text color is not set.
        if (script.textColor[i] == null) {
            continue;
        }
        visuals[i].mainPass.baseColor = script.textColor[i];
    }
}

function getFaceDirection(x, y, z) {
    switch (script.faceDirection) {
        case 0:
            return new vec3(x, y, z);
        case 1:
            return new vec3(z, y, x);
        case 2:
            return new vec3(x, z, y);
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);