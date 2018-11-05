Blockly.HSV_SATURATION = 0.88;
Blockly.HSV_VALUE = 0.88;

var zoom = 1.3;
var controls_visible = true;

if (window.devicePixelRatio == 1) {
  zoom = 1.3;
  controls_visible = true;
}

if (window.devicePixelRatio > 1 && document.documentElement.clientWidth < 800) {
  zoom = 0.9;
  controls_visible = false;
}

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv, {
    media: 'media/',
    trashcan: controls_visible,
    css: true,
    zoom: {
        controls: true,
        wheel: false,
        startScale: zoom,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    toolbox: document.getElementById("toolbox")
});

Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
    workspace);

var controls = document.getElementById("control_buttons");
var toolbox_div = document.getElementsByClassName("blocklyToolboxDiv");

toolbox_div[0].insertBefore(controls, toolbox_div.firstChild);

function setZoom() {
  var sWidth = document.documentElement.clientWidth*0.92;
  var sHeight = document.documentElement.clientHeight*0.63;
  var blocklyZoom = document.getElementsByClassName("blocklyZoom");
  blocklyZoom[0].style.transform = "translate("+ sWidth + "px," + sHeight + "px)";
}

if (window.devicePixelRatio > 1 && document.documentElement.clientWidth < 800) {
  setZoom();
}
