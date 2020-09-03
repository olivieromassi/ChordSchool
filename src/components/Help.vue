<template>
  <v-card>
    <v-card-title>
                            <span class="headline">How to use <span
                                class="font-weight-light secondary--text text--lighten-2 ">Chord</span>
                                <span>School</span></span>
    </v-card-title>
    <v-card-text>
      <span class="font-weight-light">Chord</span>School is an app that takes as input a chord
      progression and provides you with the possible substitution and voicings according to the rules of major
      scale harmony.
    </v-card-text>
    <v-card-text>

      <p>
        1. Select the key reference using on the <span class="mdi mdi-key"></span>selector.
      </p>
      <p>
        2. The seven modes of the reference scale are displayed in the
        <span class="font-weight-light">Modal Chords</span>
        section.
        Each mode is assigned a specific background color variant, according to the brightness
        or darkness ofthe mode.For example the Lydian mode is assigned the brightest variant while Locrian
        mode the darkest. The selected Key position is highlighted in the palette and the name of the notes
        relative to the
        scale are placed on the keyboard.
      </p>


      <p>3. The hovering action reveals the fingering over the keyboard and the action buttons:
      <div class="mt-n5 pl-5">
        <br>a. Add the chord to Chord Progression using the
        <v-icon size="small">mdi-plus</v-icon>
        icon.
        <br>
        b. Listen to the chord over in its first position using the
        <v-icon size="small">volume_up</v-icon>
        in its first position on the keyboard.
      </div>
      <p>
      <p>
        4. The added chords appear in the <span class="font-weight-light">Chord Progression</span> section, in the order of selection.
      <div class="mt-n5 pl-5">
        <br>a. Drag the chord within the Chord Progression section to rearrange it as needed.
        <br>b. Move the chord over the keyboard up or down an octave using the
        <v-icon size="small">mdi-arrow-up</v-icon>
        and
        <v-icon size="small">mdi-arrow-down</v-icon>
        icons.

        <br>c. View the chord Details menu using the
        <v-icon size="small">mdi-dots-vertical</v-icon>
        button. The Details screen provides information about:

        <div class="mt-n5 pl-5">
          <br> - the Key Reference of the chord
          <br> - Chord Name, Distance in semitones from the reference scale,
          <br> - List of the possible Substitutions to be applied on the chord, based on their degree,
          <br> - List of the Voicings to be applied on the chord.The result is displayed on the keyboard
          fingering.
        </div>
        d. Remove the chord if it is not needed using the
        <v-icon size="small">close</v-icon>
        button.
      </div>
      <p>
      <p>
        5. In the Chord Progression section the user can:
      <div class="mt-n5 pl-5">
        <br>a. Play the progression and view the fingering of the chords as the playout is moving forward in
        time,using the relative PLAY button
        <br>b. Adjust the BPM of the playout speed using the relative BPM button.
        <br>c. Reset the current progression and delete all the selected chords using the RESET Button.
      </div>
      <p>
      <p>
        6. In the Settings menu the user has the ability to customize the application:
      <div class="mt-n5 pl-5">
        <br>a. Sound Settings are allowing the user to choose the sound of the playout between different
        instruments.
        <br>b. Color Settings are allowing the user to set the color of the text and make it discernible in all
        color combinations.
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary darken-1" text @click="dialog = false">close</v-btn>

    </v-card-actions>
  </v-card>

</template>

<script>
export default {
name: "help"
}
</script>

<style scoped>

</style>