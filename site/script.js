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
    if(from == "") {
        //  Error message handle this.
        out("No text in null, ignore")
        return;
    } else if(to == "") {
        //  Error handle this in some good
        out("No text in to, returning");
        return;
    }

    from = parseTime(from);
    console.log(from);
    to = parseTime(to);
    console.log(to);
    if(to == -1 || from == -1) {
        //"Error here too, break"
        out("Error -1");
    }
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
        var time_unit = parseInt(time_array[0]);
        var factor = 2;

        for(var i = 0; i < 3; i++) {
            var time_unit = parseInt(time_array[i]);
            if(Number.isNaN(time_unit)) return "Illegal symbols.";
            if(i > 0) {

            }

        }
        console.log("split");
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
var comments = [];
function Comment(text, start_time, duration) {
    this.text = text;
    this.start_time = start_time;
    this.duration = duration;
}
//  Could use this type of datastructure.
//  Rather use an array first
// function Node(next, previous, element) {
//     this.next = next;
//     this.previous = previous;
//     this.element = element;
// }

function markComment(text, start_time,duration) {
    var comment = new Comment(text, start_time,duration);
    comments.push(comment);
}

//  Module 1
var audio = document.createElement("AUDIO");
audio.src = "testfiles/test_chopin.mp3"
var audio_container = document.getElementById("audioContainer");
audio.controls = true;
audio_container.appendChild(audio);
