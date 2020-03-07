<template>
    <div id="chord">
        <h1>{{this.features.tonic + this.features.chordQuality}}</h1>
        <button id="remove">-</button>
    </div>
</template>

<script>
    export default {
        name: "Chord",
        props: {
            features: {}
        }
    }
</script>

<style scoped>
    #remove {
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