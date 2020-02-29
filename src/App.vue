<template>
  <div id="app">
    <Chord></Chord>
    <Modes></Modes>
  </div>
</template>

<script>
import Chord from './components/Chord.vue'
import Modes from "@/components/Modes";
export default {

  name: 'App',
  components: {
    Modes,
    Chord
  }
}
</script>

<style>

</style>
