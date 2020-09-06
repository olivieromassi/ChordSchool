<template>
  <v-app id="app">
    <v-main>
      <v-app-bar app dense hide-on-scroll class="primary lighten-1 white--text">
        <v-toolbar-title style="cursor: pointer" @click="reloadPage()">
          <span class="font-weight-light secondary--text text--lighten-2 ">Chord</span>
          <span>School</span>
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
                  <v-icon>settings</v-icon>
                </v-btn>
              </template>
              <span> Settings </span>
            </v-tooltip>
          </template>

          <v-card max-width="300">
            <v-card-title primary-title class="justify-center">
              <span class="pr-1">Customize</span>
              <span class="font-weight-light secondary--text text--lighten-2 ">Chord</span><span>School</span>
            </v-card-title>
            <v-divider></v-divider>

            <v-expansion-panels hover>
              <v-expansion-panel>
                <v-expansion-panel-header class="align-self-start">
                  Select Sound
                </v-expansion-panel-header>
                <v-expansion-panel-content>

                  <v-radio-group
                      v-model="instrumentSelected"
                      mandatory>
                    <v-radio
                        class="my-2"
                        v-for="(instrument, i) in instruments"
                        :key="i"
                        :label="`${instrument}`"
                        :value="i"
                        v-on:click="setInstrument(instrumentSelected)">
                    </v-radio>
                  </v-radio-group>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider></v-divider>
              <v-expansion-panel>
                <v-expansion-panel-header>Select Color</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card-text class="mx-2">
                    <span>Choose the text color using the palette.</span>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-color-picker class="ma-2"
                                    hide-inputs
                                    v-model=$vuetify.theme.themes.light.secondary>
                    </v-color-picker>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="menuColor = false, getColors()">Cancel</v-btn>
                    <v-btn color="primary" text @click="menuColor = false , setColors()">Save
                    </v-btn>
                  </v-card-actions>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
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
          <Help></Help>
        </v-dialog>
      </v-app-bar>
      <v-container fluid class="px-16">
        <v-layout row wrap>
          <v-flex xs12 md12 lg12 xl12>
            <v-row>
              <v-spacer></v-spacer>
              <Keyboard class="hidden-md-and-down"></Keyboard>
              <v-spacer></v-spacer>
            </v-row>
          </v-flex>
          <v-flex xs12 md12 lg12 xl12 class="mt-4">
            <v-card>
              <v-main class="mx-3 pt-3">
                <v-row>
                  <v-col
                      cols="12"
                      sm="11">
                    <KeyReference></KeyReference>
                    <Modes></Modes>
                    <ChordProgression></ChordProgression>
                  </v-col>
                  <v-col class="pl-5"
                         cols="12"
                         sm="1">
                    <div v-for="key in keys"
                         :key="key.name"
                         :style="`height:7.7%; width:100%`"
                         :class="[ (key.highlight)|| (key.name.includes(selectedKey) && selectedKey.length===2 )|| (key.name === selectedKey) || (key.name.includes(selectedKey) && selectedKey==='B' && key.name.length>2) ? key.colorText + ' lighten-1  white--text  selected '  : key.colorText + ' lighten-1  secondary--text  notSelected'] ">
                      {{ key.name }}
                    </div>
                  </v-col>
                </v-row>
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
import Help from "@/components/Help";


export default {

  name: 'App',
  data: function () {
    return {
      dialog: false,
      menuColor: false,
      instrumentSelected: 0
    }
  },
  components: {
    Help,
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
    },
    setInstrument(instrumentSelected) {
      this.$store.commit('setInstrument', instrumentSelected);
    },
  },

  mounted() {
    const theme_secondary = localStorage.getItem("theme_secondary");
    if (theme_secondary !== null) {
      this.$vuetify.theme.themes.light.secondary = theme_secondary;
    }
  },

  computed: {
    instruments() {
      return this.$store.getters.getInstruments
    },
    keys() {
      return this.$store.getters.getKeysNameColor
    },
    selectedKey() {
      return this.$store.getters.getSelectedKey
    }


  }
}

</script>


<style>

.selected {
  border-radius: 5px;
  box-shadow: 0 3px 3px #666;
  font-weight: bold;
  border: 5px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;

}

.notSelected {
  border-radius: 5px;
  box-shadow: 0 3px 3px #666;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

