<script lang="ts">
    import getWords from "../../utils/getWords";
    import Word from "./Word.svelte";
    import DefinitionList from "./DefinitionList.svelte";
    import Keyword from "./Keyword.svelte";
    import LoadingScreen from "../UI/LoadingScreen.svelte";
    import UncoverableLetters from "./UncoverableLetters.svelte";

    let letterToUncover: string = '';

    let currentPos = [0, 0];
    let enabledIndexes = [];

    const posKeyChangeHandler = (key: string, autoFilledPos?: [number, number], afterValidation?: boolean) => {
        const currentPosCopy = autoFilledPos || [...currentPos];
        switch (key) {
            case 'ArrowUp':
                currentPosCopy[1]--;
                break;
            case 'ArrowDown':
                currentPosCopy[1]++;
                break;
            case 'ArrowLeft':
                currentPosCopy[0]--;
                break;
            case 'ArrowRight':
                currentPosCopy[0]++;
                break;
            case 'Enter':
                afterValidation = true;
                currentPosCopy[0] = 0;
                currentPosCopy[1]++;
                break;
            default:
                break;
        }
        const letterBox: HTMLInputElement = document.querySelector(`div[data-x="${currentPosCopy[0]}"][data-y="${currentPosCopy[1]}"] > input`);
        if (letterBox && !letterBox.disabled) currentPos = [...currentPosCopy];
        const isInMaximumBounds = currentPosCopy[0] < 13 && currentPosCopy[1] < 13 && currentPosCopy[0] > -1 && currentPosCopy[1] > -1;
        if ((!letterBox && isInMaximumBounds) || (letterBox && letterBox.disabled)) return posKeyChangeHandler(afterValidation ? 'ArrowRight' : key, currentPosCopy);
        return letterBox;
    }

    const focusBox = (letterBox: HTMLInputElement) => {
        if (letterBox) {
            letterBox.focus();
            letterBox.select();
        }
    };

    document.body.addEventListener('keydown', e => {
        const letterBox = posKeyChangeHandler(e.key);
        focusBox(letterBox);
    });

    const wordMessageHandler = (e) => {
        switch (e.detail.action) {
            case 'CLICK_CHANGE':
                currentPos = [e.detail.payload[0], e.detail.payload[1]];
                break;
            case 'UNCOVER_KEYWORD_LETTERS':
                e.detail.payload.forEach((el: number) => {
                    enabledIndexes = [...enabledIndexes, el];
                });
                const letterBox: HTMLInputElement = posKeyChangeHandler('ArrowDown', [0, currentPos[1]], true);
                focusBox(letterBox);
                break;
            case 'LETTER_CHANGE':
                if (e.detail.payload.letter) {
                    const lb: HTMLInputElement = posKeyChangeHandler('ArrowRight');
                    focusBox(lb);
                }
                break;
            default:
                break;
        }
    };

    const uncoverAllOccurrences = (e) => {
      letterToUncover = e.detail.payload.letter;
    };
</script>

<section class="flex gap-5 flex-col mt-5">
    {#await getWords()}
        <LoadingScreen />
    {:then [keyword, words]}
        <div class="flex gap-1.5 flex-col">
            {#each words as word, index (index)}
                <Word maxLength="{keyword.word.length}" word="{word}" y="{index}" on:message={wordMessageHandler} uLetter="{letterToUncover}" />
            {/each}
        </div>
        <Keyword word="{keyword}" enabledIndexes="{enabledIndexes}" on:message />
        <DefinitionList definitions="{words}" />
        <UncoverableLetters on:message={uncoverAllOccurrences} />
    {/await}
</section>