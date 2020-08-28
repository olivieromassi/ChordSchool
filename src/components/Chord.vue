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
            tritoneSubstitution() {
                let scaleIndex = (this.$store.getters.getChromaticScale.indexOf(this.$store.getters.getSelectedKey) + 6) % 12;
                if (this.$store.getters.getChromaticScale.indexOf(this.$store.getters.getSelectedKey) === -1) {
                    if (this.$store.getters.getSelectedKey === 'C#')
                        scaleIndex = 5;
                    else
                        scaleIndex = 0;
                }
                let tritoneScale = this.$store.getters.getScales[this.$store.getters.getKeys.indexOf(this.$store.getters.getChromaticScale[scaleIndex])];

                this.buildChord(tritoneScale, 4);
                this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});

                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';
            },
            secondaryDominant() {
                let scaleIndex = this.$store.getters.getChromaticScale.indexOf(this.features.tonic.slice(0, -1));
                if (this.$store.getters.getChromaticScale.indexOf(this.features.tonic.slice(0, -1)) === -1) {
                    if (this.$store.getters.getSelectedKey === 'C#')
                        scaleIndex = 1;
                    else
                        scaleIndex = 6;
                }
                let scale = this.$store.getters.getScales[this.$store.getters.getKeys.indexOf(this.$store.getters.getChromaticScale[scaleIndex])];

                this.buildChord(scale, 4);
                this.$store.commit('addChordInPosition', {index: this.index, chord: this.builtChord});

                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';
            },
            twoFiveSubstitution() {
                let degrees = [4, 1];
                let scaleIndex = this.$store.getters.getChromaticScale.indexOf(this.features.tonic.slice(0, -1));
                if (this.$store.getters.getChromaticScale.indexOf(this.features.tonic.slice(0, -1)) === -1) {
                    if (this.$store.getters.getSelectedKey === 'C#')
                        scaleIndex = 1;
                    else
                        scaleIndex = 6;
                }
                let scale = this.$store.getters.getScales[this.$store.getters.getKeys.indexOf(this.$store.getters.getChromaticScale[scaleIndex])];

                degrees.forEach(value => {
                    this.buildChord(scale, value);
                    this.$store.commit('addChordInPosition', {index: this.index, chord: this.builtChord});

                    this.builtChord.notes = [];
                    this.builtChord.chordQuality = '';
                });
            },
            // TODO finish the implementation of the method
            relativeMajorMinorSubstitution() {
                // if the chord is major, go up 6 degrees over the corresponding minor scale
                // if the chord is minor, go down 6 degrees over the corresponding major scale
            },
            // TODO finish the implementation of the method
            chordQualitySubstitution() {
                // substitute one pitch with an altered one (e.g. minor sixth in place of major seventh or the major seventh in place of the minor)
            },
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