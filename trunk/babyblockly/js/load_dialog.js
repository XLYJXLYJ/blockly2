
function createFile() {
   var type = window.PERSISTENT;
   var size = 1024*1024;
   var name = prompt("PODAJ NAZWĘ PROGRAMU","");

   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile(name, {create: true, exclusive: true}, function(fileEntry) {
         alert('File creation successfull!')
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }

}

function writeFile() {
   var type = window.PERSISTENT;
   var size = 1024*1024;
   var name = prompt(MSG.whatIsYourProjectName,"");

   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {

      fs.root.getFile(name, {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
              // alert('Write completed.');
              listDir();
            };

            fileWriter.onerror = function(e) {
               alert('Write failed: ' + e.toString());
            };

            //

            var xml = Blockly.Xml.workspaceToDom(workspace);
            var xml_text = Blockly.Xml.domToText(xml);

            var blob = new Blob([xml_text], {type: 'text/plain'});
            //console.log(xml_text);
            fileWriter.write(blob);
         }, errorCallback);

      }, errorCallback);

   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }

}

function readFile(name) {
   var type = window.PERSISTENT;
   var size = 1024*1024;
   //var name = prompt();

   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {

      fs.root.getFile(name, {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
              // var txtArea = document.getElementById('textarea');
               //txtArea.value = this.result;

               var xmlDoc = this.result;
               //console.log(xmlDoc);
               Blockly.mainWorkspace.clear()

               var xml = Blockly.Xml.textToDom(xmlDoc);
               //console.log(xmlDoc);
               Blockly.Xml.domToWorkspace(xml, workspace);

            };

            reader.readAsText(file);

         }, errorCallback);

      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }

}

function removeFile(name) {
   var type = window.PERSISTENT;
   var size = 1024*1024;

   var confirmation = confirm("Are you sure delete the file?");
   if (confirmation == true) {
  window.requestFileSystem(type, size, successCallback, errorCallback)
  }


   function successCallback(fs) {
      fs.root.getFile(name, {create: false}, function(fileEntry) {

         fileEntry.remove(function() {
          //  alert('Plik usunięty.');
          listDir();
         }, errorCallback);

      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }

}

function listDir(){
window.requestFileSystem(window.PERSISTENT, 1024*1024, onInitFs, errorHandler);
}

function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function listResults(entries) {
  var fragment = document.createDocumentFragment();
  document.querySelector('#filesList').innerHTML = "";

  entries.forEach(function(entry, i) {
    var li = document.createElement('li');
    li.innerHTML = [entry.name,'<div class="close">X</div>'].join('');

    if (entry.name != "NoCloud")
    fragment.appendChild(li);

  });

  document.querySelector('#filesList').appendChild(fragment);
}

function onInitFs(fs) {

  var dirReader = fs.root.createReader();
  var entries = [];

  // Call the reader.readEntries() until no more results are returned.
  var readEntries = function() {
     dirReader.readEntries (function(results) {
      if (!results.length) {
        //console.log(entries.sort());
        listResults(entries.sort());
      } else {
        entries = entries.concat(toArray(results));
        readEntries();
      }
    }, errorHandler);
  };

  readEntries(); // Start reading dirs.

}

function errorHandler() {}


var ul = document.getElementById('filesList');  // Parent

ul.addEventListener('click', function(e) {

    if (e.target.tagName === 'LI'){
      var name = e.target.innerHTML.split("<");
      readFile(name[0]);
      //alert(e.target.innerHTML);  // Check if the element is a LI
    }

    if (e.target.tagName === 'DIV'){

      var name = e.target.parentNode.innerHTML.split("<");
      //alert(name[0]);
      removeFile(name[0]);

    }


});

function filesShow() {

  var element = document.getElementById("files");
  var overlay = document.getElementById("overlay");

  if (element.className == "files_hide") {
    element.classList.remove("files_hide");
    overlay.classList.remove("hide_overlay");
  }
  else {
    element.classList.add("files_hide");
    overlay.classList.add("hide_overlay");
  }


}

document.getElementById('showFiles').onclick=function(){

document.getElementById('filesList').style.display = "block";
document.getElementById('examplesList').style.display = "none";

}

document.getElementById('showExamples').onclick=function(){

document.getElementById('filesList').style.display = "none";
document.getElementById('examplesList').style.display = "block";

}
