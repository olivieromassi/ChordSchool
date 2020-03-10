<template>
  <div id="app">
    <KeyReference></KeyReference>
    <Modes></Modes>
    <ChordProgression></ChordProgression>
    <Piano></Piano>
  </div>
</template>

<script>
import KeyReference from "@/components/KeyReference";
import Modes from "@/components/Modes";
import ChordProgression from "@/components/ChordProgression";
import Piano from "@/components/Piano";

export default {

  name: 'App',
  components: {
    Piano,
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
