<template>
    <div id="window">
        <h1> CHORD PROGRESSION LIST: </h1>
        <button id="play" @click="playProgression">PLAY</button>
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
        methods: {
          playProgression() {
              //TODO complete the function once defined the strategy to generate sounds
          }
        },
        computed: {
            progression() {
                return this.$store.getters.getProgression;
            }
        }
    }
    //testing commit by fotis
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
    #play {
        left: 25px;
        position: relative;
    }
</style>