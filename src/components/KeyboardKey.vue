<template>
    <div v-bind:class="{ 'key' : !keyIsBlack , 'black-key' : keyIsBlack, 'pressed-key': keyIsPressed }">
        <div>{{keys.map(key => key.noteName)[keys.map(key => key.name).indexOf(note)]}}</div>
        <div v-if="!keyIsPressed">{{keyOfRefScale.map(key => key.partOfRefScale)[keyOfRefScale.map(key => key.name).indexOf(note)]}}</div>
    </div>
</template>

<script>

    export default {
        name: "keyboardKey",
        props: {
            note: {
                type: String,
                required: true
            },
            keyIsBlack: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            keyIsPressed() {
                return this.$store.getters.getPressedKeys.map(key => key.name).indexOf(this.note) >= 0
            },
            keys() {
                return this.$store.getters.getPressedKeys
            },
            keyOfRefScale() {
                return this.$store.getters.getRefScaleKeys
            }
        }
    }

</script>

<style scoped>

    .key {
        position: relative;
        width: 60px;
        height: 200px;
        border: 2px solid transparent;
        border-right: none;
        background: papayawhip;
        border-radius: 5px;
        box-shadow: 0 3px 5px #666;
        display: inline-flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 10px;
        font-weight: bold;
        /*noinspection CssUnresolvedCustomProperty*/
        color: var(--v-secondary-base);
    }

    .key:last-child {
        border-right: 1px solid transparent;
    }

    .black-key {
        position: absolute;
        top: -1px;
        left: 38px;
        width: 40px;
        height: 120px;
        background: black;
        border-radius: 5px;
        box-shadow: 0 3px 5px #666;
        z-index: 999;
        display: inline-flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 10px;
        /*noinspection CssUnresolvedCustomProperty*/
        color: var(--v-secondary-base);
    }

    .pressed-key {
        /*noinspection CssUnresolvedCustomProperty*/
        background: var(--v-primary-base);
        /*noinspection CssUnresolvedCustomProperty*/
        box-shadow: 0 6px 10px var(--v-primary-darken2);
    }


</style>