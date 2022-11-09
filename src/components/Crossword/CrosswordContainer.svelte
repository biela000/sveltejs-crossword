<script lang="ts">
    import getWords from "../../utils/getWords";
    import Word from "./Word.svelte";
    import DefinitionList from "./DefinitionList.svelte";

    let currentPos = [0, 0];

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

    const posClickChangeHandler = (e) => {
        currentPos = [e.detail.payload[0], e.detail.payload[1]];
    };
</script>

<section class="flex gap-5 flex-col">
    {#await getWords()}
        <h1>Fetching words</h1>
    {:then [keyword, words]}
        <div class="flex gap-1.5 flex-col">
            {#each words as word, index (index)}
                <Word maxLength="{keyword.word.length}" word="{word}" y="{index}" on:message={posClickChangeHandler} />
            {/each}
        </div>
        <DefinitionList definitions="{words}" />
    {/await}
</section>