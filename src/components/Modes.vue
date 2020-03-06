<template>
    <div>
        <ol>
            <li v-for="note in keyReference" v-bind:key="note">
                <Chord :keyReference="keyReference" :degree="keyReference.indexOf(note)">Test</Chord>
            </li>
        </ol>
    </div>
</template>

<script>
    import Chord from "@/components/Chord";

    export default {
        name: "Modes",
        components: {
            Chord
        },
        computed: {
            keyReference() {
                return this.$store.getters.getKeyReference;
            }
        }
    }
</script>

<style scoped>

</style>