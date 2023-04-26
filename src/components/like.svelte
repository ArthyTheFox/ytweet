<script lang="ts">
  import { slide } from "svelte/transition";
  import Poste from "../services/postes.service";
  import { socket } from "../services/socketio.service";

  export let isLike: number, like: number, idPost: number;

  const liked = () => {
    if (!isLike) {
      Poste.likePost(idPost).then((data) => {
        isLike = data.id;
        socket.emit("addLike", { idPost }, (error: any) => {
          if (error) {
            alert(error);
            location.href = "/";
          }
        });
      });
    }
    if (isLike) {
      Poste.unlikePost(isLike).then(() => {
        isLike = null;
        socket.emit("deleteLike", { idPost }, (error: any) => {
          if (error) {
            alert(error);
            location.href = "/";
          }
        });
      });
    }
  };

  socket.on("addFrontLike", (data: any) => {
    if (idPost === data.idPost) {
      like++;
    }
  });

  socket.on("deleteFrontLike", (data: any) => {
    if (idPost === data.idPost) {
      like--;
    }
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex justify-center items-center cursor-pointer {isLike
    ? 'text-red-500'
    : 'hover:text-red-500'}"
  on:click|stopPropagation={liked}
>
  {#if isLike}
    <ion-icon class="text-[1.25rem]" name="heart" />
  {:else}
    <ion-icon class="text-[1.25rem]" name="heart-outline" />
  {/if}
  <span class="ml-2 mb-[3px] text-[0.8rem]">
    {#if like}
      {#key like}
        <p transition:slide>{like}</p>
      {/key}
    {:else}
      0
    {/if}
  </span>
</div>
