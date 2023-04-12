<script lang="ts">
  import { link } from "svelte-spa-router";
  import { clickOutside } from "../../script/clickOutside";

export let username:string;
let checkbox = false;

const openMenu = () => {
  checkbox = true;
};

function closeMenu() {
  checkbox = false;
}
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="group relative w-8 h-8 flex justify-center items-center rounded-full hover:bg-extra/50 cursor-pointer"
  on:click|stopPropagation={openMenu}
>
  <ion-icon name="ellipsis-vertical-outline" />
  <input class="peer hidden" type="checkbox" bind:checked={checkbox} />
  <!-- svelte-ignore missing-declaration -->
  <div
    class="peer-checked:block hidden absolute right-0 top-0 border border-extra rounded shadow-lg bg-main overflow-hidden w-48"
    use:clickOutside
    on:click_outside={closeMenu}
  >
    <a
      href="/{username}"
      use:link
      class="p-2 w-full block hover:bg-extra cursor-pointer text-xs"
    >
      Voir le profil
    </a>
  </div>
</div>
