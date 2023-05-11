<script lang="ts">
  import { link, push } from "svelte-spa-router";
  import { clickOutside } from "../../script/clickOutside";
  import { onMount } from "svelte";
  import FollowService from "../services/follow.service";
  import Message from "../services/message.service";
  import MyStore from "../store";

  export let username: string;
  export let idUser: number;
  export let idUserFollow: number;
  let checkbox = false;
  let messagerService = Message;
  let follow: boolean = false;

  onMount(async () => {
    if (idUserFollow) {
      follow = await FollowService.getFollowByUser(idUserFollow);
    }
  });

  const openMenu = () => {
    checkbox = true;
  };

  function closeMenu() {
    checkbox = false;
  }

  const followHdandle = async () => {
    if (idUserFollow) {
      if (follow) {
        const data = await FollowService.unfollow(idUserFollow);
        if (data) {
          follow = false;
        }
      } else {
        const data = await FollowService.follow(idUserFollow);
        if (data) {
          follow = true;
        }
      }
    }
  };

  const createConv = () => {
    messagerService
      .createConversation(MyStore.state.auth.user.id, idUser)
      .then((r) => {
        console.log(r);
        push(`/message/${r.id_conversation}`);
      });
  };
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
    <button
      class="p-2 w-full block text-start hover:bg-extra cursor-pointer text-xs border-t border-main-fonce/50"
      on:click={followHdandle}
    >
      {#if follow}
        UnFollow
      {:else}
        Follow
      {/if}
    </button>
    <button
      on:click={createConv}
      class="p-2 w-full block hover:bg-extra cursor-pointer text-xs text-left"
    >
      Envoyer un message
    </button>
  </div>
</div>
