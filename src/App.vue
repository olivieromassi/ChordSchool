<template>
    <v-app id="app">
        <v-main>
            <v-app-bar app dense hide-on-scroll class="primary lighten-1 white--text">
                <v-toolbar-title @click="reloadPage()" >
                    <span class="font-weight-light secondary--text text--lighten-2 ">Chord</span>
                    <span>Score</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn x-small depressed text class="primary lighten-1 ">
                    <v-icon>palette</v-icon>

                </v-btn>
                <v-btn x-small depressed text class="primary lighten-1 ">
                    <v-icon>help_outline</v-icon>
                </v-btn>
            </v-app-bar>
            <v-container class="fill-height">
                <v-layout row wrap>
                    <v-flex xs12 md12 lg12>
                        <v-row>
                            <v-spacer></v-spacer>
                            <Keyboard class="hidden-md-and-down"></Keyboard>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-flex>
                    <v-flex xs12 md12 lg12 class="ma-4" align-self-start>
                        <v-card>
                            <v-main class="mx-3 pt-3">
                                <KeyReference></KeyReference>
                                <Modes></Modes>
                                <ChordProgression></ChordProgression>
                            </v-main>
                        </v-card>
                    </v-flex>

                </v-layout>
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
        },
        methods: {
            reloadPage(){
                window.location.reload()
            }
        }
    }
</script>

<style>
    /*
    body {
        overflow: hidden;
        height: 100vh;
    }

     */


    #card {
        padding-top: -10px;
    }
</style>

