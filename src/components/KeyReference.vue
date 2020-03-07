<template>
    <div id="window">
        <label> SELECT A KEY REFERENCE:
            <select v-model="selectedKey" @change="setKey($event)">
                <option v-for="reference in keys" v-bind:key="reference">{{ reference }}</option>
            </select>
        </label>
    </div>
</template>

<script>
    export default {
        name: "KeyReference",
        data: function() {
            return {
                selectedKey: String
            }
        },
        methods: {
          setKey(event) {
              this.$store.commit('resetModes');
              this.$store.commit('resetProgression');
              this.$store.commit('setSelectedKey', event.target.value);
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
        background: lightblue;
    }

</style>