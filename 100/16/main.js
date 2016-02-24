window.onload = function() {
    var AudioCtx = window.AudioContext || window.webkitAudioContext;
    var audio = new AudioCtx();

    var semitoneMap = {
        C: -9,
        D: -7,
        E: -5,
        F: -4,
        G: -2,
        A: 0,
        B: 2,
    };


    var PIANO_BASE = Math.pow(2, 1 / 12);

    /**
     * @param {String} noteName - note and octave: 'C4'
     */
    function getFrequency(noteName) {
        var note = noteName[0];
        var octave = noteName[1];
        var semitone = semitoneMap[note] + (octave - 4) * 12;
        return 440 * Math.pow(PIANO_BASE, semitone);
    }

    var keyCodeNotes = {
        81: 'C5', // q
        87: 'D5', // w
        69: 'E5', // e
        82: 'F5', // r
        84: 'G5', // t
        89: 'A5', // y
        85: 'B5', // u
        73: 'C6', // i
        79: 'D6', // o
        80: 'E6', // p
        219: 'F6', // [
        221: 'G6', // ]

        65: 'C4', // a
        83: 'D4', // s
        68: 'E4', // d
        70: 'F4', // f
        71: 'G4', // g
        72: 'A4', // h
        74: 'B4', // j
        75: 'C5', // k
        76: 'D5', // l
        186: 'E5', // ;
        222: 'F5', // '

        90: 'C3', // z
        88: 'D3', // x
        67: 'E3', // c
        86: 'F3', // v
        66: 'G3', // b
        78: 'A3', // n
        77: 'B3', // m
        188: 'C4', // ,
        190: 'D4', // .
        191: 'E4', // /

    };

    // create tones
    var tones = {};
    for (var keyCode in keyCodeNotes) {
        var osc = audio.createOscillator();
        var noteName = keyCodeNotes[keyCode];
        osc.frequency.value = getFrequency(noteName);

        var gain = audio.createGain();
        gain.gain.value = 0;

        osc.connect(gain);
        osc.start();
        gain.connect(audio.destination);

        var tone = {
            noteName: noteName,
            osc: osc,
            gain: gain,
        };
        tones[keyCode] = tone;
    }


    document.addEventListener('keydown', function(event) {
        var tone = tones[event.keyCode];
        if (tone) {
            tone.gain.gain.value = 1;
            event.preventDefault();
            changeKeyElemDown(tone.noteName, 'add');
        }
    });

    document.addEventListener('keyup', function(event) {
        var tone = tones[event.keyCode];
        if (tone) {
            tone.gain.gain.value = 0;
            event.preventDefault();
            changeKeyElemDown(tone.noteName, 'remove');
        }
    });

    var keyboardElem = document.querySelector('.keyboard');

    function changeKeyElemDown(noteName, method) {
        var keyElems = keyboardElem.querySelectorAll('.' + noteName);
        for (var i = 0; i < keyElems.length; i++) {
            keyElems[i].classList[method]('is-down');
        }
    }

    var typeSelect = document.querySelector('.type-select');
    typeSelect.addEventListener('change', function() {
        changeType(typeSelect.value);
    });
    // set initial type
    changeType(typeSelect.value);

    function changeType(type) {
        for (var keyCode in tones) {
            var tone = tones[keyCode];
            tone.osc.type = type;
        }
    }
}
