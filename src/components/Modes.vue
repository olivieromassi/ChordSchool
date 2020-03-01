<template>
    <div>
        <ol>
            <li v-for="note in keyReference" v-bind:key="note"><Chord :keyReference="keyReference" :degree="keyReference.indexOf(note)">Test</Chord></li>
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
        props: {
            keyReference : {}
        },
        data: function () {
            return {
                modes: []
            }
        }
    }
</script>

<style scoped>

</style>