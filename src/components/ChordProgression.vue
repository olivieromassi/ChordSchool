<template>
    <div>
        <h2 class="font-weight-thin">Chord Progression</h2>
        <v-layout row wrap>
            <v-flex md2 lg1 mx-4>
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

            <v-flex md2 lg1 mx-4>
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


            <!--<v-flex md2 lg1 mx-4> -->

            <v-flex md2 lg1 mx-4>
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
                    <!--//{{key}}-->
                    <Chord :features="chord" :index="index" class="mr-n5"></Chord>
                </v-list-item>
            </draggable>
        </v-list>

        <!--
        <v-btn color="primary lighten-1" @click="notableChords">
            <v-icon color="blue">chords</v-icon>
        </v-btn>
        -->

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
            notableChords() {
                let k = -1;
                let chordsTonic = [];
                let allChords = [];
                let ii_v = [], ii_v_p = [];
                let ii_v_i = [], ii_v_i_p = [];
                let iii_vi_ii_v = [], iii_vi_ii_v_p = [];
                let i_vi_ii_v = [], i_vi_ii_v_p = [];
                let i_ii_iii_iv = [], i_ii_iii_iv_p = [];
                let nam, indexNC, nameNC = [];
                let temp = [];

                for (let i = 0; i < this.progression.length; i++) {
                    chordsTonic[i] = this.progression[i].tonic;
                }

                for (let j = 0; j < 7; j++) {
                    allChords[j] = this.modes[j].tonic;
                }
                ii_v_i = [allChords[1], allChords[4], allChords[0]];
                ii_v = [allChords[1], allChords[4]];
                iii_vi_ii_v = [allChords[2], allChords[5], allChords[1], allChords[4]];
                i_vi_ii_v = [allChords[0], allChords[5], allChords[1], allChords[4]];
                i_ii_iii_iv = [allChords[0], allChords[1], allChords[2], allChords[3]];

                for (let n = 0; n < this.progression.length - 1; n++) {

                    //"III_VI_II_V"
                    if (n + 4 <= this.progression.length) {
                        iii_vi_ii_v_p = [chordsTonic[n], chordsTonic[n + 1], chordsTonic[n + 2], chordsTonic[n + 3]];
                        if (iii_vi_ii_v_p.toString() === iii_vi_ii_v.toString()) {
                            k = k + 1;
                            indexNC = [n, n + 1, n + 2, n + 3];
                            nam = "III_VI_II_V";
                            n = n + 3;
                        }
                    }

                    //I_VI_II_V
                    if (n + 4 <= this.progression.length) {
                        i_vi_ii_v_p = [chordsTonic[n], chordsTonic[n + 1], chordsTonic[n + 2], chordsTonic[n + 3]];
                        if (i_vi_ii_v_p.toString() === i_vi_ii_v.toString()) {
                            k = k + 1;
                            indexNC = [n, n + 1, n + 2, n + 3];
                            nam = "I_VI_II_V";
                            n = n + 3;
                        }
                    }

                    //I_II_III_IV
                    if (n + 4 <= this.progression.length) {
                        i_ii_iii_iv_p = [chordsTonic[n], chordsTonic[n + 1], chordsTonic[n + 2], chordsTonic[n + 3]];
                        if (i_ii_iii_iv_p.toString() === i_ii_iii_iv.toString()) {
                            k = k + 1;
                            indexNC = [n, n + 1, n + 2, n + 3];
                            nam = "I_II_III_IV";
                            n = n + 3;

                        }
                    }

                    //II_V
                    ii_v_p = [chordsTonic[n], chordsTonic[n + 1]];
                    if (ii_v_p.toString() === ii_v.toString()) {
                        k = k + 1;
                        if (n + 3 > this.progression.length || (n + 3 <= this.progression.length && (chordsTonic[n + 2].toString() !== ii_v_i[2].toString()))) {
                            indexNC = [n, n + 1];
                            nam = "II_V";
                            n = n + 1;
                        }

                        //II_V_I
                        if (n + 3 <= this.progression.length) {
                            ii_v_i_p = [chordsTonic[n], chordsTonic[n + 1], chordsTonic[n + 2]];
                            if (ii_v_i_p.toString() === ii_v_i.toString()) {
                                indexNC = [n, n + 1, n + 2];
                                nam = "II_V_I";
                                n = n + 2;
                            }
                        }
                    }
                    if (k >= 0) {
                        temp[k] = indexNC;
                        nameNC[k] = nam;
                    }
                }
                console.log(temp);
                console.log(nameNC)
            },
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
                    case 1: synth = this.$store.getters.getSynth;
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
                    if (this.progression.length === propertyName + 1) {
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