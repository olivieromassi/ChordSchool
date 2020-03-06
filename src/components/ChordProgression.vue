<template>
    <div>
        <h1>CHORD PROGRESSION LIST</h1>
        <div v-for="chord in modes" v-bind:key="chord">
                <Chord :keyReference="keyReference" :degree="keyReference.indexOf(chord.tonic)">Test</Chord>
        </div>
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
            modes() {
                return this.$store.getters.getModes;
            },
            keyReference() {
                return this.$store.getters.getKeyReference;
            }
        }
    }
</script>

<style scoped>

</style>