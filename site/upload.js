var UPLOAD = true;
var upload_box = document.getElementById("upload_box");
//  Assumes that audioContainer is a variable
var TEXT_MAX_COUNT = 1;
var AUDIO_MAX_COUNT = 1;
var TEXT_COUNT = 0;
var AUDIO_COUNT = 0;
if(UPLOAD) {
    upload_box.hidden = false;
    audio_container.hidden = true;
}

//  https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  upload_box.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

;['dragenter', 'dragover'].forEach(eventName => {
  upload_box.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  upload_box.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  upload_box.classList.add('highlight')
}

function unhighlight(e) {
  upload_box.classList.remove('highlight')
}

upload_box.addEventListener('drop', handleDrop, false)



function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}
function removeFromDOM(DOM_element,type) {
    if(type == "text" && TEXT_COUNT != 0) {
        TEXT_COUNT--;
    } else if(type == "audio" && AUDIO_COUNT != 0) {
        AUDIO_COUNT--;
    }
    DOM_element.remove();
}
function addUploadedToList(li_elem,type) {
    var ul = document.getElementById("file_list");
    var close_button = document.createElement("a");
    close_button.href = "javascript:void(0)";
    close_button.textContent = "×";
    close_button.onclick = function() {
        removeFromDOM(li_elem,type);
    };
    li_elem.appendChild(close_button);
    ul.appendChild(li_elem);

}

function handleFiles(files) {
    var elem = null;
    var type = "";
    Array.from(files).forEach(function(item,index) {
        if(item.type.search("audio/") != -1) {
            if(AUDIO_COUNT++ < AUDIO_MAX_COUNT) {
                elem = document.createElement("li");
                elem.appendChild(document.createTextNode(item.name));
                type = "audio";
            }
        } else if(item.type.search("text") != -1) {
            out("hey");
            if(TEXT_COUNT++ < TEXT_MAX_COUNT) {
                elem = document.createElement("li");
                elem.appendChild(document.createTextNode(item.name));
                type = "text";
            }
        }

        if(elem != null) {
            addUploadedToList(elem,type);
        }
        console.log(item);
        console.log(index);
    });
}
