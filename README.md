# ACTAM Project 

## Web-based Educational application to visualize Major Scale harmony chords and scales 

![Screenshot](screenshots/mainWindow.png)

## Introduction

As a project for the Advanced Coding Tools and Methodologies course we developed a Vue.js desktop application that allows the user to build chord progressions and allows him to experiment with possible substitutions and voicings according to the rules of major scale harmony and hear the result. The app is configured to run in all screen sizes and major browsers, so it's totally cross-platform and available for every desktop OS.

## User Interface

The ChordSchool user interfaces consists of the following  main components:
1. The **Keyboard** that extends over three octaves and is displaying the notes composing the major scale of reference as well as  the placement of fingers over the it for the modal chords in their first position as well as all the possible alterations when applied by the user. Please note that the keyboard is available for medium and above screen sizes.

2. The **control panel** where the user mainly interacts with the application. The user is able to create the chord progression of his choice, by placing a series of chords available from the seven modes of the reference scale. The user can reorder the progression by dragging its elements and hear the final result in different sound environments and configurable playout speed. As the user interacts with the control panel, the keyboard highlights his choices and helps him position himself over the keyboard as a player. The control panel is available for all screen sizes.

## How to Use

The ChordSchool app workflow can be summarized by the following steps:

1. Select the key reference using the selector. Each key is assigned a color 
according to their positioning on the circle of 5ths, which is displayed in the palette on the right section of the control panel.  

![Screenshot](screenshots/referenceKey.png)

2. The modes of the selected reference scale are displayed in the Modal Chords section. 
Each mode is assigned a specific background color variant, according to the brightness or darkness of the mode.
For example the Lydian mode is assigned the brightest variant while Locrian mode the darkest.
The selected Key position is highlighted in the palette and the name of the notes relative to the scale are placed on the keyboard. 

![Screenshot](screenshots/modalChords.png)

3. The hovering action reveals the fingering over the keyboard and the action buttons:
    * **Add** the chord to Chord Progression section.
    * **Listen** to the chord over in its first position fingering over the scale.

![Screenshot](screenshots/fingeringAndActions.png)
 
4. The added chords appear in the Chord Progression section, in the order of selection.

![Screenshot](screenshots/chordProgressionSimple.png)

5. Hovering over the progression list chords reveals the fingering over the keyboard board and additional action buttons

   * **Drag** the chord within the Chord Progression section to rearrange it as needed.
   * **Move** the chord over the keyboard up or down an octave
   * **View** the chord Details menu using the Details button. The Details screen and its options are described in depth in the following section **Chord Alterations**  
   * **Remove** the chord if it is not needed
    
![Screenshot](screenshots/experimentChord.png)

7. In the Chord Progression section the user can: 

    * **Play** the progression and view the fingering of the chords as the playout is moving forward in time,using the relative PLAY button
    + **Adjust** the BPM ** of the playout speed using the relative BPM button. 
    * **Reset** the current progression and delete all the selected chords using the RESET Button.

##Chord Alterations

### Substitutions
In music theory, chord substitution is the technique of using a chord in place of another in a progression of chords, or a chord progression. Much of the European classical repertoire and the vast majority of blues, jazz and rock music songs are based on chord progressions. "A chord substitution occurs when a chord is replaced by another that is made to function like the original. Usually substituted chords possess two pitches in common with the triad that they are replacing."

Default Substitutions for a Single Chord: Provide suggestions on chord substitutions for single chords: 

Tritone substitution - suggested on dominant chords V. 

Secondary dominant – suggested to precede any of the given chords. 

ii-V substitution- suggest for each chord to be preceded by its relative supertonic ii7 and dominant. 

Chord quality substitution - is when the quality of a chord is changed, from major to minor or vice versa, so the new substitute chord has similar root and construction but with one pitch different. 

Diminished 7th: when exists V-I sub-progression the program suggests to substitute V with VII o7. 

Relative major-minor substitution: using the relative chord from the scale that shares the same notes as the original scale. 

Tonic substitution: is the use of chords that sound similar to the tonic chord, instead of the I the program suggests III or VI substitution. 

Since our application is considered educational, we chose to visually represent the key references of the major scale harmony, the relative chords and modes in the context of color as well as in the context of placement of fingers over the keyboard as the chord progression is 


The keyboard is displaying

## Technologies Used

### Vue

### Vuex

### Vuetify

### ToneJS



## Video Demo
Here's a short demo of our project --> [Demo]()


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Developed by
- Massi Oliviero (mail: oliviero.massi@mail.polimi.it)
- Fotios Koutsoukos (mail: fotios.koutsoukos@mail.polimi.it)
- Soroush Jamali (mail: soroush.jamali@mail.polimi.it)
