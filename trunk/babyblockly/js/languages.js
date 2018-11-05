

var LANGUAGE_NAME;


var filesTextRAW = document.getElementById('files_content').outerHTML;
var consoleTextRAW = document.getElementById('console').outerHTML;
var connectionTextRAW = document.getElementById('connection_box').outerHTML;
var toolboxTextRAW;


changeLanguage();

function initLanguage(lang) {

  var language = document.getElementById('languageMenu');

  if (lang == "cn") {
    MSG = MSG_CN;
    translateMsgStringsCN();
    language.value = "cn";
  }
  else {
    MSG = MSG_eng;
    translateMsgStringsENG();
    language.value = "eng";
  }

  toolboxTranslate();
  translateUI();
  refreshWorkspace();

}

function changeLanguage() {
  var language = document.getElementById('languageMenu').value;

  if (language == "cn") {
    MSG = MSG_CN;
    translateMsgStringsCN();
  } else {
    MSG = MSG_eng;
    translateMsgStringsENG();
  }

  toolboxTranslate();
  translateUI();
  refreshWorkspace();


}

//var toolboxText = document.getElementById('toolbox').outerHTML;
//toolboxText = toolboxText.replace(/{(\w+)}/g,
//    function(m, p1) {return MSG[p1]});
//var toolboxXml = Blockly.Xml.textToDom(toolboxText);
function toolboxTranslate() {
  document.getElementById(":1.label").innerHTML = MSG.catRobot;
  document.getElementById(":2.label").innerHTML = MSG.catControl;
  document.getElementById(":3.label").innerHTML = MSG.catNumbers;
  document.getElementById(":4.label").innerHTML = MSG.catLogic;
  document.getElementById(":5.label").innerHTML = MSG.catVariables;
  document.getElementById(":6.label").innerHTML = MSG.catActions;
}

function translateUI() {
  /*
  var toolboxText = toolboxTextRAW;
  toolboxText = toolboxText.replace(/{(\w+)}/g,
     function(m, p1) {return MSG[p1]});
  var toolboxXml = Blockly.Xml.textToDom(toolboxText);
  document.getElementsByClassName('blocklyTreeRoot')[0].outerHTML = toolboxText;
  
  
  var filesText = filesTextRAW;
  filesText = filesText.replace(/{(\w+)}/g,
      function(m, p1) {return MSG[p1]});
  document.getElementById('files_content').outerHTML = filesText;
  
  var consoleText = consoleTextRAW;
  consoleText = consoleText.replace(/{(\w+)}/g,
      function(m, p1) {return MSG[p1]});
  document.getElementById('console').outerHTML = consoleText;
  
  var connectionText = connectionTextRAW;
  connectionText = connectionText.replace(/{(\w+)}/g,
      function(m, p1) {return MSG[p1]});
  document.getElementById('connection_box').outerHTML = connectionText;
  }
  */

  document.getElementById("projects_header").innerHTML = MSG.projects;
  document.getElementById("newProject").innerHTML = MSG.newProject;
  document.getElementById("saveFile").innerHTML = MSG.saveProject;
  document.getElementById("showFiles").innerHTML = MSG.savedProjects;
  document.getElementById("showExamples").innerHTML = MSG.examples;

  document.getElementById("console_head").innerHTML = MSG.console;
  document.getElementById("inputs_monitor_header").innerHTML = MSG.inputsMonitor;
  document.getElementById("distance_header").innerHTML = MSG.distance;
  document.getElementById("vertical_header").innerHTML = MSG.vertical;
  document.getElementById("horizontal_header").innerHTML = MSG.horizontal;
  document.getElementById("connection_with_robot").innerHTML = MSG.connectionWithRobot;
  document.getElementById("refreshButton").innerHTML = MSG.refresh;
  document.getElementById("disconnectButton").innerHTML = MSG.disconnect;

}
