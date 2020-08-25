<template>
    <div>
        <h2 class="font-weight-light"> Modal Chords: </h2>

        <v-list>
            <li id="modes" v-for="mode in modes" :key="mode.index">
                <v-spacer></v-spacer>
                <ModalChord class="font-weight-light" :features="mode" :keyReference="keyReference"></ModalChord>
                <v-spacer></v-spacer>
            </li>
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
</style>