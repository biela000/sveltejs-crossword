<script lang="ts">
    import BoxStatus from "../../types/BoxStatus";
    import {createEventDispatcher} from "svelte";

    export let letter: string;
    export let status: BoxStatus;
    export let keywordIndex: number;
    export let x: number;
    export let y: number;

    const background =
        status === BoxStatus.PLACEHOLDING ? "bg-green-600" :
        status === BoxStatus.EMPTY || status === BoxStatus.KEYWORD_EMPTY ? "bg-green-50" :
        status === BoxStatus.AUTO_FILLED ? "bg-gray-300" :
        status === BoxStatus.SUCCESSFULLY_FILLED ? "bg-green-600" :
        "bg-blue-300";

    const classList = [
        "w-16",
        "h-16",
        "flex",
        "justify-center",
        "items-center",
        "text-xl",
        "rounded-2xl",
        "relative",
        background
    ];

    const dispatch = createEventDispatcher();

    const clickHandler = () => {
        dispatch('message', { action: 'CLICK_CHANGE', payload: [x, y] });
    };

    const isAutoFilled = status === BoxStatus.AUTO_FILLED;
    let inputValue = status === BoxStatus.AUTO_FILLED ? letter : '';

    $: dispatch('message', { action: 'LETTER_CHANGE', payload: { pos: x, letter: inputValue } });

    $: additionalStyle = status === BoxStatus.SUCCESSFULLY_FILLED || status === BoxStatus.KEYWORD_FILLED ? 'background-color: rgb(34 197 94)' : null;
</script>

<div class="{classList.join(' ')}" style="{additionalStyle}" data-x="{x}" data-y="{y}">
    {#if status === BoxStatus.AUTO_FILLED || status === BoxStatus.EMPTY || status === BoxStatus.SUCCESSFULLY_FILLED}
        <input
                type="text"
                maxlength="1"
                name="letter"
                class="w-full bg-transparent text-center outline-none"
                on:click={clickHandler}
                disabled="{additionalStyle || isAutoFilled}"
                bind:value={inputValue}
        />
    {/if}
    {#if keywordIndex !== undefined}
        <div class="absolute right-1.5 bottom-0 text-xs text-gray-600">{keywordIndex + 1}</div>
    {/if}
    {#if status === BoxStatus.KEYWORD_FILLED}
        {letter}
    {/if}
</div>