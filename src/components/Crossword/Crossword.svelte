<script lang="ts">
    import TitleBar from "./TitleBar.svelte";
    import CrosswordContainer from "./CrosswordContainer.svelte";
    import Modal from "../UI/Modal.svelte";
    import ModalType from "../../types/ModalType";

    let isModalShown: boolean = false;

    const startTime = Date.now();
    let timeTook: number;

    const handleMessage = (e) => {
        if (e.detail.action === 'KEYWORD_COMPLETED') {
            const finishTime = Date.now();
            timeTook = finishTime - startTime;
            window.scrollTo(0, 0);
            document.body.style.overflow = 'hidden';
            isModalShown = true;
        }
    };

    $: additionalStyle = isModalShown ? 'filter: blur(16px); pointer-events: none;' : '';
</script>

{#if isModalShown}
    <Modal type="{ModalType.WIN}" time="{timeTook}" on:message={() => {
      isModalShown = false
      document.body.style.overflow = 'auto';
    }} />
{/if}
<main class="md:container mx-auto" style="{additionalStyle}">
    <TitleBar />
    <CrosswordContainer on:message={handleMessage} />
</main>
