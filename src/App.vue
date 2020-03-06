<template>
  <div id="app">
    <KeyReference>Test</KeyReference>
    <Modes>Test</Modes>
    <ChordProgression>Test</ChordProgression>
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

</style>
