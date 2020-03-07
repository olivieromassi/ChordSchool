<template>
    <div id="window">
        <h1> CHORD PROGRESSION LIST: </h1>
        <ol>
            <li id="chords" v-for="chord in progression" v-bind:key="chord.index">
                <Chord :features="chord"></Chord>
            </li>
        </ol>
    </div>
</template>

<script>

    import Chord from "@/components/Chord";

    export default {
        name: "ChordProgression",
        components: {
            Chord
        },
        computed: {
            progression() {
                return this.$store.getters.getProgression;
            }
        }
    }
</script>

<style scoped>
    #window {
        width: 1000px;
        height: 500px;
        border: solid black;
        background: lightblue;
    }
    #chords {
        display: inline-block;
    }
</style>