<template>
    <div>
        <h2 class="font-weight-light">Chord Progression List</h2>
        <v-btn v-if="progression.length > 0" @click="playProgression">
            <v-icon color="blue">play_arrow</v-icon>
        </v-btn>
        <v-list>
            <draggable v-model="progression">
                <li v-for="chord in progression" v-bind:key="chord.index">
                    <Chord :features="chord"></Chord>
                </li>
            </draggable>
        </v-list>
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

<style>
    li {
        display: inline-block;
    }
</style>