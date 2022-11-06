<script lang="ts">
    import getWords from "../../utils/getWords";
    import Word from "./Word.svelte";
    import DefinitionList from "./DefinitionList.svelte";

    let currentPos = [0, 0];

    document.body.addEventListener('keydown', e => {
        const currentPosCopy = [...currentPos];
        switch (e.key) {
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
        if (letterBox) {
            currentPos = [...currentPosCopy];
            letterBox.focus();
            letterBox.select();
        }
    });
</script>

<section class="flex gap-5 flex-col">
    {#await getWords()}
        <h1>Fetching words</h1>
    {:then [keyword, words]}
        <div class="flex gap-1.5 flex-col">
            {#each words as word, index (index)}
                <Word maxLength="{keyword.word.length}" word="{word}" y="{index}" />
            {/each}
        </div>
        <DefinitionList definitions="{words}" />
    {/await}
</section>