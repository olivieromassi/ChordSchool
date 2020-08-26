<template>
    <v-card class="red--text" width="100" :color=chordColor @mouseenter="fingerChord() " @mouseleave="resetKeyboard()">
        {{ chordMode }}
        <h3 class="text-center red--text">{{chordName}}</h3>
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
            features: {}
        },
        methods: {
            selectChord() {
                this.$store.commit('addChordToProgression', JSON.parse(JSON.stringify(this.features)));
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
                switch (this.features.degree) {
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
                switch (this.features.degree) {
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