//  Variables containing the DOM objects for the fields.
const DEBUG = true;
function out(text) {
    if(DEBUG) console.log(text);
}
const from_field = document.getElementById("from_field");
const to_field = document.getElementById("to_field");
const comment_field = document.getElementById("comment_field");
const add_button = document.getElementById("add_button");
const clear_button = document.getElementById("clear_button")

var id_counter = 0;
var comments = [];
var list_head = null;


function removeComment(id) {
  for(var i = 0; i < comments.length; i++) {
    if(id == comments[id]) {
      arr.splice(i,1);
    }
  }
}

function Node(comment, previous, next) {
  id_counter++;
  this.comment = comment;
  this.previous = previous;
  this.next = next;
}
function Comment(text, start_time, end_time) {
    this.id = id_counter++;
    this.text = text;
    this.start_time = start_time;
    this.end_time = end_time;
}
//  Could use this type of datastructure.
//  Rather use an array first
// function Node(next, previous, element) {
//     this.next = next;
//     this.previous = previous;
//     this.element = element;
// }

function markComment(text, start_time,end_time) {
    var comment = new Comment(text, start_time,end_time);
    comments.push(comment);
}

//  Handler functions
//

/**
 * Clear the input fields to reset them
 * @return {void} [description]
 */
function clear() {
    from_field.value = "";
    to_field.value = "";
    comment_field.value = "";
}

function add() {
    var from = from_field.value;
    var to = to_field.value;
    var comment = comment_field.value;
    var is_singlepoint = false;

    if(from == "") {
        //  Error message handle this.
        out("No text in from, ignore")
        return;
    } else if(to == "") {
        //  Error handle this in some good
        out("No text in to, that's okay");
        is_singlepoint = true;
    }
    from = parseTime(from);
    if(typeof from === 'string' || from instanceof String) {
        out(from);
        return;
    }
    if(is_singlepoint) {
        to = from;
    } else {
        to = parseTime(to);
        if(typeof to === 'string' || to instanceof String) {
            out(to);
            return;
        }
    }


    if(to < from) {
        out("to is not supposed to be smaller than from to < from");
        return;
    }
    //  Error checked should work, do the thing now.
    //if(is_singlepoint)
    out("To: " + to);
    out("From: " + from);
    markComment(comment,from,to)
    clear();


}



//  Helper functions for handler.
function parseTime(time) {
    var split_format = (time.search(":") != -1);
    var seconds = 0;
    if(split_format) {
        var time_array = time.split(":");
        if(time_array.length != 3) {
            return "NOT CORRECT FORMAT.";
        }

        //  check for wrong formating
        for(var i = 0; i < 3; i++) {

        }
        //  harcoding this shit

        var factor = 2;

        for(var i = 0; i < 3; i++) {
            var time_unit = parseInt(time_array[i]);
            if(Number.isNaN(time_unit)) return "Illegal symbols.";
            if(time_unit < 0) {
                return "Less than 0 error.";
            }
            if(i > 0) {
                if(time_unit > 59) return "More than 59 error ";
            }
            seconds += time_unit * Math.pow(60,factor);
            factor--;


        }

        return seconds;
    } else {
        //  Parse seconds
        console.log("!split");
    }
}
clear_button.onclick = clear;

add_button.onclick = add;

function addComment() {
    console.log("asd");
}


// Comment structure in memory
//

//  Module 1
var audio = document.createElement("AUDIO");
audio.src = "testfiles/test_chopin.mp3"
var audio_container = document.getElementById("audioContainer");
audio.controls = true;
//audio_container.appendChild(audio);

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});
wavesurfer.load(audio);
