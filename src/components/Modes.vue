<template>
    <div>
        <ul>
            <li v-for="note in keyReference" v-bind:key="note">{{note}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Modes",
        props: {
            keyReference : []
        },
        data: function () {
            return {
                modes: []
            }
        }
    }
</script>

<style scoped>

</style>