<template>
    <v-card min-width="100" min-height="80"  :color=chordColor @mouseenter="fingerChord()" @mouseleave="resetKeyboard()">
        <h3 class="text-center grey">{{ this.features.tonic.slice(0,-1) +  this.features.chordQuality }}</h3>
        <v-btn class="ma-2" fab x-small v-on:click="deleteChord() , resetKeyboard() ">
            <v-icon color="blue" size="medium">mdi-minus</v-icon>
        </v-btn>

        <v-btn fab x-small v-on:click="tonicSubstitution(5)">
            <v-icon color="blue" size="medium">mdi-plus</v-icon>
        </v-btn>
        <v-btn fab x-small v-on:click="tritoneSubstitution">
            <v-icon color="blue" size="medium">mdi-plus</v-icon>
        </v-btn>
        <v-btn fab x-small v-on:click="twoFiveSubstitution">
            <v-icon color="blue" size="medium">mdi-plus</v-icon>
        </v-btn>
        <v-btn fab x-small v-on:click="secondaryDominant">
            <v-icon color="blue" size="medium">mdi-plus</v-icon>
        </v-btn>
        <v-btn fab x-small v-on:click="chordQualitySubstitution">
            <v-icon color="blue" size="medium">mdi-plus</v-icon>
        </v-btn>
        <v-btn fab x-small v-on:click="relativeMajorMinorSubstitution">
            <v-icon color="blue" size="medium">mdi-plus</v-icon>
        </v-btn>

    </v-card>
</template>

<script>
    import * as Tone from "tone";

    export default {
        name: "Chord",
        props: {
            features: {},
            index: Number
        },
        data: function () {
            return {
                builtChord: {
                    degree: '',
                    notes: [],
                    chordQuality: ''
                }
            }
        },
        methods: {
            deleteChord() {
                this.$store.commit('deleteChordFromProgression', this.features);
            },
            fingerChord() {
                this.$store.commit('fingerChord', this.features);
            },
            resetKeyboard() {
                this.$store.commit('resetPressedKeys');
            },
            playChord() {
                let piano = new Tone.PolySynth(Tone.Synth).toDestination();
                piano.triggerAttackRelease([this.features.tonic,
                        this.features.third,
                        this.features.fifth,
                        this.features.seventh],
                    1);
            },
            buildChord(scale, degree) {
                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';

                this.builtChord.degree = degree;
                //Set the tonic
                this.builtChord.notes.push(scale[(degree) % 7]);

                //Set the 3rd
                this.builtChord.notes.push(scale[(degree + 2) % 7]);
                //and its octave
                if (((degree + 2) / 7) >= 1) {
                    this.builtChord.notes[this.builtChord.notes.length - 1] = this.builtChord.notes[this.builtChord.notes.length - 1]
                        .replace(/.$/, parseInt(this.builtChord.notes[this.builtChord.notes.length - 1]
                            .charAt(this.builtChord.notes[this.builtChord.notes.length - 1].length - 1)) + 1);
                }

                //Set the 5th
                this.builtChord.notes.push(scale[(degree + 4) % 7]);

                //and its octave
                if (((degree + 4) / 7) >= 1) {
                    this.builtChord.notes[this.builtChord.notes.length - 1] = this.builtChord.notes[this.builtChord.notes.length - 1]
                        .replace(/.$/, parseInt(this.builtChord.notes[this.builtChord.notes.length - 1]
                            .charAt(this.builtChord.notes[this.builtChord.notes.length - 1].length - 1)) + 1);
                }

                //Set the 7th
                this.builtChord.notes.push(scale[(degree + 6) % 7]);
                //and its octave
                if (((degree + 6) / 7) >= 1) {
                    this.builtChord.notes[this.builtChord.notes.length - 1] = this.builtChord.notes[this.builtChord.notes.length - 1]
                        .replace(/.$/, parseInt(this.builtChord.notes[this.builtChord.notes.length - 1]
                            .charAt(this.builtChord.notes[this.builtChord.notes.length - 1].length - 1)) + 1);
                }

                switch (degree) {
                    case 0 :
                        this.builtChord.chordQuality = '\u0394';
                        break;
                    case 1 :
                        this.builtChord.chordQuality = 'mi7';
                        break;
                    case 2 :
                        this.builtChord.chordQuality = 'mi7';
                        break;
                    case 3 :
                        this.builtChord.chordQuality = '\u0394';
                        break;
                    case 4 :
                        this.builtChord.chordQuality = "7";
                        break;
                    case 5 :
                        this.builtChord.chordQuality = 'mi7';
                        break;
                    case 6 :
                        this.builtChord.chordQuality = '\u00D8';
                        break;
                    default:
                        this.builtChord.chordQuality = '';
                        break;
                }
            },
            /*This method substitutes a dominant chord with its tritone substitution, which shares the same tritone*/
            tritoneSubstitution() {
                let scaleIndex = (this.$store.getters.getChromaticScale.indexOf(this.$store.getters.getSelectedKey) + 6) % 12;
                if (this.$store.getters.getChromaticScale.indexOf(this.$store.getters.getSelectedKey) === -1) {
                    /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                    if (this.$store.getters.getSelectedKey === 'C#')
                        scaleIndex = 7;
                    else if (this.$store.getters.getSelectedKey === 'F#')
                        scaleIndex = 0;
                    else if (this.$store.getters.getSelectedKey === 'Cb')
                        scaleIndex = 5;
                }
                let tritoneScale = this.$store.getters.getScales[this.$store.getters.getKeys.indexOf(this.$store.getters.getChromaticScale[scaleIndex])];

                this.buildChord(tritoneScale, 4);
                this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});

                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';
            },
            /*This method adds a dominant chord (V degree) before the selected chord*/
            secondaryDominant() {
                let scaleIndex = this.$store.getters.getKeys.indexOf(this.features.tonic.slice(0, -1));
                if (this.$store.getters.getKeys.indexOf(this.features.tonic.slice(0, -1)) === -1) {
                    /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                    if (this.features.tonic.slice(0, -1) === 'D#')
                        scaleIndex = 4;
                    else if (this.features.tonic.slice(0, -1) === 'E#')
                        scaleIndex = 6;
                    else if (this.features.tonic.slice(0, -1) === 'G#')
                        scaleIndex = 10;
                    else if (this.features.tonic.slice(0, -1) === 'A#')
                        scaleIndex = 12;
                    else if (this.features.tonic.slice(0, -1) === 'B#')
                        scaleIndex = 0;
                    else if (this.$store.getters.getSelectedKey === 'Cb')
                        scaleIndex = 14;
                }
                let scale = this.$store.getters.getScales[scaleIndex];

                this.buildChord(scale, 4);
                this.$store.commit('addChordInPosition', {index: this.index, chord: this.builtChord});

                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';
            },
            /*This method adds a super-tonic chord (II degree) and a dominant chord (V degree) before the selected chord*/
            twoFiveSubstitution() {
                let degrees = [4, 1];
                let scaleIndex = this.$store.getters.getKeys.indexOf(this.features.tonic.slice(0, -1));
                if (this.$store.getters.getKeys.indexOf(this.features.tonic.slice(0, -1)) === -1) {
                    /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                    if (this.features.tonic.slice(0, -1) === 'D#')
                        scaleIndex = 4;
                    else if (this.features.tonic.slice(0, -1) === 'E#')
                        scaleIndex = 6;
                    else if (this.features.tonic.slice(0, -1) === 'G#')
                        scaleIndex = 10;
                    else if (this.features.tonic.slice(0, -1) === 'A#')
                        scaleIndex = 12;
                    else if (this.features.tonic.slice(0, -1) === 'B#')
                        scaleIndex = 0;
                    else if (this.$store.getters.getSelectedKey === 'Cb')
                        scaleIndex = 14;
                }
                let scale = this.$store.getters.getScales[scaleIndex];

                degrees.forEach(value => {
                    this.buildChord(scale, value);
                    this.$store.commit('addChordInPosition', {index: this.index, chord: this.builtChord});

                    this.builtChord.notes = [];
                    this.builtChord.chordQuality = '';
                });
            },
            /*This method substitutes a given chord with its relative major or minor*/
            relativeMajorMinorSubstitution() {
                if (this.features.chordQuality === '\u0394') {
                    /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                    if (this.features.tonic.slice(0, -1) === 'D#')
                        this.features.tonic = 'E3';
                    else if (this.features.tonic.slice(0, -1) === 'E#')
                        this.features.tonic = 'F3';
                    else if (this.features.tonic.slice(0, -1) === 'G#')
                        this.features.tonic = 'Ab3';
                    else if (this.features.tonic.slice(0, -1) === 'B#')
                        this.features.tonic = 'C3';
                    else if (this.features.tonic.slice(0, -1) === 'A#')
                        this.features.tonic = 'Bb3';
                    for (const value of this.$store.getters.getScales) {
                        if (value[0].slice(0, -1) === this.features.tonic.slice(0, -1)) {
                            this.buildChord(value, 5);
                            this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});
                            break;
                        }
                    }
                } else if (this.features.chordQuality === 'mi7') {
                    /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                    if (this.features.tonic.slice(0, -1) === 'Db')
                        this.features.tonic = 'C#3';
                    else if (this.features.tonic.slice(0, -1) === 'E#')
                        this.features.tonic = 'F3';
                    else if (this.features.tonic.slice(0, -1) === 'Gb')
                        this.features.tonic = 'F#3';
                    else if (this.features.tonic.slice(0, -1) === 'B#')
                        this.features.tonic = 'C3';
                    else if (this.$store.getters.getSelectedKey === 'Cb')
                        this.features.tonic = 'B3';
                    for (const value of this.$store.getters.getScales) {
                        if (value[5].slice(0, -1) === this.features.tonic.slice(0, -1)) {
                            this.buildChord(value, 0);
                            this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});
                            break;
                        }
                    }
                }
                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';
            },
            /*This method changes the quality of a chord making it minor if major and vice-versa*/
            chordQualitySubstitution() {
                if (this.features.chordQuality === '\u0394') {
                    /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                    if (this.features.tonic.slice(0, -1) === 'Db')
                        this.features.tonic = 'C#3';
                    else if (this.features.tonic.slice(0, -1) === 'E#')
                        this.features.tonic = 'F3';
                    else if (this.features.tonic.slice(0, -1) === 'Gb')
                        this.features.tonic = 'F#3';
                    else if (this.features.tonic.slice(0, -1) === 'B#')
                        this.features.tonic = 'C3';
                    else if (this.$store.getters.getSelectedKey === 'Cb')
                        this.features.tonic = 'B3';
                    for (const value of this.$store.getters.getScales) {
                        if (value[5].slice(0, -1) === this.features.tonic.slice(0, -1)) {
                            this.buildChord(value, 5);
                            this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});
                            break;
                        }
                    }
                } else if (this.features.chordQuality === 'mi7') {
                    /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                    if (this.features.tonic.slice(0, -1) === 'D#')
                        this.features.tonic = 'E3';
                    else if (this.features.tonic.slice(0, -1) === 'E#')
                        this.features.tonic = 'F3';
                    else if (this.features.tonic.slice(0, -1) === 'G#')
                        this.features.tonic = 'Ab3';
                    else if (this.features.tonic.slice(0, -1) === 'B#')
                        this.features.tonic = 'C3';
                    else if (this.features.tonic.slice(0, -1) === 'A#')
                        this.features.tonic = 'Bb3';
                    for (const value of this.$store.getters.getScales) {
                        if (value[0].slice(0, -1) === this.features.tonic.slice(0, -1)) {
                            this.buildChord(value, 0);
                            this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});
                            break;
                        }
                    }
                }
                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';
            },
            /*This method substitutes the Ionian chord (I degree) with either the Aeolian (VI degree) or the Phrygian (III degree)*/
            tonicSubstitution(degree) {
                let scaleIndex = (this.$store.getters.getKeys.indexOf(this.$store.getters.getSelectedKey));
                let scale = this.$store.getters.getScales[this.$store.getters.getKeys.indexOf(this.$store.getters.getKeys[scaleIndex])];

                this.buildChord(scale, degree);
                this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});

                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';
            }
        },
        computed:{
            chordColor() {
                // the color should be modified according to Chord Score
                return "grey"
            },
        }
    }
</script>

<style>
</style>