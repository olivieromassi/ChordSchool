<template>
    <div>
        <h1>{{ chordName }}</h1>
    </div>
</template>

<script>
    export default {
        name: "Chord",
        data: function () {
            return {
             chordName: "CMA7",
             tonic: "C3",
             third: "E3",
             fifth: "G3",
             seventh: "B3"
            }
        }
    }
</script>

<style scoped>

</style>