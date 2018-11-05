'use strict';

var appConnetcion;
var appStatus = 0;
var last_reading = 0;
var  analogRead0, analogRead1, analogRead2, analogRead3;
var dist_read;
var connected = false;
var connection_counter = 0;
var previously_detected = "";

var message;

var slider1 = 0;
var slider2 = 0;
var buttonA = false;
var buttonB = false;
var up_arrow =false;
var down_arrow = false;
var left_arrow = false;
var right_arrow = false;
var stop_button = false;
var accelerometerX = 50;
var accelerometerY = 50;
var nobutton = false;
var allRecvStr = "";


var Device;

var MANYKIT = {

  serviceUUID: 'FFE0',
  txCharacteristic: 'FFE1', // transmit is from the phone's perspective
  rxCharacteristic: 'FFE1'

};

function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

// ASCII only
function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}


var app = {
  initialize: function() {
      this.bindEvents();

  },
  bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
      refreshButton.addEventListener('touchstart', this.refreshDeviceList, false);
      disconnectButton.addEventListener('touchstart', this.disconnect, false);
      deviceList.addEventListener('touchstart', this.connect, false); // assume not scrolling

  },
  onDeviceReady: function() {
      app.refreshDeviceList();

      var options = { frequency: 100 };  // Update every 3 seconds

      var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

      listDir(cordova.file.applicationDirectory + "www/projects/");

    

      navigator.globalization.getPreferredLanguage(
    function (language) {initLanguage( language.value );},
    function () {alert('Error getting language\n');}
    );

      toolboxTranslate();
  },

  refreshDeviceList: function() {
      deviceList.innerHTML = ''; // empties the list
      previously_detected = "";

      /*
      if (cordova.platformId === 'android') { // Android filtering is broken
          ble.scan([], 5, app.onDiscoverDevice, app.onError);
      } else {
          ble.scan([MANYKIT.serviceUUID], 5, app.onDiscoverDevice, app.onError);
      }
      */

      bluetoothSerial.list(app.onDeviceList, app.onError);

  },

  onDeviceList: function(devices) {
    console.log(devices);

    var option;

    // remove existing devices
    deviceList.innerHTML = "";
    //app.setStatus("");

    devices.forEach(function(device) {

        var listItem = document.createElement('li'),
            html = '<b>' + device.name + '</b><br/>' + device.id;

        listItem.innerHTML = html;


          listItem.dataset.deviceId = device.id;

        deviceList.appendChild(listItem);
    });
  },

  onDiscoverDevice: function(device) {

    console.log(JSON.stringify(device, null, 2));
      var listItem = document.createElement('li'),
          html = '<b>' + device.name + '</b><br/>' +
              'Siła sygnału: ' + device.rssi;

      listItem.dataset.deviceId = device.id;
      listItem.innerHTML = html;

      if (device.name != previously_detected)
        deviceList.appendChild(listItem);

      previously_detected = device.name;

  },
  connect: function(e) {
      var deviceId = e.target.dataset.deviceId,

          onConnect = function() {
              // subscribe for incoming data
              connected = true;
              bluetoothSerial.subscribe('\n',app.onData, app.onError);

              document.getElementById('robot_outline').style.border = '5px solid #fff';
              document.getElementById('robot_outline2').style.border = '5px solid #fff';


              var element = document.getElementById("connection_box");
              var overlay = document.getElementById("overlay");

                element.classList.add("hidden");
                overlay.classList.add("hide_overlay");


              var connectedWith = document.getElementById("connected_name");

              //if (connectedWith.className != "connected_name") {
                connectedWith.classList.add("connected_name");

              //}

              var name_text = e.target.innerHTML.split('<br>');
              var name = name_text[0];

              connectedWith.innerHTML = name;

              //ble.startNotification(deviceId, MANYKIT.serviceUUID, MANYKIT.rxCharacteristic, app.onData, app.onError);
              disconnectButton.dataset.deviceId = deviceId;
              Device = deviceId;
              allRecvStr = "";
          },

          onConnectError = function() {
            alert("Bluetooth connect error!")
          };

      console.log(deviceId);

      if (deviceId != null && connected == false)
      //ble.connect(deviceId, onConnect, app.onError);
        bluetoothSerial.connect(deviceId, onConnect, onConnectError);

  },
  disconnect: function(event) {

      var onDisconnected = function() {
        connected = false;
          document.getElementById('robot_outline').style.border = '0px solid #fff';
          document.getElementById('robot_outline2').style.border = '0px solid #fff';
          var connectedWith = document.getElementById("connected_name").innerHTML = "";
          document.getElementById("connected_name").classList.remove("connected_name");
      }

      var deviceId = event.target.dataset.deviceId;
      //console.log(deviceId);

      if (deviceId != null)
        //ble.disconnect(deviceId, onDisconnected, app.onError);
        bluetoothSerial.disconnect(onDisconnected, app.onError);

  },

  onData: function(data) { // data received from Arduino
    allRecvStr += data;

    if (allRecvStr.length > 4)
    {
      var useStr = allRecvStr.substr(4, allRecvStr.length-5);
      allRecvStr = "";
      _ArduinoProcessStr1(useStr);
    }
    allRecvStr = "";
  }
};

function _ArduinoProcessStr1 (useStr)
{
  var cmdStr = "";
  var paramStr = "";
  var paramStr1 = "";

  var useStrArr = useStr.split(" ");
  var useStrLength = 0;
  useStrLength = useStrArr.length;

  if (useStrLength > 0)
    cmdStr = useStrArr[0];
    
  if (useStrLength > 1)
    paramStr = useStrArr[1];

  if (useStrLength > 2)
    paramStr1 = useStrArr[2];

  if ("9" == cmdStr)
  { //  return dist
    dist_read = parseFloat(paramStr);
    if (dist_read ==0){
      dist_read = 100;
    }
  }
  else if ("4" == cmdStr)
  {
    var pin = parseInt(paramStr);
    var val = 0 + parseInt(paramStr1);

    var aPin = pin-13;
    if (1==aPin)
      analogRead0 = val; 
    if (2==aPin)
      analogRead1 = val;
    if (3==aPin)
      analogRead2 = val;
    if (4==aPin)
      analogRead3 = val;
  }

  var inputDistance = document.getElementById("distanceSlider");
  inputDistance.value = dist_read;
  var input1 = document.getElementById("input1Slider");
  input1.value = analogRead0;
  var input2 = document.getElementById("input2Slider");
  input2.value = analogRead1;
  var input3 = document.getElementById("input3Slider");
  input3.value = analogRead2;
  var input4 = document.getElementById("input4Slider");
  input4.value = analogRead3;
}

document.getElementById("sendStart").addEventListener("click", function(){


  var but = document.getElementById("sendStart");

if (codeRunning == false) {
  startCode();
//console.log("►");
  //but.innerHTML = "░";
  document.getElementById('startOutline').style.backgroundImage = 'url("img/rotating_sprite.svg")';
  document.getElementById('play_icon').style.fill = "none";
  document.getElementById('stop_icon').style.fill = "#fff";
}
else {
  stopCode();
  //console.log("░");
  //but.innerHTML = "►";
  document.getElementById('play_icon').style.fill = "#fff";
  document.getElementById('stop_icon').style.fill = "none";
  document.getElementById('startOutline').style.backgroundImage = "none";
}

});



function clearWorkspace() {

  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_text = Blockly.Xml.domToText(xml);
  //console.log(xml_text.length);
  if (xml_text.length > 145) {

    var confirmation = confirm(MSG.deleteCurrentCode);
    if (confirmation == true) {

      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
          workspace);
        }
   }

  }

  function refreshWorkspace() {
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
        workspace);
  }


function sendData(val) {

  var success = function() {
  };

  var failure = function() {
  };

  var data = new Uint8Array(2);
  data[0] = val[0];
  data[1] = val[1];
  //var deviceId = event.target.dataset.deviceId;

  if (connected == true) 
  {
  //ble.writeWithoutResponse(Device, MANYKIT.serviceUUID, MANYKIT.txCharacteristic, data.buffer, success, failure);
    bluetoothSerial.write(data.buffer, success, failure);
  }
}

function sendString(str){
  var success = function() {
  };

  var failure = function() {
  };

  var strLast = "0000"+str

  if (connected == true) 
  {
  //ble.writeWithoutResponse(Device, MANYKIT.serviceUUID, MANYKIT.txCharacteristic, data.buffer, success, failure);
    bluetoothSerial.write(strLast, success, failure);
  }
}


//accelerometer

function onSuccess(acceleration) {

  accelerometerY = Math.floor((acceleration.x+10)*5);
  accelerometerX = Math.floor(100-(acceleration.y+10)*5);

  var accelX= document.getElementById("XaccelSlider");
  accelX.value = accelerometerX;
  var accelY= document.getElementById("YaccelSlider");
  accelY.value = accelerometerY;

}

function onError(fileName) {
    alert('onError!');
}


function openBrowser(link) {
  window.open(link, "_system");
}
