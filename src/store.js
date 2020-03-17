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
        scales: [['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
            ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
            ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
            ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
            ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
            ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
            ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
            ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
            ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
            ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
            ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']],

        /*This list contains the 7 major harmony modes related to the selected key reference*/
        modes: [],

        /*This list contains the chords chosen by the user to be part of a chord progression*/
        progression: [],

        /* This list contains the state of the keyboard keys, that alternate between "pressed-1" or "released-0".*/
        keyboard: [
            {name:'C3',     pressed: false,  partOfRefScale: false},
            {name:'C#3',    pressed: false,  partOfRefScale: false},
            {name:'D3',     pressed: false,  partOfRefScale: false},
            {name:'D#3',    pressed: false,  partOfRefScale: false},
            {name:'E3',     pressed: false,  partOfRefScale: false},
            {name:'F3',     pressed: false,  partOfRefScale: false},
            {name:'F#3',    pressed: false,  partOfRefScale: false},
            {name:'G3',     pressed: false,  partOfRefScale: false},
            {name:'G#3',    pressed: false,  partOfRefScale: false},
            {name:'A3',     pressed: false,  partOfRefScale: false},
            {name:'A#3',    pressed: false,  partOfRefScale: false},
            {name:'B3',     pressed: false,  partOfRefScale: false}
            ],

        /* This variable will reset the keyboard if true */
        resetKeyboard: true,
        keysIndexes : [],
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
        getPressedKeys(state){
            return state.keyboard.filter( key => {
                return key.pressed
                }
            )
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

        /*METHODS RELATED TO KEYBOARD FINGERING*/
        /*This method resets the keyboard state to zero and fingers the chord*/
        resetPressedKeys(state){
            for ( const key in state.keyboard){
                state.keyboard[key].pressed = false
            }
        },
        fingerChord(state , features){
            let noteIndexes =[];
            const noteNames = state.keyboard.map(key => key.name);
            for (let key in features) {
                if (key != "chordQuality"){
                //Checking if the note name actually exists as the keyboard names, E# is actually F and B# is actually C
                if (features[key] == "E#")
                    features[key] = "F";
                else if (features[key] == "B#")
                    features[key] = "C";
                //Based on the chord fingering, create an array with the indexes of keys to be pressed
                noteIndexes.push(noteNames.findIndex(e => e.includes(features[key])))
                //noteIndexes.pop();
                }
            }
            // Change the state of the keys to pressed
            noteIndexes.forEach(element => state.keyboard[element].pressed=true)

        }
    }
});
