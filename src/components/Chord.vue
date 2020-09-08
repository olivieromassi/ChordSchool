<template>
    <div>
        <v-row class="mx-1">
            <v-hover v-slot:default="{ hover }">
                <v-card
                    :style="`font-size: 40px;box-shadow: ${distanceFromReference.distance}px ${distanceFromReference.distance}px ${distanceFromReference.distance}px var(--v-secondary-base) !important;`"
                    :class="[distanceFromReference.distance > 0 ? chordClass + ' ' + chordColor + ' ' + chordShade : chordClass + ' ' + 'primary' + ' ' + chordShade] "
                    @mouseenter="fingerChord()"
                    @mouseleave="resetKeyboard()">
                    <v-card-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    :class="{ 'show-btns': hover }"
                                    color="transparent"
                                    fab
                                    icon
                                    x-small
                                    v-on:click="deleteChord() , resetKeyboard()" v-bind="attrs"
                                    v-on="on">
                                    <v-icon
                                        :class="{ 'show-btns': hover }"
                                        size="medium">close
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Remove the {{ chordMode }} </span>
                        </v-tooltip>
                        <v-menu
                            :close-on-content-click=false
                            v-model="menuDetailed"
                            offset-x
                            top
                            offset-y>
                            <template v-slot:activator="{ on: menuDetailed, attrs }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <v-btn
                                            :class="{ 'show-btns': hover }"
                                            color="transparent"
                                            fab
                                            icon
                                            x-small
                                            v-on="{ ...tooltip, ...menuDetailed }"
                                            v-bind="attrs">
                                            <v-icon
                                                :class="{ 'show-btns': hover }"
                                                size="medium">mdi-dots-vertical
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Modify the {{ chordMode }} </span>
                                </v-tooltip>
                            </template>
                            <v-card max-width="200"
                                    :class="[distanceFromReference.distance > 0 ? chordDetailsClass + ' ' + chordColor + ' ' + chordShade : chordDetailsClass + ' ' + 'primary' + ' ' + chordShade] ">
                                <v-card-text class="secondary--text">

                                    <v-row align="center" justify="center">
                                        <v-icon color="secondary">mdi-music-clef-treble</v-icon>
                                        Key Reference: {{ chordKeyRefScale }}
                                    </v-row>
                                    <v-row class=" secondary--text text--lighten-1 headline" align="center"
                                           justify="center">
                                        {{ chordName }}
                                    </v-row>
                                    <v-row v-if="distanceFromReference.distance>0 && distanceFromReference.type==='#'"
                                           align="center" justify="center"
                                           class="font-weight-bold text--darken-1">
                                        Distance in
                                        <v-icon small color="secondary"> mdi-music-accidental-sharp</v-icon>
                                        :
                                        {{ distanceFromReference.distance }}
                                    </v-row>
                                    <v-row v-if="distanceFromReference.distance>0 && distanceFromReference.type==='b'"
                                           align="center" justify="center"
                                           class="font-weight-bold text--darken-1">
                                        Distance in
                                        <v-icon small color="secondary">mdi-music-accidental-flat</v-icon>
                                        :
                                        {{ distanceFromReference.distance }}
                                    </v-row>

                                </v-card-text>
                                <v-divider></v-divider>
                                <v-expansion-panels hover>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header class="align-self-start">
                                            Substitutions
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-list>
                                                <v-row>
                                                    <v-list-item v-if="features.degree===0"
                                                                 @click="menuSub = false , tonicSubstitution(5)">
                                                        <v-list-item-content>
                                                            <p class="text-center">Tonic w/ VI</p>
                                                        </v-list-item-content>
                                                    </v-list-item>

                                                </v-row>
                                                <v-row>
                                                    <v-list-item v-if="features.degree===0"
                                                                 @click="menuSub = false , tonicSubstitution(2)">
                                                        <v-list-item-content>
                                                            <p class="text-center">Tonic w/ III</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>

                                                <v-row>
                                                    <v-list-item v-if="features.degree===4"
                                                                 @click="menuSub = false , tritoneSubstitution()">
                                                        <v-list-item-content>
                                                            <p class="text-center">Tritone</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                                <v-row>
                                                    <v-list-item
                                                        @click="menuSub = false , twoFiveSubstitution()">
                                                        <v-list-item-content>
                                                            <p class="text-center">II - V</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                                <v-row>
                                                    <v-list-item
                                                        @click="menuSub = false , secondaryDominant()">
                                                        <v-list-item-content>
                                                            <p class="text-center">Secondary Dominant</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                                <v-row>
                                                    <v-list-item v-if="features.degree!== 4 && features.degree!==6"
                                                                 @click="menuSub = false , chordQualitySubstitution()">
                                                        <v-list-item-content>
                                                            <p class="text-center">Quality</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                                <v-row>
                                                    <v-list-item v-if="features.degree!== 4 && features.degree!==6"
                                                                 @click="menuSubSub = false , relativeMajorMinorSubstitution()">
                                                        <v-list-item-content>
                                                            <p class="text-center">Relative Maj min</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                            </v-list>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <v-divider></v-divider>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>Voicings</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-list>
                                                <v-row>
                                                    <v-list-item @click="menuSub = false , dropTwo()">
                                                        <v-list-item-content>
                                                            <p class="text-center"> Drop 2</p>
                                                            <v-icon></v-icon>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                                <v-row>
                                                    <v-list-item @click="menuSub = false , dropThree()">
                                                        <v-list-item-content>
                                                            <p class="text-center">Drop 3</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                                <v-row>
                                                    <v-list-item @click="menuSub = false , dropTwoAndFour()">
                                                        <v-list-item-content>
                                                            <p class="text-center">Drop 2 & 4</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                                <v-row>
                                                    <v-list-item
                                                        @click="menuSub = false , addNinth()">
                                                        <v-list-item-content>
                                                            <p class="text-center">Add 9th</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                                <v-row>
                                                    <v-list-item
                                                        @click="menuSub = false , addNinthNoFifth()">
                                                        <v-list-item-content>
                                                            <p class="text-center">Add 9th - No 5th</p>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-row>
                                            </v-list>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-card>
                        </v-menu>
                    </v-card-actions>
                    <v-row class="ma-n5">
                        <v-card-text align="center" justify="center" style="font-size: 40px">
                            <span style="position: absolute"
                                  :class="` ml-n1 secondary--text mdi mdi-roman-numeral-${features.degree +1}`">
                            </span>
                            <span style="z-index: 1">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            :class="{ 'show-btns': hover }"
                                            color="transparent"
                                            icon
                                            fab
                                            x-small
                                            v-on:click="playChord()" v-bind="attrs" v-on="on">
                                            <v-icon
                                                size="large">volume_up
                                            </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Listen to the {{ chordMode }} </span>
                                    </v-tooltip>
                                </span>

                        </v-card-text>
                    </v-row>
                    <v-card-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    :class="{ 'show-btns': hover }"
                                    color="transparent"
                                    fab
                                    icon
                                    x-small
                                    v-on:click="resetKeyboard(), shapeOctave(1), fingerChord()"
                                    v-bind="attrs" v-on="on">
                                    <v-icon :class="{ 'show-btns': hover }"
                                            size="medium">mdi-arrow-up
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Move {{ chordMode }} up an octave</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    :class="{ 'show-btns': hover }"
                                    color="transparent"
                                    fab
                                    icon
                                    x-small
                                    v-on:click="resetKeyboard(), shapeOctave(-1), fingerChord()"
                                    v-bind="attrs" v-on="on">
                                    <v-icon :class="{ 'show-btns': hover }"
                                            size="medium">mdi-arrow-down
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Move {{ chordMode }} down an octave</span>
                        </v-tooltip>
                    </v-card-actions>
                </v-card>
            </v-hover>


            <v-icon v-if="progression.length - 1 > index" class="mx-n3 pl-4 pb-3">mdi-forward</v-icon>
        </v-row>
    </div>
</template>

<script>

export default {
    name: "Chord",
    props: {
        features: {},
        index: Number
    },
    data: function () {
        return {
            builtChord: {
                degree: '',
                notes: [],
                chordQuality: ''
            },
            menuDetailed: false,
            close: false,
            chordClass: '{ \'on-hover\': hover } mb-3 secondary--text text--lighten-1',
            chordDetailsClass: 'text--secondary caption',
            buttons: ['mdi-plus', 'mdi-minus', 'mdi-close-circle', 'mdi-dots-vertical']
        }
    },
    methods: {

        deleteChord() {
            this.$store.commit('deleteChordFromProgression', this.features);
        },
        fingerChord() {

            for (let key of this.keys) {
                if (key.name === this.chordKeyRefScale) {
                    this.keys[this.keys.indexOf(key)].highlight = true;
                    break;
                } else if (key.name.includes(this.chordKeyRefScale) && this.chordKeyRefScale !== "F") {
                    this.keys[this.keys.indexOf(key)].highlight = true;
                    break;
                }
            }
            this.$store.commit('resetPressedKeys');
            this.$store.commit('fingerChord', this.features.notes);
        },
        resetKeyboard() {
            this.keys.forEach((key) => {
                key.highlight = false;
            });
            this.$store.commit('resetPressedKeys');
        },
        playChord() {
            let synth;
            switch (this.instrument) {
                case 0:
                    synth = this.$store.getters.getSampler;
                    break;
                case 1:
                    synth = this.$store.getters.getSynth1;
                    break;
                case 2:
                    synth = this.$store.getters.getSynth2;
                    break;
                default:
                    synth = this.$store.getters.getSampler;
                    break;
            }
            synth.triggerAttackRelease(this.features.notes,
                '4n');
        },
        /*Chord Substitution Methods*/
        buildChord(scale, degree) {
            this.builtChord.notes = [];
            this.builtChord.chordQuality = '';

            this.builtChord.degree = degree;
            this.builtChord.scale = scale;
            //Set the tonic
            this.builtChord.notes.push(scale[(degree) % 7]);

            //Set the 3rd
            this.builtChord.notes.push(scale[(degree + 2) % 7]);
            //and its octave
            if (((degree + 2) / 7) >= 1) {
                this.builtChord.notes[this.builtChord.notes.length - 1] = this.builtChord.notes[this.builtChord.notes.length - 1]
                    .replace(/.$/, parseInt(this.builtChord.notes[this.builtChord.notes.length - 1]
                        .charAt(this.builtChord.notes[this.builtChord.notes.length - 1].length - 1)) + 1);
            }

            //Set the 5th
            this.builtChord.notes.push(scale[(degree + 4) % 7]);

            //and its octave
            if (((degree + 4) / 7) >= 1) {
                this.builtChord.notes[this.builtChord.notes.length - 1] = this.builtChord.notes[this.builtChord.notes.length - 1]
                    .replace(/.$/, parseInt(this.builtChord.notes[this.builtChord.notes.length - 1]
                        .charAt(this.builtChord.notes[this.builtChord.notes.length - 1].length - 1)) + 1);
            }

            //Set the 7th
            this.builtChord.notes.push(scale[(degree + 6) % 7]);
            //and its octave
            if (((degree + 6) / 7) >= 1) {
                this.builtChord.notes[this.builtChord.notes.length - 1] = this.builtChord.notes[this.builtChord.notes.length - 1]
                    .replace(/.$/, parseInt(this.builtChord.notes[this.builtChord.notes.length - 1]
                        .charAt(this.builtChord.notes[this.builtChord.notes.length - 1].length - 1)) + 1);
            }

            this.builtChord.chordQuality = this.chordDetails[this.chordDetails.findIndex(e => e.degree === degree)].chordQuality

        },
        /*This method substitutes a dominant chord with its tritone substitution, which shares the same tritone*/
        tritoneSubstitution() {
            let scaleIndex = (this.$store.getters.getChromaticScale.indexOf(this.features.scale[0].slice(0, -1)) + 6) % 12;
            if (this.$store.getters.getChromaticScale.indexOf(this.features.scale[0].slice(0, -1)) === -1) {
                /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                if (this.features.scale[0].slice(0, -1) === 'C#')
                    scaleIndex = 7;
                else if (this.features.scale[0].slice(0, -1) === 'F#')
                    scaleIndex = 0;
                else if (this.features.scale[0].slice(0, -1) === 'Cb')
                    scaleIndex = 5;
            }
            let tritoneScale = this.$store.getters.getScales[this.$store.getters.getKeys.indexOf(this.$store.getters.getChromaticScale[scaleIndex])];

            this.buildChord(tritoneScale, 4);
            this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});

            this.builtChord.notes = [];
            this.builtChord.chordQuality = '';
        },
        /*This method adds a dominant chord (V degree) before the selected chord*/
        secondaryDominant() {
            let scaleIndex = this.$store.getters.getKeys.indexOf(this.features.tonic.slice(0, -1));
            if (this.$store.getters.getKeys.indexOf(this.features.tonic.slice(0, -1)) === -1) {
                /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                if (this.features.tonic.slice(0, -1) === 'D#')
                    scaleIndex = 4;
                else if (this.features.tonic.slice(0, -1) === 'Fb')
                    scaleIndex = 5;
                else if (this.features.tonic.slice(0, -1) === 'E#')
                    scaleIndex = 6;
                else if (this.features.tonic.slice(0, -1) === 'G#')
                    scaleIndex = 10;
                else if (this.features.tonic.slice(0, -1) === 'A#')
                    scaleIndex = 12;
                else if (this.features.tonic.slice(0, -1) === 'B#')
                    scaleIndex = 0;
                else if (this.features.tonic.slice(0, -1) === 'Cb')
                    scaleIndex = 14;
            }
            let scale = this.$store.getters.getScales[scaleIndex];

            this.buildChord(scale, 4);
            this.$store.commit('addChordInPosition', {index: this.index, chord: this.builtChord});

            this.builtChord.notes = [];
            this.builtChord.chordQuality = '';
        },
        /*This method adds a super-tonic chord (II degree) and a dominant chord (V degree) before the selected chord*/
        twoFiveSubstitution() {
            let degrees = [4, 1];
            let scaleIndex = this.$store.getters.getKeys.indexOf(this.features.tonic.slice(0, -1));
            if (this.$store.getters.getKeys.indexOf(this.features.tonic.slice(0, -1)) === -1) {
                /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                if (this.features.tonic.slice(0, -1) === 'D#')
                    scaleIndex = 4;
                else if (this.features.tonic.slice(0, -1) === 'Fb')
                    scaleIndex = 5;
                else if (this.features.tonic.slice(0, -1) === 'E#')
                    scaleIndex = 6;
                else if (this.features.tonic.slice(0, -1) === 'G#')
                    scaleIndex = 10;
                else if (this.features.tonic.slice(0, -1) === 'A#')
                    scaleIndex = 12;
                else if (this.features.tonic.slice(0, -1) === 'B#')
                    scaleIndex = 0;
                else if (this.features.tonic.slice(0, -1) === 'Cb')
                    scaleIndex = 14;
            }
            let scale = this.$store.getters.getScales[scaleIndex];

            degrees.forEach(value => {
                this.buildChord(scale, value);
                this.$store.commit('addChordInPosition', {index: this.index, chord: this.builtChord});

                this.builtChord.notes = [];
                this.builtChord.chordQuality = '';
            });
        },
        /*This method substitutes a given chord with its relative major or minor*/
        relativeMajorMinorSubstitution() {
            if (this.features.chordQuality === '\u0394') {
                /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                if (this.features.tonic.slice(0, -1) === 'D#')
                    this.features.tonic = 'E3';
                else if (this.features.tonic.slice(0, -1) === 'Fb')
                    this.features.tonic = 'E3';
                else if (this.features.tonic.slice(0, -1) === 'E#')
                    this.features.tonic = 'F3';
                else if (this.features.tonic.slice(0, -1) === 'G#')
                    this.features.tonic = 'Ab3';
                else if (this.features.tonic.slice(0, -1) === 'B#')
                    this.features.tonic = 'C3';
                else if (this.features.tonic.slice(0, -1) === 'A#')
                    this.features.tonic = 'Bb3';
                for (const value of this.$store.getters.getScales) {
                    if (value[0].slice(0, -1) === this.features.tonic.slice(0, -1)) {
                        this.buildChord(value, 5);
                        this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});
                        break;
                    }
                }
            } else if (this.features.chordQuality === 'mi7') {
                /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                if (this.features.tonic.slice(0, -1) === 'Db')
                    this.features.tonic = 'C#3';
                else if (this.features.tonic.slice(0, -1) === 'Fb')
                    this.features.tonic = 'E3';
                else if (this.features.tonic.slice(0, -1) === 'E#')
                    this.features.tonic = 'F3';
                else if (this.features.tonic.slice(0, -1) === 'Gb')
                    this.features.tonic = 'F#3';
                else if (this.features.tonic.slice(0, -1) === 'B#')
                    this.features.tonic = 'C3';
                else if (this.features.tonic.slice(0, -1) === 'Cb')
                    this.features.tonic = 'B3';
                for (const value of this.$store.getters.getScales) {
                    if (value[5].slice(0, -1) === this.features.tonic.slice(0, -1)) {
                        this.buildChord(value, 0);
                        this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});
                        break;
                    }
                }
            }
            this.builtChord.notes = [];
            this.builtChord.chordQuality = '';
        },
        /*This method changes the quality of a chord making it minor if major and vice-versa*/
        chordQualitySubstitution() {
            if (this.features.chordQuality === '\u0394') {
                /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                if (this.features.tonic.slice(0, -1) === 'Db')
                    this.features.tonic = 'C#3';
                else if (this.features.tonic.slice(0, -1) === 'Fb')
                    this.features.tonic = 'E3';
                else if (this.features.tonic.slice(0, -1) === 'E#')
                    this.features.tonic = 'F3';
                else if (this.features.tonic.slice(0, -1) === 'Gb')
                    this.features.tonic = 'F#3';
                else if (this.features.tonic.slice(0, -1) === 'B#')
                    this.features.tonic = 'C3';
                else if (this.features.tonic.slice(0, -1) === 'Cb')
                    this.features.tonic = 'B3';
                for (const value of this.$store.getters.getScales) {
                    if (value[5].slice(0, -1) === this.features.tonic.slice(0, -1)) {
                        this.buildChord(value, 5);
                        this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});
                        break;
                    }
                }
            } else if (this.features.chordQuality === 'mi7') {
                /*Checking for possible inconsistencies between the available keys and the notes of the chords*/
                if (this.features.tonic.slice(0, -1) === 'D#')
                    this.features.tonic = 'E3';
                else if (this.features.tonic.slice(0, -1) === 'Fb')
                    this.features.tonic = 'E3';
                else if (this.features.tonic.slice(0, -1) === 'E#')
                    this.features.tonic = 'F3';
                else if (this.features.tonic.slice(0, -1) === 'G#')
                    this.features.tonic = 'Ab3';
                else if (this.features.tonic.slice(0, -1) === 'B#')
                    this.features.tonic = 'C3';
                else if (this.features.tonic.slice(0, -1) === 'A#')
                    this.features.tonic = 'Bb3';
                for (const value of this.$store.getters.getScales) {
                    if (value[0].slice(0, -1) === this.features.tonic.slice(0, -1)) {
                        this.buildChord(value, 0);
                        this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});
                        break;
                    }
                }
            }
            this.builtChord.notes = [];
            this.builtChord.chordQuality = '';
        },
        /*This method substitutes the Ionian chord (I degree) with either the Aeolian (VI degree) or the Phrygian (III degree)*/
        tonicSubstitution(degree) {
            let scaleIndex = (this.$store.getters.getKeys.indexOf(this.$store.getters.getSelectedKey));
            let scale = this.$store.getters.getScales[this.$store.getters.getKeys.indexOf(this.$store.getters.getKeys[scaleIndex])];

            this.buildChord(scale, degree);
            this.$store.commit('chordSubstitution', {index: this.index, chord: this.builtChord});

            this.builtChord.notes = [];
            this.builtChord.chordQuality = '';
        },
        /*Voicings Methods*/
        dropTwo() {
            this.$store.commit('dropElement', {index: this.index, amount: 2});
        },
        dropThree() {
            this.$store.commit('dropElement', {index: this.index, amount: 3});
        },
        dropTwoAndFour() {
            [2, 3].forEach(value => {
                this.$store.commit('dropElement', {index: this.index, amount: value})
            });
        },
        addNinth() {
            this.$store.commit('addNinth', this.index);
        },
        addNinthNoFifth() {
            this.$store.commit('addNinth', this.index);
            this.$store.commit('deleteFifth', this.index);
        },
        shapeOctave(direction) {
            this.$store.commit('shapeOctave', {index: this.index, direction: direction});
        }

    },
    computed: {
        chordColor() {
            return this.$store.state.keys[this.$store.state.keys.findIndex(key => key.name === this.features.scale[0].slice(0, -1))].colorText
        },

        chordShade() {
            return this.$store.state.chordDetails[this.$store.state.chordDetails.findIndex(e => e.degree === this.features.degree)].shade
        },
        chordMode() {
            return this.$store.state.chordDetails[this.$store.state.chordDetails.findIndex(e => e.degree === this.features.degree)].mode
        },
        chordDetails() {
            return this.$store.getters.getChordDetails;
        },
        chordName() {
            return this.features.tonic.slice(0, -1) + this.features.chordQuality
        },
        progression: {
            get() {
                return this.$store.getters.getProgression
            }
        },
        chordKeyRefScale() {
            return this.features.scale[0].slice(0, -1)
        },
        distanceFromReference() {
            let distance = [];
            let refIndex;
            let chordIndex;


            for (let key of this.keys) {
                if (key.name === this.$store.getters.getSelectedKey) {
                    chordIndex = this.keys.indexOf(key);
                    break;
                } else if (key.name.includes(this.$store.getters.getSelectedKey) && this.$store.getters.getSelectedKey !== "F") {
                    chordIndex = this.keys.indexOf(key);
                    break;
                }
            }

            for (let key of this.keys) {
                if (key.name === this.chordKeyRefScale) {
                    refIndex = this.keys.indexOf(key);
                    break;
                } else if (key.name.includes(this.chordKeyRefScale) && this.chordKeyRefScale !== "F") {
                    refIndex = this.keys.indexOf(key);
                    break;
                }
            }

            if (chordIndex >= refIndex) {
                distance[0] = chordIndex - refIndex;
                distance[1] = 12 - distance[0]
            } else {
                distance[1] = refIndex - chordIndex;
                distance[0] = 12 - distance[1];
            }

            if (distance[0] <= distance[1])
                return {distance: distance[0], type: '#'};
            else
                return {distance: distance[1], type: 'b'};
        },
        instrument() {
            return this.$store.getters.getInstrument;
        },
        keys() {
            return this.$store.getters.getKeysNameColor
        }
    }
}
</script>

<style>
/*noinspection CssUnresolvedCustomProperty*/
.show-btns {
    color: var(--v-secondary-base) !important;
}

</style>
