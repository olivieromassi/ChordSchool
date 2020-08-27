<template>
    <div>
        <h2 class="font-weight-light">Chord Progression List:</h2>
        <v-btn v-if="progression.length > 0" @click="playProgression">
            <v-icon color="blue">play_arrow</v-icon>
        </v-btn>
        <v-list>
            <draggable v-model="progression">
                <li v-for="(chord, index) in progression" v-bind:key="chord.index">
                    <Chord :features="chord" :index="index"></Chord>
                </li>
            </draggable>
        </v-list>
        <v-btn @click="notableChords">
            <v-icon color="blue">chords</v-icon>
        </v-btn>

    </div>
</template>

<script>

    import Chord from "@/components/Chord";
    import draggable from "vuedraggable";
    import * as Tone from "tone";


    export default {
        name: "ChordProgression",
        components: {
            Chord,
            draggable
        },
        methods: {
            notableChords(){
                let k = -1;
                let chordsTonic = [];
                let allChords = [];
                let ii_v = [], ii_v_p = [];
                let ii_v_i = [], ii_v_i_p = [] ;
                let iii_vi_ii_v= [], iii_vi_ii_v_p = [];
                let i_vi_ii_v = [], i_vi_ii_v_p = [];
                let i_ii_iii_iv = [], i_ii_iii_iv_p = [];
                let nam, indexNC, nameNC = [];
                let temp= [];
                
                for (let i = 0; i < this.progression.length; i++) {
                    chordsTonic[i] = this.progression[i].tonic;
                }

                for (let j = 0; j < 7; j++) {
                    allChords[j] = this.modes[j].tonic;
                }
                ii_v_i = [allChords[1],allChords[4],allChords[0]];
                ii_v =[allChords[1],allChords[4]];
                iii_vi_ii_v=[allChords[2],allChords[5],allChords[1],allChords[4]];
                i_vi_ii_v=[allChords[0],allChords[5],allChords[1],allChords[4]];
                i_ii_iii_iv=[allChords[0],allChords[1],allChords[2],allChords[3]];

                for (let n = 0; n < this.progression.length-1; n++) {

                    //"III_VI_II_V"
                    if(n+4 <= this.progression.length){
                        iii_vi_ii_v_p = [chordsTonic[n],chordsTonic[n+1],chordsTonic[n+2],chordsTonic[n+3]];
                        if(iii_vi_ii_v_p.toString() === iii_vi_ii_v.toString()){
                            k=k+1;
                            console.log(k);
                            indexNC=[n,n+1,n+2,n+3];
                            nam="III_VI_II_V";
                            n=n+3;
                        }
                    }

                    //I_VI_II_V
                    if(n+4 <= this.progression.length){
                        i_vi_ii_v_p = [chordsTonic[n],chordsTonic[n+1],chordsTonic[n+2],chordsTonic[n+3]];
                        if(i_vi_ii_v_p.toString() === i_vi_ii_v.toString()){
                            k=k+1;
                            console.log(k);
                            indexNC=[n,n+1,n+2,n+3];
                            nam="I_VI_II_V";
                            n=n+3;
                        }
                    }

                    //I_II_III_IV
                    if(n+4 <= this.progression.length){
                        i_ii_iii_iv_p= [chordsTonic[n],chordsTonic[n+1],chordsTonic[n+2],chordsTonic[n+3]];
                        if(i_ii_iii_iv_p.toString() === i_ii_iii_iv.toString()){
                            k=k+1;
                            console.log(k);
                            indexNC=[n,n+1,n+2,n+3];
                            nam="I_II_III_IV";
                            n=n+3;

                        }
                    }

                    //II_V
                    ii_v_p=[chordsTonic[n],chordsTonic[n+1]];
                    if (ii_v_p.toString() === ii_v.toString()) {
                        k=k+1;
                        if(n+3 > this.progression.length || (n+3 <= this.progression.length && (chordsTonic[n+2].toString() !== ii_v_i[2].toString()))){
                            console.log(k);
                            indexNC=[n,n+1];
                            nam="II_V";
                            n=n+1;
                        }

                        //II_V_I
                        if(n+3 <= this.progression.length){
                            ii_v_i_p = [chordsTonic[n],chordsTonic[n+1],chordsTonic[n+2]];
                            if(ii_v_i_p.toString() === ii_v_i.toString()){
                                console.log(k);
                                indexNC=[n,n+1,n+2];
                                nam="II_V_I";
                                n=n+2;
                            }
                        }
                    }
                    temp[k]=indexNC;
                    nameNC[k]=nam;
                }
                console.log(temp);
                console.log(nameNC);
            },
            playProgression() {
                let x = [];
                let t = [];
                let y = [];

                for (let i = 0; i < this.progression.length; i++) {
                    x[i] = [this.progression[i].tonic,
                        this.progression[i].third,
                        this.progression[i].fifth,
                        this.progression[i].seventh];
                    t[i] = 3 * i / 4;
                    y[i] = [t[i], x[i]] ;
                }

                const synth = new Tone.PolySynth().toDestination();
                const part = new Tone.Part(((time, chord) => {
                    synth.triggerAttackRelease(chord, "4n", time);
                }), y);
                part.start();
                Tone.Transport.start();
            }
        },
        computed: {
            modes: {
                get() {
                    return this.$store.getters.getModes;
                }
            },
            progression: {
                get() {
                    return this.$store.getters.getProgression
                },
                set(chords) {
                    this.$store.dispatch('rearrangeProgression', {
                        items: chords
                    });
                }
            }
        }
    }

</script>

<style>
    li {
        display: inline-block;
    }
</style>