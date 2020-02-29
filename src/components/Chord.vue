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
        computed: {
            chordName() {
                return this.tonic + this.chordQuality;
            }
        }
    }
</script>

<style scoped>

</style>