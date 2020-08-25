<template>
    <div>
        <v-select
                v-model="selectedKey"
                :items="keys"
                @change="setKey"
                solo
                label="Key reference"
        ></v-select>
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