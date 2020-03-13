<template>
  <div id="app">
    <KeyReference></KeyReference>
    <Modes></Modes>
    <ChordProgression></ChordProgression>
    <Keyboard></Keyboard>
  </div>
</template>

<script>
import KeyReference from "@/components/KeyReference";
import Modes from "@/components/Modes";
import ChordProgression from "@/components/ChordProgression";
import Keyboard from "@/components/Keyboard";

export default {

  name: 'App',
  components: {
    Keyboard,
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
