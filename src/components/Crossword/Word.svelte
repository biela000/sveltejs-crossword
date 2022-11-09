<script lang="ts">
    import BoxStatus from "../../types/BoxStatus";
    import LetterBox from "./LetterBox.svelte";
    import Word from "../../types/Word";
    import {createEventDispatcher} from "svelte";

    export let maxLength: number;
    export let word: Word;
    export let y: number;

    const placeholderLength = maxLength - word.word.length;
    let automaticallyUncoveredCount: number = 0;

    const dispatch = createEventDispatcher();

    const filledLetters: [string] = word.word.split('').map(ltr => '0');

    const getWritableBoxStatus = (index) => {
        const shouldUncover: boolean = Math.random() > 0.7;
        const status: BoxStatus = shouldUncover && automaticallyUncoveredCount < 3 ? BoxStatus.AUTO_FILLED : BoxStatus.EMPTY;
        if (status === BoxStatus.AUTO_FILLED) {
            automaticallyUncoveredCount++;
            filledLetters[index] = word.word[index];
        }
        return status;
    };

    $: validateWord = () => {
        if (filledLetters.join('') === word.word) {
            console.log(filledLetters.join(''));
        }
    };

    const messageHandler = (e) => {
        if (e.detail.action === 'CLICK_CHANGE') {
            dispatch('message', e.detail);
        } else if (e.detail.action === 'LETTER_CHANGE') {
            filledLetters[e.detail.payload.pos] = e.detail.payload.letter;
            validateWord();
        }
    };
</script>

<div class="flex gap-1.5 justify-center">
    {#each word.word as letter, index (index)}
        <LetterBox
            letter="{letter}"
            status="{getWritableBoxStatus(index)}"
            keywordIndex="{word.wordToKeywordIndexes[index]}"
            x="{index}"
            y="{y}"
            on:message="{messageHandler}"
        />
    {/each}
    {#each [...Array(placeholderLength).keys()] as _}
        <LetterBox
            letter="{null}"
            status="{BoxStatus.PLACEHOLDING}"
        />
    {/each}
</div>