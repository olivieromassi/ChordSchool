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
                let chordstonic=[],k=-1,i,j,n,temp=[];
                let ii_v_i =[],ii_v_p=[],allchords =[],ii_v=[],ii_v_i_p=[],indexNC,nam,nameNC=[];

                let iii_vi_ii_v=[];
                let i_vi_ii_v=[];
                let i_ii_iii_iv=[];
                let iii_vi_ii_v_p=[];
                let i_vi_ii_v_p=[];
                let i_ii_iii_iv_p=[];

                for (i = 0; i < this.progression.length; i++) {
                    chordstonic[i] = this.progression[i].tonic;
                }

                for (j = 0; j < 7; j++) {
                    allchords[j] = this.modes[j].tonic;
                }
                ii_v_i = [allchords[1],allchords[4],allchords[0]];
                ii_v =[allchords[1],allchords[4]];
                iii_vi_ii_v=[allchords[2],allchords[5],allchords[1],allchords[4]];
                i_vi_ii_v=[allchords[0],allchords[5],allchords[1],allchords[4]];
                i_ii_iii_iv=[allchords[0],allchords[1],allchords[2],allchords[3]];

                for (n = 0; n < this.progression.length-1; n++) {

                    //"III_VI_II_V"
                    if(n+4 <= this.progression.length){
                        iii_vi_ii_v_p = [chordstonic[n],chordstonic[n+1],chordstonic[n+2],chordstonic[n+3]];
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
                        i_vi_ii_v_p = [chordstonic[n],chordstonic[n+1],chordstonic[n+2],chordstonic[n+3]];
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
                        i_ii_iii_iv_p= [chordstonic[n],chordstonic[n+1],chordstonic[n+2],chordstonic[n+3]];
                        if(i_ii_iii_iv_p.toString() === i_ii_iii_iv.toString()){
                            k=k+1;
                            console.log(k);
                            indexNC=[n,n+1,n+2,n+3];
                            nam="I_II_III_IV";
                            n=n+3;

                        }
                    }

                    //II_V
                    ii_v_p=[chordstonic[n],chordstonic[n+1]];
                    if (ii_v_p.toString() === ii_v.toString()) {
                        k=k+1;
                        if(n+3 > this.progression.length || (n+3 <= this.progression.length && (chordstonic[n+2].toString() !== ii_v_i[2].toString()))){
                            console.log(k);
                            indexNC=[n,n+1];
                            nam="II_V";
                            n=n+1;
                        }

                        //II_V_I
                        if(n+3 <= this.progression.length){
                            ii_v_i_p = [chordstonic[n],chordstonic[n+1],chordstonic[n+2]];
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
                let i = 0;
                let x = [];
                let t = [];
                let y = [];

                for (i = 0; i < this.progression.length; i++) {
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