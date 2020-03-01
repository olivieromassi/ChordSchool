<template>
    <div>
        <h1>{{buildChord(keyReference.indexOf(degree))}}</h1>
    </div>
</template>

<script>
    export default {
        name: "Chord",
        props: {
            keyReference: [],
            degree: {}
        },
        data: function () {
            return {
                tonic: '',
                third: '',
                fifth: '',
                seventh: '',
                chordQuality: ''
            }
        },
        methods: {
            buildChord() {
                this.tonic = this.keyReference[(this.degree) % 7];
                this.third = this.keyReference[(this.degree + 2) % 7];
                this.fifth = this.keyReference[(this.degree + 4) % 7];
                this.seventh = this.keyReference[(this.degree + 6) % 7];
                switch (this.degree) {
                   case 0 : this.chordQuality = 'MA7'; break;
                   case 1 : this.chordQuality = 'mi7'; break;
                   case 2 : this.chordQuality = 'mi7'; break;
                   case 3 : this.chordQuality = 'MA7'; break;
                   case 4 : this.chordQuality = 'MA7'; break;
                   case 5 : this.chordQuality = 'mi7'; break;
                   case 6 : this.chordQuality = 'dim7'; break;
                   default: this.chordQuality = ''; break;
                }
            }
        },
        computed: {
            chordName() {
                return this.tonic + this.chordQuality;
            }
        }
    }
</script>

<style scoped>

</style>