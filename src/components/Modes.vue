<template>
    <div>
        <h2 class="font-weight-light"> Modal Chords: </h2>

        <v-list>
            <li v-for="note in keyReference" :key="note">
                <v-spacer></v-spacer>
                <ModalChord class="font-weight-light" :keyReference="keyReference" :degree="keyReference.indexOf(note)"></ModalChord>
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