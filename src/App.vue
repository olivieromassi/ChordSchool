<template>
  <div id="app">
    <KeyReference></KeyReference>
    <Modes></Modes>
    <ChordProgression></ChordProgression>
  </div>
</template>

<script>
import KeyReference from "@/components/KeyReference";
import Modes from "@/components/Modes";
import ChordProgression from "@/components/ChordProgression";

export default {

  name: 'App',
  components: {
    ChordProgression,
    Modes,
    KeyReference
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>
