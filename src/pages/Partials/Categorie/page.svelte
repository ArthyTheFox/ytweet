<script lang="ts">
    import { each } from "jquery";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function updateShow() {
        dispatch("show");
    }

</script>

<div class="w-3/12 flex flex-col h-screen text-white">
    <div class="w-full rounded-lg overflow-scroll-y h-full p-4">
        <div class="relative text-white text-[1.2rem] p-2 uppercase font-bold">Tendance</div>
        <div class="flex flex-col w-full">
            {#each Array(10) as _, i}
                <div class="relative text-white hover:text-extra p-2 text-[1rem] hover:bg-extra/20 cursor-pointer border-b border-main">#faculty {{i}}</div>
            {/each}
        </div>
    </div>
</div>

<style>
    /* width */
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 25px;
    }

    :hover::-webkit-scrollbar-thumb {
        background: #23b2a4;
    }
</style>