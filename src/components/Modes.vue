<template>
    <div>
        <h2 class="font-weight-thin">Modal Chords</h2>
        <div v-if="this.$store.state.keyReference.length === 0">
            <v-icon>music_note</v-icon>
            Choose a reference key
        </div>
        <v-list>
            <v-list-item v-for="mode in modes" :key="mode.index">
                <ModalChord :features="mode" :keyReference="keyReference"></ModalChord>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    import ModalChord from "@/components/ModalChord";

    export default {
        name: "Modes",
        components: {
            ModalChord
        },
        computed: {
            keyReference() {
                return this.$store.getters.getKeyReference;
            },
            modes() {
                return this.$store.getters.getModes;
            }
        }
    }
</script>

<style>
    .v-list-item {
        display: inline-block;
    }
</style>