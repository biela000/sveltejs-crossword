<script lang="ts">
    import BoxStatus from "../../types/BoxStatus";
    export let letter: string;
    export let status: BoxStatus;


    
    let boxClasses = `p-5 ${status === BoxStatus.AUTO_FILLED ? "bg-white" : }`;
</script>

<div class="p-5" />
