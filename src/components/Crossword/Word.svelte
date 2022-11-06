<script lang="ts">
    import BoxStatus from "../../types/BoxStatus";
    import LetterBox from "./LetterBox.svelte";
    import Word from "../../types/Word";

    export let maxLength: number;
    export let word: Word;
    export let y: number;

    const placeholderLength = maxLength - word.word.length;
</script>

<div class="flex gap-1.5 justify-center">
    {#each word.word as letter, index (index)}
        <LetterBox
            letter="{letter}"
            status="{BoxStatus.EMPTY}"
            keywordIndex="{word.wordToKeywordIndexes[index]}"
            x="{index}"
            y="{y}"
        />
    {/each}
    {#each [...Array(placeholderLength).keys()] as _}
        <LetterBox
            letter="{null}"
            status="{BoxStatus.PLACEHOLDING}"
        />
    {/each}
</div>