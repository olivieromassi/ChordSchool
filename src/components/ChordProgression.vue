<template>
    <div>
        <h2 class="font-weight-thin">Chord Progression</h2>
        <v-layout row wrap>
            <v-flex xs4 md2 lg1 mx-4>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn block @click="playProgression" class="ma-4" v-bind="attrs" v-on="on">
                            <v-icon color="primary">play_arrow</v-icon>
                            <span>play</span>
                        </v-btn>
                    </template>
                    <span>Hear your chord progression!</span>
                </v-tooltip>
            </v-flex>
            <v-flex xs4 md2 lg1 mx-4>
                <v-menu :close-on-content-click=false
                        open-on-click
                        top
                        v-model="bpmMenu"
                        offset-y>
                    <template v-slot:activator="{ on: bpmMenu, attrs }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{on: tooltip}">
                                <v-btn  block class="text-center ma-4" v-bind="attrs" v-on="{ ...tooltip, ...bpmMenu }">
                                    <v-icon color="primary">mdi-metronome-tick</v-icon>
                                    <span  v-text="bpm"></span>
                                </v-btn>
                            </template>
                            <span> Playback speed is {{bpm}} BPM</span>
                        </v-tooltip>
                    </template>
                    <v-card>
                        <v-card-text>
                        <v-slider
                                append-icon="mdi-plus"
                                prepend-icon="mdi-minus"
                                @click:append="increment"
                                @click:prepend="decrement"
                                vertical
                                color="primary"
                                dense
                                max="120"
                                min="60"
                                track-color="secondary"
                                v-model="bpm">
                        </v-slider>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-flex>
            <v-flex xs4 md2 lg1 mx-4>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn block @click="resetProgression" class="ma-4" v-bind="attrs" v-on="on">
                            <v-icon color="primary">settings_backup_restore</v-icon>
                            <span>reset</span>
                        </v-btn>
                    </template>
                    <span>Empty the progression</span>
                </v-tooltip>
            </v-flex>

            <v-flex lg6 ma-4 md6 v-if="this.progression.length>0">
                <v-icon color="primary lighten-1">drag_indicator</v-icon>
                Drag and rearrange the chords
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <div class="ma-4" v-if="progression.length === 0 & this.$store.state.keyReference.length===0">
                <v-icon color="error">warning</v-icon>
                Reference key is not selected yet
            </div>
            <div class="ma-4" v-else-if="progression.length === 0">
                <v-icon color="warning">music_note</v-icon>
                Add chords to the progression using the
                <v-btn depressed fab text x-small>
                    <v-icon color="primary">mdi-plus</v-icon>
                </v-btn>
                icon
            </div>
        </v-layout>
        <v-list>
            <draggable v-model="progression">
                <v-list-item v-bind:key="chord.index" v-for="(chord, index) in progression">
                    <Chord :features="chord" :index="index" class="mr-n5"></Chord>
                </v-list-item>
            </draggable>
        </v-list>
    </div>
</template>

<script>

    import Chord from "@/components/Chord";
    import draggable from "vuedraggable";
    import * as Tone from "tone";


    export default {
        name: "ChordProgression",

        data: function () {
            return {
                bpm: 60,
                bpmMenu: false
            }
        },
        components: {
            Chord,
            draggable
        },
        methods: {

            playProgression() {
                let x = [];
                let t = [];
                let y = [];

                for (let i = 0; i < this.progression.length; i++) {
                    x[i] = this.progression[i].notes;
                    t[i] = i * 60 / this.bpm;
                    y[i] = [t[i], x[i]];
                }
                // play chord progression
                let TP = this.progression;

                let z = 0;
                let synth;
                switch (this.instrument) {
                    case 0: synth = this.$store.getters.getSampler;
                        break;
                    case 1: synth = this.$store.getters.getSynth1;
                        break;
                    case 2: synth = this.$store.getters.getSynth2;
                        break;
                    default: synth = this.$store.getters.getSampler;
                        break;
                }
                const part = new Tone.Part(((time, chord) => {
                    synth.triggerAttackRelease(chord, "4n", time);
                }), y);
                part.start();
                Tone.Transport.start();
                // fingering
                for (let propertyName in TP) {
                    setTimeout(function (propertyName) {
                        this.$store.commit('resetPressedKeys');
                        this.$store.commit('fingerChord', TP[propertyName].notes);
                    }.bind(this, propertyName), z++ * 1000 * (60 / this.bpm));
                    if ((this.progression.length -1 ) === parseInt(propertyName) ) {
                        this.$store.commit('resetPressedKeys');
                    }
                }

            },
            resetProgression() {
                this.$store.commit('resetProgression');
            },
            decrement() {
                this.bpm--
            },
            increment() {
                this.bpm++
            }
        },
        computed: {
            modes: {
                get() {
                    return this.$store.getters.getModes;
                }
            },
            progression: {
                get() {
                    return this.$store.getters.getProgression
                },
                set(chords) {
                    this.$store.dispatch('rearrangeProgression', {
                        items: chords
                    });
                }
            },
            instrument() {
                return this.$store.getters.getInstrument;
            }
        }
    }

</script>

<style>
    li {
        display: inline-block;
    }
</style>