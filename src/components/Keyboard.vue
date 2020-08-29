<template>
    <div id="keyboard">
        <div>
            <KeyboardKey :note="'C3'" :keyIsBlack="false"></KeyboardKey>
            <KeyboardKey :note="'C#3'"  :keyIsBlack="true"></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'D3'"  :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'D#3'"  :keyIsBlack="true" ></KeyboardKey>
        </div>
        <KeyboardKey :note="'E3'"  :keyIsBlack="false"  ></KeyboardKey>
        <div>
            <KeyboardKey :note="'F3'"   :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'F#3'"  :keyIsBlack="true" ></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'G3'" :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'G#3'" :keyIsBlack="true" ></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'A3'"  :keyIsBlack="false"  ></KeyboardKey>
            <KeyboardKey :note="'A#3'" :keyIsBlack="true" ></KeyboardKey>
        </div>
        <KeyboardKey :note="'B3'"  :keyIsBlack="false"></KeyboardKey>
        <div>
            <KeyboardKey :note="'C4'" :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'C#4'"  :keyIsBlack="true"></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'D4'"  :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'D#4'"  :keyIsBlack="true" ></KeyboardKey>
        </div>
        <KeyboardKey :note="'E4'"  :keyIsBlack="false"  ></KeyboardKey>
        <div>
            <KeyboardKey :note="'F4'"   :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'F#4'"  :keyIsBlack="true" ></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'G4'" :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'G#4'" :keyIsBlack="true" ></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'A4'"  :keyIsBlack="false"  ></KeyboardKey>
            <KeyboardKey :note="'A#4'" :keyIsBlack="true" ></KeyboardKey>
        </div>
        <KeyboardKey :note="'B4'"  :keyIsBlack="false"></KeyboardKey>
        <div>
            <KeyboardKey :note="'C5'" :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'C#5'"  :keyIsBlack="true"></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'D5'"  :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'D#5'"  :keyIsBlack="true" ></KeyboardKey>
        </div>
        <KeyboardKey :note="'E5'"  :keyIsBlack="false"  ></KeyboardKey>
        <div>
            <KeyboardKey :note="'F5'"   :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'F#5'"  :keyIsBlack="true" ></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'G5'" :keyIsBlack="false" ></KeyboardKey>
            <KeyboardKey :note="'G#5'" :keyIsBlack="true" ></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'A5'"  :keyIsBlack="false"  ></KeyboardKey>
            <KeyboardKey :note="'A#5'" :keyIsBlack="true" ></KeyboardKey>
        </div>
        <KeyboardKey :note="'B5'"  :keyIsBlack="false"></KeyboardKey>
    </div>
</template>



<script>
    //:noteName = this.$store.state.keyboard.map(key)
    import KeyboardKey from "./KeyboardKey";
    export default {
        name: "Keyboard",
        components: {KeyboardKey}
    }
</script>

<style scoped>
    div{
        position: relative;
    }
    #keyboard{
        position: relative;
        list-style: none;
        display: inline-flex;
        z-index: 1;
    }
    #keyboard:last-child {
        border-right: 1px solid transparent;
    }

</style>