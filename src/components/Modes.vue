<template>
    <div id="window">
        <h1>MODAL CHORDS</h1>
        <ol>
            <li id="modes" v-for="note in keyReference" v-bind:key="note">
                <Chord :keyReference="keyReference" :degree="keyReference.indexOf(note)">Test</Chord>
            </li>
        </ol>
    </div>
</template>

<script>
    import Chord from "@/components/ModalChord";

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
    #window {
        width: 1000px;
        height: 500px;
        background: lightblue;
    }
    #modes {
        display: inline-block;
    }

</style>