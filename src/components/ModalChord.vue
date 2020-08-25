<template>
    <v-card class="red--text" width="100" :color=chordColor @mouseenter="fingerChord() " @mouseleave="resetKeyboard()">
        {{ chordMode }}
        <h3 class="text-center red--text">{{buildChord()}}{{chordName}}</h3>
        <v-btn fab x-small  v-on:click="selectChord() , playChord()">
            <v-icon color="blue" size="medium">mdi-plus</v-icon>
        </v-btn>
        <v-btn fab x-small  v-on:click="playChord()">
            <v-icon color="blue" size="medium">music_note</v-icon>
        </v-btn>
    </v-card>
</template>

<script>
    import * as Tone from "tone";

    export default {
        name: "ModalChord",
        props: {
            keyReference: {},
            degree: {}
        },
        data: function () {
            return {
                features: {
                    tonic: '',
                    third: '',
                    fifth: '',
                    seventh: '',
                    chordQuality: '',
                }
            }
        },
        methods: {
            buildChord() {
                this.features.tonic = this.keyReference[(this.degree) % 7];
                this.features.third = this.keyReference[(this.degree + 2) % 7];
                this.features.fifth = this.keyReference[(this.degree + 4) % 7];
                this.features.seventh = this.keyReference[(this.degree + 6) % 7];
                switch (this.degree) {
                    case 0 :
                        this.features.chordQuality = '\u0394';
                        break;
                    case 1 :
                        this.features.chordQuality = 'mi7';
                        break;
                    case 2 :
                        this.features.chordQuality = 'mi7';
                        break;
                    case 3 :
                        this.features.chordQuality = '\u0394';
                        break;
                    case 4 :
                        this.features.chordQuality = "7";
                        break;
                    case 5 :
                        this.features.chordQuality = 'mi7';
                        break;
                    case 6 :
                        this.features.chordQuality = '\u00D8';
                        break;
                    default:
                        this.features.chordQuality = '';
                        break;
                }
                // Still need to understand how to add correctly the modes to the state property
                //this.$store.commit('addChordToModes', this.features);
            },
            selectChord() {
                this.$store.commit('addChordToProgression', this.features);
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
            }
        },
        computed: {
            chordName() {
                return this.features.tonic.slice(0, -1) + this.features.chordQuality;
            },
            chordColor() {
                switch (this.degree) {
                    case 0:
                        return 'blue lighten-4';
                    case 1:
                        return 'blue';
                    case 2:
                        return 'blue darken-3';
                    case 3:
                        return 'blue lighten-5';
                    case 4:
                        return 'blue lighten-2';
                    case 5:
                        return 'blue darken-2';
                    case 6:
                        return 'blue darken-4';
                    default:
                        return 'dimgrey';
                }
            },
            chordMode() {
                switch (this.degree) {
                    case 0:
                        return 'Ionian';
                    case 1:
                        return 'Dorian';
                    case 2:
                        return 'Phrygian';
                    case 3:
                        return 'Lydian';
                    case 4:
                        return 'Mixolydian';
                    case 5:
                        return 'Aeolian';
                    case 6:
                        return 'Locrian';
                    default:
                        return 'Unknown';
                }
            }
        }
    }
</script>

<style>
</style>