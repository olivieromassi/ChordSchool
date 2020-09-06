<template>
    <div>
        <v-select slot="activator"
                  height="5"
                  v-model="selectedKey"
                  :items="keys"
                  @change="setKey"
                  solo
                  prepend-icon="mdi-key"
                  label="Key Reference"
                  background-color="primary lighten-1"
                  class="mb-n5 subtitle-1 secondary--text">
        </v-select>
    </div>
</template>

<script>
export default {
    name: "KeyReference",
    data: function () {
        return {
            selectedKey: String
        }
    },
    methods: {
        setKey(value) {
            this.$store.commit('resetModes');
            let oldProgressionDegrees = [];
            this.$store.state.progression.forEach((value) => {
                if (value.scale[0].slice(0, -1) === this.$store.state.selectedKey.toString()) {
                    oldProgressionDegrees.push(value.degree);
                }
            });
            this.$store.commit('resetProgression');
            this.$store.commit('resetRefScaleKeys');
            this.$store.commit('setSelectedKey', value);
            this.$store.commit('setSelectedKeyScale');
            this.$store.commit('buildModes');
            this.$store.commit('setPartOfKeyReference');
            this.$vuetify.theme.themes.light.primary = this.$store.state.keys[this.$store.state.keys.findIndex(key => key.name === value)].color;
            oldProgressionDegrees.forEach(value => {
                this.$store.commit('addChordToProgression', JSON.parse(JSON.stringify(this.$store.getters.getModes[value])));
            });
        }
    },
    computed: {
        keys() {
            return this.$store.getters.getKeys;
        },
        scales() {
            return this.$store.getters.getScales;
        }
    }
}
</script>

<style>
</style>