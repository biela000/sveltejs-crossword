<script lang="ts">
    import {createEventDispatcher} from "svelte";
    export let letter: string;

    const classList = [
        "w-16",
        "h-16",
        "flex",
        "justify-center",
        "items-center",
        "text-xl",
        "rounded-2xl",
        "relative",
        "bg-green-50",
        "cursor-pointer",
        "active:bg-green-300"
    ];

    const dispatch = createEventDispatcher();

    let additionalStyle = '';

    const clickHandler = () => {
      additionalStyle = 'background-color: rgb(187 247 208)';
      dispatch('message', { action: 'UNCOVER_ALL_OCCURRENCES', payload: { letter: '' } });
      setTimeout(() => {
        dispatch('message', { action: 'UNCOVER_ALL_OCCURRENCES', payload: { letter } });
      }, 1);
    };
</script>

<div class="{classList.join(' ')}" style="{additionalStyle}" on:click={clickHandler}>
    {letter}
</div>