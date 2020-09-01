<template>
    <v-app id="app">
        <v-main>
            <v-app-bar app dense hide-on-scroll class="primary lighten-1 white--text">
                <v-toolbar-title style="cursor: pointer" @click="reloadPage()">
                    <span class="font-weight-light secondary--text text--lighten-2 ">Chord</span>
                    <span>Score</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu
                        v-model="menuColor"
                        :close-on-content-click="false"
                        offset-x>
                    <template v-slot:activator="{ on: menuColor, attrs }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip }">
                                <v-btn x-small depressed text class="primary lighten-1"
                                       v-bind="attrs"
                                       v-on="{ ...tooltip, ...menuColor }">
                                    <v-icon>palette</v-icon>
                                </v-btn>
                            </template>
                            <span> Settings </span>
                        </v-tooltip>
                    </template>

                    <v-card max-width="300">
                        <v-card-title primary-title class="justify-center">
                            <span class="pr-1">Customize</span>
                            <span class="font-weight-light secondary--text text--lighten-2 ">Chord</span><span>Score</span>
                        </v-card-title>
                        <v-card-text class="mx-2">
                            <span>Choose the text color using the palette.</span>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-color-picker  class="ma-2"
                                    hide-inputs
                                    v-model=$vuetify.theme.themes.light.secondary>
                            </v-color-picker>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="menuColor = false, getColors()">Cancel</v-btn>
                            <v-btn color="primary" text @click="menuColor = false , setColors()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs"
                               v-on="on"
                               x-small depressed text class="primary lighten-1" @click.stop="dialog = true">
                            <v-icon>help_outline</v-icon>
                        </v-btn>
                    </template>
                    <span> Help </span>
                </v-tooltip>
                <v-dialog v-model="dialog">
                    <v-card>
                        <v-card-title>
                            <span class="headline">How to use <span
                                    class="font-weight-light secondary--text text--lighten-2 ">Chord</span>
                                <span>Score</span></span>
                        </v-card-title>
                        <v-card-text>
                            <span class="font-weight-light">Chord</span>Score is an app that takes as input a chord
                            progression and provides the user with the
                            possible substitution and voicings according to the rules of major scale harmony.
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="secondary darken-1" text @click="dialog = false">close</v-btn>

                        </v-card-actions>
                    </v-card>
                </v-dialog>

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
                dialog: false,
                menuColor: false,
            }
        },
        components: {
            Keyboard,
            ChordProgression,
            Modes,
            KeyReference
        },
        methods: {
            reloadPage() {
                window.location.reload()
            },
            setColors() {
                localStorage.setItem("theme_secondary", this.$vuetify.theme.themes.light.secondary);
            },
            getColors() {
                let theme_secondary = localStorage.getItem("theme_secondary");
                if (theme_secondary !== null) {
                    this.$vuetify.theme.themes.light.secondary = theme_secondary;
                }
            }
        },

        mounted() {
            const theme_secondary = localStorage.getItem("theme_secondary");
            if (theme_secondary !== null) {
                this.$vuetify.theme.themes.light.secondary = theme_secondary;
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
</style>

