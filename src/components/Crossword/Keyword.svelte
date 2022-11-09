<script lang="ts">
    import LetterBox from "./LetterBox.svelte";
    import BoxStatus from "../../types/BoxStatus";
    import Word from "../../types/Word";

    export let word: Word;
    export let enabledIndexes: [number];
</script>

<div class="flex gap-1.5 justify-center">
    {#each word.word as letter, index (index)}
        <LetterBox
            status="{enabledIndexes.find(el => el === index) !== undefined ? BoxStatus.KEYWORD_FILLED : BoxStatus.KEYWORD_EMPTY}"
            letter="{enabledIndexes.find(el => el === index) !== undefined ? letter : null}"
            keywordIndex="{index}"
        />
    {/each}
</div>