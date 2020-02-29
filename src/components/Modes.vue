<template>
    <ul>
        <li v-for="chord in modalChords" :key="chord"><Chord></Chord></li>
    </ul>
</template>

<script>
    import Chord from "@/components/Chord";
    export default {
        name: "Modes",
        components: {Chord},
        data: function () {
            return{
                modalChords : []
            }

        }
    }
</script>

<style scoped>

</style>