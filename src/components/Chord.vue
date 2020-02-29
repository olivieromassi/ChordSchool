<template>
    <div>
        <h1>{{ chordName }}</h1>
    </div>
</template>

<script>
    export default {
        name: "Chord",
        props: {
          selectedScale: {
          }
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
            buildChord(refScale, grade) {
                this.tonic = refScale[(grade - 1) % 7];
                this.third = refScale[(grade + 1) % 7];
                this.fifth = refScale[(grade + 3) % 7];
                this.seventh = refScale[(grade + 5) % 7];
                switch (grade) {
                   case 1 : this.chordQuality = 'MA7'; break;
                   case 2 : this.chordQuality = 'mi7'; break;
                   case 3 : this.chordQuality = 'mi7'; break;
                   case 4 : this.chordQuality = 'MA7'; break;
                   case 5 : this.chordQuality = 'MA7'; break;
                   case 6 : this.chordQuality = 'mi7'; break;
                   case 7 : this.chordQuality = 'dim7'; break;
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