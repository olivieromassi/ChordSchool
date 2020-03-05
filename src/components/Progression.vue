<template>
    <div>
        <h1>{{this.features}}</h1>
    </div>
</template>

<script>
    export default {
        name: "Progression",
        data: function () {
            return {
                features: {
                    tonic: '',
                    third: '',
                    fifth: '',
                    seventh: '',
                    chordQuality: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>