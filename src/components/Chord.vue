<template>
    <v-card width="100" :color=chordColor @mouseenter="fingerChord() " @mousedown="playChord()" @mouseleave="resetKeyboard()">
        <h3 class="font-weight-light text-center">{{ this.features.tonic.slice(0,-1) +  this.features.chordQuality }}</h3>
        <v-btn fab x-small v-on:click="deleteChord">
            <v-icon color="blue" size="medium">mdi-minus</v-icon>
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