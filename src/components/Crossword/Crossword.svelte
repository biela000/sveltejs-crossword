<script lang="ts">
    import TitleBar from "./TitleBar.svelte";
    import CrosswordContainer from "./CrosswordContainer.svelte";
    import UncoverableLetters from "./UncoverableLetters.svelte";
    import Modal from "../UI/Modal.svelte";
    import ModalType from "../../types/ModalType";

    let isModalShown: boolean = false;

    const startTime = Date.now();
    let timeTook: number;

    const handleMessage = (e) => {
        if (e.detail.action === 'KEYWORD_COMPLETED') {
            const finishTime = Date.now();
            timeTook = finishTime - startTime;
            isModalShown = true;
        }
    };

    $: additionalStyle = isModalShown ? 'filter: blur(16px)' : '';
</script>

{#if isModalShown}
    <Modal type="{ModalType.WIN}" time="{timeTook}" on:message={() => isModalShown = false} />
{/if}
<main class="md:container mx-auto" style="{additionalStyle}">
    <TitleBar />
    <CrosswordContainer on:message={handleMessage} />
    <UncoverableLetters />
</main>
