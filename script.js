let synth = new Tone.PolySynth().toMaster(); // Initialize the OSC object

let keysByOrder = [
  ["Q", "2", "W", "3", "E", "R", "5", "T", "6", "Y", "7", "U"],
  ["I", "9", "O", "0", "P", "V", "G", "B", "H", "N", "J", "M"],
];
var notes = ["C", "D", "E", "F", "G", "A", "B"]; // The notes for the keyboard

var html = ""; // after the next for loop this var will be the content for the main container
let counter = 0;
for (var octave = 0; octave < 2; octave++) {
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var hasSharp = true;

    if (note == "E" || note == "B") hasSharp = false; // unneccesary black notes

    html += `<div class='whitenote'
          onmousedown='noteDown(this,false)'
          onmouseup='noteUp(this,false)'
          onmouseleave='noteUp(this,false')
           data-note='${note + (octave + 4)}'><span>${
      keysByOrder[octave][counter]
    }</span>`;

    if (hasSharp) {
      counter++;
      html += `<div class='blacknote'
            onmousedown='noteDown(this,true)'
            onmouseup='noteUp(this,true)'
            onmouseleave='noteUp(this,true')   
            data-note='${note + "#" + (octave + 4)}'><span>${
        keysByOrder[octave][counter]
      }</span></div>`;
    }

    html += "</div>";

    counter++;
  }
  counter = 0;
}

document.getElementById("container").innerHTML = html; // put the content on the main container

function noteUp(elem, isSharp) {
  // when mouse is up of the note back to original color
  elem.style.background = isSharp ? "black" : "#ffed4b";
}
function noteDown(elem, isSharp) {
  // when you press the note
  var note = elem.dataset.note;
  //alert(note);
  elem.style.background = isSharp ? "#fdcd3b" : "#fdcd3b"; // change the color of pressed note
  synth.triggerAttackRelease(note, "16n"); // making the sound
  event.stopPropagation(); // fot fixing sound issues
}

let normal = document.getElementById("normalStatus");
let sp1 = document.getElementById("sp1Status");
let sp2 = document.getElementById("sp2Status");
let modal = document.getElementById("normalModal");
let modal1 = document.getElementById("sp1Modal");
let modal2 = document.getElementById("sp2Modal");
let close = document.getElementsByClassName("close")[0];
let close1 = document.getElementsByClassName("close")[1];
let close2 = document.getElementsByClassName("close")[2];

normal.addEventListener("click", () => {
  console.log("click normal");
  normal.style.backgroundColor = "#c7a541";
  sp1.style.backgroundColor = "#ffed4b";
  sp2.style.backgroundColor = "#ffed4b";
  synth = new Tone.PolySynth().toMaster();
  modal.style.display = "block";
});
sp1.addEventListener("click", () => {
  console.log("click sp1");
  normal.style.backgroundColor = "#ffed4b";
  sp1.style.backgroundColor = "#c7a541";
  sp2.style.backgroundColor = "#ffed4b";
  synth = new Tone.DuoSynth().toMaster();
  modal1.style.display = "block";
});
sp2.addEventListener("click", () => {
  console.log("click sp2");
  normal.style.backgroundColor = "#ffed4b";
  sp1.style.backgroundColor = "#ffed4b";
  sp2.style.backgroundColor = "#c7a541";
  synth = new Tone.MembraneSynth().toMaster();
  modal2.style.display = "block";
});
close.addEventListener("click", () => {
  modal.style.display = "none";
});
close1.addEventListener("click", () => {
  modal1.style.display = "none";
});
close2.addEventListener("click", () => {
  modal2.style.display = "none";
});
