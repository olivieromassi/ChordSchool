<template>
    <v-card :class="`mb-4 text--secondary caption primary ${chordShade}`"
            @mouseenter="fingerChord() " @mouseleave="resetKeyboard()">
        <v-card-text class="ma-n2">
        <v-layout row wrap>
                <v-flex class="secondary--text text--lighten-1 text-center xs12 md12 lg12 mx-1"> {{ chordMode }}</v-flex>
                <v-flex class="text-center secondary--text text--lighten-1 headline xs12 md12 lg12 mx-1">{{chordName}}</v-flex>
        </v-layout>
        </v-card-text>
        <v-card-actions>
        <v-layout row wrap class="mx-2">
            <v-flex class="xs3 md3 lg3 xs12 mx-2 pb-2">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn block fab x-small md1 v-on:click="selectChord()" v-bind="attrs" v-on="on">
                            <v-icon color="primary" size="medium">mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>Add {{chordMode}} to the progression</span>
                </v-tooltip>
            </v-flex>
            <v-flex class="xs3 md3 lg3 mx-2">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn block fab x-small md1 v-on:click="playChord()" v-bind="attrs" v-on="on">
                            <v-icon color="primary" size="medium">volume_up</v-icon>
                        </v-btn>
                    </template>
                    <span>Listen to the {{chordMode}} </span>
                </v-tooltip>
            </v-flex>
        </v-layout>
        </v-card-actions>
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
                this.$store.commit('fingerChord',[this.features.tonic,
                    this.features.third,
                    this.features.fifth,
                    this.features.seventh]);
            },
            resetKeyboard() {
                this.$store.commit('resetPressedKeys');
            },
            playChord() {
                const synth = new Tone.Synth().toDestination();
                setTimeout(this.soundChord, 2100);
                /*Part plays the single notes of the chord*/
                const part = new Tone.Part(((time, note) => {
                    synth.triggerAttackRelease(note, "8n", time);
                }), [[0, this.features.tonic],
                    [0.5, this.features.third],
                    [1, this.features.fifth],
                    [1.5, this.features.seventh]]);
                part.start();
                Tone.Transport.start();
            },
            soundChord() {
                let piano = new Tone.PolySynth(Tone.Synth).toDestination();
                piano.triggerAttackRelease([this.features.tonic,
                    this.features.third,
                    this.features.fifth,
                    this.features.seventh],
                  '4n');
            }
        },
        computed: {
            chordName() {
                return this.features.tonic.slice(0, -1) + this.features.chordQuality;
            },
            chordShade() {
                return this.$store.state.chordDetails[this.$store.state.chordDetails.findIndex(e => e.degree === this.features.degree)].shade
            },
            chordMode() {
                return this.$store.state.chordDetails[this.$store.state.chordDetails.findIndex(e => e.degree === this.features.degree)].mode
            }
        }
    }
</script>

<style>
</style>