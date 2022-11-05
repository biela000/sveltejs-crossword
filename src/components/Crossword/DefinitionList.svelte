<script lang="ts">
    export let definitions;
</script>

<ul class="flex flex-col justify-center items-center">
    {#each definitions as definition, index (index)}
        <li><span class="text-green-600 font-bold text-xl">{index + 1}. </span>{definition.definition}</li>
    {/each}
</ul>