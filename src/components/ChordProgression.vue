<template>
    <div>
        <h2 class="font-weight-light">Chord Progression List</h2>
        <v-btn v-if="progression.length > 0" @click="playProgression">
            <v-icon color="blue">play_arrow</v-icon>
        </v-btn>
        <v-list>
            <draggable v-model="progression">
                <li v-for="(chord, index) in progression" v-bind:key="chord.index">
                    <Chord :features="chord" :index="index"></Chord>
                </li>
            </draggable>
        </v-list>
    </div>
</template>

<script>

    import Chord from "@/components/Chord";
    import draggable from "vuedraggable";
    import * as Tone from "tone";


    export default {
        name: "ChordProgression",
        components: {
            Chord,
            draggable
        },
        methods: {
            playProgression() {
                let i = 0;
                let x = [];
                let t = [];
                let y = [];

                for (i = 0; i < this.progression.length; i++) {
                    x[i] = [this.progression[i].tonic,
                        this.progression[i].third,
                        this.progression[i].fifth,
                        this.progression[i].seventh];
                    t[i] = 3 * (i + 1) / 4;
                    y[i] = [t[i], x[i]] ;
                }

                const synth = new Tone.PolySynth().toDestination();
                const part = new Tone.Part(((time, chord) => {
                    synth.triggerAttackRelease( chord, "2n", time);
                }), y);
                part.start();
                Tone.Transport.start();
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