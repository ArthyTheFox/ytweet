<script lang="ts">
  export let show: boolean = false;
  let faculties: any = [];
  let load = true;
  import { createEventDispatcher, onMount } from "svelte";
  import FacultyService from "../../../services/Faculty.service";
  import Load from "../../../components/load.svelte";
  import { link, querystring } from "svelte-spa-router";

  const dispatch = createEventDispatcher();

  onMount(async () => {
    faculties = await FacultyService.faculties();
    load = false;
  });

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
    : 'left-full md:left-0'} md:relative bg-[#121212] w-full md:w-3/12 flex flex-col h-screen text-white duration-300 ease-in-out"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="md:hidden absolute top-7 right-7 text-xl border w-8 h-8 flex rounded border-main hover:bg-extra justify-center items-center z-[1]"
    on:click={HandleMenuRight}
  >
    <ion-icon name="close-outline" />
  </div>
  <div class="w-full rounded-lg overflow-scroll-y h-full p-4">
    <div class="relative text-white text-[1.2rem] p-2 uppercase font-bold">
      Tendance
    </div>
    {#if load}
      <Load />
    {:else}
      <div class="flex flex-col w-full">
        {#each faculties as facultie}
          <a href={`/?${facultie.id}`} use:link>
            <div
              class="relative text-white hover:text-extra p-2 text-[1rem] hover:bg-extra/20 cursor-pointer border-b border-main"
            >
              #{facultie.type}
            </div>
          </a>
        {/each}
        {#if $querystring}
          <a href={`/`} use:link>
            <div
              class="relative text-white hover:text-extra p-2 text-[1rem] hover:bg-extra/20 cursor-pointer border-b border-main"
            >
              Enlever le filtre
            </div>
          </a>
        {/if}
      </div>
    {/if}
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
