<script lang="ts">
    import TitleBar from "./TitleBar.svelte";
    import CrosswordContainer from "./CrosswordContainer.svelte";
    import KeyWord from "./Keyword.svelte";
    import UncoverableLetters from "./UncoverableLetters.svelte";
</script>

<main class="md:container mx-auto">
    <TitleBar />
    <CrosswordContainer />
    <KeyWord />
    <UncoverableLetters />
</main>
