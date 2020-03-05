<template>
    <div>
        <h1>{{features}}</h1>
    </div>
</template>

<script>
    export default {
        name: "Progression",
        props: {
            features: {
                tonic: '',
                third: '',
                fifth: '',
                seventh: '',
                chordQuality: ''
            }
        }
    }
</script>

<style scoped>

</style>