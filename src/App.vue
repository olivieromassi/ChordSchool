<template>
    <v-app id="app">
        <v-main>
            <v-app-bar app dense hide-on-scroll class="primary lighten-1 white--text">
                <v-hover disabled>
                    <v-toolbar-title style="cursor: pointer" @click="reloadPage()">
                        <span class="font-weight-light secondary--text text--lighten-2 ">Chord</span>
                        <span>Score</span>
                    </v-toolbar-title>
                </v-hover>

                <v-spacer></v-spacer>

                <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x>
                    <template v-slot:activator="{ on, attrs }">
                        <!-- TODO: add tooltip -->
                        <v-btn x-small depressed text class="primary lighten-1"
                               v-bind="attrs"
                               v-on="on">
                            <v-icon>palette</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title>
                            Customize me!
                        </v-card-title>
                        <v-card-text>
                            <v-radio-group v-model="colorType" row>
                                <v-radio id="colorPickerRadio" class="pr-10"
                                         v-for="color in Object.getOwnPropertyNames(this.$vuetify.theme.themes.light).slice(0,2)"
                                         :key="color"
                                         :label="color"
                                         :value="color"
                                ></v-radio>
                            </v-radio-group>

                            <v-color-picker
                                    hide-inputs
                                    v-if="colorType==='primary'"
                                    v-model=$vuetify.theme.themes.light.primary>
                            </v-color-picker>
                            <v-color-picker
                                    hide-inputs
                                    v-if="colorType==='secondary'"
                                    v-model=$vuetify.theme.themes.light.secondary>
                            </v-color-picker>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="menu = false, getColors()">Cancel</v-btn>
                            <v-btn color="primary" text @click="menu = false , setColors()">Save</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-menu>


                <v-btn x-small depressed text class="primary lighten-1" @click.stop="dialog = true">
                    <v-icon>help_outline</v-icon>
                </v-btn>
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
                menu: false,
                colorType: 'primary'
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
                localStorage.setItem("theme_primary", this.$vuetify.theme.themes.light.primary);
                localStorage.setItem("theme_secondary", this.$vuetify.theme.themes.light.secondary);
            },
            getColors(){
                let theme_primary = localStorage.getItem("theme_primary");
                let theme_secondary = localStorage.getItem("theme_secondary");
                if (theme_primary !== null && theme_secondary !== null) {
                    this.$vuetify.theme.themes.light.primary = theme_primary;
                    this.$vuetify.theme.themes.light.secondary = theme_secondary;
                }
            }
        },

        mounted() {
            const theme_primary = localStorage.getItem("theme_primary");
            const theme_secondary = localStorage.getItem("theme_secondary");
            if (theme_primary !== null && theme_secondary !== null) {
                this.$vuetify.theme.themes.light.primary = theme_primary;
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

