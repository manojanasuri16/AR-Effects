// SetText.js
// Version: 0.0.1
// Event: Tapped Event
// Description: Showing example on how to set text 3d properties 

//@input Component.Text3D text3D {"label" : "Text 3D"}
// @ui {"widget":"separator"}
//@ui {"widget":"group_start", "label":"Properties To Be Set"}
//@input string textToBeSet
//@input vec4 colorToBeSet = {1,1,1,1} {"widget":"color"}
//@input float extrusionToBeSet = 0.5 {"widget":"slider", "min":0.0, "max":1.0, "step":0.01}
//@ui {"widget":"group_end"}


if (!script.text3D) {
    print("ERROR: Please set the Text 3D component to the script.");
    return;
}

// Set a text
script.text3D.text = script.textToBeSet;

// Set colors of the material
script.text3D.mainMaterial.mainPass.frontCapStartingColor = script.colorToBeSet;
script.text3D.mainMaterial.mainPass.backCapStartingColor = script.colorToBeSet;
script.text3D.mainMaterial.mainPass.outerEdgeStartingColor = script.colorToBeSet;
script.text3D.mainMaterial.mainPass.InnerEdgeStartingColor = script.colorToBeSet;

// Set Extrusion
script.text3D.extrusionDepth = script.extrusionToBeSet;