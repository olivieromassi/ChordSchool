<template>
    <div id="chord" :style="{backgroundColor: chordColor}"
         @mouseenter="fingerChord() "
         @mousedown="playChord()"
         @mouseleave="resetKeyboard()">
        {{ chordMode }}
        <h1 id="chord-name">{{buildChord()}}{{chordName}}</h1>
        <button id="plus" v-on:click="selectChord">+</button>
    </div>
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
                   case 0 : this.features.chordQuality = '\u0394'; break;
                   case 1 : this.features.chordQuality = 'mi7'; break;
                   case 2 : this.features.chordQuality = 'mi7'; break;
                   case 3 : this.features.chordQuality = '\u0394'; break;
                   case 4 : this.features.chordQuality = "7"; break;
                   case 5 : this.features.chordQuality = 'mi7'; break;
                   case 6 : this.features.chordQuality = '\u00D8'; break;
                   default: this.features.chordQuality = ''; break;
                }
                // Still need to understand how to add correctly the modes to the state property
                //this.$store.commit('addChordToModes', this.features);
            },
            selectChord() {
                this.$store.commit('addChordToProgression', this.features);
            },
            fingerChord() {
                this.$store.commit( 'fingerChord', this.features);
            },
            resetKeyboard(){
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
                return this.features.tonic + this.features.chordQuality;
            },
            chordColor() {
                switch(this.degree) {
                    case 0: return 'orange';
                    case 1: return 'deepskyblue';
                    case 2: return 'darkblue';
                    case 3: return 'yellow';
                    case 4: return 'red';
                    case 5: return 'blue';
                    case 6: return 'purple';
                    default: return 'dimgrey';
                }
            },
            chordMode() {
                switch(this.degree) {
                    case 0: return 'Ionian';
                    case 1: return 'Dorian';
                    case 2: return 'Phrygian';
                    case 3: return 'Lydian';
                    case 4: return 'Mixolydian';
                    case 5: return 'Aeolian';
                    case 6: return 'Locrian';
                    default: return 'Unknown';
                }
            }
        }
    }
</script>

<style scoped>
    #plus {
        background: grey;
        position: relative;
        margin-left: 50px;
    }
    #chord {
        background-color: dimgrey;
        background-image: repeating-linear-gradient(whitesmoke, transparent);
        width: 120px;
        height: 120px;
        border: 5px solid black;
    }
    #chord-name {
        position: relative;
        margin-left: 5px;
        font-size: 30px;
    }
</style>