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
    id = ${keysByOrder[octave][counter]}
          onmousedown='noteDown(this,false)'
          onmouseup='noteUp(this,false)'
          onmouseleave='noteUp(this,false')
           data-note='${note + (octave + 4)}'><span>${
      keysByOrder[octave][counter]
    }</span>`;

    if (hasSharp) {
      counter++;
      html += `<div class='blacknote'
             id = ${keysByOrder[octave][counter]}
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
  elem.style.background = isSharp ? "rgba(130, 120, 33, 0.96)" : "#fdcd3b"; // change the color of pressed note
  synth.triggerAttackRelease(note, "16n"); // making the sound
  var x = elem.id;
  event.stopPropagation(); // fot fixing sound issues
}

// Function to convert keys to sounds

function keyPressed(key) {
  var y = String(key);
  var isBlack = false;
  var id = y.toUpperCase();

  if (key == "Q" || key == "q") {
    synth.triggerAttackRelease("C4", "16n");
  } else if (key == "W" || key == "w") {
    synth.triggerAttackRelease("D4", "16n");
  } else if (key == "E" || key == "e") {
    synth.triggerAttackRelease("E4", "16n");
  } else if (key == "R" || key == "r") {
    synth.triggerAttackRelease("F4", "16n");
  } else if (key == "T" || key == "t") {
    synth.triggerAttackRelease("G4", "16n");
  } else if (key == "Y" || key == "y") {
    synth.triggerAttackRelease("A4", "16n");
  } else if (key == "U" || key == "u") {
    synth.triggerAttackRelease("B4", "16n");
  } else if (key == "I" || key == "i") {
    synth.triggerAttackRelease("C5", "16n");
  } else if (key == "O" || key == "o") {
    synth.triggerAttackRelease("D4", "16n");
  } else if (key == "P" || key == "p") {
    synth.triggerAttackRelease("E5", "16n");
  } else if (key == "V" || key == "v") {
    synth.triggerAttackRelease("F5", "16n");
  } else if (key == "B" || key == "b") {
    synth.triggerAttackRelease("G5", "16n");
  } else if (key == "N" || key == "n") {
    synth.triggerAttackRelease("A5", "16n");
  } else if (key == "M" || key == "m") {
    synth.triggerAttackRelease("B5", "16n");
  } else if (key == "G" || key == "g") {
    synth.triggerAttackRelease("F#5", "16n");
  } else if (key == "H" || key == "h") {
    synth.triggerAttackRelease("G#5", "16n");
  } else if (key == "J" || key == "j") {
    synth.triggerAttackRelease("A#5", "16n");
  } else if (key == "2") {
    synth.triggerAttackRelease("C#4", "16n");
  } else if (key == "3") {
    synth.triggerAttackRelease("D#4", "16n");
  } else if (key == "5") {
    synth.triggerAttackRelease("F#4", "16n");
  } else if (key == "6") {
    synth.triggerAttackRelease("G#4", "16n");
  } else if (key == "7") {
    synth.triggerAttackRelease("A#4", "16n");
  } else if (key == "9") {
    synth.triggerAttackRelease("C#5", "16n");
  } else if (key == "0") {
    synth.triggerAttackRelease("D#5", "16n");
  }
  // If Black Note
  if (
    key == "0" ||
    key == "2" ||
    key == "3" ||
    key == "5" ||
    key == "6" ||
    key == "7" ||
    key == "9" ||
    key == "G" ||
    key == "g" ||
    key == "H" ||
    key == "h" ||
    key == "j" ||
    key == "j"
  ) {
    document.getElementById(id).style.backgroundColor =
      "rgba(130, 120, 33, 0.96)";
    setTimeout(function () {
      document.getElementById(id).style.backgroundColor = "black";
    }, 200);
  } else {
    document.getElementById(id).style.backgroundColor = "#fdcd3b";
    setTimeout(function () {
      document.getElementById(id).style.backgroundColor = "#ffed4b";
    }, 200);
  }
}

//getting some elements
let normal = document.getElementById("normalStatus");
let sp1 = document.getElementById("sp1Status");
let sp2 = document.getElementById("sp2Status");
let modal = document.getElementById("normalModal");
let modal1 = document.getElementById("sp1Modal");
let modal2 = document.getElementById("sp2Modal");
let close = document.getElementsByClassName("close")[0];
let close1 = document.getElementsByClassName("close")[1];
let close2 = document.getElementsByClassName("close")[2];

document.addEventListener("keydown", () => {
  var x = event.key;
  //alert("clicked" + " " + x);
  keyPressed(x);
});
document.addEventListener("keyup", () => {
  var x = event.key;
  keyReleased(x);
});

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
