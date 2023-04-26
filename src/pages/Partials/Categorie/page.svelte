<script lang="ts">
  import { each } from "jquery";

  export let show: boolean = false;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function updateShow() {
    dispatch("show");
  }

  function HandleMenuRight() {
    dispatch("menuRight");
  }
</script>

<div
  class="absolute {show
    ? 'left-0'
    : 'left-full'} md:relative bg-[#121212] w-full md:w-3/12 md:flex flex-col h-screen text-white duration-300 ease-in-out"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="absolute top-7 right-7 text-xl border w-8 h-8 flex rounded  border-main hover:bg-extra justify-center items-center z-[1]" on:click={HandleMenuRight}>
    <ion-icon name="close-outline" />
  </div>
  <div class="w-full rounded-lg overflow-scroll-y h-full p-4">
    <div class="relative text-white text-[1.2rem] p-2 uppercase font-bold">
      Tendance
    </div>
    <div class="flex flex-col w-full">
      {#each Array(10) as _, i}
        <div
          class="relative text-white hover:text-extra p-2 text-[1rem] hover:bg-extra/20 cursor-pointer border-b border-main"
        >
          #faculty {{ i }}
        </div>
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
