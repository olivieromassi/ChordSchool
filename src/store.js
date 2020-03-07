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
        progression: []
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
        }
    }
});
