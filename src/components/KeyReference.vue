<template>

    <div>

        <!--
        <label> SELECT A KEY REFERENCE:
            <select v-model="selectedKey" @change="setKey($event)">
                <option v-for="reference in keys" v-bind:key="reference">{{ reference }}</option>
            </select>
        </label>
        -->
        <v-select
                v-model="selectedKey"
                :items="keys"
                @change="setKey"
                filled
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

<style scoped>
    #window {
        width: 500px;
        height: 25px;
        border: solid black;
        background: lightblue;
    }

</style>