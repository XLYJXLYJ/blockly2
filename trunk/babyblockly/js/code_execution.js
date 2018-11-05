var codeRunning = false;




///save code

function save() {
    console.log("save");
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
    var file_name = prompt("Save Project:", "ManyKit_blocks.xml");
    if (file_name == null)
        file_name = "ManyKit_blocks.xml"
    download(file_name, xml_text);
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

//load code from file

function doit(e) {
    var files = e.target.files;
    var reader = new FileReader();
    reader.onload = function() {

        Blockly.mainWorkspace.clear()
        var xml = Blockly.Xml.textToDom(this.result);
        Blockly.Xml.domToWorkspace(xml, workspace);

    };
    reader.readAsText(files[0]);
    files[0].value = '';
}

//document.getElementById("selectfile").addEventListener("change", doit, false);


function stopCode() {

  //var play_but= document.getElementById('play_button');
  //play_but.style.backgroundImage = 'url("img/play_button_grey.svg")';

  //var stop_but= document.getElementById('stop_button');
  //stop_but.style.backgroundImage = 'url("img/stop_button.svg")';

    codeRunning = false;
    clearTimeout(timer1);
    mainCode = '\n';
    interpreter_counter = 0;
    main_code_splitted = mainCode.split("\n");
    //main_code_splitted[main_code_splitted.lenth + 1] = "delay(2000);";
    main_interpreter(delay, interpreter_counter_Callback);

setMotor("m1", "forward", "0");
setMotor("m2", "forward", "0");
setOutput("output1","0");
setOutput("output2","0");
buzzer("off");

}

function startCode() {

//document.getElementById(play_button).style.background-image= 'url("img/play_button.svg") ';

//var play_but= document.getElementById('play_button');
//play_but.style.backgroundImage = 'url("img/play_button.svg")';

//var stop_but= document.getElementById('stop_button');
//stop_but.style.backgroundImage = 'url("img/stop_button_grey.svg")';

  codeRunning = true;
    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    document.getElementById('code_area').value = "";

    clearTimeout(timer1);
    code_refresh();
    //document.getElementById('code_area').value = mainCode;
    //main_code_splitted[main_code_splitted.length+1] = "delay = (500);"
    main_interpreter(delay, interpreter_counter_Callback);

}




document.getElementById('controlsShow').onclick=function(){
  var element = document.getElementById("controls");
  var overlay = document.getElementById("overlay");
    element.classList.remove("hide");
    overlay.classList.remove("hide_overlay");
}

document.getElementById('controls_close').onclick=function(){
  var element = document.getElementById("controls");
  var overlay = document.getElementById("overlay");
    element.classList.add("hide");
    overlay.classList.add("hide_overlay");
}


 var overlay_div = document.getElementById('overlay');

overlay_div.onclick = function() {
  var element = document.getElementById("controls");
  var overlay = document.getElementById("overlay");
  var element2 = document.getElementById("connection_box");
  var element3 = document.getElementById("files");

  element.classList.add("hide");
  overlay.classList.add("hide_overlay");


  if (element2.className != "hidden") {
    element2.classList.add("hidden");

  }

  if (element3.className != "files_hide") {
    element3.classList.add("files_hide");

  }

};

document.getElementById('robotShow').onclick=function(){
  var element = document.getElementById("connection_box");
  var overlay = document.getElementById("overlay");

  if (element.className == "hidden") {
    app.refreshDeviceList();
    element.classList.remove("hidden");
    overlay.classList.remove("hide_overlay");
  }
  else {
    element.classList.add("hidden");
    overlay.classList.add("hide_overlay");
  }
}

document.getElementById('dashboardShow').onclick=function(){
  var element = document.getElementById("console");

  if (element.className == "console_hide") {
    element.classList.remove("console_hide");

  }
  else {
    element.classList.add("console_hide");

  }
}

function loadFile(fileName) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","projects/" + fileName,false);
  xmlhttp.send();
  var xmlDoc = xmlhttp.responseXML;
  Blockly.mainWorkspace.clear()
  var xml = Blockly.Xml.textToDom(xmlDoc.documentElement.outerHTML);
  Blockly.Xml.domToWorkspace(xml, workspace);

}


function listDir(path){

//window.resolveLocalFileSystemURL("filesystem:" + cordova.file.applicationDirectory + "persistent/1111.csv", gotFile, fail);

function success(entries) {
    var i;
    for (i=0; i<entries.length; i++) {
        console.log(entries[i].name);
    }
}

function fail(error) {
    alert("Failed to list directory contents: " + error.code);
}

// Get a directory reader
var directoryReader = dirEntry.createReader();

// Get a list of all the entries in the directory
directoryReader.readEntries(success,fail);
}
//example: list of www/audio/ folder in cordova/ionic app.
