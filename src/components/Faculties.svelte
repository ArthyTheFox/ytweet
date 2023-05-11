<script lang="ts">
  import { link } from "svelte-spa-router";

  export let faculties: any;

  let listFaculties = JSON.parse(faculties);
</script>

<div class="flex flex-row py-2 gap-2">
  {#each listFaculties as faculty}
    {#if faculty}
      <a href={`/?${faculty.id}`} use:link class="text-sm text-extra hover:text-extra/50">#{faculty}</a>
    {/if}
  {/each}
</div>
