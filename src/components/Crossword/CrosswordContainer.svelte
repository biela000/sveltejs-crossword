<script lang="ts">
    import getWords from "../../utils/getWords";
    import Word from "./Word.svelte";
    import DefinitionList from "./DefinitionList.svelte";
    import Keyword from "./Keyword.svelte";
    import LoadingScreen from "../UI/LoadingScreen.svelte";

    let currentPos = [0, 0];
    let enabledIndexes = [];

    const posKeyChangeHandler = (key: string, autoFilledPos?: [number, number]) => {
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
            default:
                break;
        }
        const letterBox: HTMLInputElement = document.querySelector(`div[data-x="${currentPosCopy[0]}"][data-y="${currentPosCopy[1]}"] > input`);
        if (letterBox && !letterBox.disabled) currentPos = [...currentPosCopy];
        if (letterBox && letterBox.disabled) return posKeyChangeHandler(key, currentPosCopy);
        return letterBox;
    }

    document.body.addEventListener('keydown', e => {
        const letterBox = posKeyChangeHandler(e.key);
        if (letterBox) {
            letterBox.focus();
            letterBox.select();
        }
    });

    const wordMessageHandler = (e) => {
        if (e.detail.action === 'CLICK_CHANGE') {
            currentPos = [e.detail.payload[0], e.detail.payload[1]];
        } else if (e.detail.action === 'UNCOVER_KEYWORD_LETTERS') {
            e.detail.payload.forEach((el: number) => {
                enabledIndexes = [...enabledIndexes, el];
            });
        }
    };
</script>

<section class="flex gap-5 flex-col mt-5">
    {#await getWords()}
        <LoadingScreen />
    {:then [keyword, words]}
        <div class="flex gap-1.5 flex-col">
            {#each words as word, index (index)}
                <Word maxLength="{keyword.word.length}" word="{word}" y="{index}" on:message={wordMessageHandler} />
            {/each}
        </div>
        <Keyword word="{keyword}" enabledIndexes="{enabledIndexes}" />
        <DefinitionList definitions="{words}" />
    {/await}
</section>