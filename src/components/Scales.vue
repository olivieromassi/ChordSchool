<template>
    <div>
        <select v-model="selectedScale">
            <option disabled value="">Please select the KEY REFERENCE</option>
            <option v-for="tonality in scaleNames" v-bind:key="tonality">{{tonality}}</option>
        </select>
        <ul v-if="selectedScale != null">
            <li v-for="note in referenceScale" v-bind:key="note">{{note}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Scales",
        data: function () {
            return {
                scaleNames: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
                scales: [['C', 'D', 'E', 'F', 'G', 'A', 'B'],
                    ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
                    ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
                    ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
                    ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
                    ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
                    ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
                    ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
                    ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
                    ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
                    ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
                    ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']],
                selectedScale: null
            }
        },
        computed: {
            referenceScale() {
                return this.scales[this.scaleNames.indexOf(this.selectedScale)];
            }
        }
    }
</script>

<style scoped>

</style>