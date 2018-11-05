Blockly.Blocks['initrobot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.initRobot)
        .appendField(MSG.moto)
        .appendField(new Blockly.FieldDropdown([[MSG.on,"on"], [MSG.off,"off"]]), "motor")
        .appendField(MSG.distance)
        .appendField(new Blockly.FieldDropdown([[MSG.on,"on"], [MSG.off,"off"]]), "distance")
        .appendField(MSG.buzzer)
        .appendField(new Blockly.FieldDropdown([[MSG.on,"on"], [MSG.off,"off"]]), "buzzer")
        .appendField(MSG.light)
        .appendField(new Blockly.FieldDropdown([[MSG.on,"on"], [MSG.off,"off"]]), "light");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(19);
    this.setTooltip('init the robot');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['initrobot'] = function(block) {
  var dropdown_motor = block.getFieldValue('motor');
  var dropdown_distance = block.getFieldValue('distance');
  var dropdown_buzzer = block.getFieldValue('buzzer');
  var dropdown_light = block.getFieldValue('light');

  var code = 'initRobot("' + dropdown_motor + '","' + dropdown_distance + '","' + dropdown_buzzer +  '","' + dropdown_light + '");\ndelay=0;\n';

  return code;
};

Blockly.Blocks['setmotor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.setMotorName);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["M1","m1"], ["M2","m2"]]), "motor");
    this.appendDummyInput()
        .appendField(MSG.in);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[MSG.forward,"forward"], [MSG.backward,"backward"]]), "direction");
    this.appendDummyInput()
        .appendField(MSG.with_power);
    this.appendValueInput("power")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(19);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['setmotor'] = function(block) {
  var dropdown_motor = block.getFieldValue('motor');
  var dropdown_direction = block.getFieldValue('direction');
  var value_power = Blockly.JavaScript.valueToCode(block, 'power', Blockly.JavaScript.ORDER_ATOMIC);

  if (value_power == "" || value_power == null) {
    value_power = "0";
  }


  var code = 'setMotor("' + dropdown_motor + '","' + dropdown_direction + '","' + value_power + '");\ndelay=0;\n';

  return code;
};


Blockly.Blocks['read_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.read)
        .appendField(new Blockly.FieldDropdown([["INPUT1","input1"], ["INPUT2","input2"], ["INPUT3","input3"], ["INPUT4","input4"]]), "input_number");
    this.setOutput(true, null);
    this.setColour(19);
    this.setTooltip('read input value');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['read_input'] = function(block) {
  var dropdown_input_number = block.getFieldValue('input_number');
  block.getFieldValue('END')

  var code = '';

  if (dropdown_input_number == 'input1') {
    code = "analogRead0";
  }
  if (dropdown_input_number == 'input2') {
    code = "analogRead1";
  }
  if (dropdown_input_number == 'input3') {
    code = "analogRead2";
  }
  if (dropdown_input_number == 'input4') {
    code = "analogRead3";
  }

  //var code = "analogRead0";
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['output'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.setOutput)
        .appendField(new Blockly.FieldDropdown([["OUTPUT1","output1"], ["OUTPUT2","output2"], ["OUTPUT3","output3"], ["OUTPUT4","output4"]]), "output_number")
        .appendField(MSG.to);
    this.appendValueInput("power")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(19);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.JavaScript['output'] = function(block) {
  var dropdown_output_number = block.getFieldValue('output_number');
  var value_power = Blockly.JavaScript.valueToCode(block, 'power', Blockly.JavaScript.ORDER_ATOMIC);

  if (value_power == "")
    value_power = "0";

  var code = 'setOutput("' + dropdown_output_number + '","' + value_power +'");\ndelay=0;\n';
  return code;
};

Blockly.Blocks['buzzer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.buzzer)
        .appendField(new Blockly.FieldDropdown([[MSG.on,"on"], [MSG.off,"off"]]), "buzzer_state");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(19);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['buzzer'] = function(block) {
  var dropdown_buzzer_state = block.getFieldValue('buzzer_state');
  // TODO: Assemble JavaScript into code variable.
  var code = 'buzzer("' + dropdown_buzzer_state + '");\ndelay=0\n';
  return code;
};

Blockly.Blocks['servo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.setServo)
        .appendField(new Blockly.FieldDropdown([["OUTPUT1","output1"], ["OUTPUT2","output2"], ["OUTPUT3","output3"], ["OUTOUT4","output4"]]), "servo_pin")
        .appendField(MSG.to);
    this.appendValueInput("position")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(19);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['servo'] = function(block) {
  var dropdown_servo_pin = block.getFieldValue('servo_pin');
  var value_position = Blockly.JavaScript.valueToCode(block, 'position', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'setServo("' + dropdown_servo_pin + '","' + value_position +'");\ndelay=0;\n';
    //console.log(code);
    return code;
};

Blockly.Blocks['distance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.distanceSensor);
    this.setOutput(true, null);
    this.setColour(19);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['main_repeat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.repeat)
        .appendField(new Blockly.FieldImage("img/loop_icon.svg", 30, 30, "*"));
    this.appendStatementInput("repeat_code")
        .setCheck(null);
    this.setColour(43);
    this.setTooltip('this is main loop fo the program');
    this.setHelpUrl('');
    this.setDeletable(false);
  }
};

Blockly.JavaScript['main_repeat'] = function(block) {
  var statements_repeat_code = Blockly.JavaScript.statementToCode(block, 'repeat_code');
  // TODO: Assemble JavaScript into code variable.

  if (statements_repeat_code == "") {
    statements_repeat_code = "delay=0;\n";
  }

  mainCode = statements_repeat_code;
  return mainCode;
};


Blockly.Blocks['delay_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.wait);
    this.appendValueInput("delay_time")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(43);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['delay_block'] = function(block) {
  var value_delay_time = Blockly.JavaScript.valueToCode(block, 'delay_time', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.

  if (value_delay_time == "") {
    value_delay_time = "0";
  }

  var code = 'delay = '+ value_delay_time +';\n';
  return code;
};


Blockly.Blocks['if'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.if);
    this.appendValueInput("if_condition")
        .setCheck(null);
    this.appendStatementInput("if_content")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(43);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['if'] = function(block) {
  var value_if_condition = Blockly.JavaScript.valueToCode(block, 'if_condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_if_content = Blockly.JavaScript.statementToCode(block, 'if_content');
  var code = "delay=0;\n";

  value_if_condition = eval(value_if_condition);

  if (value_if_condition == 'true' || value_if_condition == true ) {
    code = statements_if_content;
  }
  else {
  }

  return code;
};

Blockly.Blocks['if_else'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.if);
    this.appendValueInput("if_condition")
        .setCheck(null);
    this.appendStatementInput("if_content")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(MSG.else);
    this.appendStatementInput("else_content")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(43);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['if_else'] = function(block) {
  var value_if_condition = Blockly.JavaScript.valueToCode(block, 'if_condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_if_content = Blockly.JavaScript.statementToCode(block, 'if_content');
  var statements_else_content = Blockly.JavaScript.statementToCode(block, 'else_content');

  var code = "delay=0;\n";

  value_if_condition = eval(value_if_condition);

    if (value_if_condition == 'true' || value_if_condition == true ) {
      code = statements_if_content;
    }
    else {
    code = statements_else_content;
  }
  return code;
};

Blockly.Blocks['compare'] = {
  init: function() {
    this.appendValueInput("compare_left")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["=","equal"], ["!=","notequal"], [">","more"], ["<","less"]]), "comparator");
    this.appendValueInput("compare_right")
        .setCheck("Number");
    this.setOutput(true, null);
    this.setColour(215);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['compare'] = function(block) {
  var value_compare_left = Blockly.JavaScript.valueToCode(block, 'compare_left', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_comparator = block.getFieldValue('comparator');
  var value_compare_right = Blockly.JavaScript.valueToCode(block, 'compare_right', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "false";

  if (typeof value_compare_left === 'string' || value_compare_left instanceof String) {
    value_compare_left = eval(value_compare_left);
  }

  if (typeof value_compare_right === 'string' || value_compare_right instanceof String) {
    value_compare_right = eval(value_compare_right);
  }

  if (dropdown_comparator == "equal" && value_compare_left == value_compare_right)
    code = "true";
  else if (dropdown_comparator == "notequal" && value_compare_left != value_compare_right)
    code = "true";
  else if (dropdown_comparator == "more" && value_compare_left > value_compare_right)
    code = "true";
  else if (dropdown_comparator == "less" && value_compare_left < value_compare_right)
    code = "true";
  else
    code = "false";
  //console.log("left= "+ value_compare_left);
  //console.log("compare="+code);
  //console.log(code);
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['repeat_times'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.repeat);
    this.appendValueInput("repeat_number")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(MSG.times);
    this.appendStatementInput("repeat_content")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(43);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['repeat_times'] = function(block) {
  var value_repeat_number = Blockly.JavaScript.valueToCode(block, 'repeat_number', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_repeat_content = Blockly.JavaScript.statementToCode(block, 'repeat_content');

  var code = 'delay=0;\n';
  //console.log(statements_repeat_content);

  for (i = 0; i < eval(value_repeat_number); i++) {
    code = code + statements_repeat_content;

  }
  console.log("kod" + code);

  return code;
};

Blockly.Blocks['output'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.setOutput)
        .appendField(new Blockly.FieldDropdown([["OUTPUT1","output1"], ["OUTPUT2","output2"], ["OUTPUT3","output3"], ["OUTPUT4","output4"]]), "output_number")
        .appendField(MSG.to);
    this.appendValueInput("power")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(19);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['testdistance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.testdistance)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(19);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['testdistance'] = function(block) {
  var code = 'testdistance();\ndelay=0;\n';
  return code;
};

Blockly.JavaScript['distance'] = function(block) {
  var code = 'dist_read';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['string_math_arithmetic'] = {
  init: function() {
    this.appendValueInput("left_value")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+","add"], ["-","subtract"], ["×","multiply"], ["÷","divide"]]), "operator");
    this.appendValueInput("right_value")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(215);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['string_math_arithmetic'] = function(block) {
  var value_left_value = Blockly.JavaScript.valueToCode(block, 'left_value', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_operator = block.getFieldValue('operator');
  var value_right_value = Blockly.JavaScript.valueToCode(block, 'right_value', Blockly.JavaScript.ORDER_ATOMIC);

var code = '';

if (typeof value_left_value === 'string' || value_left_value instanceof String) {
  //value_left_value = eval(value_left_value);
}
else {
  value_left_value = value_left_value.toString();
}

if (typeof value_right_value === 'string' || value_light_value instanceof String) {
  //value_right_value = eval(value_right_value);
}
else {
  value_right_value = value_right_value.toString();
}



  if (dropdown_operator == "add") {
    code = '('+ value_left_value +' + '+ value_right_value + ')';
  }
  if (dropdown_operator == "subtract") {
    code = '('+ value_left_value +' - '+ value_right_value + ')';
  }
  if (dropdown_operator == "multiply") {
    code = '('+ value_left_value +' * '+ value_right_value + ')';
  }
  if (dropdown_operator == "divide") {
    code = '('+ value_left_value +' / '+ value_right_value + ')';
  }

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['number'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("0"), "num");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(215);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['number'] = function(block) {
  var text_num = block.getFieldValue('num');
  // TODO: Assemble JavaScript into code variable.
  var code = text_num;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['key_pressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.onKeyPressed)
        .appendField(new Blockly.FieldDropdown([[MSG.upArrow,"up_arrow"], [MSG.downArrow,"down_arrow"], [MSG.leftArrow,"left_arrow"], [MSG.rightArrow,"right_arrow"],[MSG.stop,"space"],["a","a"],["b","b"]]), "key_name");
    this.appendStatementInput("key_pressed_content")
        .setCheck(null);
    this.setInputsInline(true);
    this.setColour(132);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['key_pressed'] = function(block) {
  var dropdown_key_name = block.getFieldValue('key_name');
  var statements_key_pressed_content = Blockly.JavaScript.statementToCode(block, 'key_pressed_content');
  // TODO: Assemble JavaScript into code variable.

  if (statements_key_pressed_content == "") {
    statements_key_pressed_content = "delay=0;\n";
  }

  if (dropdown_key_name == "up_arrow") {
  up_code = statements_key_pressed_content;
  }
  if (dropdown_key_name == "down_arrow") {
  down_code = statements_key_pressed_content;
  }
  if (dropdown_key_name == "left_arrow") {
  left_code = statements_key_pressed_content;
  }
  if (dropdown_key_name == "right_arrow") {
  right_code = statements_key_pressed_content;
  }
  if (dropdown_key_name == "space") {
  space_code = statements_key_pressed_content;
  }
  if (dropdown_key_name == "a") {
  a_code = statements_key_pressed_content;
  }
  if (dropdown_key_name == "b") {
  b_code = statements_key_pressed_content;
  }
  buttonCode = "";
  //console.log(buttonCode);
  return buttonCode;

};

Blockly.Blocks['bool_and'] = {
  init: function() {
    this.appendValueInput("left")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(MSG.and);
    this.appendValueInput("right")
        .setCheck(null);
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['bool_and'] = function(block) {
  var value_left = Blockly.JavaScript.valueToCode(block, 'left', Blockly.JavaScript.ORDER_ATOMIC);
  var value_right = Blockly.JavaScript.valueToCode(block, 'right', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'delay=0\n';
  var _left = false;
  var _right = false;

  //console.log("left " + value_left);
  //console.log("right " + value_right);

  if (value_left == "true" || value_left == "(true)" ) {
    _left = true;
  }
  else {
  _left = false;
  }

  if (value_left == true) {
    _left = true;
  }


  if (value_right == "true" || value_right == "(true)") {
    _right = true;
  }
  else {
    _right = false;
  }

  if (value_right == true) {
    _right = true;
  }


  if (_left == true  && _right == true) {
    code = "true";
    //console.log("TRUE!!!");
  }
  else {
    //code = "false";
    //console.log("FALSE!!!");
  }


  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['bool_or'] = {
  init: function() {
    this.appendValueInput("left")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(MSG.or);
    this.appendValueInput("right")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(300);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['bool_or'] = function(block) {
  var value_left = Blockly.JavaScript.valueToCode(block, 'left', Blockly.JavaScript.ORDER_ATOMIC);
  var value_right = Blockly.JavaScript.valueToCode(block, 'right', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 'delay=0\n';
  var _left = false;
  var _right = false;

  //console.log("left " + value_left);
  //console.log("right " + value_right);

  if (value_left == "true" || value_left == "(true)" ) {
    _left = true;
  }
  else {
  _left = false;
  }

  if (value_left == true) {
    _left = true;
  }


  if (value_right == "true" || value_right == "(true)") {
    _right = true;
  }
  else {
    _right = false;
  }

  if (value_right == true) {
    _right = true;
  }


  if (_left == true  || _right == true) {
    //code = "true";
    //console.log("TRUE!!!");
  }
  else {
    //code = "false";
    //console.log("FALSE!!!");
  }

  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['console'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "display")
        .appendField(MSG.console)
        .appendField(new Blockly.FieldTextInput(""), "tag");
    this.appendValueInput("log")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(43);
    this.setTooltip('write info to console filed.');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['console'] = function(block) {
  var checkbox_display = block.getFieldValue('display') == 'TRUE';
  var text_tag = block.getFieldValue('tag');
  var value_log = Blockly.JavaScript.valueToCode(block, 'log', Blockly.JavaScript.ORDER_ATOMIC);

  var text = text_tag + " : " + eval(value_log) + "\n";

  if (checkbox_display) {
    code = 'consoleLog("' + text_tag + eval(value_log) + '");\n';
  }

  return code;
};


Blockly.Blocks['console_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("console_clear");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(43);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['console_clear'] = function(block) {
document.getElementById('code_area').value = "";
  //return code;
};

//MOBILE

Blockly.Blocks['slider'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[MSG.slider1,"slider2"], [MSG.slider2,"slider1"]]), "slider_no");
    this.setOutput(true, null);
    this.setColour(132);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['slider'] = function(block) {
  var dropdown_slider_no = block.getFieldValue('slider_no');

  var code = '';

  if (dropdown_slider_no == 'slider1') {
    code = "slider1";
  }
  if (dropdown_slider_no == 'slider2') {
    code = "slider2";
  }

  //console.log("A "+code);
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.button)
        .appendField(new Blockly.FieldDropdown([["A","buttonA"], ["B","buttonB"], ["STOP","stop_button"], ["GÓRA","up_arrow"], ["DÓŁ","down_arrow"], ["LEWO","left_arrow"], ["PRAWO","right_arrow"],["ŻADEN","nobutton"]]), "button_name");
    this.setOutput(true, null);
    this.setColour(132);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['button'] = function(block) {
  var dropdown_button_name = block.getFieldValue('button_name');

  var code = '';

//  if (dropdown_button_name == 'buttonA') {
    code = dropdown_button_name;


  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.Blocks['accelerometer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(MSG.swing)
        .appendField(new Blockly.FieldDropdown([[MSG.horizontal,"accelX"], [MSG.vertical,"accelY"]]), "position");
    this.setOutput(true, null);
    this.setColour(132);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['accelerometer'] = function(block) {
  var dropdown_position = block.getFieldValue('position');

  var code = '...';

  if (dropdown_position == "accelX")
    code = accelerometerX;

  if (dropdown_position == "accelY")
    code = accelerometerY;

  return [code, Blockly.JavaScript.ORDER_NONE];
};
