<template>
    <ul id="piano">
        <li data-note="C4" class="key">
            <div data-note="C#4" class="black-key">C#/Db</div>
            C
        </li>
        <li data-note="D4" class="key">
            <div data-note="D#4" class="black-key">D#/Eb</div>
            D
        </li>
        <li data-note="E4" class="key">
            E
        </li>
        <li data-note="F4" class="key">
            <div data-note="F#4" class="black-key">F#/Gb</div>
            F
        </li>
        <li data-note="G4" class="key">
            <div data-note="G#4" class="black-key">G#/Ab</div>
            G
        </li>
        <li data-note="A4" class="key">
            <div data-note="A#4" class="black-key">A#/Bb</div>
            A
        </li>
        <li data-note="B4" class="key">
            B
        </li>

    </ul>
</template>

<script>
    export default {
        name: "Piano"
    }
</script>

<style scoped>
    ul {
        list-style: none;
        display: flex;
    }
    .key {
        position: relative;
        width: 60px;
        height: 180px;
        border: 1px solid black;
        border-right: none;
        background: #fffff0;
        border-radius: 5px;
        box-shadow: 0 3px 5px #666;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 10px;
        font-weight: bold;
    }
    .key:last-child {
        border-right: 1px solid black;
    }
    ul .black-key {
        position: absolute;
        top: -1px;
        left: 37.5px;
        width: 40px;
        height: 120px;
        background: black;
        border-radius: 5px;
        box-shadow: 0 3px 5px #666;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 10px;
        color: white;
    }
</style>