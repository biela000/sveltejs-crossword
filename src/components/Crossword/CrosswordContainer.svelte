<script lang="ts">
    import getWords from "../../utils/getWords";
    import Word from "./Word.svelte";
    import DefinitionList from "./DefinitionList.svelte";
</script>

<section class="flex gap-5 flex-col">
    {#await getWords()}
        <h1>Fetching words</h1>
    {:then [keyword, words]}
        <div class="flex gap-1.5 flex-col">
            {#each words as word}
                <Word maxLength="{keyword.word.length}" word="{word}" />
            {/each}
        </div>
        <DefinitionList definitions="{words}" />
    {/await}
</section>