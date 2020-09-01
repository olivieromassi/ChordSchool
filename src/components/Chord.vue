<template>
    <div>
        <v-menu :close-on-content-click=false
                v-model="menuDetailed"
                offset-x
                top
                offset-y
        >
            <template v-slot:activator="{ on, attrs }">
                <v-chip
                        close
                        x-large style="font-size: 40px"
                        :class="`mb-3 secondary--text text--lighten-1 primary ${chordShade}`"
                        @mouseenter="fingerChord()"
                        @mouseleave="resetKeyboard()"
                        @click:close="close, deleteChord() , resetKeyboard()"
                        v-on="on"
                        v-bind="attrs">
                    <span :class="`mdi mdi-roman-numeral-${features.degree +1}`"></span>
                </v-chip>
            </template>
            <v-card max-width="200" :class="`text--secondary caption primary ${chordShade}`">
                <v-card-text class="ma-n2">
                    <v-layout row wrap>
                        <v-flex class="secondary--text text--lighten-1  text-center xs12 md12 lg12">
                            <span>
                                <v-icon color="grey">mdi-music-clef-treble</v-icon>{{chordKeyRefScale}} - </span>
                            <span> {{ chordMode }}</span>
                        </v-flex>
                        <v-flex class="text-center secondary--text text--lighten-1 headline xs12 md12 lg12">
                            {{chordName}}
                        </v-flex>
                    </v-layout>
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
                                    <v-list-item class="text-center caption" v-if="features.degree===0"
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
        <v-icon v-if="progression.length - 1 > index" class="ma-0 pl-3 pb-3">mdi-forward</v-icon>
    </div>
</template>

<script>
    import * as Tone from "tone";

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
            }
        },
        methods: {

            deleteChord() {
                this.$store.commit('deleteChordFromProgression', this.features);
            },
            fingerChord() {
                this.$store.commit('fingerChord', this.features.notes);
            },
            resetKeyboard() {
                this.$store.commit('resetPressedKeys');
            },
            playChord() {
                let piano = new Tone.PolySynth(Tone.Synth).toDestination();
                piano.triggerAttackRelease(this.features.notes,
                    1);
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
            }
        }
    }
</script>

<style>

</style>