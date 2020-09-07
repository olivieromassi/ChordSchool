import Vue from 'vue';
import Vuex from 'vuex';
import colors from 'vuetify/lib/util/colors'
import * as Tone from "tone";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        /*This list represents the possible key references*/
        keys: [{name: 'C', color: colors.red, colorText: 'red'},
            {name: 'C#', color: colors.teal, colorText: 'teal'},
            {name: 'Db', color: colors.teal, colorText: 'teal'},
            {name: 'D', color: colors.orange, colorText: 'orange'},
            {name: 'Eb', color: colors.blue, colorText: 'blue'},
            {name: 'E', color: colors.yellow, colorText: 'yellow'},
            {name: 'F', color: colors.purple, colorText: 'purple'},
            {name: 'F#', color: colors.green, colorText: 'green'},
            {name: 'Gb', color: colors.green, colorText: 'green'},
            {name: 'G', color: colors.deepOrange, colorText: 'deep-orange'},
            {name: 'Ab', color: colors.lightBlue, colorText: 'light-blue'},
            {name: 'A', color: colors.amber, colorText: 'amber'},
            {name: 'Bb', color: colors.indigo, colorText: 'indigo'},
            {name: 'B', color: colors.lightGreen, colorText: 'light-green'},
            {name: 'Cb', color: colors.lightGreen, colorText: 'light-green'}],

        circleOfFifths:
            [{name: 'C', colorText: 'red', highlight: false},
                {name: 'G', colorText: 'deep-orange', highlight: false},
                {name: 'D', colorText: 'orange', highlight: false},
                {name: 'A', colorText: 'amber', highlight: false},
                {name: 'E', colorText: 'yellow', highlight: false},
                {name: 'B/Cb', colorText: 'light-green', highlight: false},
                {name: 'F#/Gb', colorText: 'green', highlight: false},
                {name: 'C#/Db', colorText: 'teal', highlight: false},
                {name: 'Ab', colorText: 'light-blue', highlight: false},
                {name: 'Eb', colorText: 'blue', highlight: false},
                {name: 'Bb', colorText: 'indigo', highlight: false},
                {name: 'F', colorText: 'purple', highlight: false}],

        /*This list represents the notes of the chromatic scale*/
        chromaticScale: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],

        /*This string represents the name of the key reference chosen by the user*/
        selectedKey: String,

        /*This list contains all the notes of the Ionian Scale corresponding to the chosen key reference*/
        keyReference: [],


        /*This dictionary contains all the possible Ionian scales*/

        scales: [['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'],
            ['C#3', 'D#3', 'E#3', 'F#3', 'G#3', 'A#3', 'B#3'],
            ['Db3', 'Eb3', 'F3', 'Gb3', 'Ab3', 'Bb3', 'C4'],
            ['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4'],
            ['Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4', 'D4'],
            ['E3', 'F#3', 'G#3', 'A3', 'B3', 'C#4', 'D#4'],
            ['F3', 'G3', 'A3', 'Bb3', 'C4', 'D4', 'E4'],
            ['F#3', 'G#3', 'A#3', 'B3', 'C#4', 'D#4', 'E#4'],
            ['Gb3', 'Ab3', 'Bb3', 'Cb4', 'Db4', 'Eb4', 'F4'],
            ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F#4'],
            ['Ab3', 'Bb3', 'C4', 'Db4', 'Eb4', 'F4', 'G4'],
            ['A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4'],
            ['Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4', 'A4'],
            ['B3', 'C#4', 'D#4', 'E4', 'F#4', 'G#4', 'A#4'],
            ['Cb4', 'Db4', 'Eb4', 'Fb4', 'Gb4', 'Ab4', 'Bb4']],


        /*This list contains the 7 major harmony modes related to the selected key reference*/
        modes: [],

        /*This list contains the chords chosen by the user to be part of a chord progression*/
        progression: [],

        /* This list contains the state of the keyboard keys, that alternate between "pressed-1" or "released-0".*/
        keyboard: [
            {name: 'C3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'C#3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'D3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'D#3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'E3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'F3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'F#3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'G3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'G#3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'A3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'A#3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'B3', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'C4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'C#4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'D4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'D#4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'E4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'F4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'F#4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'G4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'G#4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'A4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'A#4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'B4', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'C5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'C#5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'D5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'D#5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'E5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'F5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'F#5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'G5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'G#5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'A5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'A#5', pressed: false, partOfRefScale: null, noteName: null},
            {name: 'B5', pressed: false, partOfRefScale: null, noteName: null}
        ],

        /* This variable will reset the keyboard if true */
        resetKeyboard: true,
        keysIndexes: [],

        // This matrix is sorted from the Brightest to the Darkest chord and holds the details of chord degrees
        chordDetails: [{degree: 3, shade: 'lighten-4', chordQuality: '\u0394', mode: 'Lydian'},
            {degree: 0, shade: 'lighten-3', chordQuality: '\u0394', mode: 'Ionian'},
            {degree: 4, shade: 'lighten-2', chordQuality: '7', mode: 'Mixolydian'},
            {degree: 1, shade: '', chordQuality: 'mi7', mode: 'Dorian'},
            {degree: 5, shade: 'darken-1', chordQuality: 'mi7', mode: 'Aeolian'},
            {degree: 2, shade: 'darken-2', chordQuality: 'mi7', mode: 'Phrygian'},
            {degree: 6, shade: 'darken-4', chordQuality: '\u00D8', mode: 'Locrian'}],

        /*Variable used as the selector for the different available sounds*/
        instrument: 0,

        instruments: ['piano', 'sine-synth', 'saw-synth'],

        /*This variable defines the sound of a piano starting from samples*/
        sampler: new Tone.Sampler({
            urls: {
                "C3": "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                A3: "A3.mp3",
                C4: "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                A4: "A4.mp3",
                C5: "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                A5: "A5.mp3",
            },
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination(),

        /*This variable defines the sound of a sinusoidal synthesizer*/
        synth1: new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "sine"
            },
            volume: -5
        }).toDestination(),

        /*This variable defines the sound of a sawtooth synthesizer*/
        synth2: new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "sawtooth"
            },
            volume: -5
        }).toDestination(),
    },
    getters: {
        getKeys(state) {
            return state.keys.map(key => key.name);
        },
        getKeysNameColor(state) {
            return state.circleOfFifths;
        },
        getChromaticScale(state) {
            return state.chromaticScale;
        },
        getSelectedKey(state) {
            return state.selectedKey;
        },
        getKeyReference(state) {
            return state.keyReference;
        },
        getScales(state) {
            return state.scales;
        },
        getModes(state) {
            return state.modes;
        },
        getProgression(state) {
            return state.progression;
        },
        getPressedKeys(state) {
            return state.keyboard.filter(key => {
                    return key.pressed
                }
            )
        },
        getRefScaleKeys(state) {
            return state.keyboard.filter(key => {
                    return key.partOfRefScale
                }
            )
        },
        getChordDetails(state) {
            return state.chordDetails;
        },
        getSampler(state) {
            return state.sampler;
        },
        getSynth1(state) {
            return state.synth1;
        },
        getSynth2(state) {
            return state.synth2;
        },
        getInstrument(state) {
            return state.instrument;
        },
        getInstruments(state) {
            return state.instruments;
        }
    },

    actions: {
        /*asynchronous commit of the altered chord progression is required
        *to avoid conflict with relevant getProgression getter  */
        rearrangeProgression({commit}, chords) {
            commit("commitProgression", chords);
        }
    },

    mutations: {
        /*METHODS RELATED TO THE KEY REFERENCE STATE*/
        /*This method assigns the selected key to the corresponding state's variable*/
        setSelectedKey(state, key) {
            state.selectedKey = key;
        },
        /*This method extracts from all the possible scales the one related to the chosen key reference*/
        setSelectedKeyScale(state) {
            state.keyReference = state.scales[state.keys.map(key => key.name).indexOf(state.selectedKey)];
        },

        setInstrument(state, instrument) {
            state.instrument = instrument;
        },

        /*METHODS RELATED TO THE MODES STATE*/
        /*This method resets the modes list to an empty list*/
        resetModes(state) {
            state.modes = [];
        },
        /*This method builds the modes corresponding to the selected key reference*/
        buildModes(state) {
            state.keyReference.forEach((value, index) => {
                let features = {};
                features.degree = index;

                //Set the tonic
                features.tonic = state.keyReference[(index) % 7];

                //Set the 3rd
                features.third = state.keyReference[(index + 2) % 7];
                //and its octave
                if (((index + 2) / 7) >= 1) {
                    features.third = features.third.replace(/.$/, parseInt(features.third.charAt(features.third.length - 1)) + 1);
                }

                //Set the 5th
                features.fifth = state.keyReference[(index + 4) % 7];

                //and its octave
                if (((index + 4) / 7) >= 1) {
                    features.fifth = features.fifth.replace(/.$/, parseInt(features.fifth.charAt(features.fifth.length - 1)) + 1);
                }

                //Set the 7th
                features.seventh = state.keyReference[(index + 6) % 7];
                //and its octave
                if (((index + 6) / 7) >= 1) {
                    features.seventh = features.seventh.replace(/.$/, parseInt(features.seventh.charAt(features.seventh.length - 1)) + 1);
                }

                features.chordQuality = state.chordDetails[state.chordDetails.findIndex(e => e.degree === index)].chordQuality;
                state.modes.push(features);
            });
        },
        addChordToModes(state, features) {
            state.modes.push(features);
        },

        /*METHODS RELATED TO THE PROGRESSION STATE*/
        /*This method resets the progression list to an empty list*/
        resetProgression(state) {
            state.progression = [];
        },
        addChordToProgression(state, features) {
            features.notes = JSON.parse(JSON.stringify([features.tonic, features.third, features.fifth, features.seventh]));
            features.scale = JSON.parse(JSON.stringify(state.keyReference));
            state.progression.push(features);
        },
        deleteChordFromProgression(state, features) {
            state.progression.splice(state.progression.indexOf(features), 1);
        },

        commitProgression(state, chords) {
            state.progression = chords.items;
        },


        /*METHODS RELATED TO KEYBOARD FINGERING*/
        /*This method resets the keyboard state to zero and fingers the chord*/
        resetPressedKeys(state) {
            for (let key in state.keyboard) {
                state.keyboard[key].pressed = false;
                state.keyboard[key].noteName = '';
            }
        },

        resetRefScaleKeys(state) {
            for (let key in state.keyboard) {
                state.keyboard[key].partOfRefScale = null;
            }
        },

        fingerChord(state, features) {
            //Based on the chord fingering, create an array with the indexes of keys to be pressed
            let noteIndexes = [];
            const keyNames = state.keyboard.map(key => key.name);


            //The chordNotes will store the original chord notes' names to be shown on the keyboard
            let chordNotes = [];

            //let featuresTonic = '';
            for (let key in features) {
                var featuresKey = features[key];

                chordNotes.push(featuresKey);

                // checking if the keyName exists on the keyboard
                if (keyNames.indexOf(featuresKey) < 0) {
                    if (featuresKey.includes("#")) {
                        featuresKey = featuresKey.replace("#", '');
                        featuresKey = keyNames[keyNames.findIndex(e => e.includes(featuresKey)) + 1]
                    }
                    if (featuresKey.includes("b")) {
                        featuresKey = featuresKey.replace("b", '');
                        featuresKey = keyNames[keyNames.findIndex(e => e.includes(featuresKey)) - 1]
                    }
                }

                noteIndexes.push(keyNames.findIndex(e => e.includes(featuresKey)))
            }
            // Change the state of the keys to pressed
            noteIndexes.forEach(function (element, index) {
                state.keyboard[element].pressed = true;
                state.keyboard[element].noteName = chordNotes[index];
            });
        },

        setPartOfKeyReference(state) {
            const keyNames = state.keyboard.map(key => key.name);
            state.keyReference.forEach(value => {
                let keyValue = value;
                // checking if the keyValue exists on the keyboard
                if (keyNames.indexOf(keyValue) < 0) {
                    if (keyValue.includes("#")) {
                        keyValue = keyValue.replace("#", '');
                        keyValue = keyNames[keyNames.findIndex(e => e.includes(keyValue)) + 1]
                    }
                    if (keyValue.includes("b")) {
                        keyValue = keyValue.replace("b", '');
                        keyValue = keyNames[keyNames.findIndex(e => e.includes(keyValue)) - 1]
                    }
                }
                if (keyNames.indexOf(keyValue) >= 0) {
                    state.keyboard[keyNames.indexOf(keyValue)].partOfRefScale = value;
                }
            });
        },

        /*METHODS TO PERFORM CHORD ALTERATIONS*/
        /*This method updates the progression substituting a given chord with the newly computed one*/
        chordSubstitution(state, {index, chord}) {
            state.progression[index].notes = chord.notes;
            state.progression[index].scale = chord.scale;
            state.progression[index].chordQuality = chord.chordQuality;
            state.progression[index].tonic = chord.notes[0];
            state.progression[index].third = chord.notes[1];
            state.progression[index].fifth = chord.notes[2];
            state.progression[index].seventh = chord.notes[3];
            state.progression[index].degree = chord.degree;
        },
        /*This method updates the progression adding the newly computed chord to a specific position*/
        addChordInPosition(state, {index, chord}) {
            let newChord = {};
            newChord.notes = chord.notes;
            newChord.scale = chord.scale;
            newChord.chordQuality = chord.chordQuality;
            newChord.degree = chord.degree;
            newChord.tonic = chord.notes[0];
            newChord.third = chord.notes[1];
            newChord.fifth = chord.notes[2];
            newChord.seventh = chord.notes[3];
            state.progression.splice(index, 0, newChord);
        },

        /*METHODS TO PERFORM VOICINGS*/
        dropElement(state, {index, amount}) {
            let chord = state.progression[index].notes;
            let octave = chord[state.progression[index].notes.length - amount].slice(-1);
            let note = chord[state.progression[index].notes.length - amount].slice(0, -1);
            if (octave > 3 && octave <= 5) {
                octave = octave - 1;
                note = note + octave;
                for (index in chord) {
                    if (chord[index].slice(-1) >= octave) {
                        chord.splice(chord.length - amount, 1);
                        chord.splice(index, 0, note);
                        break;
                    }
                }
            }
        },
        addNinth(state, index) {
            let chord = state.progression[index].notes;
            let noteIndex = (state.progression[index].scale.indexOf(state.progression[index].tonic) + 1) % 7;
            let second = state.progression[index].scale[noteIndex];
            let tonic = state.progression[index].tonic;
            let octave;

            state.progression[index].notes.forEach(value => {
                if (value.slice(0, -1) === state.progression[index].tonic.slice(0, -1))
                    octave = value.slice(-1);
            });

            if (tonic.slice(0, -1) === 'B' || tonic.slice(0, -1) === 'Bb')
                octave = octave - (-2);
            else
                octave = octave - (-1);

            if (octave <= 5)
                chord.push(second.slice(0, -1) + octave);
        },

        deleteFifth(state, index) {
            let chord = state.progression[index].notes;
            let fifth = state.progression[index].fifth.slice(0, -1);
            chord.forEach((value, index) => {
                if (value.includes(fifth))
                    chord.splice(index, 1);
            })
        },

        /*METHODS TO MODIFY THE CHORD OCTAVE*/
        shapeOctave(state, {index, direction}) {
            let chord = state.progression[index].notes;
            let octave, note;
            if ((direction === 1 && chord[chord.length - 1].slice(-1) <= 4)
                || (direction === -1 && chord[0].slice(-1) >= 4)) {
                for (index in chord) {
                    note = chord[index];
                    octave = note.slice(-1);
                    octave = parseInt(octave) + parseInt(direction);
                    chord.splice(index, 1, note.slice(0, -1) + octave);
                }
            }
        }
    }
});

