<template>
    <ul>
        <li v-for="note in scales" :key="note">{{ note }}</li>
    </ul>
</template>

<script>
    export default {
        name: "Modes",
        data: function () {
            return {
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
                    ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']]

            }
        }
    }
</script>

<style scoped>

</style>