<template>
    <div id="keyboard">
        <div>
            <KeyboardKey :note="'C3'"  :keyIsBlack="false"></KeyboardKey>
            <KeyboardKey :note="'C#3'" :keyIsBlack="true"></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'D3'"  :keyIsBlack="false"></KeyboardKey>
            <KeyboardKey :note="'D#3'" :keyIsBlack="true"></KeyboardKey>
        </div>
        <KeyboardKey :note="'E3'"  :keyIsBlack="false"></KeyboardKey>
        <div>
            <KeyboardKey :note="'F3'"  :keyIsBlack="false"></KeyboardKey>
            <KeyboardKey :note="'F#3'" :keyIsBlack="true"></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'G3'"  :keyIsBlack="false"></KeyboardKey>
            <KeyboardKey :note="'G#3'" :keyIsBlack="true"></KeyboardKey>
        </div>
        <div>
            <KeyboardKey :note="'A3'"  :keyIsBlack="false"></KeyboardKey>
            <KeyboardKey :note="'A#3'" :keyIsBlack="true"></KeyboardKey>
        </div>
        <KeyboardKey :note="'B3'"  :keyIsBlack="false"></KeyboardKey>

    </div>

</template>

<script>
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
    }
    #keyboard:last-child {
        border-right: 1px solid black;
    }

</style>