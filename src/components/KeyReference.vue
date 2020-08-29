<template>
    <div>
        <v-select slot="activator" height="5" v-model="selectedKey" :items="keys" @change="setKey" solo
                  label="Key Reference" background-color="primary lighten-1" class="subtitle-1">
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
                this.$store.commit('resetProgression');
                this.$store.commit('setSelectedKey', value);
                this.$store.commit('setSelectedKeyScale');
                this.$store.commit('buildModes');
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