<script lang="ts">
    import LetterBox from "./LetterBox.svelte";
    import BoxStatus from "../../types/BoxStatus";
    import Word from "../../types/Word";
    import {createEventDispatcher} from "svelte";

    export let word: Word;
    export let enabledIndexes: [number];

    const dispatch = createEventDispatcher();

    $: if (enabledIndexes.length === word.word.length) {
        dispatch('message', { action: 'KEYWORD_COMPLETED' })
    }
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