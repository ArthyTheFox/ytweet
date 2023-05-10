<script lang="ts">
  import { onMount } from "svelte";
  import FollowService from "../services/follow.service";

  export let idUserFollow: number;

  let follow: boolean = false;
  let load = false;

  onMount(async () => {
    if (idUserFollow) {
      follow = await FollowService.getFollowByUser(idUserFollow);
      load = true;
    }
  });

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
</script>

{#if load}
  <button
    class="px-4 text-xs py-2 uppercase border-2 border-extra hover:bg-extra bg-main-fonce rounded-lg"
    on:click|preventDefault={followHdandle}
  >
    {#if follow}
      UnFollow
    {:else}
      Follow
    {/if}
  </button>
{/if}
