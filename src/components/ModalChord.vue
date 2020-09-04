<template>
    <div>
        <v-row class="mx-1">
            <v-hover v-slot:default="{ hover }">
                <v-card
                        :elevation="hover ? 12 : 2"
                        :class="`{ 'on-hover': hover } mb-4 text--secondary caption primary ${chordShade}`"
                        @mouseenter="fingerChord() " @mouseleave="resetKeyboard()">

                    <v-card-text class="mb-n5">
                        <v-row class="fill-height secondary--text text--lighten-1" align="center" justify="center">
                            {{chordMode }}
                        </v-row>
                        <v-row class="fill-height text-center secondary--text text--lighten-1 headline" align="center"
                               justify="center">
                            {{chordName}}
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            :class="{ 'show-btns': hover }"
                                            color="transparent"
                                            icon
                                            fab
                                            x-small
                                            v-on:click="selectChord()" v-bind="attrs" v-on="on">
                                        <v-icon
                                                :class="{ 'show-btns': hover }"
                                                size="medium">mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Add {{chordMode}} to the progression</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            :class="{ 'show-btns': hover }"
                                            color="transparent"
                                            icon
                                            fab
                                            x-small
                                            v-on:click="playChord()" v-bind="attrs" v-on="on">
                                        <v-icon
                                                :class="{ 'show-btns': hover }"
                                                size="medium">volume_up
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Listen to the {{chordMode}} </span>
                            </v-tooltip>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-row>
    </div>
</template>

<script>
    import * as Tone from "tone";

    export default {
        name: "ModalChord",
        props: {
            keyReference: {},
            features: {}
        },
        data: () => ({
            transparent: 'rgba(255, 255, 255, 0)'
        }),
        methods: {
            selectChord() {
                this.$store.commit('addChordToProgression', JSON.parse(JSON.stringify(this.features)));
            },
            fingerChord() {
                this.$store.commit('resetPressedKeys');
                this.$store.commit('fingerChord',[this.features.tonic,
                    this.features.third,
                    this.features.fifth,
                    this.features.seventh]);
            },
            resetKeyboard() {
                this.$store.commit('resetPressedKeys');
            },
            playChord() {
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
                synth.triggerAttackRelease([this.features.tonic,
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
            },
            instrument() {
                return this.$store.getters.getInstrument;
            }
        }
    }
</script>

<style scoped>
    /*noinspection CssUnresolvedCustomProperty*/
    .show-btns {
        color: var(--v-secondary-base) !important;
    }
</style>