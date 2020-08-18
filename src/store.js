import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        /*This list represents the possible key references*/
        keys: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],

        /*This string represents the name of the key reference chosen by the user*/
        selectedKey: String,

        /*This list contains all the notes of the Ionian Scale corresponding to the chosen key reference*/
        keyReference: [],


        /*This dictionary contains all the possible Ionian scales*/

        scales: [['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'],

            ['C#3', 'D#3', 'E#3', 'F#3', 'G#3', 'A#3', 'B#3'],
            ['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4'],
            ['Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4', 'D4'],
            ['E3', 'F#3', 'G#3', 'A3', 'B3', 'C#4', 'D#4'],
            ['F3', 'G3', 'A3', 'Bb3', 'C4', 'D4', 'E4'],
            ['F#3', 'G#3', 'A#3', 'B3', 'C#4', 'D#4', 'E#4'],
            ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F#4'],
            ['Ab3', 'Bb3', 'C4', 'Db4', 'Eb4', 'F4', 'G4'],
            ['A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4'],
            ['Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4', 'A4'],
            ['B3', 'C#4', 'D#4', 'E4', 'F#4', 'G#4', 'A#4']],


        /*This list contains the 7 major harmony modes related to the selected key reference*/
        modes: [],

        /*This list contains the chords chosen by the user to be part of a chord progression*/
        progression: [],

        /* This list contains the state of the keyboard keys, that alternate between "pressed-1" or "released-0".*/
        keyboard: [
            {name: 'C3', pressed: false, partOfRefScale: false},
            {name: 'C#3', pressed: false, partOfRefScale: false},
            {name: 'D3', pressed: false, partOfRefScale: false},
            {name: 'D#3', pressed: false, partOfRefScale: false},
            {name: 'E3', pressed: false, partOfRefScale: false},
            {name: 'F3', pressed: false, partOfRefScale: false},
            {name: 'F#3', pressed: false, partOfRefScale: false},
            {name: 'G3', pressed: false, partOfRefScale: false},
            {name: 'G#3', pressed: false, partOfRefScale: false},
            {name: 'A3', pressed: false, partOfRefScale: false},
            {name: 'A#3', pressed: false, partOfRefScale: false},
            {name: 'B3', pressed: false, partOfRefScale: false},
            {name: 'C4', pressed: false, partOfRefScale: false},
            {name: 'C#4', pressed: false, partOfRefScale: false},
            {name: 'D4', pressed: false, partOfRefScale: false},
            {name: 'D#4', pressed: false, partOfRefScale: false},
            {name: 'E4', pressed: false, partOfRefScale: false},
            {name: 'F4', pressed: false, partOfRefScale: false},
            {name: 'F#4', pressed: false, partOfRefScale: false},
            {name: 'G4', pressed: false, partOfRefScale: false},
            {name: 'G#4', pressed: false, partOfRefScale: false},
            {name: 'A4', pressed: false, partOfRefScale: false},
            {name: 'A#4', pressed: false, partOfRefScale: false},
            {name: 'B4', pressed: false, partOfRefScale: false},
            {name: 'C5', pressed: false, partOfRefScale: false},
            {name: 'C#5', pressed: false, partOfRefScale: false},
            {name: 'D5', pressed: false, partOfRefScale: false},
            {name: 'D#5', pressed: false, partOfRefScale: false},
            {name: 'E5', pressed: false, partOfRefScale: false},
            {name: 'F5', pressed: false, partOfRefScale: false},
            {name: 'F#5', pressed: false, partOfRefScale: false},
            {name: 'G5', pressed: false, partOfRefScale: false},
            {name: 'G#5', pressed: false, partOfRefScale: false},
            {name: 'A5', pressed: false, partOfRefScale: false},
            {name: 'A#5', pressed: false, partOfRefScale: false},
            {name: 'B5', pressed: false, partOfRefScale: false}
        ],

        /* This variable will reset the keyboard if true */
        resetKeyboard: true,
        keysIndexes: [],

    },
    getters: {
        getKeys(state) {
            return state.keys;
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
            state.keyReference = state.scales[state.keys.indexOf(state.selectedKey)];
        },

        /*METHODS RELATED TO THE MODES STATE*/
        /*This method resets the modes list to an empty list*/
        resetModes(state) {
            state.modes = [];
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
                state.keyboard[key].pressed = false
            }
        },
        fingerChord(state, features) {
            //Based on the chord fingering, create an array with the indexes of keys to be pressed
            let noteIndexes = [];
            const noteNames = state.keyboard.map(key => key.name);
            for (let key in features) {
                if (key !== "chordQuality") {
                    // checking if the key exists on the keyboard
                    if (noteNames.indexOf(features[key]) < 0) {
                        if (features[key].includes("#")) {
                            features[key] = features[key].replace("#", '');
                            features[key] = noteNames[noteNames.findIndex(e => e.includes(features[key])) + 1]
                        }
                        if (features[key].includes("b")) {
                            features[key] = features[key].replace("b", '');
                            features[key] = noteNames[noteNames.findIndex(e => e.includes(features[key])) - 1]
                        }
                    }
                    // checking if the key should be pressed an octave above
                    if (key !== "tonic") {
                        if (noteNames.indexOf(features["tonic"]) > noteNames.indexOf(features[key])) {
                            features[key] = noteNames[12 + noteNames.findIndex(e => e.includes(features[key]))]
                        }
                    }
                    noteIndexes.push(noteNames.findIndex(e => e.includes(features[key])));
                    //noteIndexes.pop();
                }
            }
            // Change the state of the keys to pressed
            noteIndexes.forEach(element => state.keyboard[element].pressed = true);
        }
    }
});

