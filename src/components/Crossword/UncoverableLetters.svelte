<script lang="ts">
  import UncoverableLetterBox from "./UncoverableLetterBox.svelte";

  const letterSet: [string] = 'abcdefghijklmnopqrstuvwxyz'.split('');
</script>

<section class="flex flex-wrap justify-center gap-1 pb-10">
    {#each letterSet as letter}
        <UncoverableLetterBox isActive="{true}" letter="{letter}" on:message />
    {/each}
</section>