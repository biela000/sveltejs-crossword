<script lang="ts">
    import ModalType from "../../types/ModalType";
    import {createEventDispatcher} from "svelte";

    export let type: ModalType;
    export let time: number;

    const dispatch = createEventDispatcher();

    const closeModal = () => {
        dispatch('message', { action: 'CLOSE_MODAL' })
    };
</script>

<div class="w-screen h-screen absolute bg-black opacity-80 backdrop-blur-3xl grid place-items-center z-10 top-0 left-0" on:click={closeModal}></div>
<div class="p-10 rounded-2xl bg-white z-20 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute flex flex-col items-center justify-center">
    <img src="img/cross.png" alt="Cross" class="absolute right-2 top-2 opacity-40 w-4 cursor-pointer" on:click={closeModal} />
    <h2 class="font-bold text-2xl text-center">Gratulacje!</h2>
    <img src="img/trophy.gif" alt="Win Trophy" />
    <p class="text-center">Udało ci się pokonać krzyżówkę w {Math.floor(time / 60000)}m {Math.floor(time / 1000 - Math.floor(time / 60000))}s!</p>
</div>