<template>
    <v-app id="app">
        <v-main>
            <v-app-bar app dense class="light-blue lighten-3">
                <v-toolbar-title>
                    <span class="font-weight-light">Chord</span>
                    <span>Score</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn x-small depressed text class="light-blue lighten-3">
                    <v-icon>help</v-icon>
                    <span>help</span>
                </v-btn>
            </v-app-bar>
            <v-container class="fill-height mt-0" fluid>
                <v-row class="pt-0 mt-0">
                    <v-spacer></v-spacer>
                    <Keyboard class="hidden-sm-and-down"></Keyboard>
                    <v-spacer></v-spacer>
                </v-row>
                <v-row id="card" align="center" justify="center" class="mt-5">
                    <v-flex md10>
                        <v-card>
                            <v-main class="mx-4 pt-1">
                                <KeyReference class="mt-2"></KeyReference>
                                <Modes></Modes>
                                <ChordProgression></ChordProgression>
                            </v-main>
                        </v-card>
                    </v-flex>
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
    /*body {
        overflow: hidden;
        height: 100vh;
    }*/
    #card{
        padding-top: -10px;
    }
</style>

