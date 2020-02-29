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
             chordName: '',
             tonic: '',
             third: '',
             fifth: '',
             seventh: ''
            }
        }
    }
</script>

<style scoped>

</style>