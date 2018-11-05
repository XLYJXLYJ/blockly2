var keypadVisible = false;


CustomDialog = {};

var numpad = '<form action="" method="" name="vform"><input type="button" class="fbutton" name="1" value="1" id="1" ontouchstart=addNumber(this); /><input type="button" class="fbutton" name="2" value="2" id="2" ontouchstart=addNumber(this); /><input type="button" class="fbutton" name="3" value="3" id="3" ontouchstart=addNumber(this); /></br><input type="button" class=fbutton" name="4" value="4" id="4" ontouchstart=addNumber(this); /><input type="button" class="fbutton" name="5" value="5" id="5" ontouchstart=addNumber(this); /><input type="button" class="fbutton" name="6" value="6" id="6" ontouchstart=addNumber(this); /></br><input type="button" class="fbutton" name="7" value="7" id="7" ontouchstart=addNumber(this); /><input type="button" class="fbutton" name="8" value="8" id="8" ontouchstart=addNumber(this); /><input type="button" class="fbutton" name="9" value="9" id="9" ontouchstart=addNumber(this); /></br><input type="button" id="customDialogDel"  name="<" value="<" ontouchstart=removeNumber(); /><input type="button" class="fbutton" name="0" value="0" id="0" ontouchstart=addNumber(this); /><input type="button" id="customDialogOkay" name="OK" value="OK"/></form>';

function addNumber(element){
  document.getElementById('customDialogInput').value = document.getElementById('customDialogInput').value+element.value;
}

function removeNumber(element){

  var data = document.getElementById('customDialogInput').value;

  if (data.length>0){
  data = data.substring(0, data.length-1);
  }

  document.getElementById('customDialogInput').value = data;
}


/** Override Blockly.alert() with custom implementation. */
Blockly.alert = function(message, callback) {
  console.log('Alert: ' + message);
  CustomDialog.show('Alert', message, {
    onCancel: callback
  });
};



/** Override Blockly.confirm() with custom implementation. */
Blockly.confirm = function(message, callback) {
  console.log('Confirm: ' + message);
  CustomDialog.show('Confirm', message, {
    showOkay: true,
    onOkay: function() {
      callback(true)
    },
    showCancel: true,
    onCancel: function() {
      callback(false)
    }
  });
};

/** Override Blockly.prompt() with custom implementation. */
Blockly.prompt = function(message, defaultValue, callback) {
  //prompt(message);

  if (message == "New variable name:"){
    keypadVisible = false;
  }
  else {
    keypadVisible = true;
  }

  CustomDialog.show('Prompt', message, {
    showInput: keypadVisible,
    showOkay: true,
    onOkay: function() {
      callback(CustomDialog.inputField.value)
    },
    showCancel: true,
    onCancel: function() {
      callback(null)
    }
  });
  CustomDialog.inputField.value = '';
};

/** Hides any currently visible dialog. */
CustomDialog.hide = function() {
  if (CustomDialog.backdropDiv_) {
    CustomDialog.backdropDiv_.style.display = 'none'
    CustomDialog.dialogDiv_.style.display = 'none'
  }
};

/**
 * Shows the dialog.
 * Allowed options:
 *  - showOkay: Whether to show the OK button.
 *  - showCancel: Whether to show the Cancel button.
 *  - showInput: Whether to show the text input field.
 *  - onOkay: Callback to handle the okay button.
 *  - onCancel: Callback to handle the cancel button and backdrop clicks.
 */
CustomDialog.show = function(title, message, options) {
  var backdropDiv = CustomDialog.backdropDiv_;
  var dialogDiv = CustomDialog.dialogDiv_;
  if (!dialogDiv) {
    // Generate HTML
    backdropDiv = document.createElement('div');
    backdropDiv.id = 'customDialogBackdrop';
    backdropDiv.style.cssText =
        'position: absolute;' +
        'z-index: 800;'+
        'top: 0; left: 0; right: 0; bottom: 0;' +
        'background-color: rgba(0, 0, 0, .7);';
    document.body.appendChild(backdropDiv);

    dialogDiv = document.createElement('div');
    dialogDiv.id = 'customDialog';
    dialogDiv.style.cssText =

        'margin: 100px auto 0;' +
        'padding: 10px;';
    backdropDiv.appendChild(dialogDiv);

    dialogDiv.onclick = function(event) {
      event.stopPropagation();
    };

    CustomDialog.backdropDiv_ = backdropDiv;
    CustomDialog.dialogDiv_ = dialogDiv;
  }
  backdropDiv.style.display = 'block';
  dialogDiv.style.display = 'block';

  dialogDiv.innerHTML = '<div><input id="customDialogInput"></div>' + (options.showInput ? numpad : '');


  var onOkay = function(event) {
    CustomDialog.hide();
    options.onOkay && options.onOkay();
    event && event.stopPropagation();
  };
  var onCancel = function(event) {
    CustomDialog.hide();
    options.onCancel && options.onCancel();
    event && event.stopPropagation();
  };


var div = document.getElementById('customDialogBackdrop');
  div.addEventListener('click', function (event) {
      //alert("k");
      onCancel();
  });

  var dialogInput = document.getElementById('customDialogInput');
  CustomDialog.inputField = dialogInput;
  if (dialogInput) {
    dialogInput.value = '';

    if (keypadVisible == false)
    dialogInput.focus();

    dialogInput.onkeyup = function(event) {
      if (event.keyCode == 13) {
        // Process as OK when user hits enter.
        onOkay();
        Keyboard.hide();
        return false;
      } else if (event.keyCode == 27)  {
        // Process as cancel when user hits esc.
        onCancel();
        return false;
      }
    };
  } else {
    var okay = document.getElementById('customDialogOkay');
    okay && okay.focus();
  }

  if (options.showOkay) {
    document.getElementById('customDialogOkay')
        .addEventListener('click', onOkay);
  }
  if (options.showCancel) {
  //  document.getElementById('customDialogCancel')
  //      .addEventListener('click', onCancel);
  }

  backdropDiv.onclick = onCancel;
};
