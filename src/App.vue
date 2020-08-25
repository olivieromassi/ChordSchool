<template>
    <v-app id="app" class="red lighten-4">
        <v-main>

            <v-container class="fill-height" fluid>
                <v-container class="hidden-sm-and-down">
                    <Keyboard></Keyboard>
                </v-container>
                <v-row align="center" justify="center">

                    <v-card width="1000">
                        <v-app-bar app dense class="light-blue lighten-3">
                            <v-toolbar-title>
                                <span class="font-weight-light">Chord</span>
                                <span>Score</span>
                            </v-toolbar-title>
                        </v-app-bar>
                        <KeyReference></KeyReference>
                        <Modes></Modes>
                        <ChordProgression></ChordProgression>
                    </v-card>


                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    import KeyReference from "@/components/KeyReference";
    import Modes from "@/components/Modes";
    import ChordProgression from "@/components/ChordProgression";
    import Keyboard from "@/components/Keyboard";

    export default {

        name: 'App',
        data: function () {
            return {
                title: "ChordScore"
            }
        },
        components: {
            Keyboard,
            ChordProgression,
            Modes,
            KeyReference
        }
    }
</script>

<style>
</style>
