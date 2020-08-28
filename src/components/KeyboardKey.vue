<template>
    <div v-bind:class="{ 'key' : !keyIsBlack , 'black-key' : keyIsBlack, 'pressed-key': keyIsPressed}">
        <div>{{keys.map(key => key.noteName)[keys.map(key => key.name).indexOf(note)]}}</div>

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
            }
            ,

        }
    }

</script>

<style scoped>
    .key {
        position: relative;
        width: 60px;
        height: 200px;
        border: 1px solid black;
        border-right: none;
        background: papayawhip;
        border-radius: 5px;
        box-shadow: 0 3px 5px #666;
        display: inline-flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 10px;
        font-weight: bold;
    }

    .key:last-child {
        border-right: 1px solid black;
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
        color: white;

    }

    .pressed-key {
        background: #81D4FA;
    }
</style>