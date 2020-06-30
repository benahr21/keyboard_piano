
    var synth = new Tone.PolySynth().toMaster(); // Initialize the OSC object


      var notes = ["C", "D", "E", "F", "G", "A", "B"]; // The notes for the keyboard
      var html = ""; // after the next for loop this var will be the content for the main container
      for (var octave = 0; octave < 2; octave++) {
        for (var i = 0; i < notes.length; i++) {
          var note = notes[i];
          var hasSharp = true;

          if (note == "E" || note == "B") hasSharp = false; // unneccesary black notes

          html += `<div class='whitenote'
          onmousedown='noteDown(this,false)'
          onmouseup='noteUp(this,false)'
          onmouseleave='noteUp(this,false')
           data-note='${note + (octave + 4)}'><span>ff</span>`;

          if (hasSharp) {
            html += `<div class='blacknote'
            onmousedown='noteDown(this,true)'
            onmouseup='noteUp(this,true)'
            onmouseleave='noteUp(this,true')   
            data-note='${note + "#" + (octave + 4)}'><span>ff</span></div>`;
          }

          

          html += "</div>";
        }
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