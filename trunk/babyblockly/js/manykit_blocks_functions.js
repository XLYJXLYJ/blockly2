
function initRobot(strMoto, strDistance, strBuzzer, strLight) {
    var opStr = "35";

    var sMoto = "0";
    var sDistance = "0";
    var sBuzzer = "0";
    var sLight = "0";

    if (strMoto == "on")
        sMoto = "1"
    else
        sMoto = "0";

    if (strDistance == "on")
        sDistance = "1"
    else
        sDistance = "0";

    if (strBuzzer == "on")
        sBuzzer = "1"
    else
        sBuzzer = "0";

    if (strLight == "on")
        sLight = "1"
    else
        sLight = "0";

    var sendStr = opStr + " " + sMoto + " " + sDistance + " " + sBuzzer + " " + sLight + "\n";

    sendString(sendStr);
}


function setMotor(_motor, direction, _power) {

    var power = 0;
    var motorStr = "0";

    var opStr = "11";

    if (_motor == "m1") {
        motorStr = "0";
    }
    if (_motor == "m2") {
        motorStr = "1";
    }

    if (typeof _power === 'string' || _power instanceof String) {
        power = eval(_power);
    }
    if (power === true || power === "true") {
      power = 100;
    }
    if (power === false || power === "false") {
      power = 0;
    }
    power = valBetween(power, 0, 255);

    var dirStr = "0";
    if (direction == 'forward') {
        dirStr = "1";
    }
    else if (direction == 'backward'){
        dirStr = "2";
    }

    if (0 == power)
        dirStr = "0";

    var sendStr = opStr + " " + motorStr + " " + dirStr + " " + power + "\n";
    
    sendString(sendStr);
}

function setOutput(_output, _power) {

    var power = 0;
    var pinStr = "30";
    if (_output == "output1")
        pinStr = "30";
    if (_output == "output2")
        pinStr = "31";
    if (_output == "output3")
        pinStr = "32";
    if (_output == "output4")
        pinStr = "33";

    if (typeof _power === 'string' || _power instanceof String) {
        power = eval(_power);
    }

    if (power === true || power === "true") {
      power = 100;
    }
    if (power === false || power === "false") {
      power = 0;
    }

    power = valBetween(power, 0, 255);

    var opStr = "2";
    var sendStr = opStr + " " + pinStr + " " + power + "\n";
  
    sendString(sendStr);
}

function testdistance()
{
    var opStr = "8";

    var sendStr = opStr + "\n";
    sendString(sendStr);
}

function setServo(output, position) {
  position = eval(position);

  var indexStr = "0";
  if (output == "output1") {
    indexStr = "0";
  }
  if (output == "output2") {
    indexStr = "1";
  }
  if (output == "output3") {
    indexStr = "2";
  }
  if (output == "output4") {
    indexStr = "3";
  }

  var opStr = "6";
  var valStr = valBetween(position, 0, 180)
  var sendStr = opStr + " " + indexStr + " " + valStr + "\n";

  sendString(sendStr);
}

function valBetween(v, min, max) {
    return (Math.min(max, Math.max(min, v)));
}

function buzzer(state) {
    var opStr = "1";
    var pinStr = "13";
    var valStr = "0";
    if (state == "on")
        valStr = "1"
    else
        valStr = "0";

    var sendStr = opStr + " " + pinStr + " " + valStr + "\n";

    sendString(sendStr);
}

function consoleLog(strVal)
{
  var _code = strVal + "\n" + document.getElementById('code_area').value;
  document.getElementById('code_area').value = _code.substring(0, 2000);
}