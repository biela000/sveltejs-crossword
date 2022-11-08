<script lang="ts">
    import BoxStatus from "../../types/BoxStatus";
    import {createEventDispatcher} from "svelte";

    export let letter: string;
    export let status: BoxStatus;
    export let keywordIndex: number;
    export let x: number;
    export let y: number;

    const background: string =
        status === BoxStatus.PLACEHOLDING ? "bg-green-600" :
        status === BoxStatus.EMPTY ? "bg-green-50" :
        status === BoxStatus.AUTO_FILLED ? "bg-gray-300" :
        status === BoxStatus.SUCCESSFULLY_FILLED ? "bg-green-300" :
        "bg-blue-300";

    const classList: string[] = [
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
</script>

<div class="{classList.join(' ')}" data-x="{x}" data-y="{y}">
    {#if status !== BoxStatus.PLACEHOLDING}
        <input type="text" maxlength="1" name="letter" class="w-full bg-transparent text-center outline-none" on:click={clickHandler} />
        {#if keywordIndex !== undefined}
            <div class="absolute right-1.5 bottom-0 text-xs text-gray-400">{keywordIndex}</div>
        {/if}
    {/if}
</div>