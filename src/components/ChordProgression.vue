<template>
    <div id="window">
        <h1> CHORD PROGRESSION LIST: </h1>
        <button id="play" @click="playProgression">PLAY</button>
        <ol>
            <draggable v-model="progression">
                <li id="chords" v-for="chord in progression" v-bind:key="chord.index">
                    <Chord :features="chord"></Chord>
                </li>
            </draggable>
        </ol>
    </div>
</template>

<script>

    import Chord from "@/components/Chord";
    import draggable from "vuedraggable";

    export default {
        name: "ChordProgression",
        components: {
            Chord,
            draggable
        },
        methods: {
          playProgression() {
              //TODO complete the function once defined the strategy to generate sounds
          }
        },
        computed: {
            progression: {
                get() {
                    return this.$store.getters.getProgression
                },
                set(chords) {
                    this.$store.dispatch('rearrangeProgression', {
                        items: chords
                    });
                }
            }
        }
    }

</script>

<style scoped>
    #window {
        width: 1000px;
        height: 300px;
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