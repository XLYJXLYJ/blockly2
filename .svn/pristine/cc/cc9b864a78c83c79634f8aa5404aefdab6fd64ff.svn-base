var delay = 0;
var main_code_splitted;
var mainCode = '';
var interpreter_counter = 0;
var timer1;
var buttonCode;
var left_code;
var right_code;
var up_code;
var down_code;
var space_code;
var a_code;
var b_code;

var _data;

var up_timer, down_timer, left_timer, right_timer, space_timer;
var a_timer, b_timer;

var main_interpreter = function(delay,callback)
{
    //console.log(main_code_splitted[interpreter_counter]);
    try {
        eval(main_code_splitted[interpreter_counter]);
      }
    catch (e) {
      console.log(e);
    }

    if (codeRunning == true)
    timer1 = setTimeout(function(){ callback(); }, delay);

};

var interpreter_counter_Callback = function()
{
         if (interpreter_counter == main_code_splitted.length) {
           code_refresh();
         }
         main_interpreter(delay,interpreter_counter_Callback);
         interpreter_counter++;
};

var code_refresh = function() {

  left_code = "delay=0;\n";
  right_code = "delay=0;\n";
  up_code = "delay=0;\n";
  down_code = "delay=0;\n";
  space_code = "delay=0;\n";
  a_code = "delay=0;\n";
  b_code = "delay=0;\n";


  interpreter_counter = 0;
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  main_code_splitted = mainCode.split("\n");
  main_code_splitted[main_code_splitted.length-1] = "delay = 50;"
  //main_code_splitted[main_code_splitted.length] = "delay = (25);"
}


//button press interpreter
function key_interpreter(data,timer) {
		var dell = 0
		var _timer;

		var _data = data[0].replace("delay", "dell");
		eval(_data);
  //  console.log(_data);
		_timer = setTimeout(function(){
			data.shift();
			if (data.length > 0)
 					key_interpreter(data,timer);
		}, dell);
		eval(timer + '= _timer;');
}

function dataSplit(_data) {
	var data_split = _data.split("\n");
	data_split = data_split.slice(0, data_split.length-1);

	return data_split;
}

//wykrywanie nacisnietych klawiszy
//document.addEventListener("keydown",keyDownHandler, false);

function buttonPressed(keyPressed)
{
//	var keyPressed = String.fromCharCode(event.keyCode);
  //console.log(keyPressed);

code_refresh();

if (keyPressed == "up") {
  clearTimeout(up_timer);
  key_interpreter(dataSplit(up_code), "up_timer");
}
if (keyPressed == "down") {
  clearTimeout(down_timer);
  key_interpreter(dataSplit(down_code), "down_timer");
}
if (keyPressed == "left") {
  clearTimeout(left_timer);
  key_interpreter(dataSplit(left_code), "left_timer");
}
if (keyPressed == "right") {
  clearTimeout(right_timer);
  key_interpreter(dataSplit(right_code), "right_timer");
}
if (keyPressed == "stop") {
  clearTimeout(space_timer);
  key_interpreter(dataSplit(space_code), "space_timer");
}
if (keyPressed == "A") {
  clearTimeout(a_timer);
  key_interpreter(dataSplit(a_code), "a_timer");
}
if (keyPressed == "B") {
  clearTimeout(b_timer);
  key_interpreter(dataSplit(b_code), "b_timer");
}

}
