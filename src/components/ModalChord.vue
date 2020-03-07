<template>
    <div id="chord">
        <h1>{{buildChord(keyReference.indexOf(degree))}}{{chordName}}</h1>
        <button id="plus" v-on:click="selectChord">+</button>
    </div>
</template>

<script>
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
                   case 0 : this.features.chordQuality = 'MA7'; break;
                   case 1 : this.features.chordQuality = 'mi7'; break;
                   case 2 : this.features.chordQuality = 'mi7'; break;
                   case 3 : this.features.chordQuality = 'MA7'; break;
                   case 4 : this.features.chordQuality = 'MA7'; break;
                   case 5 : this.features.chordQuality = 'mi7'; break;
                   case 6 : this.features.chordQuality = 'dim7'; break;
                   default: this.features.chordQuality = ''; break;
                }
               // this.$store.commit('addChordToModes', this.features);
            },
            selectChord() {
                this.$store.commit('addChordToProgression', this.features);
            }
        },
        computed: {
            chordName() {
                return this.features.tonic + this.features.chordQuality;
            }
        }
    }
</script>

<style scoped>
    #plus {
        background: grey;
        position: center;
    }
    #chord {
        background-color: dimgrey;
        width: 120px;
        height: 120px;
        border: 5px solid black;
    }
</style>